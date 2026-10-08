# StackSpacer — Technology Radar Editorial Guide

This document defines the monitoring categories and publish rules for StackSpacer's technology radar content stream. It is an editorial operating guide only. No production code dependency.

---

## CREATE NEW ARTICLE vs UPDATE EXISTING ARTICLE

| Scenario | Action |
|----------|--------|
| New framework/product with distinct search intent | Create new article |
| New release that changes an existing comparison | Update existing article |
| New pricing/capability affecting an existing cost article | Update existing article |
| Major AI model release with new business capabilities | Create new article |
| New agent framework reaches production maturity | Create new article |
| Next.js new feature changes architecture in existing article | Update existing article |
| Existing article already covers the new development | Update the existing article |
| Completely new topic with no existing coverage | Create new article |

**Rule of thumb:** If the existing article can absorb the new information without becoming a duplicate of another page, update it. If the new development represents a distinct search intent that no existing page covers, create a new article.

---

## MONITORING CATEGORIES

### 1. Next.js / React Ecosystem

**Publish when:**
- Major version release (Next.js 15→16 already passed; watch for 17+)
- New App Router capabilities that change business app architecture
- Significant performance or rendering feature changes with business impact
- New official patterns that alter how businesses should build web applications

**Ignore when:**
- Minor patch releases
- Developer-experience improvements without business impact
- Experimental features not yet stable or documented for production
- Confirmed breaking changes announced but not yet released

**Supports:** `/services/web-development`

---

### 2. React Native / Mobile Ecosystem

**Publish when:**
- Major RN version with breaking architectural changes
- New Expo capabilities that affect business app decisions
- Significant performance improvements relevant to production apps
- New iOS/Android platform features that RN supports and businesses should consider

**Ignore when:**
- Minor version bumps
- Experimental features
- Platform-only updates without RN impact
- Academic or research-oriented announcements

**Supports:** `/services/mobile-app-development`

---

### 3. Major AI Models & APIs

**Publish when:**
- New model generation from OpenAI, Anthropic, Google, or Meta
- Material capability changes (reasoning, context window, tool use, cost)
- Significant pricing changes that affect project economics
- New models that enable previously impractical business automation

**Ignore when:**
- Incremental capability improvements within the same model family
- Marginally faster models without capability change
- Consumer-focused updates with no business application
- Rumored or unconfirmed model announcements

**Supports:** `/services/ai-automation`, `/services/machine-learning`

---

### 4. AI Agent Frameworks

**Publish when:**
- New major framework launch (LangChain, LangGraph, CrewAI, AutoGen, etc.)
- Framework reaches production maturity with documented business use cases
- Major platform updates (OpenAI Assistants API changes, Anthropic tool use updates)
- Frameworks that materially change how businesses can build agent systems

**Ignore when:**
- Alpha or beta releases
- Hobbyist or niche frameworks with no production documentation
- Minor feature additions to established frameworks
- Academic papers without production tooling

**Supports:** `/services/ai-automation`

---

### 5. ML Tooling & Infrastructure

**Publish when:**
- New production-ready ML platform features (Vertex AI, Bedrock, Azure ML)
- Significant open-source model releases relevant to business prediction/classification
- MLOps tooling that reduces deployment friction for business applications
- Platforms that make ML accessible to non-specialist businesses

**Ignore when:**
- Academic papers without production tooling
- Research-only models with no deployment path
- Minor library updates
- Purely theoretical advances

**Supports:** `/services/machine-learning`

---

### 6. Developer Infrastructure / Deployment

**Publish when:**
- Major changes to Vercel, Netlify, or cloud provider offerings
- New deployment paradigms that affect business application architecture
- Significant hosting cost or performance changes
- Infrastructure updates that change build-vs-buy decisions

**Ignore when:**
- Pricing tweaks under 10%
- Feature additions that do not change architecture decisions
- Internal tooling updates without external impact
- Incremental platform improvements

**Supports:** `/services/web-development`

---

### 7. Business-Useful Software Engineering Platforms

**Publish when:**
- New platforms that enable non-technical businesses to build software
- Major enterprise tool updates with API or AI capabilities
- Platforms that change the build-vs-buy calculus for business applications
- Low-code/no-code shifts with significant business impact

**Ignore when:**
- Consumer tools with no business application
- Niche developer utilities
- Incremental enterprise feature additions
- Tools targeting individual developers rather than business teams

**Supports:** All services

---

## TECHNOLOGY RADAR DECISION RULE

A new technology or update deserves a StackSpacer article only when **at least one** of these is true:

1. Materially changes how businesses can build software
2. Creates a meaningful AI automation opportunity
3. Reduces development cost or time significantly
4. Introduces a major developer capability relevant to business applications
5. Affects mobile or web architecture decisions for businesses
6. Creates a new buyer question StackSpacer can answer
7. Is generating meaningful relevant search demand (verified via GSC or keyword research)

**Do NOT publish about:**
- Minor version announcements
- Speculation or rumors without official confirmation
- Thin news rewrites of press releases
- Unrelated consumer technology
- Features still in alpha/beta with no production documentation
- Press-release paraphrasing without original analysis

---

## FAST RESPONSE TARGET

For important relevant releases: target editorial turnaround of approximately 24–72 hours after facts are verified.

Prioritize correctness over speed. If an existing article already owns the query, update it instead of creating a duplicate.
