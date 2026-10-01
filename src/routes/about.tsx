import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Leaf, Printer, Waves } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import founderImage from "@/assets/founder-bruce-tamiyasu.jpg";
import civicCenterImage from "@/assets/fresno-civic-center.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Valley Toner Supply, Fresno, CA" },
      { name: "description", content: "Meet Bruce Tamiyasu: 34 years in the printing industry, 22 as a print shop owner and 12 as a Clover Imaging Group distributor of remanufactured toner." },
      { property: "og:title", content: "About Valley Toner Supply" },
      { property: "og:description", content: "34 years in printing, and a mission to be the most eco-conscious toner provider around." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "34", label: "years in the printing industry" },
  { value: "22", label: "years as a print shop owner" },
  { value: "12", label: "years as a Clover Imaging Group distributor" },
  { value: "$2", label: "toward ocean cleanup with every online purchase" },
];

const journey = [
  { span: "22 years", title: "Print shop owner", body: "Running a print shop taught Bruce what matters most to customers: print quality you can count on, and service that shows up on time." },
  { span: "12 years", title: "Clover Imaging Group distributor", body: "Bruce has spent the last 12 years distributing remanufactured toner cartridges from Clover Imaging Group, produced in the most environmentally friendly way possible." },
  { span: "Today", title: "Valley Toner Supply", body: "Bringing those 34 years of experience to offices across Fresno and the Central Valley, with a mission to be the most eco-conscious toner provider around." },
];

const values = [
  { icon: Printer, title: "Print quality first", body: "Lessons from 22 years behind the counter of a print shop: if the output isn't right, nothing else matters." },
  { icon: Clock, title: "Timely, personal service", body: "When your printer runs dry, you need a real person who answers and gets you supplied fast." },
  { icon: Leaf, title: "Eco-conscious by design", body: "Every cartridge is remanufactured, giving it another working life instead of a spot in a landfill." },
  { icon: Waves, title: "Giving back to our oceans", body: "Every purchase helps support initiatives working to clean up our precious oceans." },
];

function AboutPage() {
  return (
    <main className="vts-page">
      <SiteNav />

      <header className="vts-about-hero">
        <div className="vts-about-hero-copy">
          <p className="vts-kicker"><span /> About Valley Toner Supply</p>
          <h1>34 years in printing.<br /><em>One mission: less waste.</em></h1>
          <p className="vts-lede">Valley Toner Supply is built on more than three decades of hands-on printing experience, and a commitment to giving every cartridge another life.</p>
          <div className="vts-actions"><Link className="vts-button vts-button-dark" to="/request-a-quote">Request a quote <ArrowRight size={18} /></Link><Link className="vts-button vts-button-light" to="/services">Explore our services</Link></div>
        </div>
        <figure className="vts-founder-photo">
          <img src={founderImage} alt="Bruce Tamiyasu, owner of Valley Toner Supply" width={1000} height={1000} />
          <figcaption><strong>Bruce Tamiyasu</strong><span>Owner, Valley Toner Supply</span></figcaption>
        </figure>
      </header>

      <section className="vts-about-stats" aria-label="Valley Toner Supply by the numbers">
        {stats.map((s) => <article key={s.label}><strong>{s.value}</strong><p>{s.label}</p></article>)}
      </section>

      <section className="vts-section vts-letter">
        <div className="vts-letter-head"><p className="vts-kicker"><span /> A note from Bruce</p><h2>I'd like to<br /><em>introduce myself.</em></h2></div>
        <div className="vts-letter-body">
          <p>I've been in the printing industry for over 34 years.</p>
          <p>My first 22 years were as a print shop owner, where I learned that print quality and timely customer service are the keys to success. For the last 12 years, I've had the privilege of being a distributor for Clover Imaging Group, providing remanufactured toner cartridges. I'm proud that every cartridge I provide is produced in the most environmentally friendly way possible.</p>
          <p>To help with my mission to be the most eco-conscious provider of toner cartridges around, we also contribute to helping clean our precious oceans with every purchase.</p>
          <p className="vts-signature"><strong>Bruce Tamiyasu</strong><span>Owner, Valley Toner Supply</span></p>
        </div>
      </section>

      <section className="vts-journey">
        <div className="vts-journey-inner">
          <p className="vts-kicker light"><span /> The journey</p>
          <h2>From the print shop floor<br /><em>to your front desk.</em></h2>
          <ol>{journey.map((step) => <li key={step.title}><span>{step.span}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
        </div>
      </section>

      <section className="vts-section">
        <div className="vts-section-head"><div><p className="vts-kicker"><span /> What we stand for</p><h2>The values behind<br /><em>every cartridge.</em></h2></div><p>Three decades in printing have shaped a simple way of doing business.</p></div>
        <div className="vts-values">{values.map(({ icon: Icon, ...v }) => <article key={v.title}><Icon size={24} /><h3>{v.title}</h3><p>{v.body}</p></article>)}</div>
      </section>

      <section className="vts-valley-band vts-about-band" style={{ backgroundImage: `url(${civicCenterImage})` }}>
        <div><p className="vts-kicker light"><span /> Proudly local</p><h2>Serving Fresno<br />and the Central Valley.</h2><p>We're your neighbors. When you call Valley Toner Supply, you reach someone who knows the Valley and cares about keeping it clean.</p><Link className="vts-button vts-button-white" to="/request-a-quote">Talk with us <ArrowRight size={18} /></Link></div>
      </section>

      <SiteFooter />
    </main>
  );
}
