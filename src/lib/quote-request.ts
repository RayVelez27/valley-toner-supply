import { z } from "zod";

export const serviceAreaOptions = ["Fresno", "Clovis", "Madera", "Sanger", "Selma", "Reedley", "Kerman", "Fowler", "Kingsburg", "Visalia", "Other"] as const;
export const printerCountOptions = ["1–5", "6–15", "16–50", "50+"] as const;
export const monthlySpendOptions = ["Under $250", "$250–$500", "$500–$1,000", "$1,000–$2,500", "$2,500+", "Not sure"] as const;
export const interestOptions = ["Remanufactured toner", "Remanufactured ink", "Business ordering portal", "Cartridge recycling"] as const;
export const contactMethodOptions = ["Email", "Phone"] as const;

export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export const quoteRequestSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name."),
    company: z.string().trim().min(2, "Enter your business or organization name."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number."),
    city: z.enum(serviceAreaOptions, { errorMap: () => ({ message: "Choose your city." }) }),
    printerCount: z.enum(printerCountOptions, { errorMap: () => ({ message: "Choose how many printers you have." }) }),
    monthlySpend: z.enum(monthlySpendOptions, { errorMap: () => ({ message: "Choose your typical monthly spend." }) }),
    printers: z.string().trim().min(3, "List at least one printer model or cartridge number.").max(4000),
    interests: z.array(z.enum(interestOptions)).min(1, "Choose at least one."),
    contactMethod: z.enum(contactMethodOptions),
    notes: z.string().trim().max(4000).optional().default(""),
  })
  .refine((data) => data.contactMethod !== "Phone" || data.phone !== "", { path: ["phone"], message: "Add a phone number so we can call you." });

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type QuoteRequestErrors = Partial<Record<keyof QuoteRequest | "photos", string>>;

export function readQuoteRequest(form: FormData) {
  const text = (key: string) => (form.get(key) ?? "").toString();
  return quoteRequestSchema.safeParse({
    name: text("name"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    city: text("city"),
    printerCount: text("printerCount"),
    monthlySpend: text("monthlySpend"),
    printers: text("printers"),
    interests: form.getAll("interests").map(String),
    contactMethod: text("contactMethod") || "Email",
    notes: text("notes"),
  });
}

export function readPhotos(form: FormData) {
  return form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
}

export function validatePhotos(photos: File[]) {
  if (photos.length > MAX_PHOTOS) return `Attach up to ${MAX_PHOTOS} photos.`;
  if (photos.some((p) => !p.type.startsWith("image/"))) return "Photos must be image files.";
  if (photos.some((p) => p.size > MAX_PHOTO_BYTES)) return "Each photo must be 8 MB or smaller.";
  return undefined;
}

export function errorsFrom(error: z.ZodError): QuoteRequestErrors {
  const errors: QuoteRequestErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof QuoteRequestErrors;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
