import { business } from "@/config/business";

const labels: Record<keyof typeof business.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  googleBusinessProfile: "Google",
  youtube: "YouTube",
  tiktok: "TikTok",
};

/** Renders only the profiles that have a real URL configured. */
export function SocialLinks({ className, newTabLabel }: { className?: string; newTabLabel: string }) {
  const entries = (Object.entries(business.social) as [keyof typeof business.social, string | null][]).filter(
    (entry): entry is [keyof typeof business.social, string] => Boolean(entry[1]),
  );
  if (entries.length === 0) return null;
  return (
    <ul className={className}>
      {entries.map(([key, url]) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            {labels[key]}
            <span className="sr-only"> {newTabLabel}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
