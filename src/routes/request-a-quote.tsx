import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, ClipboardList, Clock, LoaderCircle, MapPin, ShieldCheck, X } from "lucide-react";
import logoUrl from "@/assets/valley-toner-supply-white-logo.png";
import skylineImage from "@/assets/fresno-skyline.jpg";
import {
  contactMethodOptions,
  errorsFrom,
  interestOptions,
  MAX_PHOTOS,
  monthlySpendOptions,
  printerCountOptions,
  readPhotos,
  readQuoteRequest,
  serviceAreaOptions,
  validatePhotos,
  type QuoteRequestErrors,
} from "@/lib/quote-request";

const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Expected form data.");
    return data;
  })
  .handler(async ({ data }) => {
    const parsed = readQuoteRequest(data);
    const photos = readPhotos(data);
    const photoError = validatePhotos(photos);
    if (!parsed.success || photoError) {
      return { ok: false as const, errors: { ...(parsed.success ? {} : errorsFrom(parsed.error)), ...(photoError ? { photos: photoError } : {}) } };
    }
    // TODO: deliver the request — e.g. email it to the sales inbox or create a lead in your CRM.
    console.info("[quote-request]", { ...parsed.data, photos: photos.map((p) => `${p.name} (${Math.round(p.size / 1024)} KB)`) });
    return { ok: true as const, firstName: parsed.data.name.split(" ")[0] ?? parsed.data.name };
  });

export const Route = createFileRoute("/request-a-quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote | Valley Toner Supply" },
      { name: "description", content: "Request a business quote for remanufactured toner and ink. Serving Fresno, Clovis, and the Central Valley." },
      { property: "og:title", content: "Request a Quote | Valley Toner Supply" },
      { property: "og:description", content: "Send us your printer models and get a lower-cost, lower-waste supply plan for your business." },
    ],
  }),
  component: RequestQuotePage,
});

const nextSteps = [
  { icon: ClipboardList, title: "We review your printers", body: "We match every model or cartridge number to a remanufactured option." },
  { icon: Clock, title: "You get a side-by-side quote", body: "Your price next to what you pay today, usually within one business day." },
  { icon: ShieldCheck, title: "You decide, no pressure", body: "Every cartridge is backed by our 100% performance guarantee." },
];

const fieldOrder: (keyof QuoteRequestErrors)[] = ["name", "company", "email", "phone", "city", "printers", "printerCount", "monthlySpend", "photos", "interests"];

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  return message ? <p className="vts-field-error" id={id} role="alert">{message}</p> : null;
}

function RequestQuotePage() {
  const [errors, setErrors] = useState<QuoteRequestErrors>({});
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [firstName, setFirstName] = useState("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const invalid = (key: keyof QuoteRequestErrors) => (errors[key] ? { "aria-invalid": true, "aria-describedby": `${key}-error` } : {});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = readQuoteRequest(data);
    const photoError = validatePhotos(readPhotos(data));
    const nextErrors = { ...(parsed.success ? {} : errorsFrom(parsed.error)), ...(photoError ? { photos: photoError } : {}) };
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = fieldOrder.find((key) => key in nextErrors);
      if (firstInvalid) form.querySelector<HTMLElement>(firstInvalid === "interests" ? "input[name=interests]" : `#${firstInvalid}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const result = await submitQuoteRequest({ data });
      if (!result.ok) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }
      setFirstName(result.firstName);
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("failed");
    }
  }

  return (
    <main className="vts-page vts-quote-page">
      <nav className="vts-nav" aria-label="Main navigation">
        <Link to="/" aria-label="Valley Toner Supply home"><img className="vts-logo vts-logo-small" src={logoUrl} alt="Valley Toner Supply" width={276} height={73} /></Link>
        <Link className="vts-quote-back" to="/"><ArrowLeft size={16} /> Back to home</Link>
      </nav>

      <div className="vts-quote-layout">
        <aside className="vts-quote-aside">
          <p className="vts-kicker light"><span /> Request a quote</p>
          <h1>Let's lower what<br /><em>you pay to print.</em></h1>
          <p>Tell us what your office prints with. We'll come back with a side-by-side quote showing what you'd save with guaranteed remanufactured toner and ink.</p>
          <ol className="vts-quote-steps">{nextSteps.map(({ icon: Icon, ...step }) => <li key={step.title}><Icon size={20} /><div><h2>{step.title}</h2><p>{step.body}</p></div></li>)}</ol>
          <figure className="vts-quote-photo"><img src={skylineImage} alt="Downtown Fresno skyline at dusk" width={800} height={800} /><figcaption><MapPin size={14} /> Serving Fresno &amp; the Central Valley</figcaption></figure>
        </aside>

        <section className="vts-quote-main">
          {status === "sent" ? (
            <div className="vts-quote-success" role="status">
              <CheckCircle2 size={44} />
              <h2>Thanks, {firstName}. Your request is in.</h2>
              <p>We'll review your printers and get back to you with a quote, usually within one business day.</p>
              <div className="vts-actions"><Link className="vts-button vts-button-dark" to="/">Back to home <ArrowRight size={18} /></Link><Link className="vts-button vts-button-light" to="/order-portal-demo">Try the portal demo</Link></div>
            </div>
          ) : (
            <form className="vts-quote-form" method="post" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend><span>01</span> About you</legend>
                <div className="vts-field-grid">
                  <div className="vts-field"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" {...invalid("name")} /><FieldError id="name-error" message={errors.name} /></div>
                  <div className="vts-field"><label htmlFor="company">Business name</label><input id="company" name="company" autoComplete="organization" {...invalid("company")} /><FieldError id="company-error" message={errors.company} /></div>
                  <div className="vts-field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" {...invalid("email")} /><FieldError id="email-error" message={errors.email} /></div>
                  <div className="vts-field"><label htmlFor="phone">Phone <small>Optional</small></label><input id="phone" name="phone" type="tel" autoComplete="tel" {...invalid("phone")} /><FieldError id="phone-error" message={errors.phone} /></div>
                  <div className="vts-field"><label htmlFor="city">City</label><select id="city" name="city" defaultValue="" {...invalid("city")}><option value="" disabled>Choose a city</option>{serviceAreaOptions.map((o) => <option key={o}>{o}</option>)}</select><FieldError id="city-error" message={errors.city} /></div>
                  <div className="vts-field"><span className="vts-field-label" id="contact-label">Best way to reach you</span><div className="vts-segmented" role="radiogroup" aria-labelledby="contact-label">{contactMethodOptions.map((o) => <label key={o}><input type="radio" name="contactMethod" value={o} defaultChecked={o === "Email"} /><span>{o}</span></label>)}</div></div>
                </div>
              </fieldset>

              <fieldset>
                <legend><span>02</span> Your printers</legend>
                <div className="vts-field"><label htmlFor="printers">Printer models or cartridge numbers</label><textarea id="printers" name="printers" rows={4} placeholder={"e.g. HP LaserJet Pro M404n (2), Brother HL-L2350DW\nor cartridge numbers like CF258A, TN-760"} {...invalid("printers")} /><FieldError id="printers-error" message={errors.printers} /></div>
                <div className="vts-field-grid">
                  <div className="vts-field"><label htmlFor="printerCount">Number of printers</label><select id="printerCount" name="printerCount" defaultValue="" {...invalid("printerCount")}><option value="" disabled>Choose a range</option>{printerCountOptions.map((o) => <option key={o}>{o}</option>)}</select><FieldError id="printerCount-error" message={errors.printerCount} /></div>
                  <div className="vts-field"><label htmlFor="monthlySpend">Monthly toner &amp; ink spend</label><select id="monthlySpend" name="monthlySpend" defaultValue="" {...invalid("monthlySpend")}><option value="" disabled>Choose a range</option>{monthlySpendOptions.map((o) => <option key={o}>{o}</option>)}</select><FieldError id="monthlySpend-error" message={errors.monthlySpend} /></div>
                </div>
                <div className="vts-field">
                  <label htmlFor="photos">Photos of model labels <small>Optional</small></label>
                  <label className="vts-dropzone" {...invalid("photos")}>
                    <input id="photos" name="photos" type="file" accept="image/*" multiple onChange={(e) => setPhotoNames(Array.from(e.target.files ?? []).map((f) => f.name))} />
                    <Camera size={22} />
                    <span><strong>Add photos</strong> of the label on each printer or cartridge. Up to {MAX_PHOTOS} images, 8 MB each.</span>
                  </label>
                  {photoNames.length > 0 && <ul className="vts-photo-list">{photoNames.map((n) => <li key={n}>{n}</li>)}</ul>}
                  <FieldError id="photos-error" message={errors.photos} />
                </div>
              </fieldset>

              <fieldset>
                <legend><span>03</span> What you need</legend>
                <div className="vts-checks" role="group" aria-label="What you're interested in" {...invalid("interests")}>{interestOptions.map((o) => <label key={o}><input type="checkbox" name="interests" value={o} defaultChecked={o === "Remanufactured toner"} /><span>{o}</span></label>)}</div>
                <FieldError id="interests-error" message={errors.interests} />
                <div className="vts-field"><label htmlFor="notes">Anything else? <small>Optional</small></label><textarea id="notes" name="notes" rows={3} placeholder="Delivery locations, current supplier, timing…" /></div>
              </fieldset>

              {status === "failed" && <p className="vts-form-alert" role="alert"><X size={18} /> Something went wrong sending your request. Please try again.</p>}
              <div className="vts-form-submit">
                <button className="vts-button vts-button-dark" type="submit" disabled={!hydrated || status === "sending"}>{status === "sending" ? <><LoaderCircle size={18} className="vts-spin" /> Sending…</> : <>Send my quote request <ArrowRight size={18} /></>}</button>
                <p>We'll only use your details to prepare your quote.</p>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
