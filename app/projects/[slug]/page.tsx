import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type ProjectTheme } from "@/data/projects";
import styles from "./ProjectCasePage.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const themeClassMap: Record<ProjectTheme, string> = {
  mobile: styles.themeMobile,
  ai: styles.themeAi,
  ml: styles.themeMl,
  web: styles.themeWeb,
  business: styles.themeBusiness,
};

const projectVisualMap: Record<string, string> = {
  "mobile-app-dashboard": "/project-visuals/mobile-app-dashboard.png",
  "ai-automation-suite": "/project-visuals/ai-human-analogy.png",
  "ml-prediction-system": "/projects/ml-stock-dashboard.png",
  "developer-portfolio": "/project-visuals/developer-portfolio.png",
  "business-website-system": "/project-visuals/business-website-system.png",
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.desc,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const visualImage =
    (project as { previewImage?: string }).previewImage ??
    projectVisualMap[project.slug];

  return (
    <main className={`${styles.page} ${themeClassMap[project.theme]}`}>
      <CustomCursor />
      <div id="noise-overlay" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlowOne} aria-hidden="true" />
      <div className={styles.bgGlowTwo} aria-hidden="true" />

      <header className={styles.caseHeader}>
        <Link href="/#work" className={styles.backLink}>
          <span>←</span> Back
        </Link>

        {/* <a
          href={project.liveUrl}
          className={styles.liveLink}
          target="_blank"
          rel="noreferrer"
          data-cursor="dark"
        >
          Visit Live Site <span>↗</span>
        </a> */}
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.kicker}>
            <span>{project.id}</span>
            <small>{project.category}</small>
          </div>

          <div className={styles.tags}>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <h1>{project.title}</h1>

          <p>{project.heroText}</p>

          <div className={styles.metaGrid}>
            <div>
              <small>Year</small>
              <strong>{project.year}</strong>
            </div>

            <div>
              <small>Timeline</small>
              <strong>{project.timeline}</strong>
            </div>

            <div>
              <small>Tech</small>
              <strong>{project.tech}</strong>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.previewShell}>
            <div className={styles.previewTop}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>

              <p>case-study-preview.tsx</p>

              <strong data-cursor="dark">LIVE</strong>
            </div>

            <div
              className={`${styles.previewBody} ${
                visualImage ? styles.previewBodyImageMode : ""
              }`}
            >
              {visualImage ? (
                <div className={styles.fullProjectImageWrap}>
                  <Image
                    src={visualImage}
                    alt={`${project.title} visual preview`}
                    fill
                    sizes="(max-width: 950px) 100vw, 860px"
                    className={styles.fullProjectImage}
                    priority
                  />
                </div>
              ) : (
                <>
                  <div className={styles.previewLeft}>
                    <small>{project.category}</small>
                    <h2>{project.title}</h2>
                    <p>{project.desc}</p>

                    <div className={styles.previewActions}>
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className={styles.previewRight}>
                    <div className={styles.deviceCard}>
                      <div className={styles.deviceBar} />
                      <div className={styles.deviceTitle} />
                      <div className={styles.deviceLine} />
                      <div className={styles.deviceLineShort} />

                      <div className={styles.deviceStats}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className={styles.floatingCardOne} />
                    <div className={styles.floatingCardTwo} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div>
          <span className={styles.sectionLabel}>Overview</span>
          <h2>{project.overviewTitle}</h2>
        </div>

        <p>{project.overviewText}</p>
      </section>

      <section className={styles.roadmapSection}>
        <div className={styles.sectionTop}>
          <span className={styles.sectionLabel}>Process</span>
          <h2>The Roadmap</h2>
        </div>

        <div className={styles.roadmapGrid}>
          {project.roadmap.map((item, index) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <strong>0{index + 1}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.challengeSolutionSection}>
        <div className={styles.challengeCol}>
          <span className={styles.sectionLabel}>Problem</span>

          <h2>The Challenge</h2>

          <div className={styles.listBox}>
            <span>{project.challenge.title}</span>

            <ul>
              {project.challenge.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.listBox}>
            <span>{project.benchmarks.title}</span>

            <ul>
              {project.benchmarks.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.solutionCol}>
          <span className={styles.sectionLabel}>Execution</span>

          <h2>The Solution</h2>

          <p className={styles.solutionIntro}>{project.solutionIntro}</p>

          <div className={styles.solutionGrid}>
            {project.solutionCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stackSection}>
        <div className={styles.sectionTopCenter}>
          <span className={styles.sectionLabel}>Technology</span>
          <h2>The Core Stack</h2>
        </div>

        <div className={styles.stackGrid}>
          {project.stack.map((item) => (
            <article key={item.name}>
              <div className={styles.stackIcon}>⌘</div>
              <h3>{item.name}</h3>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.impactSection}>
        <div className={styles.sectionTop}>
          <span className={styles.sectionLabel}>Results</span>
          <h2>Impact</h2>
        </div>

        <div className={styles.impactGrid}>
          {project.impact.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.voiceSection}>
        <span>Voices</span>

        <blockquote>“{project.testimonial.quote}”</blockquote>

        <p>— {project.testimonial.author}</p>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.sectionTop}>
          <span className={styles.sectionLabel}>More Work</span>
          <h2>Related Projects</h2>
        </div>

        <div className={styles.relatedGrid}>
          {relatedProjects.map((item) => (
            <Link
              href={`/projects/${item.slug}`}
              className={styles.relatedCard}
              key={item.slug}
            >
              <span>{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <strong>View Case Study ↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalSection}>
        <span className={styles.sectionLabel}>Start Yours</span>

        <h2>{project.finalCta.title}</h2>
        <p>{project.finalCta.text}</p>

        <Link href="/#contact" className={styles.ctaButton} data-cursor="dark">
          Start a Project <span>→</span>
        </Link>
      </section>
    </main>
  );
}