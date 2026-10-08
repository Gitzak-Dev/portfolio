"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { pushToDataLayer } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import styles from "./ContactSection.module.css";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setStatus("error");
        setStatusMessage(result.message || "Something went wrong.");
        return;
      }

      // GA4 lead event.
      // Personal form information is NOT included in this event.
      pushToDataLayer({
        event: "generate_lead",
        form_name: "contact",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      });

      setStatus("success");

      setStatusMessage(
        "Message sent successfully. I will get back to you soon.",
      );

      setFormData(initialFormState);
    } catch {
      setStatus("error");
      setStatusMessage("Unable to send message. Please try again.");
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column */}
        <motion.div
          className={styles.leftCol}
          initial={{
            opacity: 0,
            x: -45,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className={styles.eyebrow}>// Contact</span>

          <h2>
            Let&apos;s Work <br />
            <span>Together.</span>
          </h2>

          <p>
            I&apos;m currently available for full-time roles or high-impact
            freelance projects. Expect a response within 24 hours.
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className={styles.emailCard}
            data-cursor="dark"
          >
            <div className={styles.emailIcon}>&#9993;</div>

            <div>
              <small>Email Me</small>

              <strong>{siteConfig.email}</strong>
            </div>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className={styles.formCard}
          onSubmit={submitForm}
          initial={{
            opacity: 0,
            x: 45,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Honeypot - hidden from real users */}
          <input
            className={styles.honeypot}
            type="text"
            name="website"
            value={formData.website}
            onChange={updateField}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className={styles.formGrid}>
            <label>
              <span>Name</span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={updateField}
                placeholder="John Doe"
                required
              />
            </label>

            <label>
              <span>Email</span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                placeholder="john@example.com"
                required
              />
            </label>
          </div>

          <label>
            <span>Project Details</span>

            <textarea
              name="message"
              value={formData.message}
              onChange={updateField}
              placeholder="Tell me about your project..."
              required
            />
          </label>

          {/* Privacy Notice */}
          <p className={styles.privacyNotice}>
            By submitting this form, you acknowledge our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={status === "loading"}
            data-cursor="dark"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {statusMessage && (
            <p
              className={`${styles.statusMessage} ${
                status === "success" ? styles.success : styles.error
              }`}
            >
              {statusMessage}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}