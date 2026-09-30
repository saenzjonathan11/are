"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import type { Dictionary } from "@/lib/i18n";
import { leadForms, validateLead, type ErrorCode, type FieldDef, type LeadMeta, type LeadType } from "@/lib/leads/schema";
import { cn, fmt } from "@/lib/utils";
import { button } from "@/components/ui/button";
import { Turnstile } from "./Turnstile";

const submitEvents: Record<LeadType, AnalyticsEvent> = {
  inquiry: "submit_quote_request",
  request: "submit_equipment_request",
  sell: "submit_sell_equipment",
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; delivered: boolean }
  | { state: "error"; message: "validation" | "network" };

export function LeadForm({
  type,
  t,
  lang,
  meta,
  initialValues,
  contact,
  turnstileSiteKey,
  compact = false,
}: {
  type: LeadType;
  t: Dictionary["forms"];
  lang: string;
  meta?: LeadMeta;
  initialValues?: Record<string, string>;
  contact: { phone: string; email: string };
  turnstileSiteKey?: string | null;
  /** Single column, for narrow sidebars */
  compact?: boolean;
}) {
  const fields = leadForms[type];
  const formId = useId();
  const id = (name: string) => `${formId}-${name}`;

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, initialValues?.[f.name] ?? ""])),
  );
  const [errors, setErrors] = useState<Partial<Record<string, ErrorCode>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [hp, setHp] = useState("");
  const [token, setToken] = useState("");
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onToken = useCallback((tk: string) => setToken(tk), []);

  function set(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || errors[name]) setErrors(validateLead(type, next).errors);
  }

  function blur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (values[name]) setErrors(validateLead(type, values).errors);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const check = validateLead(type, values);
    setErrors(check.errors);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
    if (!check.valid) {
      setStatus({ state: "error", message: "validation" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          fields: check.values,
          meta: { ...meta, pagePath: window.location.pathname, lang },
          startedAt: startedAt.current,
          hp,
          turnstileToken: token || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        delivered?: boolean;
        errors?: Partial<Record<string, ErrorCode>>;
      };
      if (res.ok && data.ok) {
        track(submitEvents[type], { item_id: meta?.itemId, delivered: Boolean(data.delivered) });
        setStatus({ state: "success", delivered: Boolean(data.delivered) });
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ state: "error", message: data.errors ? "validation" : "network" });
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus({ state: "error", message: "network" });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status.state === "success") {
    const delivered = status.delivered;
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-[3px] border-l-4 p-5", delivered ? "border-ok bg-ok/10" : "border-warn bg-warn/10")}
      >
        <div className="flex items-start gap-3">
          {delivered ? (
            <CheckCircle2 aria-hidden className="mt-1 size-6 shrink-0 text-ok" />
          ) : (
            <Info aria-hidden className="mt-1 size-6 shrink-0 text-warn" />
          )}
          <div>
            <h3 className="text-2xl">{delivered ? t.successHeading : t.previewHeading}</h3>
            <p className="mt-1">
              {delivered
                ? fmt(t.successBody, { phone: contact.phone })
                : fmt(t.previewBody, { phone: contact.phone, email: contact.email })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, code]) => code) as [string, ErrorCode][];
  const labelFor = (name: string) => t.fields[name as keyof typeof t.fields] ?? name;

  function renderField(f: FieldDef) {
    const err = touched[f.name] ? errors[f.name] : undefined;
    const errId = `${id(f.name)}-err`;
    const common = {
      id: id(f.name),
      name: f.name,
      value: values[f.name],
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? errId : undefined,
      required: f.required,
      className: cn(
        "w-full rounded-[3px] border bg-paper px-3 text-ink",
        err ? "border-bad border-2" : "border-steel/60",
      ),
    };
    const label = (
      <span className="mb-1.5 block font-semibold">
        {t.fields[f.name]}
        {f.kind === "tel" || f.kind === "email" ? null : f.required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-steel"> ({t.optional})</span>
        )}
      </span>
    );
    const error = err && (
      <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-[0.95rem] font-semibold text-bad">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {t.errors[err]}
      </p>
    );
    const wrap = cn(!compact && (f.half ? "sm:col-span-1" : "sm:col-span-2"));

    if (f.kind === "radio" && f.options) {
      const set_ = f.options.set;
      const opts = t.options[set_] as Record<string, string>;
      return (
        <fieldset key={f.name} className={wrap} aria-describedby={err ? errId : undefined}>
          <legend className="mb-1.5 font-semibold">
            {t.fields[f.name]} <span className="font-normal text-steel">({t.optional})</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {f.options.values.map((v) => (
              <label
                key={v}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-2 rounded-[3px] border px-3",
                  values[f.name] === v ? "border-ink bg-concrete" : "border-steel/40",
                )}
              >
                <input
                  type="radio"
                  name={f.name}
                  value={v}
                  checked={values[f.name] === v}
                  onChange={() => set(f.name, v)}
                  className="size-4 accent-[var(--brand-accent)]"
                />
                {opts[v]}
              </label>
            ))}
          </div>
          {error}
        </fieldset>
      );
    }

    if (f.kind === "select" && f.options) {
      const opts = t.options[f.options.set] as Record<string, string>;
      return (
        <div key={f.name} className={wrap}>
          <label htmlFor={id(f.name)}>{label}</label>
          <select {...common} onChange={(e) => set(f.name, e.target.value)} onBlur={() => blur(f.name)} className={cn(common.className, "min-h-12")}>
            <option value="">{t.choose}</option>
            {f.options.values.map((v) => (
              <option key={v} value={v}>
                {opts[v]}
              </option>
            ))}
          </select>
          {error}
        </div>
      );
    }

    if (f.kind === "textarea") {
      return (
        <div key={f.name} className={wrap}>
          <label htmlFor={id(f.name)}>{label}</label>
          <textarea
            {...common}
            rows={4}
            maxLength={f.maxLength}
            placeholder={f.placeholder ? t.placeholders[f.placeholder] : undefined}
            onChange={(e) => set(f.name, e.target.value)}
            onBlur={() => blur(f.name)}
            className={cn(common.className, "py-2.5")}
          />
          {error}
        </div>
      );
    }

    const inputType = f.kind === "zip" ? "text" : f.kind;
    return (
      <div key={f.name} className={wrap}>
        <label htmlFor={id(f.name)}>{label}</label>
        <input
          {...common}
          type={inputType}
          inputMode={f.kind === "zip" ? "numeric" : f.kind === "tel" ? "tel" : undefined}
          autoComplete={f.autoComplete}
          maxLength={f.maxLength}
          placeholder={f.placeholder ? t.placeholders[f.placeholder] : undefined}
          onChange={(e) => set(f.name, e.target.value)}
          onBlur={() => blur(f.name)}
          className={cn(common.className, "min-h-12")}
        />
        {error}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5">
      {status.state === "error" && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[3px] border-l-4 border-bad bg-bad/10 p-4">
          <h3 className="text-xl">{t.errorHeading}</h3>
          {status.message === "network" ? (
            <p className="mt-1">{fmt(t.networkError, { phone: contact.phone })}</p>
          ) : (
            <>
              <p className="mt-1">{fmt(t.errorBody, { phone: contact.phone })}</p>
              <ul className="mt-2 list-disc pl-5">
                {errorList.map(([name, code]) => (
                  <li key={name}>
                    <a href={`#${id(name)}`} className="underline underline-offset-4">
                      {labelFor(name)}: {t.errors[code]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <p className="text-[0.95rem] text-steel">{t.contactHint}</p>
      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>{fields.map(renderField)}</div>

      {type === "sell" && (
        <div>
          <p className="font-semibold">{t.fields.photos}</p>
          <p className="mt-1 text-steel">{fmt(t.photosNote, { email: contact.email })}</p>
        </div>
      )}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} lang={lang} onToken={onToken} />}

      <div className={cn("flex flex-col gap-3", !compact && "sm:flex-row-reverse sm:items-center sm:justify-between")}>
        <button type="submit" disabled={status.state === "submitting"} className={button("primary", "lg", compact ? "w-full" : "sm:min-w-56")}>
          {status.state === "submitting" ? t.submitting : t.submit[type]}
        </button>
        <p className="text-[0.95rem] text-steel">{t.privacyNote}</p>
      </div>
    </form>
  );
}
