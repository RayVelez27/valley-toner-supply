import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoUrl from "@/assets/valley-toner-supply-white-logo.png";

const photoCredits = [
  { subject: "Fresno County Blossom Trail", author: "Andy Blackledge", license: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Fresno_blossom_trail.jpg" },
  { subject: "Fresno City College", author: "Bobak Ha'Eri", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:2009-0725-CA-FresnoCC-OAB_(cropped).jpg" },
  { subject: "Office copier", author: "Baron Maddock", license: "CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:Xerox_AltaLink_C8045_photocopier.jpg" },
  { subject: "CMYK toner cartridges", author: "Raimond Spekking", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Xerox_Phaser_6600_toner_cartridges_in_black,_yellow,_cyan,_and_magenta-7636.jpg" },
  { subject: "Stacked toner cartridges", author: "W.carter", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Four_Samsung_laser_toner_cartridges_front_view.jpg" },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? "vts-logo vts-logo-small" : "vts-logo"} src={logoUrl} alt="Valley Toner Supply" width={276} height={73} />;
}

export function SiteNav() {
  return (
    <nav className="vts-nav" aria-label="Main navigation">
      <Link to="/" aria-label="Valley Toner Supply home"><Logo compact /></Link>
      <div className="vts-nav-links">
        <Link to="/services" activeProps={{ "aria-current": "page" }}>Services</Link>
        <Link to="/about" activeProps={{ "aria-current": "page" }}>About</Link>
        <Link to="/" hash="savings" activeOptions={{ includeHash: true }}>Savings</Link>
        <Link to="/" hash="sustainability" activeOptions={{ includeHash: true }}>Sustainability</Link>
        <Link to="/order-portal-demo">Ordering portal</Link>
        <Link to="/" hash="faq" activeOptions={{ includeHash: true }}>FAQ</Link>
      </div>
      <Link className="vts-button vts-button-white vts-nav-cta" to="/request-a-quote">Request a quote <ArrowRight size={17} /></Link>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="vts-footer">
      <div><Logo compact /><p>Remanufactured toner and ink for lower-cost, lower-waste business printing.</p></div>
      <div className="vts-footer-links"><Link to="/services">Services</Link><Link to="/about">About</Link><Link to="/" hash="savings">Savings</Link><Link to="/" hash="sustainability">Sustainability</Link><Link to="/order-portal-demo">Ordering portal</Link><Link to="/" hash="faq">FAQ</Link><Link to="/request-a-quote">Request a quote</Link></div>
      <details className="vts-credits"><summary>Photo credits</summary><ul>{photoCredits.map((credit) => <li key={credit.href}><a href={credit.href} target="_blank" rel="noreferrer">{credit.subject}</a> by {credit.author}, {credit.license}, via Wikimedia Commons</li>)}</ul></details>
      <div className="vts-footer-base"><span>© {new Date().getFullYear()} Valley Toner Supply · Serving Fresno &amp; the Central Valley</span><span>Better printing. Less waste.</span></div>
    </footer>
  );
}
