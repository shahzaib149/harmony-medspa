import Link from "next/link";

export default function AboutDropdown() {
  return (
    <details className="nav-dropdown">
      <summary>about</summary>
      <div className="nav-dropdown-menu">
        <Link href="/about-us">our practice</Link>
        <Link href="/our-team">meet the team</Link>
        <a href="#">before &amp; afters</a>
      </div>
    </details>
  );
}
