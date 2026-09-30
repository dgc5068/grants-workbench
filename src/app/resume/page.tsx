import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { EmailButton } from "@/components/copy-email";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "(Daniel) Grant Clark — mechanical engineering student at UVU. Experience, education, and skills.",
};

interface Entry {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  href?: string;
}

const experience: Entry[] = [
  {
    role: "Research & Development Engineer - Autonomous Aircraft Tug",
    org: "UVU Engineering Research",
    period: "Fall 2026 — Present",
    location: "Orem, UT",
    bullets: [
      "Integrating LiDAR and sensor systems on a self-driving electric aircraft tug",
      "Bridging mechanical and electrical work on a three-person engineering team",
      "Targeting a working autonomous prototype by spring to prove commercial viability",
    ],
    href: "/blog/etug-intro",
  },
  {
    role: "Rocket Scientist — FAR OUT Rocket Competition",
    org: "UVU Competition Rocketry",
    period: "Fall 2026 — Present",
    location: "Orem, UT",
    bullets: [
      "Building the flight computer for a 12-foot liquid rocket. Reliable telemetry and data transmission from a vehicle moving through the air at up to 10,000 ft while managing packet loss",
      "Implementing a 1080p/30fps live video downlink from the rocket in flight",
      "Designing the payload ejection mechanism that deploys a parachute cartridge at apogee",
    ],
  },
  {
    role: "Robotics Engineering Lead Instructor",
    org: "Idaho Discovery Week",
    period: "May 2026 — Aug 2026",
    location: "Boise, ID",
    bullets: [
      "Co-founded a summer learning camp and taught an Arduino-based electronics curriculum to 100+ teenage students",
      "Designed hands-on projects from first physics principles through take-home builds",
    ],
    href: "/blog/teaching-robotics-engineering",
  },
  {
    role: "Business Development Intern",
    org: "Podium Software",
    period: "Dec 2025 — May 2026",
    location: "Lehi, UT",
    bullets: [
      "142% average quota attainment; over $180,000 closed in ACV",
      "January 2026 Rookie Pitch-Off winner. First 10/10 score in company history",
    ],
  },
  {
    role: "Project Manager",
    org: "Doorcanvassing.com",
    period: "Dec 2024 — Aug 2025",
    bullets: [
      "Operated a residential advertising agency; hiring up to 7 employees and $15,000 monthly revenue",
      "Managed high-ticket clients including Walmart, Google Fiber, and Dish TV",
    ],
  },
  {
    role: "Club Ambassador",
    org: "BYU Creators Entrepreneurship Club",
    period: "Aug 2024 — May 2025",
    location: "Provo, UT",
    bullets: [
      "Expanded membership to 50+ participants through social media and school events",
      "Connected 100+ small businesses with investors, raising over $50,000",
      "Spoke at the annual entrepreneurship seminar to 300+ students",
    ],
  },
  {
    role: "Volunteer Missionary",
    org: "The Church of Jesus Christ of Latter-day Saints",
    period: "Aug 2022 — Aug 2024",
    location: "Tokyo, Japan",
    bullets: ["Two years of full-time volunteer service; fluent Japanese"],
  },
];

const education: Entry[] = [
  {
    role: "B.S. Mechanical Engineering, Electrical Engineering minor",
    org: "Utah Valley University",
    period: "Aug 2025 — Present",
    location: "Orem, UT",
    bullets: ["Japanese club officer", "Competition rocketry team"],
  },
  {
    role: "Business Administration",
    org: "Brigham Young University",
    period: "Aug 2024 — May 2025",
    location: "Provo, UT",
    bullets: [
      "3.6 GPA. Transferred to UVU to pursue engineering",
      "Launchpad summer business incubator graduate",
      "8× Miller Grant recipient ($24,000 total)",
    ],
  },
];

const skills = [
  "C++",
  "Python",
  "Next.js",
  "JavaScript",
  "Microcontrollers",
  "3D Printing",
  "Fluent Japanese",
  "Sales & Customer Communication",
  "Project Management",
  "Team Management",
  "Hiring",
];

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative ml-1 space-y-10 border-l border-hairline">
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.period}`} className="relative pl-8">
          <span
            aria-hidden
            className="absolute -left-1.25 top-1.5 h-2.5 w-2.5 border border-foreground bg-background"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            {entry.period}
            {entry.location && (
              <span className="text-zinc-400"> · {entry.location}</span>
            )}
          </p>
          <h3 className="mt-1 text-[17px] font-semibold tracking-tight">
            {entry.role}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {entry.org}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-zinc-400">
            {entry.bullets.map((b) => (
              <li
                key={b}
                className="text-sm leading-6 text-zinc-700 dark:text-zinc-300"
              >
                {b}
              </li>
            ))}
          </ul>
          {entry.href && (
            <Link
              href={entry.href}
              className="mt-3 inline-block border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
            >
              Read the article →
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ResumePage() {
  const hasResumePdf = fs.existsSync(
    path.join(process.cwd(), "public", "resume.pdf"),
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="border-b border-hairline pb-8">
        <h1>
          <Image
            src="/grant-clark-engineering-cropped.png"
            alt="Grant Clark — Mechanical/Electrical Engineering"
            width={3369}
            height={234}
            priority
            className="h-auto w-full max-w-4xl dark:invert"
          />
        </h1>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
          >
            LinkedIn ↗
          </a>
          <EmailButton
            email={site.email}
            className="border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
          />
          {hasResumePdf && (
            <a
              href="/resume.pdf"
              download="Grant Clark — Resume.pdf"
              className="inline-flex items-center gap-2 border border-hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-accent hover:text-accent dark:text-zinc-400"
            >
              ATS-Friendly Resume PDF
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
        <div className="mt-6">
          <Timeline entries={experience} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">Education</h2>
        <div className="mt-6">
          <Timeline entries={education} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
