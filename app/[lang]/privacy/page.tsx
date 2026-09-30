import { business, fullAddressLine } from "@/config/business";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

/**
 * TODO(owner): have the owner (and ideally an attorney) review this policy
 * before launch, and update it when analytics or advertising pixels are turned on.
 */
const UPDATED = "2026-09-30";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.privacy;
  return buildMetadata({ lang, path: "/privacy", title: t.metaTitle, description: t.metaDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const name = business.businessName;
  const contactLine = `${business.email}${business.phone ? `, ${business.phone.display}` : ""}, ${fullAddressLine()}`;

  const sections =
    lang === "es"
      ? [
          ["Información que recopilamos", `Cuando envía un formulario en este sitio, recopilamos lo que usted escribe, como su nombre, el nombre de su negocio, teléfono, correo y los detalles del equipo. Nuestro proveedor de hospedaje también registra datos técnicos básicos, como la dirección IP y el tipo de navegador, para operar y proteger el sitio.`],
          ["Cómo usamos su información", `Usamos su información para responder a sus preguntas, darle seguimiento a sus solicitudes de equipo y evaluar equipo que usted quiera vender. No vendemos su información personal.`],
          ["Con quién la compartimos", `Compartimos información solo con proveedores que nos ayudan a operar el sitio y a recibir sus mensajes, como servicios de hospedaje y de correo electrónico, o cuando la ley lo exige.`],
          ["Cookies y analítica", `Si activamos herramientas de analítica o publicidad (por ejemplo, Google Analytics o Meta Pixel), estas pueden usar cookies para medir visitas y el rendimiento de anuncios. Puede bloquear cookies en la configuración de su navegador.`],
          ["Sus opciones", `Puede pedirnos ver, corregir o borrar la información que nos envió. Contáctenos con los datos de abajo.`],
          ["Contacto", `${name}: ${contactLine}.`],
        ]
      : [
          ["Information we collect", `When you submit a form on this site, we collect what you enter, such as your name, business name, phone number, email, and equipment details. Our hosting provider also logs basic technical data, like IP address and browser type, to run and protect the site.`],
          ["How we use it", `We use your information to answer your questions, follow up on equipment requests, and review equipment you want to sell. We do not sell your personal information.`],
          ["Who we share it with", `We share information only with service providers that help us run this site and receive your messages, such as hosting and email delivery services, or when the law requires it.`],
          ["Cookies and analytics", `If we turn on analytics or advertising tools (for example, Google Analytics or the Meta Pixel), they may use cookies to measure visits and ad performance. You can block cookies in your browser settings.`],
          ["Your choices", `You can ask us to see, correct, or delete the information you sent us. Contact us using the details below.`],
          ["Contact", `${name}: ${contactLine}.`],
        ];

  return (
    <div className="container-x max-w-3xl py-8 sm:py-10">
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { name: dict.nav.home, path: localizedPath(lang, "/") },
          { name: dict.pages.privacy.title, path: localizedPath(lang, "/privacy") },
        ]}
      />
      <h1 className="mt-4 text-5xl">{dict.pages.privacy.title}</h1>
      <p className="mt-2 text-steel">
        {lang === "es" ? "Última actualización" : "Last updated"}: {UPDATED}
      </p>
      <div className="mt-8 space-y-8">
        {sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="text-3xl">{heading}</h2>
            <p className="mt-2 text-lg">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
