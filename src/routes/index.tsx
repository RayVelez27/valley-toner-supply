import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, BadgeDollarSign, Briefcase, Building2, Camera, Check, Copy, Droplets, GraduationCap, Headset, Landmark, Leaf, ListChecks, MapPin, PackageCheck, Printer, Recycle, RotateCcw, Scale, ShieldCheck, ShoppingCart, Sparkles, Stethoscope, Truck, Waves, Wrench } from "lucide-react";
import heroImage from "@/assets/valley-toner-hero.jpg";
import regionMapImage from "@/assets/fresno-region-map.jpg";
import skylineImage from "@/assets/fresno-skyline.jpg";
import civicCenterImage from "@/assets/fresno-civic-center.jpg";
import blossomTrailImage from "@/assets/fresno-blossom-trail.jpg";
import cityCollegeImage from "@/assets/fresno-city-college.jpg";
import officeCopierImage from "@/assets/office-copier.jpg";
import tonerCmykImage from "@/assets/toner-cartridges-cmyk.jpg";
import tonerStackImage from "@/assets/toner-cartridges-stack.jpg";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valley Toner Supply | Remanufactured Toner & Ink in Fresno, CA" },
      { name: "description", content: "Serving Fresno and the Central Valley. Save 40%+ on average with guaranteed remanufactured toner and ink made with 90%+ recycled content." },
      { property: "og:title", content: "Valley Toner Supply | Smarter Printing. Less Waste." },
      { property: "og:description", content: "Business-grade remanufactured toner and ink with 40%+ average savings and a 100% performance guarantee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { value: "40%+", label: "average savings", detail: "A practical way to lower printing costs across your business." },
  { value: "100%", label: "performance guarantee", detail: "Every remanufactured cartridge is backed for dependable output." },
  { value: "90%+", label: "recycled content", detail: "More materials kept in circulation and away from landfill." },
  { value: "10+", label: "years of experience", detail: "Experienced support for the supplies your printers need." },
];

const products = [
  { icon: Printer, number: "01", title: "Remanufactured toner", body: "Reliable black and color toner for the printers your team depends on—without the original-brand price premium.", accent: "cyan" },
  { icon: Droplets, number: "02", title: "Remanufactured ink", body: "Consistent everyday output for offices that want quality, value, and a more responsible supply choice.", accent: "magenta" },
  { icon: PackageCheck, number: "03", title: "Business supply support", body: "A straightforward source for keeping workplace printers supplied while managing cost and reducing waste.", accent: "yellow" },
];

const steps = [
  { number: "01", title: "Tell us what you print with", body: "Share your printer models or current cartridge numbers so the right supplies can be identified." },
  { number: "02", title: "Compare the opportunity", body: "See where remanufactured cartridges can lower spend while meeting your performance needs." },
  { number: "03", title: "Print with confidence", body: "Put guaranteed toner and ink to work across your office, team, or printer fleet." },
];

const faqs = [
  { q: "What does remanufactured mean?", a: "A used cartridge is professionally restored for another service life instead of being discarded. It is cleaned, inspected, rebuilt as needed, refilled, and prepared to perform again." },
  { q: "How much can my business save?", a: "Valley Toner Supply currently reports average savings of more than 40%. Actual savings depend on the printer models, cartridge mix, and purchasing volume involved." },
  { q: "Is performance guaranteed?", a: "Yes. Valley Toner Supply backs its remanufactured toner and ink with a 100% performance guarantee." },
  { q: "How does this reduce waste?", a: "Remanufacturing extends the useful life of cartridges and uses 90%+ recycled content, supporting a zero-landfill approach and reducing demand for newly manufactured materials." },
  { q: "How do purchases support ocean cleanup?", a: "$2 from every online purchase is donated toward ocean-cleanup initiatives." },
  { q: "Can my team reorder online?", a: "Yes. Business accounts get an ordering portal with a curated list of the cartridges that fit your printers, at your contract pricing, so reordering takes a few clicks." },
];

const brands = ["HP", "Brother", "Canon", "Lexmark", "Xerox", "Samsung", "Kyocera", "Dell"];

const industries = [
  { icon: Stethoscope, title: "Medical & dental", body: "Front desks, billing, and records rooms that can't afford a printer sitting idle." },
  { icon: Scale, title: "Legal & accounting", body: "High-volume black-and-white output where cost per page adds up fast." },
  { icon: GraduationCap, title: "Schools & education", body: "Classroom and office fleets supplied on a budget that has to stretch." },
  { icon: Building2, title: "Property management", body: "Multiple sites and printer models, kept supplied from one place." },
  { icon: Landmark, title: "Public sector & nonprofits", body: "Lower spend and measurable waste reduction for mission-driven teams." },
  { icon: Briefcase, title: "Professional offices", body: "Dependable everyday printing for growing teams of any size." },
];

const portalFeatures = [
  { icon: ListChecks, title: "Curated to your fleet", body: "Only the cartridges that fit your printers, organized by model and location." },
  { icon: BadgeDollarSign, title: "Your contract pricing", body: "See your price next to the OEM list price on every item." },
  { icon: RotateCcw, title: "Reorder in seconds", body: "Usual quantities come from your order history, so restocking takes a few clicks." },
];

const portalPreview = [
  { name: "HP 26X High Yield Black", sku: "VTS-CF226X-R", price: "$89.95", oem: "$189.99", color: "var(--vts-ink)" },
  { name: "HP 414X High Yield Cyan", sku: "VTS-W2021X-R", price: "$119.95", oem: "$263.99", color: "var(--vts-cyan)" },
  { name: "HP 414X High Yield Magenta", sku: "VTS-W2023X-R", price: "$119.95", oem: "$263.99", color: "var(--vts-magenta)" },
];

const serviceArea = ["Fresno", "Clovis", "Madera", "Sanger", "Selma", "Reedley", "Kerman", "Fowler", "Kingsburg", "Visalia"];

const localPoints = [
  { icon: Headset, title: "Local account support", body: "Talk to someone who knows the Valley, not a call center three time zones away." },
  { icon: Truck, title: "Delivered across the Valley", body: "Supplies sent to your office, clinic, or campus across Fresno County and nearby communities." },
  { icon: Recycle, title: "Send your empties back", body: "Return used cartridges so they can be remanufactured instead of landfilled." },
];

const fleetTypes = [
  { icon: Printer, title: "Desktop laser printers", body: "The workhorses at front desks and private offices." },
  { icon: Copy, title: "Multifunction copiers", body: "Print, scan, and copy machines that serve a whole floor." },
  { icon: Sparkles, title: "Color workgroup printers", body: "Full CMYK sets for marketing, reports, and patient handouts." },
  { icon: Droplets, title: "Inkjet printers", body: "Everyday ink for small offices and home offices." },
];

const remanStages = [
  { number: "01", title: "Collected", body: "Used cartridges are gathered instead of being thrown away." },
  { number: "02", title: "Cleaned & inspected", body: "Each cartridge is emptied, cleaned, and checked for wear." },
  { number: "03", title: "Rebuilt & refilled", body: "Worn components are replaced as needed and the cartridge is refilled with toner." },
  { number: "04", title: "Ready to perform", body: "It goes back to work, covered by our 100% performance guarantee." },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const AVERAGE_SAVINGS = 0.4;

function SavingsCalculator() {
  const [monthlySpend, setMonthlySpend] = useState(800);
  const annualSavings = monthlySpend * 12 * AVERAGE_SAVINGS;
  return (
    <div className="vts-calc-card" data-reveal="">
      <label htmlFor="monthly-spend">Current monthly toner &amp; ink spend</label>
      <output htmlFor="monthly-spend">{currency.format(monthlySpend)}</output>
      <input id="monthly-spend" type="range" min={100} max={5000} step={50} value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))} />
      <div className="vts-calc-scale"><span>$100</span><span>$5,000+</span></div>
      <div className="vts-calc-results">
        <div><span>Estimated monthly savings</span><strong>{currency.format(monthlySpend * AVERAGE_SAVINGS)}</strong></div>
        <div><span>Estimated annual savings</span><strong>{currency.format(annualSavings)}</strong></div>
      </div>
      <p>Based on our 40%+ average savings. Your actual savings depend on printer models, cartridge mix, and volume.</p>
    </div>
  );
}

function Index() {
  useScrollReveal();
  return (
    <main className="vts-page">
      <SiteNav />

      <header className="vts-hero" id="top">
        <div className="vts-hero-copy">
          <p className="vts-kicker"><span /> Smarter supplies for business printing</p>
          <h1>Spend less on printing.<br /><em><span className="vts-ink-gradient">Waste less</span> doing it.</em></h1>
          <p className="vts-lede">High-performance remanufactured toner and ink that helps businesses cut costs, keep cartridges out of landfill, and print with confidence.</p>
          <div className="vts-actions">
            <Link className="vts-button vts-button-dark" to="/request-a-quote">Request a business quote <ArrowRight size={18} /></Link>
            <a className="vts-button vts-button-light" href="#products">Explore supplies</a>
          </div>
          <div className="vts-proofline"><span><i className="dot cyan" />40%+ average savings</span><span><i className="dot magenta" />100% performance guarantee</span><span><i className="dot yellow" />90%+ recycled content</span></div>
        </div>
        <div className="vts-hero-visual" aria-label="Remanufactured toner and ink cartridges">
          <img src={heroImage} alt="Remanufactured toner and ink cartridges arranged with cyan, magenta, and yellow accents" width={1280} height={1024} />
          <div className="vts-visual-stamp"><Recycle size={23} /><div><strong>Built for another life</strong><span>Remanufactured, not discarded</span></div></div>
        </div>
      </header>

      <section className="vts-metrics" aria-label="Valley Toner Supply at a glance">
        {benefits.map((item) => <article key={item.label} data-reveal=""><strong>{item.value}</strong><h2>{item.label}</h2><p>{item.detail}</p></article>)}
      </section>

      <section className="vts-brands" data-reveal="" aria-label="Printer brands supported"><p>Supplies for the printers<br />you already own</p><ul>{brands.map((brand) => <li key={brand}>{brand}</li>)}</ul></section>

      <section className="vts-local" id="local">
        <div className="vts-local-copy" data-reveal="">
          <p className="vts-kicker"><span /> Proudly local</p>
          <h2>Serving Fresno<br /><em>and the Central Valley.</em></h2>
          <p>We supply the offices, clinics, schools, and shops that keep the Valley running. From the Tower District to downtown, Clovis to Visalia, your toner comes from a neighbor.</p>
          <ul className="vts-local-points">{localPoints.map(({ icon: Icon, ...item }) => <li key={item.title}><Icon size={20} /><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ul>
          <div className="vts-service-area"><span><MapPin size={15} /> Service area</span><ul>{serviceArea.map((town) => <li key={town}>{town}</li>)}</ul></div>
        </div>
        <div className="vts-local-mosaic">
          <figure className="tall map" data-reveal="image"><img src={regionMapImage} alt="Map of California highlighting Fresno and the surrounding Central Valley service area" width={887} height={1774} loading="lazy" /></figure>
          <figure data-reveal="image"><img src={skylineImage} alt="Downtown Fresno skyline at dusk" width={800} height={800} loading="lazy" /></figure>
          <figure data-reveal="image"><img src={civicCenterImage} alt="Modernist colonnade and buildings in downtown Fresno" width={800} height={800} loading="lazy" /></figure>
        </div>
      </section>

      <section className="vts-section" id="products">
        <div className="vts-section-head" data-reveal=""><div><p className="vts-kicker"><span /> What we supply</p><h2>Better cartridges.<br /><em>A better business case.</em></h2></div><p>Choose dependable remanufactured supplies that support your budget and sustainability goals at the same time.</p></div>
        <div className="vts-product-grid">
          {products.map(({ icon: Icon, ...product }) => <article className={`vts-product ${product.accent}`} key={product.title} data-reveal=""><div className="vts-product-top"><span>{product.number}</span><Icon size={27} /></div><h3>{product.title}</h3><p>{product.body}</p><Link to="/request-a-quote">Find the right fit <ArrowRight size={17} /></Link></article>)}
        </div>
      </section>

      <section className="vts-fleet">
        <figure className="vts-fleet-photo" data-reveal="image"><img src={officeCopierImage} alt="A multifunction office copier with a touchscreen control panel" width={1200} height={959} loading="lazy" /></figure>
        <div className="vts-fleet-copy" data-reveal="">
          <p className="vts-kicker"><span /> Your whole fleet</p>
          <h2>Every printer<br /><em>in the building.</em></h2>
          <p>Most offices run a mix of machines bought over the years. We supply them all from one place, so you're not juggling vendors, part numbers, and price lists.</p>
          <div className="vts-fleet-grid">{fleetTypes.map(({ icon: Icon, ...item }) => <article key={item.title}><Icon size={22} /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
          <p className="vts-fleet-tip"><Camera size={18} /> Not sure what you have? Snap a photo of the model label and send it with your quote request.</p>
        </div>
      </section>

      <section className="vts-calc" id="savings">
        <div className="vts-calc-copy" data-reveal=""><p className="vts-kicker"><span /> Run the numbers</p><h2>See what switching<br /><em>could save you.</em></h2><p>Move the slider to your typical monthly spend on toner and ink. Then send us your cartridge list for an exact quote.</p><Link className="vts-button vts-button-dark" to="/request-a-quote">Get an exact quote <ArrowRight size={18} /></Link></div>
        <SavingsCalculator />
      </section>

      <section className="vts-dark-band" id="sustainability">
        <div className="vts-dark-copy" data-reveal=""><p className="vts-kicker light"><span /> Waste less by design</p><h2>Keep cartridges working.<br /><em>Keep them out of landfill.</em></h2><p>Remanufacturing gives printer cartridges another productive life. With 90%+ recycled content and a zero-landfill focus, every order is a practical step toward more responsible business printing.</p><ul><li><Check size={18} /> Extends the useful life of existing cartridges</li><li><Check size={18} /> Reduces reliance on newly manufactured materials</li><li><Check size={18} /> Supports your organization’s waste-reduction goals</li></ul></div>
        <div className="vts-impact-art" data-reveal="image" aria-hidden="true"><div className="orbit orbit-one"><Recycle /></div><div className="orbit orbit-two"><Leaf /></div><div className="orbit orbit-three"><Waves /></div><div className="impact-center"><strong>90%+</strong><span>recycled content</span></div></div>
      </section>

      <section className="vts-section vts-reman">
        <div className="vts-section-head" data-reveal=""><div><p className="vts-kicker"><span /> Inside remanufacturing</p><h2>One cartridge.<br /><em>Many working lives.</em></h2></div><p>A remanufactured cartridge isn't a cheap refill. It's a used cartridge restored for another full service life.</p></div>
        <div className="vts-reman-body">
          <div className="vts-reman-photos" data-reveal="image">
            <figure className="wide"><img src={tonerCmykImage} alt="Black, yellow, cyan, and magenta toner cartridges lined up side by side" width={1400} height={788} loading="lazy" /></figure>
            <figure><img src={tonerStackImage} alt="Four laser toner cartridges stacked, showing their imaging drums" width={1000} height={991} loading="lazy" /></figure>
            <div className="vts-reman-badge"><Wrench size={22} /><strong>Restored,<br />not replaced</strong></div>
          </div>
          <ol className="vts-reman-stages">{remanStages.map((stage) => <li key={stage.number} data-reveal=""><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="vts-section vts-why" id="why-valley">
        <div className="vts-section-head" data-reveal=""><div><p className="vts-kicker"><span /> Why Valley Toner Supply</p><h2>The value alternative,<br /><em>without the compromise.</em></h2></div><p>For more than a decade, Valley Toner Supply has helped businesses rethink the cost and waste built into everyday printing.</p></div>
        <div className="vts-reasons"><article data-reveal=""><ShieldCheck /><h3>Guaranteed performance</h3><p>Every remanufactured toner and ink cartridge is covered by a 100% performance guarantee.</p></article><article data-reveal=""><Recycle /><h3>Circular by default</h3><p>Choose products built with 90%+ recycled content and designed around a zero-landfill approach.</p></article><article data-reveal=""><Waves /><h3>Every order gives back</h3><p>$2 from each online purchase goes toward initiatives working to clean up our oceans.</p></article></div>
      </section>

      <section className="vts-section vts-industries-section">
        <div className="vts-section-head" data-reveal=""><div><p className="vts-kicker"><span /> Who we supply</p><h2>Built for offices<br /><em>that print every day.</em></h2></div><p>From a single front desk to a multi-site fleet, we help organizations that depend on their printers spend less keeping them running.</p></div>
        <figure className="vts-industries-photo" data-reveal="image"><img src={cityCollegeImage} alt="The Old Administration Building at Fresno City College" width={1200} height={839} loading="lazy" /><figcaption><strong>From campus offices to clinic front desks</strong><span>Supplying organizations across Fresno County</span></figcaption></figure>
        <div className="vts-industries">{industries.map(({ icon: Icon, ...item }) => <article key={item.title} data-reveal=""><Icon size={24} /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
      </section>

      <section className="vts-process">
        <div className="vts-process-intro" data-reveal=""><p className="vts-kicker"><span /> A simpler switch</p><h2>From printer model<br />to <em>better value.</em></h2><p>Moving to remanufactured supplies can be straightforward. Start with what your business already uses.</p></div>
        <div className="vts-process-list">{steps.map((step) => <article key={step.number} data-reveal=""><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div>
      </section>

      <section className="vts-portal" id="portal">
        <div className="vts-portal-copy" data-reveal="">
          <p className="vts-kicker"><span /> Business ordering portal</p>
          <h2>Reordering toner<br /><em>takes a few clicks.</em></h2>
          <p>Every business account gets a private ordering portal. It lists the cartridges approved for your printers, at your contract price, with your usual quantities ready to add to the cart.</p>
          <ul>{portalFeatures.map(({ icon: Icon, ...item }) => <li key={item.title}><Icon size={20} /><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ul>
          <div className="vts-actions"><Link className="vts-button vts-button-dark" to="/order-portal-demo">Try the portal demo <ArrowRight size={18} /></Link><Link className="vts-button vts-button-light" to="/request-a-quote">Open a business account</Link></div>
        </div>
        <div className="vts-portal-preview" data-reveal="image" aria-hidden="true">
          <div className="vts-preview-chrome"><i /><i /><i /><span>Business Portal</span></div>
          <div className="vts-preview-bar"><div><strong>Your approved supplies</strong><span>Harbor Point Dental Group · Contract pricing</span></div><b><ShoppingCart size={14} /> 3</b></div>
          <div className="vts-preview-list">{portalPreview.map((item) => <div className="vts-preview-row" key={item.sku}><i style={{ background: item.color }} /><div><strong>{item.name}</strong><span>{item.sku}</span></div><div className="vts-preview-price"><strong>{item.price}</strong><s>{item.oem}</s></div><em>Add</em></div>)}</div>
        </div>
      </section>

      <section className="vts-giveback" data-reveal=""><div className="vts-wave-icon"><Waves size={34} /></div><div><p className="vts-kicker"><span /> Print with purpose</p><h2>Every online purchase puts <em>$2 toward cleaner oceans.</em></h2></div><p>Small choices add up. Your everyday printing purchase helps support ocean-cleanup initiatives while moving cartridges away from landfill.</p></section>

      <section className="vts-valley-band" style={{ backgroundImage: `url(${blossomTrailImage})` }}>
        <div data-reveal=""><p className="vts-kicker light"><span /> Rooted in the Valley</p><h2>Printing smarter<br />for the place we call home.</h2><p>Every cartridge we keep out of a landfill is one less piece of waste in the Central Valley. That matters to us because we live and work here too.</p><Link className="vts-button vts-button-white" to="/request-a-quote">Talk to a local rep <ArrowRight size={18} /></Link></div>
      </section>

      <section className="vts-section vts-faq-section" id="faq">
        <div className="vts-section-head" data-reveal=""><div><p className="vts-kicker"><span /> Good to know</p><h2>Questions, answered<br /><em>clearly.</em></h2></div></div>
        <div className="vts-faq" data-reveal="">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="vts-quote" id="quote" data-reveal="">
        <div><p className="vts-kicker light"><span /> Ready to compare?</p><h2>Make your next cartridge<br /><em>cost less and do more.</em></h2><p>Bring us your printer models or current cartridge list. We’ll help you explore a lower-cost, lower-waste supply plan for your business.</p></div>
        <Link className="vts-button vts-button-white" to="/request-a-quote">Start your supply request <ArrowRight size={18} /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
