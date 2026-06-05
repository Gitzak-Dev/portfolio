"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SignalMetricsSection.module.css";

type CardType = "llm" | "rag" | "agent" | "mcp";

const items = [
  {
    id: "01",
    label: "LLM",
    title: "Large Language Model",
    subtitle: "= Brain",
    desc: "Text generation by reasoning. It is the core intelligence layer that understands, predicts, and generates language.",
    footer: "Brain of the AI system",
    element: "Brain",
    type: "llm" as CardType,
  },
  {
    id: "02",
    label: "RAG",
    title: "Retrieval-Augmented Generation",
    subtitle: "= Brain + Books",
    desc: "Connects the model with external knowledge, documents, databases, and context before generating an answer.",
    footer: "Knowledge retrieval layer",
    element: "Brain + Books",
    type: "rag" as CardType,
  },
  {
    id: "03",
    label: "AI AGENT",
    title: "Autonomous AI Agent",
    subtitle: "= Brain + Hands",
    desc: "Plans steps, uses tools, takes actions, remembers context, and completes tasks instead of only writing responses.",
    footer: "Action and tool layer",
    element: "Brain + Hands",
    type: "agent" as CardType,
  },
  {
    id: "04",
    label: "MCP",
    title: "Model Context Protocol",
    subtitle: "= Nervous System",
    desc: "Connects AI models with tools, APIs, memory, databases, and external systems through a structured context layer.",
    footer: "Connection foundation layer",
    element: "Nervous System",
    type: "mcp" as CardType,
  },
];

export default function SignalMetricsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    if (userSelected) {
      const resumeTimer = window.setTimeout(() => {
        setUserSelected(false);
      }, 4400);

      return () => window.clearTimeout(resumeTimer);
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [userSelected]);

  const activateCard = (index: number) => {
    setActiveIndex(index);
    setUserSelected(true);
  };

  return (
    <section className={styles.section} id="signal-metrics">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.kicker}>// AI Human Analogy</span>

          <h2>
            AI systems explained <br />
            <strong>like a human body.</strong>
          </h2>
        </motion.div>

        <motion.div
          className={styles.metricsWrap}
          initial={{ opacity: 0, y: 38, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.metricsGrid}>
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.article
                  key={item.id}
                  tabIndex={0}
                  className={`${styles.metricCard} ${
                    isActive ? styles.activeCard : ""
                  } ${item.type === "agent" ? styles.agentCard : ""}`}
                  onMouseEnter={() => activateCard(index)}
                  onFocus={() => activateCard(index)}
                  onClick={() => activateCard(index)}
                  initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.62,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  aria-label={`${item.label}: ${item.title}`}
                >
                  <div className={styles.topMeta}>
                    <span className={styles.metaIndex}>{item.id}</span>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.metaLabel}>{item.label}</span>
                  </div>

                  <div className={styles.content}>
                    <h3
                      className={`${styles.title} ${
                        isActive ? styles.activeTitle : ""
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className={styles.subtitle}>{item.subtitle}</p>

                    <p className={styles.description}>{item.desc}</p>
                  </div>

                  <div className={styles.visualZone}>
                    <AnalogyVisual type={item.type} isActive={isActive} />
                  </div>

                  <div className={styles.bottomMeta}>
                    <span className={styles.elementBadge}>{item.element}</span>
                    <p className={styles.footerText}>{item.footer}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className={styles.progressArea}>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressThumb}
                animate={{ x: `${activeIndex * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className={styles.mobileIndicators}>
              {items.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={`${styles.mobileDot} ${
                    activeIndex === index ? styles.mobileDotActive : ""
                  }`}
                  onClick={() => activateCard(index)}
                  aria-label={`Show ${item.label} card`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnalogyVisual({
  type,
  isActive,
}: {
  type: CardType;
  isActive: boolean;
}) {
  return (
    <div
      className={`${styles.visualBox} ${
        type === "agent" ? styles.agentVisualBox : ""
      }`}
      aria-hidden="true"
    >
      <motion.div
        className={styles.visualGlow}
        animate={{
          opacity: isActive ? [0.35, 0.72, 0.42] : 0.22,
          scale: isActive ? [0.92, 1.08, 1] : 1,
        }}
        transition={{
          duration: 2.3,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        }}
      />

      {type === "llm" && <LlmIllustration isActive={isActive} />}
      {type === "rag" && <RagIllustration isActive={isActive} />}
      {type === "agent" && <AgentIllustration isActive={isActive} />}
      {type === "mcp" && <McpIllustration isActive={isActive} />}
    </div>
  );
}

function LlmIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg className={styles.svgVisual} viewBox="0 0 360 230" fill="none">
      <defs>
        <linearGradient id="llmBody" x1="34" y1="30" x2="110" y2="185">
          <stop stopColor="#78B9FF" />
          <stop offset="1" stopColor="#305B91" />
        </linearGradient>

        <linearGradient id="llmBrain" x1="70" y1="31" x2="260" y2="148">
          <stop stopColor="#FFD6F3" />
          <stop offset="0.48" stopColor="#CE65DB" />
          <stop offset="1" stopColor="#7E39B7" />
        </linearGradient>

        <linearGradient id="llmPlatform" x1="194" y1="115" x2="330" y2="184">
          <stop stopColor="#8DE8EE" />
          <stop offset="1" stopColor="#2F8A96" />
        </linearGradient>
      </defs>

      <motion.g
        animate={{ y: isActive ? [0, -4, 0] : 0 }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <path
          d="M69 35C47 39 34 58 37 84C40 108 53 126 51 151C49 174 37 190 31 207H116C109 188 98 174 97 151C96 127 110 108 112 84C115 55 94 31 69 35Z"
          fill="url(#llmBody)"
          opacity="0.88"
        />

        <path
          d="M68 53C61 53 55 59 55 67C55 75 61 82 69 82C78 82 84 75 84 67C84 59 77 53 68 53Z"
          fill="url(#llmBrain)"
        />

        <path
          d="M68 82V116M68 116C55 129 52 151 48 173M68 116C80 132 86 152 91 174M68 116C67 142 68 167 68 202"
          stroke="#F8D85A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M53 135C62 139 72 140 82 136M47 158C60 164 78 165 92 159"
          stroke="#C7E8FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
      </motion.g>

      <motion.path
        d="M132 115 C153 105 169 105 190 115"
        stroke="#D8AF25"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="12 9"
        animate={{ pathLength: isActive ? [0.2, 1, 0.2] : 0.65 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <path d="M186 105L202 115L186 125" stroke="#D8AF25" strokeWidth="4" />

      <motion.g
        animate={{
          y: isActive ? [0, -5, 0] : 0,
          scale: isActive ? [1, 1.03, 1] : 1,
        }}
        transition={{ duration: 2.1, repeat: Infinity }}
        style={{ transformOrigin: "255px 120px" }}
      >
        <path
          d="M202 110L283 84L336 113L254 143L202 110Z"
          fill="#BFF8FF"
          stroke="#143942"
          strokeWidth="2"
        />

        <path
          d="M202 110V161L254 194V143L202 110Z"
          fill="#5ABAC5"
          stroke="#143942"
          strokeWidth="2"
        />

        <path
          d="M254 143V194L336 160V113L254 143Z"
          fill="url(#llmPlatform)"
          stroke="#143942"
          strokeWidth="2"
        />

        <path
          d="M243 54C226 49 211 60 213 78C199 83 196 101 209 111C206 128 223 141 239 133C250 149 276 142 277 122C294 127 311 113 307 96C322 84 313 61 295 62C290 43 264 39 253 54C250 52 247 53 243 54Z"
          fill="url(#llmBrain)"
          stroke="#3B155C"
          strokeWidth="3"
        />

        <path
          d="M232 75C244 78 248 90 241 101M261 65C253 82 258 97 272 104M285 76C296 84 295 100 284 107"
          stroke="#5B2576"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <text
          x="266"
          y="172"
          fill="#FFF"
          fontSize="31"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          LLM
        </text>

        {[0, 1, 2, 3].map((item) => (
          <motion.circle
            key={item}
            cx={[207, 300, 323, 228][item]}
            cy={[70, 50, 83, 135][item]}
            r="4"
            fill={["#D8AF25", "#8DE8EE", "#CE65DB", "#D8AF25"][item]}
            animate={{ opacity: isActive ? [0.3, 1, 0.3] : 0.35 }}
            transition={{
              duration: 1.6,
              delay: item * 0.18,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

function RagIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg className={styles.svgVisual} viewBox="0 0 360 230" fill="none">
      <defs>
        <linearGradient id="ragPurple" x1="188" y1="91" x2="332" y2="184">
          <stop stopColor="#A987FF" />
          <stop offset="1" stopColor="#5330A3" />
        </linearGradient>

        <linearGradient id="ragBook" x1="33" y1="49" x2="106" y2="164">
          <stop stopColor="#FFD76A" />
          <stop offset="0.46" stopColor="#7AB8FF" />
          <stop offset="1" stopColor="#C05B98" />
        </linearGradient>
      </defs>

      <motion.g
        animate={{ y: isActive ? [0, -4, 0] : 0 }}
        transition={{ duration: 2.1, repeat: Infinity }}
      >
        <path
          d="M35 62L92 42L125 61L68 82L35 62Z"
          fill="#8E64E7"
          stroke="#271445"
          strokeWidth="2"
        />
        <path
          d="M38 84L96 64L129 82L71 103L38 84Z"
          fill="#69B7FF"
          stroke="#143047"
          strokeWidth="2"
        />
        <path
          d="M32 108L91 88L124 107L65 128L32 108Z"
          fill="#FFD96B"
          stroke="#60460D"
          strokeWidth="2"
        />
        <path
          d="M38 133L99 112L132 131L71 153L38 133Z"
          fill="#E76D9D"
          stroke="#4F1831"
          strokeWidth="2"
        />
        <path
          d="M31 158L90 137L124 155L65 178L31 158Z"
          fill="#4D79C9"
          stroke="#17284A"
          strokeWidth="2"
        />

        <path
          d="M68 82V96M71 103V121M65 128V145M71 153V168M65 178V190"
          stroke="#FFF3D3"
          strokeWidth="5"
        />
      </motion.g>

      <motion.path
        d="M136 116 C157 104 172 105 193 116"
        stroke="#D8AF25"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="12 9"
        animate={{ pathLength: isActive ? [0.2, 1, 0.2] : 0.65 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <path d="M190 106L207 116L190 126" stroke="#D8AF25" strokeWidth="4" />

      <motion.g
        animate={{
          y: isActive ? [0, -5, 0] : 0,
          scale: isActive ? [1, 1.025, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "260px 130px" }}
      >
        <path
          d="M199 118L285 88L338 118L251 151L199 118Z"
          fill="#C9B3FF"
          stroke="#291445"
          strokeWidth="2"
        />

        <path
          d="M199 118V164L251 197V151L199 118Z"
          fill="#7652D1"
          stroke="#291445"
          strokeWidth="2"
        />

        <path
          d="M251 151V197L338 163V118L251 151Z"
          fill="url(#ragPurple)"
          stroke="#291445"
          strokeWidth="2"
        />

        <path
          d="M224 79L278 59L312 78L258 99L224 79Z"
          fill="#8365DD"
          stroke="#291445"
          strokeWidth="2"
        />
        <path
          d="M232 96L287 77L319 95L264 115L232 96Z"
          fill="#3E90DB"
          stroke="#12304C"
          strokeWidth="2"
        />
        <path
          d="M222 113L278 94L312 112L255 133L222 113Z"
          fill="#FFF2C2"
          stroke="#5C4C1F"
          strokeWidth="2"
        />

        <ellipse
          cx="207"
          cy="97"
          rx="15"
          ry="7"
          fill="#98D8FF"
          stroke="#12304C"
          strokeWidth="2"
        />
        <path
          d="M192 97V123C192 127 199 131 207 131C216 131 223 127 223 123V97"
          fill="#5795C8"
          stroke="#12304C"
          strokeWidth="2"
        />
        <ellipse
          cx="207"
          cy="122"
          rx="15"
          ry="7"
          fill="#78BDE9"
          stroke="#12304C"
          strokeWidth="2"
        />

        <path
          d="M318 71L344 78V128L318 121V71Z"
          fill="#FFF7D9"
          stroke="#2A2344"
          strokeWidth="2"
        />
        <path
          d="M324 86H339M324 96H339M324 106H334"
          stroke="#6B6494"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <text
          x="270"
          y="176"
          fill="#FFF"
          fontSize="31"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          RAG
        </text>

        {[0, 1, 2, 3].map((item) => (
          <motion.path
            key={item}
            d={[
              "M214 61L218 67L224 61L218 55Z",
              "M327 52L331 58L337 52L331 46Z",
              "M236 139L240 145L246 139L240 133Z",
              "M300 132L304 138L310 132L304 126Z",
            ][item]}
            fill={["#D8AF25", "#A987FF", "#8DE8EE", "#D8AF25"][item]}
            animate={{ opacity: isActive ? [0.25, 1, 0.25] : 0.34 }}
            transition={{
              duration: 1.7,
              delay: item * 0.17,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

function AgentIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className={`${styles.svgVisual} ${styles.agentSvgVisual}`}
      viewBox="0 0 360 230"
      fill="none"
    >
      <defs>
        <linearGradient id="agentBody" x1="31" y1="36" x2="116" y2="189">
          <stop stopColor="#7BC2FF" />
          <stop offset="1" stopColor="#345C91" />
        </linearGradient>

        <linearGradient id="agentYellow" x1="192" y1="112" x2="338" y2="185">
          <stop stopColor="#FFE99B" />
          <stop offset="1" stopColor="#D8AF25" />
        </linearGradient>

        <linearGradient id="agentBrain" x1="56" y1="48" x2="95" y2="82">
          <stop stopColor="#FFD6F3" />
          <stop offset="1" stopColor="#B951D4" />
        </linearGradient>
      </defs>

      <motion.g
        animate={{ y: isActive ? [0, -4, 0] : 0 }}
        transition={{ duration: 2.1, repeat: Infinity }}
      >
        <path
          d="M68 38C46 42 34 60 37 84C41 113 55 127 53 151C51 173 38 190 31 207H119C111 190 99 173 98 151C97 127 111 112 114 84C117 57 94 33 68 38Z"
          fill="url(#agentBody)"
          opacity="0.88"
        />

        <path
          d="M67 55C59 55 53 62 53 70C53 78 60 84 68 84C77 84 84 78 84 70C84 62 76 55 67 55Z"
          fill="url(#agentBrain)"
        />
        <path
          d="M69 84V118M69 118C58 130 52 153 47 174M69 118C82 132 88 153 94 174"
          stroke="#F8D85A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <motion.circle
          cx="70"
          cy="128"
          r="10"
          fill="#FFDF6E"
          animate={{ scale: isActive ? [1, 1.25, 1] : 1 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />

        <motion.path
          d="M42 155C31 153 26 141 31 132M99 156C112 154 118 141 112 130"
          stroke="#FFDF6E"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ y: isActive ? [0, -5, 0] : 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.g>

      <motion.path
        d="M136 116 C157 104 172 105 193 116"
        stroke="#D8AF25"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="12 9"
        animate={{ pathLength: isActive ? [0.2, 1, 0.2] : 0.65 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <path d="M190 106L207 116L190 126" stroke="#D8AF25" strokeWidth="4" />

      <motion.g
        animate={{
          y: isActive ? [0, -5, 0] : 0,
          scale: isActive ? [1, 1.025, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "260px 133px" }}
      >
        <path
          d="M194 119L284 89L340 119L250 153L194 119Z"
          fill="#FFEFC1"
          stroke="#49330A"
          strokeWidth="2"
        />

        <path
          d="M194 119V166L250 199V153L194 119Z"
          fill="#D6A728"
          stroke="#49330A"
          strokeWidth="2"
        />

        <path
          d="M250 153V199L340 164V119L250 153Z"
          fill="url(#agentYellow)"
          stroke="#49330A"
          strokeWidth="2"
        />

        <rect
          x="254"
          y="70"
          width="50"
          height="73"
          rx="8"
          fill="#77D8F2"
          stroke="#163F4A"
          strokeWidth="3"
          transform="rotate(-13 254 70)"
        />
        <path
          d="M264 91L274 97L292 79M269 112L279 118L299 99"
          stroke="#1F6980"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <motion.path
          d="M224 83C210 72 196 75 191 90L207 99C211 91 216 88 225 94"
          stroke="#DDE8F1"
          strokeWidth="13"
          strokeLinecap="round"
          animate={{ rotate: isActive ? [0, -6, 0] : 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ transformOrigin: "207px 91px" }}
        />

        <motion.path
          d="M315 78C331 73 343 82 344 98L326 102C325 94 320 90 311 91"
          stroke="#DDE8F1"
          strokeWidth="13"
          strokeLinecap="round"
          animate={{ rotate: isActive ? [0, 6, 0] : 0 }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ transformOrigin: "327px 91px" }}
        />

        <circle
          cx="207"
          cy="99"
          r="9"
          fill="#6EA8D8"
          stroke="#163F4A"
          strokeWidth="3"
        />
        <circle
          cx="326"
          cy="102"
          r="9"
          fill="#6EA8D8"
          stroke="#163F4A"
          strokeWidth="3"
        />

        <path
          d="M215 140L244 132L258 139L228 148L215 140Z"
          fill="#FFF8DF"
          stroke="#49330A"
          strokeWidth="2"
        />
        <path d="M224 136L240 132" stroke="#876A23" strokeWidth="2" />
        <path
          d="M237 128L254 122"
          stroke="#49330A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <text
          x="270"
          y="180"
          fill="#FFF"
          fontSize="26"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          AI Agent
        </text>
      </motion.g>
    </svg>
  );
}

function McpIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg className={styles.svgVisual} viewBox="0 0 360 230" fill="none">
      <defs>
        <linearGradient id="mcpBody" x1="31" y1="28" x2="118" y2="204">
          <stop stopColor="#89C9FF" />
          <stop offset="1" stopColor="#335B92" />
        </linearGradient>

        <linearGradient id="mcpBase" x1="188" y1="115" x2="338" y2="185">
          <stop stopColor="#98EEF3" />
          <stop offset="1" stopColor="#3797A5" />
        </linearGradient>
      </defs>

      <motion.g
        animate={{ y: isActive ? [0, -4, 0] : 0 }}
        transition={{ duration: 2.1, repeat: Infinity }}
      >
        <path
          d="M69 36C46 40 34 60 37 86C41 112 55 128 53 153C51 175 39 190 32 207H119C111 188 99 174 98 153C97 128 111 112 114 86C117 57 94 32 69 36Z"
          fill="url(#mcpBody)"
          opacity="0.88"
        />

        <path
          d="M67 53C59 53 53 60 53 68C53 76 60 82 68 82C77 82 84 76 84 68C84 60 76 53 67 53Z"
          fill="#C971DE"
        />

        <path
          d="M68 83V205M68 108C56 116 45 127 38 143M68 108C81 117 91 128 99 144M68 136C56 147 47 158 43 174M68 136C82 147 91 160 97 176M68 166C58 175 52 188 49 202M68 166C79 176 86 190 89 204"
          stroke="#FFDD62"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.path
        d="M136 116 C157 104 172 105 193 116"
        stroke="#D8AF25"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="12 9"
        animate={{ pathLength: isActive ? [0.2, 1, 0.2] : 0.65 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <path d="M190 106L207 116L190 126" stroke="#D8AF25" strokeWidth="4" />

      <motion.g
        animate={{
          y: isActive ? [0, -5, 0] : 0,
          scale: isActive ? [1, 1.025, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "260px 133px" }}
      >
        <path
          d="M194 119L284 89L340 119L250 153L194 119Z"
          fill="#C7FBFF"
          stroke="#153F46"
          strokeWidth="2"
        />

        <path
          d="M194 119V166L250 199V153L194 119Z"
          fill="#5ABAC5"
          stroke="#153F46"
          strokeWidth="2"
        />

        <path
          d="M250 153V199L340 164V119L250 153Z"
          fill="url(#mcpBase)"
          stroke="#153F46"
          strokeWidth="2"
        />

        <path
          d="M221 118H308M265 97V150M227 135L301 105M228 105L304 137"
          stroke="#D8AF25"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />

        {[
          [221, 118],
          [265, 97],
          [308, 118],
          [265, 150],
          [227, 135],
          [301, 105],
          [228, 105],
          [304, 137],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r="5"
            fill="#D8AF25"
            animate={{
              scale: isActive ? [1, 1.35, 1] : 1,
              opacity: isActive ? [0.55, 1, 0.55] : 0.55,
            }}
            transition={{ duration: 1.5, delay: index * 0.1, repeat: Infinity }}
          />
        ))}

        <rect
          x="246"
          y="111"
          width="45"
          height="38"
          rx="7"
          fill="#5841C6"
          stroke="#20145B"
          strokeWidth="3"
        />
        <text
          x="268.5"
          y="136"
          fill="white"
          fontSize="18"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          API
        </text>

        <rect
          x="209"
          y="82"
          width="30"
          height="26"
          rx="4"
          fill="#416EDB"
          stroke="#17284A"
          strokeWidth="2"
        />
        <path
          d="M217 96L222 90L229 99"
          stroke="#E8F6FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="302"
          y="74"
          width="31"
          height="24"
          rx="4"
          fill="#E8F6FF"
          stroke="#17284A"
          strokeWidth="2"
        />
        <path
          d="M309 88L314 82L320 91L325 84"
          stroke="#D8AF25"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <ellipse
          cx="330"
          cy="111"
          rx="13"
          ry="6"
          fill="#89C9FF"
          stroke="#17284A"
          strokeWidth="2"
        />
        <path
          d="M317 111V134C317 138 323 141 330 141C338 141 343 138 343 134V111"
          fill="#5A9DD2"
          stroke="#17284A"
          strokeWidth="2"
        />

        <text
          x="270"
          y="181"
          fill="#FFF"
          fontSize="31"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          MCP
        </text>
      </motion.g>
    </svg>
  );
}