import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({
  text,
  linkText,
  href,
}: AuthFooterProps) {
  return (
    <div className="mt-6 text-center text-sm">
      <span className="text-muted-foreground">
        {text}{" "}
      </span>

      <Link
        href={href}
        className="font-medium text-primary hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
}