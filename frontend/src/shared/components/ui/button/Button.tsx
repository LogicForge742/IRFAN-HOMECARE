import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground hover:opacity-90",

                secondary:
                    "bg-secondary text-secondary-foreground hover:opacity-90",

                outline:
                    "border border-border bg-surface text-foreground hover:bg-secondary",

                ghost:
                    "text-foreground hover:bg-secondary",

                destructive:
                    "bg-danger text-white hover:opacity-90",
            },

            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4",
                lg: "h-12 px-6",
                icon: "h-10 w-10",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            loading = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? "Loading..." : children}
            </button>
        );
    }
);

Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };