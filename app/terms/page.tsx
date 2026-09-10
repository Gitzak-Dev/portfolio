import type { Metadata } from "next";
import styles from "./TermsPage.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | StackSpacer",
  description:
    "Read the terms and conditions governing the use of the StackSpacer website and our technology services.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          These Terms & Conditions govern your use of the StackSpacer website
          and your interactions with our services.
        </p>

        <p>
          By accessing or using this website, submitting an enquiry, requesting
          a quotation, or engaging StackSpacer for services, you acknowledge
          that you have read and understood these Terms.
        </p>

        <p>
          Individual projects may also be governed by a separate proposal,
          quotation, statement of work, invoice, service agreement, or other
          written contract. Where a separate written agreement applies, its
          specific terms will take priority for that engagement to the extent
          of any inconsistency.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Our Services",
    content: (
      <>
        <p>
          StackSpacer provides digital and technology services which may
          include website development, mobile application development,
          artificial intelligence solutions, automation, machine learning,
          software development, integrations, technical consulting, and
          related services.
        </p>

        <p>
          The exact scope, deliverables, functionality, project timeline,
          support arrangements, and fees for paid work will be defined in the
          relevant proposal, quotation, or other written agreement.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Quotes, Estimates & Project Scope",
    content: (
      <>
        <p>
          Quotations and estimates are based on the information, requirements,
          assumptions, and project scope available at the time they are
          prepared.
        </p>

        <p>
          Material changes to requirements, integrations, functionality,
          platforms, design, content, timelines, or other agreed deliverables
          may require a revised quotation, additional fees, or an adjusted
          delivery schedule.
        </p>

        <p>
          Project timelines are estimates unless a specific deadline has been
          expressly confirmed in writing.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Client Responsibilities",
    content: (
      <>
        <p>
          Clients are responsible for providing information, content,
          credentials, approvals, access, feedback, technical details, and
          other materials reasonably required to complete an agreed project.
        </p>

        <p>Clients are also responsible for ensuring that:</p>

        <ul>
          <li>
            Information and materials supplied to StackSpacer are accurate and
            may legally be used.
          </li>
          <li>
            Necessary rights, permissions, licences, and approvals have been
            obtained.
          </li>
          <li>
            Project feedback and approvals are provided within a reasonable
            timeframe.
          </li>
          <li>
            Credentials and account access are supplied securely where
            required.
          </li>
        </ul>

        <p>
          Delays caused by missing information, approvals, access, or client
          dependencies may affect delivery dates.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Fees & Payments",
    content: (
      <>
        <p>
          Project fees, deposits, milestones, payment schedules, and due dates
          will be stated in the applicable quotation, invoice, proposal, or
          agreement.
        </p>

        <p>
          Unless otherwise agreed in writing, payments must be made according
          to the payment terms shown on the applicable invoice or project
          documentation.
        </p>

        <p>
          StackSpacer may pause or suspend work where required payments remain
          overdue, subject to any applicable agreement or legal requirements.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Revisions & Change Requests",
    content: (
      <>
        <p>
          Any included revisions will be determined by the applicable project
          scope or written agreement.
        </p>

        <p>
          Requests for additional pages, features, integrations, functionality,
          redesigns, technical changes, or other work outside the agreed scope
          may be treated as additional work and quoted separately.
        </p>

        <p>
          We will aim to identify material scope changes before carrying out
          additional billable work.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Ownership and licensing arrangements for custom project deliverables
          will be determined by the applicable project agreement, proposal, or
          other written terms.
        </p>

        <p>
          Unless expressly transferred in writing, StackSpacer retains its
          rights in pre-existing materials, internal processes, reusable tools,
          methodologies, frameworks, libraries, templates, systems, general
          technical knowledge, and other materials developed independently of a
          specific client engagement.
        </p>

        <p>
          Third-party software, APIs, libraries, plugins, fonts, images,
          frameworks, stock assets, and other licensed materials remain subject
          to the terms and intellectual property rights of their respective
          owners.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Third-Party Platforms & Services",
    content: (
      <>
        <p>
          Projects may depend on third-party products or platforms such as
          hosting providers, cloud services, domain registrars, payment
          processors, APIs, AI providers, app stores, databases, software
          libraries, plugins, or external integrations.
        </p>

        <p>
          StackSpacer does not control third-party pricing, availability,
          functionality, policies, security practices, approval decisions, or
          future changes.
        </p>

        <p>
          Unless expressly included in a written quotation, third-party
          subscriptions, licences, usage fees, hosting costs, domain fees, API
          charges, and similar costs remain the client&apos;s responsibility.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Confidentiality",
    content: (
      <>
        <p>
          Where confidential business, technical, commercial, or project
          information is shared between the parties, each party should take
          reasonable steps to protect that information and use it only for
          legitimate purposes connected with the engagement.
        </p>

        <p>
          A separate confidentiality or non-disclosure agreement may apply
          where one has been agreed in writing.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Acceptable Website Use",
    content: (
      <>
        <p>You must not use this website to:</p>

        <ul>
          <li>Engage in unlawful, deceptive, or fraudulent activity.</li>
          <li>
            Attempt to obtain unauthorised access to our website, servers,
            accounts, systems, or data.
          </li>
          <li>
            Introduce malware, malicious scripts, viruses, or harmful code.
          </li>
          <li>
            Interfere with the security, stability, performance, or
            availability of the website.
          </li>
          <li>
            Scrape, copy, reproduce, or exploit protected website content in
            violation of applicable rights.
          </li>
          <li>
            Misrepresent your identity or impersonate StackSpacer or another
            person or organisation.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "11",
    title: "No Guarantee of Business Results",
    content: (
      <>
        <p>
          StackSpacer aims to provide professional services in accordance with
          the agreed project scope.
        </p>

        <p>
          Unless expressly guaranteed in a written agreement, we do not
          guarantee specific revenue, profits, sales, traffic, conversions,
          search rankings, audience growth, investor outcomes, app-store
          approvals, artificial-intelligence outputs, or other commercial
          results that depend on factors outside our reasonable control.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Website Availability & Warranties",
    content: (
      <>
        <p>
          We aim to maintain a reliable website, but we do not guarantee that
          this website will always be uninterrupted, completely error-free, or
          permanently available.
        </p>

        <p>
          Website maintenance, hosting issues, third-party failures, security
          events, internet disruptions, software updates, or circumstances
          outside our reasonable control may occasionally affect availability.
        </p>

        <p>
          Any warranties that apply to paid client services will be determined
          by the relevant written agreement together with any rights that
          cannot legally be excluded.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, StackSpacer will
          not be responsible for indirect, incidental, special, punitive, or
          consequential loss arising solely from use of this website or events
          outside our reasonable control.
        </p>

        <p>
          Liability relating to a paid client engagement will be subject to the
          applicable project agreement and any statutory rights or remedies
          that cannot legally be excluded or limited.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Project Suspension or Termination",
    content: (
      <>
        <p>
          A project may be suspended or terminated in accordance with the
          applicable proposal, agreement, or other written terms.
        </p>

        <p>
          Upon termination, amounts properly due for work already completed,
          approved expenses, committed third-party costs, or other applicable
          charges may remain payable.
        </p>
      </>
    ),
  },
  {
    number: "15",
    title: "Privacy",
    content: (
      <>
        <p>
          Information submitted through this website or provided in connection
          with StackSpacer services is handled in accordance with our Privacy
          Policy.
        </p>

        <p>
          You can review our{" "}
          <a className={styles.inlineLink} href="/privacy">
            Privacy Policy
          </a>{" "}
          for more information.
        </p>
      </>
    ),
  },
  {
    number: "16",
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          StackSpacer may update these Terms & Conditions from time to time to
          reflect changes to our website, services, technology, business
          practices, or applicable requirements.
        </p>

        <p>
          Updated Terms will be published on this page and may include a revised
          effective date.
        </p>
      </>
    ),
  },
  {
    number: "17",
    title: "Contact StackSpacer",
    content: (
      <>
        <p>
          If you have questions concerning these Terms & Conditions, please
          contact StackSpacer.
        </p>

        <div className={styles.contactDetails}>
          <a href="mailto:stackspacer@gmail.com">stackspacer@gmail.com</a>

          <a href="https://www.stackspacer.com">
            www.stackspacer.com
          </a>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>// TERMS & CONDITIONS</div>

          <h1>
            Clear terms.
            <br />
            <span>Better work.</span>
          </h1>

          <p className={styles.intro}>
            These Terms set out the general conditions that apply when using
            the StackSpacer website or engaging with our technology services.
          </p>

          <p className={styles.updated}>Effective: August 15, 2026</p>
        </header>

        <div className={styles.divider} />

        <div className={styles.sections}>
          {sections.map((section) => (
            <section className={styles.section} key={section.number}>
              <div className={styles.sectionNumber}>{section.number}</div>

              <div className={styles.sectionContent}>
                <h2>{section.title}</h2>

                <div className={styles.text}>{section.content}</div>
              </div>
            </section>
          ))}
        </div>

        <div className={styles.bottomNote}>
          <span>//</span>
          <p>
            Specific project proposals or agreements may contain additional
            terms that apply to an individual engagement.
          </p>
        </div>
      </div>
    </main>
  );
}