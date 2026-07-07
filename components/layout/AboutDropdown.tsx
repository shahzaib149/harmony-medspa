import Link from "next/link";

export default function AboutDropdown() {
  return (
    <div className="nav-dropdown">
      <button className="nav-dropdown-trigger" type="button" aria-haspopup="true">
        about
      </button>
      <div className="nav-dropdown-menu">
        <Link href="/about-us">our practice</Link>
        <Link href="/our-team">meet the team</Link>
        <Link href="/before-and-afters">before &amp; afters</Link>
      </div>
    </div>
  );
}
