import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Info,
  Minus,
  Plus,
  Printer,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
  Waves,
} from "lucide-react";
import { toast } from "sonner";
import logoUrl from "@/assets/valley-toner-supply-white-logo.png";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/order-portal-demo")({
  head: () => ({
    meta: [
      { title: "Order Portal Demo | Valley Toner Supply" },
      { name: "description", content: "A demo of the Valley Toner Supply business ordering portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPortalDemo,
});

type TonerColor = "black" | "cyan" | "magenta" | "yellow";

type Product = {
  id: string;
  sku: string;
  name: string;
  oemEquivalent: string;
  color: TonerColor;
  yieldPages: number;
  price: number;
  oemPrice: number;
  printers: string[];
  lastOrdered: string;
  usualQty: number;
};

// Mock signed-in customer and their contract-approved catalog.
const account = {
  company: "Harbor Point Dental Group",
  accountNumber: "VTS-10482",
  user: "Jordan Ellis",
  role: "Office Manager",
  shipTo: "1420 Harbor Point Blvd, Suite 300, Ventura, CA 93001",
  pricingTier: "Contract pricing · Tier 2",
};

const fleet = [
  { model: "HP LaserJet Pro M402dn", location: "Front desk" },
  { model: "HP Color LaserJet Pro M479fdw", location: "Billing office" },
  { model: "Brother HL-L2350DW", location: "Operatories 1–4" },
  { model: "Lexmark MS521dn", location: "Records room" },
];

const products: Product[] = [
  { id: "hp-26x", sku: "VTS-CF226X-R", name: "HP 26X High Yield Black", oemEquivalent: "CF226X", color: "black", yieldPages: 9000, price: 89.95, oemPrice: 189.99, printers: ["HP LaserJet Pro M402dn"], lastOrdered: "Aug 14", usualQty: 4 },
  { id: "hp-26a", sku: "VTS-CF226A-R", name: "HP 26A Standard Black", oemEquivalent: "CF226A", color: "black", yieldPages: 3100, price: 54.95, oemPrice: 119.99, printers: ["HP LaserJet Pro M402dn"], lastOrdered: "Jun 02", usualQty: 2 },
  { id: "hp-414x-k", sku: "VTS-W2020X-R", name: "HP 414X High Yield Black", oemEquivalent: "W2020X", color: "black", yieldPages: 7500, price: 99.95, oemPrice: 213.99, printers: ["HP Color LaserJet Pro M479fdw"], lastOrdered: "Sep 03", usualQty: 2 },
  { id: "hp-414x-c", sku: "VTS-W2021X-R", name: "HP 414X High Yield Cyan", oemEquivalent: "W2021X", color: "cyan", yieldPages: 6000, price: 119.95, oemPrice: 263.99, printers: ["HP Color LaserJet Pro M479fdw"], lastOrdered: "Jul 22", usualQty: 1 },
  { id: "hp-414x-m", sku: "VTS-W2023X-R", name: "HP 414X High Yield Magenta", oemEquivalent: "W2023X", color: "magenta", yieldPages: 6000, price: 119.95, oemPrice: 263.99, printers: ["HP Color LaserJet Pro M479fdw"], lastOrdered: "Jul 22", usualQty: 1 },
  { id: "hp-414x-y", sku: "VTS-W2022X-R", name: "HP 414X High Yield Yellow", oemEquivalent: "W2022X", color: "yellow", yieldPages: 6000, price: 119.95, oemPrice: 263.99, printers: ["HP Color LaserJet Pro M479fdw"], lastOrdered: "Jul 22", usualQty: 1 },
  { id: "tn-760", sku: "VTS-TN760-R", name: "Brother TN-760 High Yield Black", oemEquivalent: "TN-760", color: "black", yieldPages: 3000, price: 39.95, oemPrice: 84.99, printers: ["Brother HL-L2350DW"], lastOrdered: "Sep 10", usualQty: 6 },
  { id: "lx-56f1h", sku: "VTS-56F1H00-R", name: "Lexmark 56F1H00 High Yield Black", oemEquivalent: "56F1H00", color: "black", yieldPages: 15000, price: 139.95, oemPrice: 305.99, printers: ["Lexmark MS521dn"], lastOrdered: "May 19", usualQty: 1 },
];

const swatch: Record<TonerColor, string> = {
  black: "bg-[var(--vts-ink)]",
  cyan: "bg-[var(--vts-cyan)]",
  magenta: "bg-[var(--vts-magenta)]",
  yellow: "bg-[var(--vts-yellow)]",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const pages = new Intl.NumberFormat("en-US");

function savingsPct(p: Product) {
  return Math.round((1 - p.price / p.oemPrice) * 100);
}

function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex h-10 items-center rounded-md border border-[var(--vts-line)] bg-white">
      <button type="button" aria-label={`Decrease ${label} quantity`} className="flex h-full w-9 items-center justify-center text-[var(--vts-copy)] hover:text-[var(--vts-ink)] disabled:opacity-40" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Minus size={15} />
      </button>
      <input
        aria-label={`${label} quantity`}
        inputMode="numeric"
        className="h-full w-10 border-x border-[var(--vts-line)] text-center text-sm font-bold tabular-nums outline-none"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
          onChange(Number.isNaN(n) ? 1 : Math.min(Math.max(n, 1), 99));
        }}
      />
      <button type="button" aria-label={`Increase ${label} quantity`} className="flex h-full w-9 items-center justify-center text-[var(--vts-copy)] hover:text-[var(--vts-ink)] disabled:opacity-40" disabled={value >= 99} onClick={() => onChange(value + 1)}>
        <Plus size={15} />
      </button>
    </div>
  );
}

function ProductCard({ product, inCart, onAdd }: { product: Product; inCart: number; onAdd: (qty: number) => void }) {
  const [qty, setQty] = useState(product.usualQty);
  const [justAdded, setJustAdded] = useState(false);

  return (
    <article className="flex flex-col rounded-lg border border-[var(--vts-line)] bg-white p-5 transition-shadow hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--vts-ink)_8%,transparent)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ring-1 ring-black/10 ${swatch[product.color]}`} aria-hidden="true" />
          <span className="text-[11px] font-extrabold uppercase tracking-[.12em] text-[var(--vts-copy)]">{product.sku}</span>
        </div>
        <span className="rounded-full bg-[color-mix(in_oklab,var(--vts-cyan)_16%,white)] px-2.5 py-1 text-[11px] font-extrabold text-[oklch(.42_.1_225)]">
          Save {savingsPct(product)}%
        </span>
      </div>

      <h3 className="mt-4 [font-family:Sora,sans-serif] text-[17px] font-bold leading-snug">{product.name}</h3>
      <p className="mt-1 text-xs text-[var(--vts-copy)]">Remanufactured · replaces OEM {product.oemEquivalent}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-[var(--vts-line)] py-3 text-xs">
        <div>
          <dt className="text-[var(--vts-copy)]">Page yield</dt>
          <dd className="mt-0.5 font-bold">{pages.format(product.yieldPages)} pages</dd>
        </div>
        <div>
          <dt className="text-[var(--vts-copy)]">Last ordered</dt>
          <dd className="mt-0.5 font-bold">{product.lastOrdered} · qty {product.usualQty}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--vts-copy)]">Fits your</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 font-bold"><Printer size={13} className="shrink-0 text-[var(--vts-copy)]" />{product.printers.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="[font-family:Sora,sans-serif] text-2xl font-extrabold tabular-nums">{currency.format(product.price)}</div>
          <div className="text-xs text-[var(--vts-copy)]">
            <span className="line-through">{currency.format(product.oemPrice)}</span> OEM list
          </div>
        </div>
        {inCart > 0 && <span className="flex items-center gap-1 text-xs font-bold text-[oklch(.5_.13_160)]"><Check size={14} /> {inCart} in cart</span>}
      </div>

      <div className="mt-4 flex gap-2">
        <QtyStepper value={qty} onChange={setQty} label={product.name} />
        <button
          type="button"
          onClick={() => {
            onAdd(qty);
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 1400);
          }}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[var(--vts-ink)] px-4 text-[13px] font-extrabold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {justAdded ? <><Check size={16} /> Added</> : <><ShoppingCart size={16} /> Add to cart</>}
        </button>
      </div>
    </article>
  );
}

function OrderPortalDemo() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [printerFilter, setPrinterFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (printerFilter !== "all" && !p.printers.includes(printerFilter)) return false;
      if (!q) return true;
      return [p.name, p.sku, p.oemEquivalent, ...p.printers].some((s) => s.toLowerCase().includes(q));
    });
  }, [printerFilter, query]);

  const lines = products.flatMap((p) => (cart[p.id] ? [{ product: p, qty: cart[p.id]! }] : []));
  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  const oemTotal = lines.reduce((n, l) => n + l.qty * l.product.oemPrice, 0);

  function addToCart(product: Product, qty: number) {
    setCart((c) => ({ ...c, [product.id]: Math.min((c[product.id] ?? 0) + qty, 99) }));
    toast.success(`Added ${qty} × ${product.name}`, {
      description: `${currency.format(product.price * qty)} at your contract price`,
      action: { label: "View cart", onClick: () => setCartOpen(true) },
    });
  }

  function setLineQty(id: string, qty: number) {
    setCart((c) => ({ ...c, [id]: qty }));
  }

  function removeLine(id: string) {
    setCart(({ [id]: _removed, ...rest }) => rest);
  }

  const initials = account.user.split(" ").map((s) => s[0]).join("");

  return (
    <div className="min-h-screen bg-[var(--vts-soft)] [font-family:Manrope,sans-serif] text-[var(--vts-ink)]">
      <Toaster position="bottom-right" />

      <div className="bg-[var(--vts-yellow)] px-4 py-2 text-center text-xs font-semibold text-[var(--vts-ink)]">
        <Info size={13} className="mr-1.5 inline -translate-y-px" />
        Demo mode. This portal uses sample account data, and no orders are placed.
      </div>

      <header className="sticky top-0 z-40 bg-[var(--vts-ink)] text-white">
        <div className="relative mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8">
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--vts-yellow)_0_33.3%,var(--vts-cyan)_33.3%_66.6%,var(--vts-magenta)_66.6%)]" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Valley Toner Supply home">
              <img src={logoUrl} alt="Valley Toner Supply" width={276} height={73} className="h-auto w-[140px] sm:w-[165px]" />
            </Link>
            <span className="hidden border-l border-white/20 pl-4 text-xs font-extrabold uppercase tracking-[.14em] text-white/60 md:inline">Business Portal</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right leading-tight">
                <div className="text-[13px] font-bold">{account.user}</div>
                <div className="text-[11px] text-white/60">{account.company}</div>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vts-cyan)] text-xs font-extrabold text-[var(--vts-ink)]">{initials}</span>
              <ChevronDown size={15} className="text-white/60" />
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-extrabold text-[var(--vts-ink)] hover:bg-white/90"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart size={17} />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--vts-magenta)] px-1.5 text-[11px] text-white tabular-nums">{itemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-4 py-8 sm:px-8 sm:py-10">
        <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[var(--vts-copy)]">Welcome back, {account.user.split(" ")[0]}</p>
            <h1 className="mt-2 [font-family:Sora,sans-serif] text-3xl font-extrabold leading-tight sm:text-4xl">Your approved supplies</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--vts-copy)]">
              This catalog is curated for {account.company}'s printers, at your contract pricing. Usual quantities come from your order history.
            </p>
          </div>
          <div className="grid gap-2 rounded-lg border border-[var(--vts-line)] bg-white p-4 text-xs sm:grid-cols-3 sm:gap-6">
            <div className="flex gap-2"><Building2 size={15} className="mt-0.5 shrink-0 text-[var(--vts-copy)]" /><div><div className="text-[var(--vts-copy)]">Account</div><div className="font-bold">{account.accountNumber}</div></div></div>
            <div className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-[var(--vts-copy)]" /><div><div className="text-[var(--vts-copy)]">Pricing</div><div className="font-bold">{account.pricingTier}</div></div></div>
            <div className="flex gap-2"><Truck size={15} className="mt-0.5 shrink-0 text-[var(--vts-copy)]" /><div><div className="text-[var(--vts-copy)]">Ships to</div><div className="font-bold">Ventura, CA</div></div></div>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by printer">
            {[{ model: "all", location: `${products.length} items` }, ...fleet].map((f) => {
              const active = printerFilter === f.model;
              return (
                <button
                  key={f.model}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPrinterFilter(f.model)}
                  className={`shrink-0 rounded-md border px-3.5 py-2 text-left transition-colors ${active ? "border-[var(--vts-ink)] bg-[var(--vts-ink)] text-white" : "border-[var(--vts-line)] bg-white hover:border-[var(--vts-copy)]"}`}
                >
                  <div className="text-[13px] font-bold">{f.model === "all" ? "All printers" : f.model}</div>
                  <div className={`text-[11px] ${active ? "text-white/70" : "text-[var(--vts-copy)]"}`}>{f.location}</div>
                </button>
              );
            })}
          </div>
          <label className="relative block lg:w-72">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--vts-copy)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SKU, OEM #, or printer"
              className="h-11 w-full rounded-md border border-[var(--vts-line)] bg-white pl-9 pr-3 text-sm outline-none focus:border-[var(--vts-cyan)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--vts-cyan)_30%,transparent)]"
            />
          </label>
        </section>

        {visible.length > 0 ? (
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Products">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} inCart={cart[p.id] ?? 0} onAdd={(qty) => addToCart(p, qty)} />
            ))}
          </section>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-[var(--vts-line)] bg-white px-6 py-14 text-center">
            <p className="font-bold">No supplies match "{query}"</p>
            <p className="mt-1 text-sm text-[var(--vts-copy)]">Try a different SKU or printer model, or contact your account rep to add an item.</p>
          </div>
        )}

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[var(--vts-copy)]">
          <Waves size={14} className="text-[var(--vts-cyan)]" /> $2 from every online order goes toward ocean-cleanup initiatives.
        </p>
      </main>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col gap-0 p-0 [font-family:Manrope,sans-serif] sm:max-w-md">
          <SheetHeader className="border-b border-[var(--vts-line)] px-6 py-5 text-left">
            <SheetTitle className="[font-family:Sora,sans-serif] text-xl">Your cart</SheetTitle>
            <SheetDescription className="text-xs">
              {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "cartridge" : "cartridges"} · ${account.company}` : "Nothing in your cart yet"}
            </SheetDescription>
          </SheetHeader>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <ShoppingCart size={32} className="text-[var(--vts-line)]" />
              <p className="mt-3 text-sm text-[var(--vts-copy)]">Add supplies from your approved list to get started.</p>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-[var(--vts-line)] overflow-y-auto px-6">
                {lines.map(({ product, qty }) => (
                  <li key={product.id} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-2.5">
                        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10 ${swatch[product.color]}`} aria-hidden="true" />
                        <div>
                          <div className="text-sm font-bold leading-snug">{product.name}</div>
                          <div className="text-[11px] text-[var(--vts-copy)]">{product.sku} · {currency.format(product.price)} ea</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold tabular-nums">{currency.format(product.price * qty)}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between pl-5">
                      <QtyStepper value={qty} onChange={(n) => setLineQty(product.id, n)} label={product.name} />
                      <button type="button" onClick={() => removeLine(product.id)} className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--vts-copy)] hover:text-[var(--vts-magenta)]">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-[var(--vts-line)] bg-[var(--vts-soft)] px-6 py-5">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-[var(--vts-copy)]">OEM list total</dt><dd className="tabular-nums text-[var(--vts-copy)] line-through">{currency.format(oemTotal)}</dd></div>
                  <div className="flex justify-between font-bold text-[oklch(.5_.13_160)]"><dt>Your savings</dt><dd className="tabular-nums">−{currency.format(oemTotal - subtotal)}</dd></div>
                  <div className="flex justify-between border-t border-[var(--vts-line)] pt-2 text-base font-extrabold"><dt>Subtotal</dt><dd className="tabular-nums">{currency.format(subtotal)}</dd></div>
                </dl>
                <p className="mt-1 text-[11px] text-[var(--vts-copy)]">Shipping and tax are calculated at checkout.</p>
                <button type="button" disabled className="mt-4 h-11 w-full cursor-not-allowed rounded-md bg-[var(--vts-ink)] text-sm font-extrabold text-white opacity-50">
                  Checkout
                </button>
                <p className="mt-2 text-center text-[11px] text-[var(--vts-copy)]">Checkout isn't available in this demo.</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
