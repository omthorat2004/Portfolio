import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { profile, avatarQuote, stack, experience, education, projects, openSource } from "./data";
import { TechIcon } from "./techIcons";
import ContributionsCalendar from "./ContributionsCalendar";
import ThemeToggle from "./ThemeToggle";
import BgmPlayer from "./BgmPlayer";
import Visitors from "./Visitors";
import SectionNav from "./SectionNav";
import { LinkIcon } from "./linkIcons";
import CopyEmailButton from "./CopyEmailButton";
import ContactModal from "./ContactModal";
import OpenContactButton from "./OpenContactButton";

export default function Home() {
  return (
    <main className={styles.container}>
      <SectionNav name={profile.name} />
      <ContactModal email={profile.email} />
      <div className={styles.toolbar}>
        <BgmPlayer />
        <ThemeToggle />
      </div>
      <header className={styles.header}>
        <div className={styles.avatarRow}>
          <Image
            className={styles.avatar}
            src="/avatar.jpg"
            alt={profile.name}
            width={72}
            height={72}
            priority
          />
          <p className={styles.bubble}>
            {avatarQuote.text}
            <span className={styles.bubbleFrom}>{avatarQuote.from}</span>
          </p>
        </div>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>
          {profile.role}. {profile.subline}.
        </p>
        <p className={styles.bio}>{profile.bio}</p>
        <nav className={styles.links} aria-label="Contact links">
          {profile.links.map((link) =>
            link.label === "Email" ? (
              <OpenContactButton key={link.label} className={styles.linkButton}>
                <LinkIcon label={link.label} />
                {link.label}
              </OpenContactButton>
            ) : link.href.startsWith("/") ? (
              <Link key={link.label} href={link.href}>
                <LinkIcon label={link.label} />
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <LinkIcon label={link.label} />
                {link.label}
              </a>
            ),
          )}
          <CopyEmailButton email={profile.email} />
        </nav>
        <Visitors />
      </header>

      <section id="stack" className={styles.section}>
        <h2 className={styles.heading}>Stack</h2>
        {stack.map((group) => (
          <div key={group.group} className={styles.stackGroup}>
            <p className={styles.stackLabel}>{group.group}</p>
            <div className={styles.tags}>
              {group.items.map((item) => (
                <span key={item} className={styles.tag}>
                  <TechIcon label={item} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="contributions" className={styles.section}>
        <h2 className={styles.heading}>Contributions</h2>
        <ContributionsCalendar username="omthorat2004" />
      </section>

      <section id="experience" className={styles.section}>
        <h2 className={styles.heading}>Experience</h2>
        <ul className={styles.list}>
          {experience.map((job) => (
            <li key={job.role + job.org} className={styles.item}>
              <p className={styles.itemTitle}>
                {job.role}, {job.org}
              </p>
              <p className={styles.itemMeta}>{job.period}</p>
              <p className={styles.itemMeta}>{job.location}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className={styles.section}>
        <h2 className={styles.heading}>Projects</h2>
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.slug} className={`${styles.item} ${styles.projectItem}`}>
              <p className={styles.itemTitle}>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                {project.status ? (
                  <span className={styles.status}>, {project.status}</span>
                ) : null}
              </p>
              <p className={styles.itemBody}>{project.description}</p>
              <div className={styles.tags}>
                {project.stack.map((item) => (
                  <span key={item} className={styles.tag}>
                    <TechIcon label={item} />
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="open-source" className={styles.section}>
        <h2 className={styles.heading}>Open source</h2>
        <p className={styles.itemBody}>
          {openSource.reduce((sum, entry) => sum + entry.count, 0)} pull requests merged across{" "}
          {openSource.length} projects, including {openSource[0].project}.{" "}
          <Link href="/open-source">See all contributions</Link>.
        </p>
      </section>

      <section id="education" className={styles.section}>
        <h2 className={styles.heading}>Education</h2>
        <p className={styles.itemTitle}>{education.school}</p>
        <p className={styles.itemMeta}>{education.degree}</p>
        <p className={styles.itemMeta}>{education.period}</p>
      </section>

      <section id="testimonials" className={styles.section}>
        <h2 className={styles.heading}>What people are saying</h2>
        <p className={styles.itemBody}>Coming soon.</p>
      </section>

      <section id="contact" className={styles.section}>
        <h2 className={styles.heading}>Get in touch</h2>
        <p className={styles.itemBody}>
          Thanks for reading this far. If you want to work together or just say hello, send me a
          message.
        </p>
        <OpenContactButton className={styles.contactCta}>Send a message</OpenContactButton>
      </section>
    </main>
  );
}
