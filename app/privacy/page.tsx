import type { Metadata } from "next";
import styles from "./PrivacyPage.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | StackSpacer",
  description:
    "Learn how StackSpacer collects, uses, stores, and protects information when you use our website and services.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: (
      <>
        <p>
          StackSpacer respects your privacy and is committed to handling
          personal information responsibly and transparently.
        </p>

        <p>
          This Privacy Policy explains how we may collect, use, store, disclose,
          and protect information when you visit our website, contact us,
          request a quote, communicate with our team, or engage StackSpacer for
          digital or technology services.
        </p>

        <p>
          By using this website, you acknowledge the practices described in
          this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <p>
          The information we collect depends on how you interact with
          StackSpacer. It may include:
        </p>

        <ul>
          <li>Your name and business or organisation name.</li>
          <li>Email address and telephone number.</li>
          <li>
            Information submitted through contact forms, enquiry forms, or
            quote requests.
          </li>
          <li>
            Project requirements, technical specifications, timelines, and
            other information you choose to provide.
          </li>
          <li>
            Communications between you and StackSpacer regarding an enquiry,
            project, support request, or business relationship.
          </li>
          <li>
            Basic technical information such as browser type, device type,
            operating system, IP address, and general website usage data.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "How We Use Information",
    content: (
      <>
        <p>We may use information we collect to:</p>

        <ul>
          <li>Respond to enquiries and project requests.</li>
          <li>Prepare quotations, proposals, and project estimates.</li>
          <li>Provide and manage services requested by clients.</li>
          <li>Communicate regarding projects, support, and account matters.</li>
          <li>Improve our website, services, and customer experience.</li>
          <li>Monitor website reliability, security, and performance.</li>
          <li>Prevent fraud, abuse, or unauthorised activity.</li>
          <li>Maintain appropriate business and administrative records.</li>
          <li>Comply with applicable legal or regulatory obligations.</li>
        </ul>

        <p>
          We will not intentionally use personal information for materially
          unrelated purposes without an appropriate basis for doing so.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Cookies & Local Storage",
    content: (
      <>
        <p>
          StackSpacer may use cookies and similar technologies to support
          website functionality, security, preferences, and performance.
        </p>

        <p>
          We store your consent preference locally using a browser storage key
          called <code>stackspacer_consent_v1</code>. This stores only your
          analytics consent choice and does not contain personal information.
        </p>

        <p>
          You may be able to control or delete cookies through your browser
          settings. Disabling certain technologies may affect some website
          functionality.
        </p>

        <p>
          Where applicable law requires consent for particular technologies,
          those technologies should be handled in accordance with the relevant
          consent requirements.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Website Analytics",
    content: (
      <>
        <p>
          StackSpacer uses Google Tag Manager and Google Analytics 4 to
          understand general website usage and performance.
        </p>

        <p>Analytics may include:</p>

        <ul>
          <li>Pages visited and time spent on pages</li>
          <li>Referring websites or search terms</li>
          <li>Device type, browser type, and operating system</li>
          <li>General geographic location (country/region level)</li>
          <li>Contact form submissions (as conversion events)</li>
        </ul>

        <p>
          Analytics are subject to your consent. If you reject non-essential
          cookies, analytics tracking is disabled for your session.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Google Analytics & Google Tag Manager",
    content: (
      <>
        <p>
          We use Google Tag Manager container <strong>GTM-WPTNGVFR</strong> and
          Google Analytics 4 property <strong>G-NKP6BWG546</strong> for
          analytics purposes.
        </p>

        <p>
          Google Analytics processes data according to its own privacy policy.
          We do not send personal identifiers such as email addresses or full
          names through analytics events.
        </p>

        <p>
          For more information about Google&apos;s data processing, visit:
          <br />
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Advertising Tracking",
    content: (
      <>
        <p>
          <strong>Advertising tracking is currently disabled on this website.</strong>
        </p>

        <p>
          We do not currently use:
        </p>

        <ul>
          <li>Google Ads conversion tracking</li>
          <li>Remarketing audiences</li>
          <li>Ad personalization</li>
          <li>Third-party advertising cookies</li>
        </ul>

        <p>
          Your consent settings always keep the following values denied:
        </p>

        <ul>
          <li><code>ad_storage</code> = denied</li>
          <li><code>ad_user_data</code> = denied</li>
          <li><code>ad_personalization</code> = denied</li>
        </ul>

        <p>
          You may grant analytics consent while advertising consent remains
          denied. These are independent settings.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Your Consent Choices",
    content: (
      <>
        <p>
          When you first visit this website, you will see a consent banner
          asking whether to allow analytics tracking.
        </p>

        <p>You may choose to:</p>

        <ul>
          <li>
            <strong>Allow analytics</strong> — enables Google Analytics tracking. Advertising tracking remains disabled.
          </li>
          <li>
            <strong>Reject non-essential</strong> — disables analytics tracking. No analytics data is collected.
          </li>
        </ul>

        <p>
          Your choice is saved in your browser and will be remembered on
          future visits. You may change your preference at any time by clearing
          your browser storage or contacting us.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Data Security",
    content: (
      <>
        <p>
          We take reasonable administrative, organisational, and technical
          measures designed to protect information against unauthorised access,
          misuse, alteration, disclosure, or loss.
        </p>

        <p>
          However, no website, electronic transmission, cloud service, or
          storage system can be guaranteed to be completely secure. You should
          also take reasonable precautions when sharing sensitive information
          electronically.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Data Retention",
    content: (
      <>
        <p>
          We may retain information for as long as reasonably necessary to
          fulfil the purpose for which it was collected, provide requested
          services, maintain appropriate business records, resolve disputes,
          enforce agreements, and comply with applicable obligations.
        </p>

        <p>
          Contact form submissions are retained in our database until manually
          deleted by an administrator.
        </p>

        <p>
          When information is no longer reasonably required, it may be deleted,
          anonymised, or securely archived where appropriate.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          StackSpacer does not sell personal information as part of its normal
          business operations.
        </p>

        <p>
          We may share information with trusted third-party providers where
          reasonably necessary to operate our business, maintain our website,
          communicate with clients, or deliver services.
        </p>

        <p>These providers may include:</p>

        <ul>
          <li>Website hosting and cloud infrastructure providers.</li>
          <li>Email and communication platforms.</li>
          <li>Analytics and performance services.</li>
          <li>Project management and collaboration platforms.</li>
          <li>Payment or invoicing providers where applicable.</li>
          <li>Professional advisers and technical contractors.</li>
        </ul>

        <p>
          We may also disclose information where required by applicable law,
          legal process, court order, regulatory obligation, or where reasonably
          necessary to protect our rights, systems, clients, or users.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "International Processing",
    content: (
      <>
        <p>
          StackSpacer may work with clients, contractors, cloud platforms, and
          technology providers located in different countries.
        </p>

        <p>
          As a result, information may be transferred to or processed in a
          jurisdiction other than the one in which you are located. We aim to
          use reputable providers and take reasonable measures appropriate to
          the nature of the information being handled.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Your Privacy Choices & Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable privacy law, you may have
          certain rights concerning your personal information.
        </p>

        <p>These may include the right to:</p>

        <ul>
          <li>Request access to information held about you.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>Request deletion of certain personal information.</li>
          <li>Object to or restrict certain processing activities.</li>
          <li>Withdraw consent where processing relies on consent.</li>
          <li>
            Request further information about how your personal information is
            handled.
          </li>
        </ul>

        <p>
          We may need to verify your identity before processing certain
          requests.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Third-Party Websites & Services",
    content: (
      <>
        <p>
          Our website may contain links to third-party websites, platforms,
          applications, or services.
        </p>

        <p>
          StackSpacer does not control the privacy, security, content, or
          availability of third-party services. Your use of those services is
          subject to their own policies and terms.
        </p>

        <p>
          We encourage you to review the privacy information provided by any
          third party before submitting personal information to them.
        </p>
      </>
    ),
  },
  {
    number: "15",
    title: "Children&apos;s Privacy",
    content: (
      <>
        <p>
          StackSpacer primarily provides professional technology services to
          businesses, organisations, founders, and other professional clients.
        </p>

        <p>
          Our website is not intended to knowingly solicit personal information
          from children. If we become aware that information has been collected
          inappropriately, we may take reasonable steps to remove it.
        </p>
      </>
    ),
  },
  {
    number: "16",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our website, services, technologies, business practices,
          or applicable requirements.
        </p>

        <p>
          The updated version will be published on this page and the effective
          date may be revised accordingly.
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
          If you have questions about this Privacy Policy or would like to make
          a privacy-related request, please contact us.
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

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>// PRIVACY POLICY</div>

          <h1>
            Your privacy
            <br />
            <span>matters.</span>
          </h1>

          <p className={styles.intro}>
            This policy explains how StackSpacer handles information when you
            interact with our website, contact our team, or engage our services.
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
            We are committed to responsible data handling and transparent
            digital experiences.
          </p>
        </div>
      </div>
    </main>
  );
}
