import re
from app.models.tenant.organization import Organization
from app.models.user import User
from app.repositories.tenant.organization_repository import OrganizationRepository


class OrganizationService:

    @staticmethod
    def create_organization(data):
        name = data.get("name")
        if not name:
            raise ValueError("Organization name is required")

        slug = data.get("slug")
        if not slug:
            slug = re.sub(r"[^\w\s-]", "", name.lower()).strip()
            slug = re.sub(r"[-\s]+", "-", slug)

        existing_slug = OrganizationRepository.get_by_slug(slug)
        if existing_slug:
            raise ValueError(f"Organization with slug '{slug}' already exists")

        domain = data.get("domain")
        if domain:
            existing_domain = OrganizationRepository.get_by_domain(domain)
            if existing_domain:
                raise ValueError(f"Organization with domain '{domain}' already exists")

        org = Organization(
            name=name,
            slug=slug,
            domain=domain,
            is_active=data.get("is_active", True),
        )

        OrganizationRepository.create(org)
        return OrganizationService.serialize(org)

    @staticmethod
    def get_organization(org_id):
        org = OrganizationRepository.get_by_id(org_id)
        if not org:
            raise ValueError("Organization not found")
        return OrganizationService.serialize(org)

    @staticmethod
    def get_organization_by_slug(slug):
        org = OrganizationRepository.get_by_slug(slug)
        if not org:
            raise ValueError("Organization not found")
        return OrganizationService.serialize(org)

    @staticmethod
    def list_organizations():
        orgs = Organization.query.order_by(Organization.created_at.desc()).all()
        return [OrganizationService.serialize(org) for org in orgs]

    @staticmethod
    def add_member(org_id, user_identifier, role="member"):
        org = OrganizationRepository.get_by_id(org_id)
        if not org:
            raise ValueError("Organization not found")

        user = User.query.filter(
            (User.id == user_identifier) | (User.email == user_identifier)
        ).first()

        if not user:
            raise ValueError(f"User '{user_identifier}' not found")

        member = OrganizationRepository.add_member(
            organization_id=org_id,
            user_id=user.id,
            role=role,
        )
        return OrganizationService.serialize_member(member)

    @staticmethod
    def remove_member(org_id, user_id):
        org = OrganizationRepository.get_by_id(org_id)
        if not org:
            raise ValueError("Organization not found")

        success = OrganizationRepository.remove_member(org_id, user_id)
        if not success:
            raise ValueError("Member not found in organization")
        return True

    @staticmethod
    def get_members(org_id):
        org = OrganizationRepository.get_by_id(org_id)
        if not org:
            raise ValueError("Organization not found")

        members = OrganizationRepository.get_members(org_id)
        return [OrganizationService.serialize_member(m) for m in members]

    @staticmethod
    def serialize(org):
        return {
            "id": org.id,
            "name": org.name,
            "slug": org.slug,
            "domain": org.domain,
            "is_active": org.is_active,
            "created_at": org.created_at.isoformat() if org.created_at else None,
            "updated_at": org.updated_at.isoformat() if org.updated_at else None,
            "member_count": len(org.members) if org.members else 0,
        }

    @staticmethod
    def serialize_member(member):
        return {
            "id": member.id,
            "organization_id": member.organization_id,
            "user_id": member.user_id,
            "role": member.role,
            "created_at": member.created_at.isoformat() if member.created_at else None,
            "updated_at": member.updated_at.isoformat() if member.updated_at else None,
            "user": (
                {
                    "id": member.user.id,
                    "email": member.user.email,
                    "first_name": member.user.first_name,
                    "last_name": member.user.last_name,
                }
                if member.user
                else None
            ),
        }
