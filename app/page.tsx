import Link from "next/link";
import {
  profile,
  avatarQuotes,
  stack,
  experience,
  education,
  projects,
  openSource,
  SITE_URL,
} from "@/lib/data";
import { TechIcon } from "@/components/techIcons";
import ContributionsCalendar from "@/components/ContributionsCalendar";
import ThemeToggle from "@/components/ThemeToggle";
import BgmPlayer from "@/components/BgmPlayer";
import Visitors from "@/components/Visitors";
import SectionNav from "@/components/SectionNav";
import { LinkIcon } from "@/components/linkIcons";
import CopyEmailButton from "@/components/CopyEmailButton";
import ContactModal from "@/components/ContactModal";
import OpenContactButton from "@/components/OpenContactButton";
import LinkWithCopy from "@/components/LinkWithCopy";
import CommandMenuButton from "@/components/CommandMenuButton";
import CatToggle from "@/components/CatToggle";
import AvatarQuote from "@/components/AvatarQuote";
import ProjectBanner from "@/components/ProjectBanner";

const sectionBase = "border-t border-border scroll-mt-[58px] py-7 xs:py-9";
const sectionAlt = `${sectionBase} bg-surface-alt -mx-[18px] px-[18px] xs:-mx-6 xs:px-6`;
const heading = "font-serif italic text-[1.125rem] xs:text-[1.25rem] font-semibold text-fg mb-5";
const list = "list-none flex flex-col gap-[26px]";
const itemTitle = "font-serif text-base xs:text-[1.0625rem] sm:text-[1.1875rem] font-bold leading-[1.3] text-fg";
const itemBody = "font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.65] text-body";
const itemMeta = "font-sans text-[0.8125rem] leading-[1.5] text-muted";
const tag =
  "skill-tag inline-flex items-center gap-[5px] font-sans text-[0.75rem] font-medium leading-[1.4] px-[9px] py-[3px] border border-border text-muted transition-colors duration-150 ease-in-out hover:border-fg";
const tagsRow = "flex flex-wrap gap-2 mt-1";

export default function Home() {
  return (
    <main className="relative max-w-[576px] mx-auto bg-surface border-x border-edge shadow-[0_1px_2px_var(--shadow-1),0_32px_64px_-24px_var(--shadow-2)] pt-12 pb-18 px-[18px] xs:pt-18 xs:pb-24 xs:px-6">
      <SectionNav name={profile.name} />
      <ContactModal email={profile.email} />
      <div className="absolute top-6 right-6 z-5 flex gap-2">
        <CommandMenuButton />
        <CatToggle />
        <BgmPlayer />
        <ThemeToggle />
      </div>
      <header className="pb-10">
        <AvatarQuote quotes={avatarQuotes} avatarSrc="/avatar.jpg" avatarAlt={profile.name} />
        <h1 className="font-serif text-[1.75rem] xs:text-[2.125rem] sm:text-[2.5rem] font-bold leading-[1.15] tracking-[-0.015em] text-fg">
          {profile.name}
        </h1>
        <p className="mt-2 text-[1rem] xs:text-[1.125rem] italic text-muted">
          {profile.role}. {profile.subline}.
        </p>
        <p className="mt-5 font-sans text-[0.9rem] xs:text-[0.9375rem] sm:text-base leading-[1.6] xs:leading-[1.65] max-w-[54ch] text-body">
          {profile.bio}
        </p>
        <nav
          className="mt-6 flex flex-wrap gap-x-[18px] gap-y-1.5 font-sans text-[0.875rem] font-medium tracking-[0.01em]"
          aria-label="Contact links"
        >
          {profile.links.map((link) =>
            link.label === "Email" ? (
              <OpenContactButton
                key={link.label}
                className="inline-flex items-center underline cursor-pointer"
              >
                <LinkIcon label={link.label} />
                {link.label}
              </OpenContactButton>
            ) : link.href.startsWith("/") ? (
              <LinkWithCopy
                key={link.label}
                label={link.label}
                href={link.href}
                copyHref={`${SITE_URL}${link.href}`}
                internal
                className="underline"
                note={link.label === "Blogs" ? "Coming soon" : undefined}
              >
                <LinkIcon label={link.label} />
                {link.label}
              </LinkWithCopy>
            ) : (
              <LinkWithCopy
                key={link.label}
                label={link.label}
                href={link.href}
                copyHref={link.href}
                className="underline"
              >
                <LinkIcon label={link.label} />
                {link.label}
              </LinkWithCopy>
            ),
          )}
          <CopyEmailButton email={profile.email} />
        </nav>
        <Visitors />
      </header>

      <section id="stack" className={sectionBase}>
        <h2 className={heading}>Stack</h2>
        {stack.map((group) => (
          <div key={group.group} className="mt-5 first:mt-0">
            <p className="font-sans text-[0.75rem] font-semibold tracking-[0.03em] text-muted mb-2">
              {group.group}
            </p>
            <div className={tagsRow}>
              {group.items.map((item) => (
                <span key={item} className={tag}>
                  <TechIcon label={item} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="contributions" className={sectionAlt}>
        <h2 className={heading}>Contributions</h2>
        <ContributionsCalendar username="omthorat2004" />
      </section>

      <section id="experience" className={sectionBase}>
        <h2 className={heading}>Experience</h2>
        <ul className={list}>
          {experience.map((job) => (
            <li key={job.role + job.org} className="flex flex-col gap-[5px]">
              <p className={itemTitle}>
                {job.role}, {job.org}
              </p>
              <p className={itemMeta}>{job.period}</p>
              <p className={itemMeta}>{job.location}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className={sectionAlt}>
        <h2 className={heading}>Projects</h2>
        <ul className={list}>
          {projects.map((project) => (
            <li
              key={project.slug}
              className="flex flex-col gap-[5px] pt-6 border-t border-divider first:pt-0 first:border-t-0"
            >
              <Link href={`/projects/${project.slug}`} className="mb-1 block max-w-[320px]">
                <ProjectBanner href={project.href} name={project.name} />
              </Link>
              <p className={itemTitle}>
                <Link href={`/projects/${project.slug}`} className="underline decoration-border hover:decoration-current">
                  {project.name}
                </Link>
                {project.status ? (
                  <span className="text-[0.85em] font-normal italic text-muted">
                    , {project.status}
                  </span>
                ) : null}
              </p>
              <p className={`${itemBody} max-w-[56ch] mt-2`}>{project.description}</p>
              <div className={tagsRow}>
                {project.stack.map((item) => (
                  <span key={item} className={tag}>
                    <TechIcon label={item} />
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="winter-arc-2026" className={sectionBase}>
        <h2 className={heading}>Winter Arc 2026</h2>
        <p className={`${itemBody} max-w-[56ch]`}>
          A running log of everything I build, write, and learn this winter: one good project
          after another, plus the blogs and skills picked up along the way.{" "}
          <Link href="/winter-arc-2026" className="underline decoration-border hover:decoration-current">
            Follow the log
          </Link>
          .
        </p>
      </section>

      <section id="open-source" className={sectionBase}>
        <h2 className={heading}>Open source</h2>
        <p className={`${itemBody} max-w-[56ch]`}>
          {openSource.reduce((sum, entry) => sum + entry.count, 0)} pull requests merged across{" "}
          {openSource.length} projects, including {openSource[0].project}.{" "}
          <Link href="/open-source" className="underline decoration-border hover:decoration-current">
            See all contributions
          </Link>
          .
        </p>
      </section>

      <section id="education" className={sectionAlt}>
        <h2 className={heading}>Education</h2>
        <p className={itemTitle}>{education.school}</p>
        <p className={itemMeta}>{education.degree}</p>
        <p className={itemMeta}>{education.period}</p>
      </section>

      <section id="testimonials" className={sectionBase}>
        <h2 className={heading}>What people are saying</h2>
        <p className={`${itemBody} max-w-[56ch]`}>Coming soon.</p>
      </section>

      <section id="contact" className={sectionAlt}>
        <h2 className={heading}>Get in touch</h2>
        <p className={`${itemBody} max-w-[56ch]`}>
          Thanks for reading this far. If you want to work together or just say hello, send me a
          message.
        </p>
        <OpenContactButton className="mt-4 px-5 py-2.5 font-sans text-[0.875rem] font-semibold text-surface bg-fg cursor-pointer hover:opacity-90 w-full text-center xs:w-auto xs:text-left">
          Send a message
        </OpenContactButton>
      </section>
    </main>
  );
}
