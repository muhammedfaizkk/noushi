import Link from "next/link";
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "chip";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonStyle = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  active?: boolean;
  className?: string;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  block = false,
  active = false,
  className = "",
}: ButtonStyle) {
  return [
    "btn",
    variant === "secondary" ? "btn-secondary" : "",
    variant === "chip" ? "btn-chip" : "",
    size === "sm" ? "btn-sm" : "",
    size === "lg" ? "btn-lg" : "",
    block ? "btn-block" : "",
    active ? "is-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type Shared = ButtonStyle & {
  children: React.ReactNode;
};

type ButtonAsButton = Shared &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Shared &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
  };

export function Button({
  variant,
  size,
  block,
  active,
  className,
  children,
  href,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = buttonClassName({ variant, size, block, active, className });

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
