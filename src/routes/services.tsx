import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Building2, Camera, Check, ClipboardCheck, Package, RefreshCw, Recycle, Repeat, Truck, type LucideIcon } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import tonerCmykImage from "@/assets/toner-cartridges-cmyk.jpg";
import regionMapImage from "@/assets/fresno-region-map.jpg";
import officeCopierImage from "@/assets/office-copier.jpg";
import tonerStackImage from "@/assets/toner-cartridges-stack.jpg";
import blossomTrailImage from "@/assets/fresno-blossom-trail.jpg";
import skylineImage from "@/assets/fresno-skyline.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Toner Services in Fresno, CA | Valley Toner Supply" },
      { name: "description", content: "Business toner supply, local delivery, managed toner service, printer cost assessments, cartridge recycling, and bulk programs for Fresno and the Central Valley." },
      { property: "og:title", content: "Toner Services | Valley Toner Supply" },
      { property: "og:description", content: "Everything your office needs to keep printing for less: supply, delivery, managed replenishment, assessments, and recycling." },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  points: string[];
  cta: string;
  image: { src: string; alt: string; width: number; height: number; position?: string };
  accent: "cyan" | "magenta" | "yellow";
};

const services: Service[] = [
  {
    id: "business-toner-supply",
    icon: Package,
    title: "Business Toner Supply",
    tagline: "Reliable toner and ink solutions for businesses of every size.",
    body: "Recurring toner and ink supply for offices that can't afford to run out: businesses, schools, medical and dental offices, government offices, dealerships, and more. We help you move from expensive OEM cartridges to guaranteed remanufactured alternatives without changing how you work.",
    points: ["Remanufactured toner and ink for HP, Brother, Canon, Lexmark, Xerox, and more", "Around 40% average savings compared with OEM cartridges", "Every cartridge backed by our 100% performance guarantee", "Recurring orders on the schedule that fits your office"],
    cta: "Get supply pricing",
    image: { src: tonerCmykImage, alt: "Black, yellow, cyan, and magenta toner cartridges lined up side by side", width: 1400, height: 788 },
    accent: "cyan",
  },
  {
    id: "local-toner-delivery",
    icon: Truck,
    title: "Local Toner Delivery",
    tagline: "The toner you need, delivered directly to your office.",
    body: "No waiting on a shipping carrier and no trip to the office supply store. We bring your cartridges straight to your front desk across Fresno, Clovis, and the Central Valley. Customers count on us when a printer runs dry in the middle of the day.",
    points: ["Delivered by a local team, right to your office", "Same-day delivery when you need it fast. Just ask when you order", "Drop off new cartridges and take your empties in the same trip", "Serving Fresno, Clovis, Madera, Visalia, and surrounding communities"],
    cta: "Set up delivery",
    image: { src: regionMapImage, alt: "Map of California highlighting Fresno and the Central Valley service area", width: 887, height: 1774, position: "center 54%" },
    accent: "magenta",
  },
  {
    id: "managed-toner-service",
    icon: RefreshCw,
    title: "Managed Toner Service",
    tagline: "Never worry about ordering toner again.",
    body: "Tell us which printers you have and roughly how much you print. We keep you stocked so you never unexpectedly run out. For larger offices, we become your single vendor for toner inventory, ordering, replacement schedules, and cartridge recycling.",
    points: ["Automatic replenishment based on your printers and print volume", "One vendor for inventory, ordering, and replacement schedules", "Fewer emergency orders and less toner sitting on shelves", "Used cartridges collected and recycled as part of the program"],
    cta: "Start a managed program",
    image: { src: officeCopierImage, alt: "A multifunction office copier with a touchscreen control panel", width: 1200, height: 959 },
    accent: "yellow",
  },
  {
    id: "printer-fleet-cost-assessment",
    icon: BarChart3,
    title: "Printer Fleet & Cost Assessment",
    tagline: "Find out what your printers are really costing your business.",
    body: "We review every printer in your office: the model, the cartridge it uses, how much it prints, and what it costs you to run. Then we show you, side by side, how much you're overpaying for toner and where switching to remanufactured cartridges saves the most.",
    points: ["A complete inventory of every printer and the cartridge it takes", "Estimated print volume and cost per page for each machine", "A clear comparison of your current spend versus remanufactured", "Recommendations to cut cost without cutting print quality"],
    cta: "Request an assessment",
    image: { src: tonerStackImage, alt: "Four laser toner cartridges stacked, showing their imaging drums", width: 1000, height: 991 },
    accent: "cyan",
  },
  {
    id: "toner-cartridge-recycling",
    icon: Recycle,
    title: "Toner Cartridge Recycling",
    tagline: "Keep empty cartridges out of landfills.",
    body: "Every empty cartridge can be collected and returned for remanufacturing instead of being thrown away. Set up scheduled collection or hand us your empties at your next delivery. It's an easy, visible step toward your organization's sustainability goals.",
    points: ["Scheduled collection or return at your next delivery", "Empty cartridges go back into remanufacturing, not the landfill", "Pairs with cartridges made from 90%+ recycled content", "$2 from every online purchase goes toward ocean cleanup"],
    cta: "Schedule a collection",
    image: { src: blossomTrailImage, alt: "Rows of blossoming orchard trees along the Fresno County Blossom Trail", width: 1400, height: 930 },
    accent: "magenta",
  },
  {
    id: "bulk-corporate-toner-programs",
    icon: Building2,
    title: "Bulk & Corporate Toner Programs",
    tagline: "Volume pricing and simplified purchasing for organizations.",
    body: "For organizations running many printers or many locations, we set up account-based ordering with volume pricing. Your team reorders from a private portal that lists only the cartridges your printers use, at your contract price.",
    points: ["Volume pricing for high-use and multi-site organizations", "Private ordering portal with your approved cartridges and pricing", "Consistent supply across every office and department", "A single point of contact for your whole account"],
    cta: "Talk about volume pricing",
    image: { src: skylineImage, alt: "Downtown Fresno skyline at dusk", width: 800, height: 800, position: "center 35%" },
    accent: "yellow",
  },
];

const extras = [
  { icon: Camera, title: "Printer Supply Consultation", body: "Send us your printer model, or just a photo of the printer label, and we'll identify the exact cartridge you need.", link: { to: "/request-a-quote" as const, label: "Send your printer model" } },
  { icon: Repeat, title: "OEM Toner Alternatives", body: "Switch from expensive OEM cartridges to tested remanufactured cartridges for HP, Brother, Canon, Lexmark, Xerox, and more.", link: { hash: "business-toner-supply", label: "See business supply" } },
  { icon: ClipboardCheck, title: "Automatic Toner Replenishment", body: "We track what your printers use and restock before you run low, so nobody has to remember to reorder.", link: { hash: "managed-toner-service", label: "See managed service" } },
  { icon: BarChart3, title: "Print Cost Analysis", body: "Find out how much you're overpaying for toner, with a side-by-side look at your current costs versus remanufactured.", link: { hash: "printer-fleet-cost-assessment", label: "See the assessment" } },
];

const audiences = ["Businesses", "Schools", "Medical & dental offices", "Government offices", "Car dealerships", "Law & accounting firms", "Nonprofits", "Property managers"];

function ServicesPage() {
  return (
    <main className="vts-page">
      <SiteNav />

      <header className="vts-subhero">
        <div>
          <p className="vts-kicker"><span /> Our services</p>
          <h1>Everything your office needs<br /><em>to keep printing for less.</em></h1>
          <p className="vts-lede">From a single cartridge delivered today to a fully managed toner program, Valley Toner Supply keeps Central Valley offices printing while cutting cost and waste.</p>
        </div>
        <ul className="vts-service-index">
          {services.map(({ icon: Icon, ...service }) => (
            <li key={service.id} className={service.accent}>
              <a href={`#${service.id}`}><Icon size={22} /><div><strong>{service.title}</strong><span>{service.tagline}</span></div><ArrowRight size={16} /></a>
            </li>
          ))}
        </ul>
      </header>

      <div className="vts-service-list">
        {services.map(({ icon: Icon, ...service }, index) => (
          <section className={`vts-service ${service.accent}`} id={service.id} key={service.id}>
            <figure><img src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} loading={index === 0 ? "eager" : "lazy"} style={service.image.position ? { objectPosition: service.image.position } : undefined} /></figure>
            <div className="vts-service-copy">
              <p className="vts-service-num"><Icon size={18} /> {String(index + 1).padStart(2, "0")}</p>
              <h2>{service.title}</h2>
              <p className="vts-service-tagline">{service.tagline}</p>
              <p>{service.body}</p>
              <ul>{service.points.map((point) => <li key={point}><Check size={17} /> {point}</li>)}</ul>
              <Link className="vts-button vts-button-dark" to="/request-a-quote">{service.cta} <ArrowRight size={18} /></Link>
            </div>
          </section>
        ))}
      </div>

      <section className="vts-section vts-extras">
        <div className="vts-section-head"><div><p className="vts-kicker"><span /> Also included</p><h2>The little things<br /><em>that save the most time.</em></h2></div><p>These come built into how we work with every customer. No separate contract required.</p></div>
        <div className="vts-extras-grid">
          {extras.map(({ icon: Icon, ...extra }) => (
            <article key={extra.title}>
              <Icon size={24} />
              <h3>{extra.title}</h3>
              <p>{extra.body}</p>
              {"to" in extra.link ? <Link to={extra.link.to}>{extra.link.label} <ArrowRight size={16} /></Link> : <a href={`#${extra.link.hash}`}>{extra.link.label} <ArrowRight size={16} /></a>}
            </article>
          ))}
        </div>
      </section>

      <section className="vts-audiences">
        <p className="vts-kicker"><span /> Who we serve</p>
        <h2>Offices across the Central Valley that print every day.</h2>
        <ul>{audiences.map((a) => <li key={a}>{a}</li>)}</ul>
      </section>

      <section className="vts-quote">
        <div><p className="vts-kicker light"><span /> Not sure where to start?</p><h2>Tell us what you print with.<br /><em>We'll recommend the right fit.</em></h2><p>Send your printer models or current cartridge list, and we'll suggest the services that will save your business the most.</p></div>
        <Link className="vts-button vts-button-white" to="/request-a-quote">Request a quote <ArrowRight size={18} /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
