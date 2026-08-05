from app.extensions import db
from app.models.tenant.organization import Organization, OrganizationMember
from app.repositories.base.base_repository import BaseRepository


class OrganizationRepository(BaseRepository):
    model = Organization

    @classmethod
    def get_by_slug(cls, slug):
        return cls.model.query.filter_by(slug=slug).first()

    @classmethod
    def get_by_domain(cls, domain):
        return cls.model.query.filter_by(domain=domain).first()

    @classmethod
    def get_members(cls, organization_id):
        return OrganizationMember.query.filter_by(
            organization_id=organization_id
        ).all()

    @classmethod
    def get_member(cls, organization_id, user_id):
        return OrganizationMember.query.filter_by(
            organization_id=organization_id,
            user_id=user_id,
        ).first()

    @classmethod
    def add_member(cls, organization_id, user_id, role="member"):
        member = cls.get_member(organization_id, user_id)
        if member:
            member.role = role
        else:
            member = OrganizationMember(
                organization_id=organization_id,
                user_id=user_id,
                role=role,
            )
            db.session.add(member)
        db.session.commit()
        return member

    @classmethod
    def remove_member(cls, organization_id, user_id):
        member = cls.get_member(organization_id, user_id)
        if member:
            db.session.delete(member)
            db.session.commit()
            return True
        return False
