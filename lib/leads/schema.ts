/**
 * Form definitions and validation, shared by the browser and the API route
 * so both sides enforce the same rules.
 */
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export const leadTypes = ["inquiry", "request", "sell"] as const;
export type LeadType = (typeof leadTypes)[number];

type FieldKey = keyof Dictionary["forms"]["fields"];
type PlaceholderKey = keyof Dictionary["forms"]["placeholders"];
type OptionSet = "contact" | "conditionPref" | "sellCondition";
export type ErrorCode = keyof Dictionary["forms"]["errors"];

export type FieldDef = {
  name: FieldKey;
  kind: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "zip";
  required?: boolean;
  maxLength: number;
  options?: { set: OptionSet; values: readonly string[] };
  autoComplete?: string;
  placeholder?: PlaceholderKey;
  /** Half width on larger screens */
  half?: boolean;
};

const contactFields: FieldDef[] = [
  { name: "name", kind: "text", required: true, maxLength: 100, autoComplete: "name", half: true },
  { name: "business", kind: "text", maxLength: 150, autoComplete: "organization", half: true },
  { name: "phone", kind: "tel", maxLength: 30, autoComplete: "tel", half: true },
  { name: "email", kind: "email", maxLength: 200, autoComplete: "email", half: true },
];

export const leadForms: Record<LeadType, FieldDef[]> = {
  inquiry: [
    ...contactFields,
    { name: "equipment", kind: "text", required: true, maxLength: 200, placeholder: "equipment" },
    {
      name: "preferredContact",
      kind: "radio",
      maxLength: 10,
      options: { set: "contact", values: ["phone", "text", "email"] },
    },
    { name: "message", kind: "textarea", maxLength: 3000, placeholder: "message" },
  ],
  request: [
    ...contactFields,
    { name: "equipmentType", kind: "text", required: true, maxLength: 200, placeholder: "equipmentType" },
    { name: "preferredBrand", kind: "text", maxLength: 100, half: true },
    { name: "model", kind: "text", maxLength: 100, half: true },
    {
      name: "conditionPref",
      kind: "radio",
      maxLength: 10,
      options: { set: "conditionPref", values: ["new", "used", "either"] },
    },
    { name: "budget", kind: "text", maxLength: 50, placeholder: "budget", half: true },
    { name: "neededBy", kind: "text", maxLength: 100, placeholder: "neededBy", half: true },
    { name: "deliveryZip", kind: "zip", maxLength: 10, autoComplete: "postal-code", half: true },
    { name: "details", kind: "textarea", maxLength: 3000, placeholder: "details" },
  ],
  sell: [
    ...contactFields,
    { name: "equipmentType", kind: "text", required: true, maxLength: 200, placeholder: "equipmentType" },
    { name: "brand", kind: "text", maxLength: 100, half: true },
    { name: "model", kind: "text", maxLength: 100, half: true },
    { name: "age", kind: "text", maxLength: 50, placeholder: "age", half: true },
    {
      name: "condition",
      kind: "select",
      maxLength: 20,
      half: true,
      options: { set: "sellCondition", values: ["working", "needs-repair", "not-sure"] },
    },
    { name: "askingPrice", kind: "text", maxLength: 50, placeholder: "askingPrice", half: true },
    { name: "location", kind: "text", maxLength: 200, placeholder: "location", half: true },
    { name: "description", kind: "textarea", maxLength: 3000, placeholder: "description" },
  ],
};

/** Context sent with every lead (not typed by the customer). */
export type LeadMeta = {
  itemId?: string;
  itemTitle?: string;
  itemSku?: string;
  pagePath?: string;
  lang?: string;
};

export type LeadPayload = {
  type: LeadType;
  fields: Record<string, string>;
  meta: LeadMeta;
  /** Spam protection */
  startedAt: number;
  hp: string;
  turnstileToken?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function phoneDigits(value: string) {
  const d = value.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

export function validateLead(type: LeadType, input: Record<string, unknown>) {
  const defs = leadForms[type];
  const values: Record<string, string> = {};
  const errors: Partial<Record<string, ErrorCode>> = {};

  for (const def of defs) {
    const raw = input[def.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    values[def.name] = value;

    if (!value) {
      if (def.required) errors[def.name] = "required";
      continue;
    }
    if (value.length > def.maxLength) {
      errors[def.name] = "tooLong";
      continue;
    }
    if (def.kind === "email" && !EMAIL_RE.test(value)) errors[def.name] = "email";
    if (def.kind === "tel" && phoneDigits(value).length !== 10) errors[def.name] = "phone";
    if (def.kind === "zip" && !/^\d{5}(-\d{4})?$/.test(value)) errors[def.name] = "zip";
    if (def.options && !def.options.values.includes(value)) errors[def.name] = "invalid";
  }

  // We need at least one way to reach the customer.
  if (!values.phone && !values.email) {
    errors.phone ??= "contact";
    errors.email ??= "contact";
  }

  return { values, errors, valid: Object.keys(errors).length === 0 };
}
