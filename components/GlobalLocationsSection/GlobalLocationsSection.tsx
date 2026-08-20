"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import styles from "./GlobalLocationsSection.module.css";

export default function GlobalLocationsSection() {
  const locations = siteConfig.locations;

  return (
    <section className={styles.globalLocations}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <motion.div
        className={styles.locHeader}
        initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.sectionLabel}>// Our Global Presence</span>

        <h2>
          We are everywhere <br />
          <span>you need us to be.</span>
        </h2>

        <p>
          Reach out to the office closest to you, or send us a direct message.
          We guarantee a response within 24 hours.
        </p>
      </motion.div>

      <div className={styles.locGrid}>
        {locations.map((location, index) => (
          <motion.article
            className={styles.locCard}
            key={location.country}
            initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src={location.flag}
              alt=""
              aria-hidden="true"
              className={styles.wavingBgFlag}
            />

            <h3>{location.country}</h3>

            <div className={styles.locDetails}>
              <div className={styles.locItem}>
                <span>
                  <FaMapMarkerAlt />
                </span>
                <p>{location.address}</p>
              </div>

              <div className={styles.locItem}>
                <span>
                  <FaPhoneAlt />
                </span>
                <p>
                  <a href={`tel:${location.tel}`}>{location.displayPhone}</a>
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
