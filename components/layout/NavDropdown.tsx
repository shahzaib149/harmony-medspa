import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export type NavDropdownLink = { label: string; href: string; newTab?: boolean };

/**
 * Header menu (About, Patient Center) that opens on hover or keyboard focus. Styles and
 * the open/close animation live in SiteHeader.module.css. `active` marks the trigger when
 * the current page belongs to this menu; the matching link is marked as the current page.
 */
export default function NavDropdown({
  label,
  links,
  active,
  pathname
}: {
  label: string;
  links: NavDropdownLink[];
  active: boolean;
  pathname: string;
}) {
  return (
    <div className={`nav-dropdown${active ? " is-active" : ""}`}>
      <button className="nav-dropdown-trigger" type="button" aria-haspopup="true">
        {label}
        <ChevronDown className="nav-dropdown-caret" size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <div className="nav-dropdown-menu">
        {links.map((item, index) => {
          const style = { "--i": index } as React.CSSProperties;
          if (!item.href.startsWith("/")) {
            return (
              <a
                className="nav-dropdown-link"
                href={item.href}
                key={item.label}
                style={style}
                target={item.newTab ? "_blank" : undefined}
                rel={item.newTab ? "noreferrer" : undefined}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            );
          }
          return (
            <Link
              className="nav-dropdown-link"
              href={item.href}
              key={item.label}
              style={style}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
