export type ProjectTheme = "mobile" | "ai" | "ml" | "web" | "business";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  timeline: string;
  tech: string;
  liveUrl: string;
  desc: string;
  tags: string[];
  theme: ProjectTheme;
  previewImage?: string;
  heroText: string;
  overviewTitle: string;
  overviewText: string;
  roadmap: {
    step: string;
    title: string;
    desc: string;
  }[];
  challenge: {
    title: string;
    items: string[];
  };
  benchmarks: {
    title: string;
    items: string[];
  };
  solutionIntro: string;
  solutionCards: {
    title: string;
    desc: string;
  }[];
  stack: {
    name: string;
    label: string;
  }[];
  impact: {
    value: string;
    label: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
  };
  finalCta: {
    title: string;
    text: string;
  };
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "mobile-app-dashboard",
    title: "Mobile App Dashboard",
    category: "Mobile App Development",
    year: "2026",
    timeline: "1 Month",
    tech: "React Native",
    liveUrl: "#",
    desc: "A clean mobile application interface built with smooth flows, scalable components, and a responsive product experience.",
    tags: ["Flutter", "Dart", "Mobile App", "UI Design", "React Native"],
    theme: "mobile",
    heroText:
      "A mobile-first product experience designed for clean navigation, fast user actions, and scalable app growth.",
    overviewTitle:
      "A modern mobile app dashboard built for users who need speed, clarity, and simple control.",
    overviewText:
      "The goal was to create a mobile interface that feels polished without becoming complicated. Every screen was planned around clear hierarchy, readable content, fast actions, and a structure that can grow as new features are added.",
    roadmap: [
      {
        step: "Step 01",
        title: "UX Mapping",
        desc: "Defined the main user journeys, screen structure, and app navigation flow.",
      },
      {
        step: "Step 02",
        title: "Interface Design",
        desc: "Created a clean mobile UI with strong spacing, readable cards, and focused actions.",
      },
      {
        step: "Step 03",
        title: "Development",
        desc: "Built reusable components, API-ready sections, and responsive app layouts.",
      },
      {
        step: "Step 04",
        title: "Testing",
        desc: "Tested user flow, button states, mobile scaling, and interaction consistency.",
      },
    ],
    challenge: {
      title: "Product Needs",
      items: [
        "Clean dashboard experience",
        "Mobile-first structure",
        "Reusable interface components",
        "Fast navigation flow",
      ],
    },
    benchmarks: {
      title: "App Benchmarks",
      items: [
        "Responsive screen layout",
        "Clear action hierarchy",
        "Reusable card system",
        "Scalable UI structure",
      ],
    },
    solutionIntro:
      "The solution focused on a compact interface system that keeps the app simple while leaving room for future features.",
    solutionCards: [
      {
        title: "Mobile-first UI",
        desc: "Every layout was designed for smaller screens first, then scaled for larger devices.",
      },
      {
        title: "Reusable Components",
        desc: "Cards, buttons, status blocks, and sections were structured for repeatable use.",
      },
      {
        title: "Clear Navigation",
        desc: "The user flow was simplified so important actions are easy to find.",
      },
      {
        title: "Scalable Build",
        desc: "The app structure supports future modules without needing a full rebuild.",
      },
    ],
    stack: [
      { name: "React Native", label: "Mobile Framework" },
      { name: "Firebase", label: "Backend Ready" },
      { name: "API", label: "Data Integration" },
    ],
    impact: [
      { value: "30+", label: "Screens Planned" },
      { value: "100%", label: "Mobile First" },
      { value: "Fast", label: "User Flow" },
    ],
    testimonial: {
      quote:
        "The mobile app structure was clean, professional, and easy to understand. It felt like a real product from the first version.",
      author: "Alex, Mobile Startup Founder",
    },
    finalCta: {
      title: "Build your next app.",
      text: "Ready to turn your mobile idea into a clean product experience?",
    },
  },
  {
    id: "02",
    slug: "ai-automation-suite",
    title: "AI Automation Suite",
    category: "AI Development",
    year: "2026",
    timeline: "3 Weeks",
    tech: "OpenAI",
    liveUrl: "#",
    desc: "An AI-powered workflow system designed to automate repetitive tasks, generate smart responses, and improve team efficiency.",
    tags: ["AI Development", "Automation", "Chatbots"],
    theme: "ai",
    heroText:
      "A smart automation system built to reduce repetitive work, speed up responses, and simplify business operations.",
    overviewTitle:
      "An AI workflow system that helps businesses work faster without adding more manual tasks.",
    overviewText:
      "The project focused on creating a practical automation system that can handle repeatable tasks, generate useful outputs, and support business teams with reliable AI-powered workflows.",
    roadmap: [
      {
        step: "Step 01",
        title: "Workflow Audit",
        desc: "Identified repetitive tasks, manual delays, and automation opportunities.",
      },
      {
        step: "Step 02",
        title: "Prompt Strategy",
        desc: "Designed structured prompts and reusable AI actions for consistent outputs.",
      },
      {
        step: "Step 03",
        title: "System Build",
        desc: "Connected AI logic, backend actions, and workflow triggers.",
      },
      {
        step: "Step 04",
        title: "Refinement",
        desc: "Tested response quality, edge cases, and real usage scenarios.",
      },
    ],
    challenge: {
      title: "Automation Needs",
      items: [
        "Reduce repetitive manual work",
        "Keep AI responses consistent",
        "Connect workflows to business tasks",
        "Make the system easy to use",
      ],
    },
    benchmarks: {
      title: "AI Benchmarks",
      items: [
        "Structured prompt system",
        "Reusable automation logic",
        "Fast response generation",
        "Clear workflow triggers",
      ],
    },
    solutionIntro:
      "The AI system was designed around simple workflows, clean logic, and repeatable outputs that can be used every day.",
    solutionCards: [
      {
        title: "Prompt Logic",
        desc: "Created reusable prompt structures for consistent and useful AI responses.",
      },
      {
        title: "Automation Flow",
        desc: "Mapped repeated tasks into clear automated actions and triggers.",
      },
      {
        title: "Smart Output",
        desc: "Designed the AI responses to feel practical, clean, and business-ready.",
      },
      {
        title: "System Control",
        desc: "Kept the workflow simple so users can understand and manage the automation.",
      },
    ],
    stack: [
      { name: "OpenAI", label: "AI Engine" },
      { name: "Node.js", label: "Backend Logic" },
      { name: "API", label: "Integrations" },
    ],
    impact: [
      { value: "8hrs", label: "Weekly Time Saved" },
      { value: "20+", label: "AI Actions" },
      { value: "Fast", label: "Delivery" },
    ],
    testimonial: {
      quote:
        "The automation system saved time immediately. Everything was explained clearly and the workflow felt easy to manage.",
      author: "Huda, Digital Business Owner",
    },
    finalCta: {
      title: "Automate your workflow.",
      text: "Ready to build an AI system that saves time and works smarter?",
    },
  },
  {
    id: "03",
    slug: "ml-prediction-system",
    title: "ML Prediction System",
    category: "Machine Learning",
    year: "2025",
    timeline: "4 Weeks",
    tech: "Python",
    liveUrl: "#",
    desc: "A machine learning model dashboard that converts raw data into predictions, insights, and decision-ready outputs.",
    tags: ["Machine Learning", "Python", "Data"],
    theme: "ml",
    previewImage: "/projects/ml-stock-dashboard.png",
    heroText:
      "A machine learning dashboard built to turn raw data into clear predictions, insights, and decision-ready outputs.",
    overviewTitle:
      "A practical machine learning system designed for clarity, not complexity.",
    overviewText:
      "The goal was to take technical model outputs and present them in a way that business users can actually understand. The interface focuses on prediction summaries, data visibility, and clean insight presentation.",
    roadmap: [
      {
        step: "Step 01",
        title: "Data Review",
        desc: "Reviewed the dataset, structure, missing values, and prediction goals.",
      },
      {
        step: "Step 02",
        title: "Model Planning",
        desc: "Defined model inputs, outputs, and the best way to present results.",
      },
      {
        step: "Step 03",
        title: "Dashboard Build",
        desc: "Built prediction views, summary cards, and insight sections.",
      },
      {
        step: "Step 04",
        title: "Validation",
        desc: "Checked model behaviour, usability, and decision clarity.",
      },
    ],
    challenge: {
      title: "Data Needs",
      items: [
        "Convert raw data into insight",
        "Explain predictions clearly",
        "Avoid technical overload",
        "Create decision-ready visuals",
      ],
    },
    benchmarks: {
      title: "ML Benchmarks",
      items: [
        "Readable prediction output",
        "Clean dashboard layout",
        "Data-driven summaries",
        "Scalable model structure",
      ],
    },
    solutionIntro:
      "The system was designed to make data easier to understand through simple visuals, clear labels, and structured prediction results.",
    solutionCards: [
      {
        title: "Prediction View",
        desc: "Presented model output in a clean interface that non-technical users can understand.",
      },
      {
        title: "Data Summary",
        desc: "Added summary sections to help users understand what the data is showing.",
      },
      {
        title: "Model Structure",
        desc: "Kept the model logic organized and easy to improve later.",
      },
      {
        title: "Decision Support",
        desc: "Focused on outputs that help users make practical decisions quickly.",
      },
    ],
    stack: [
      { name: "Python", label: "Core Stack" },
      { name: "ML Model", label: "Prediction Logic" },
      { name: "Data", label: "Insight Engine" },
    ],
    impact: [
      { value: "15+", label: "Model Outputs" },
      { value: "Data", label: "Driven" },
      { value: "Clear", label: "Insights" },
    ],
    testimonial: {
      quote:
        "The dashboard made the data easier to understand. The final system was practical, clean, and useful for decision-making.",
      author: "Ahmed Khalil, CEO",
    },
    finalCta: {
      title: "Turn data into insight.",
      text: "Ready to build a machine learning system that makes data useful?",
    },
  },
  {
    id: "04",
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    category: "Web Design & Development",
    year: "2026",
    timeline: "2 Weeks",
    tech: "Next.js",
    liveUrl: "#",
    desc: "A premium portfolio experience with scroll animation, interactive sections, dynamic motion, and strong visual hierarchy.",
    tags: ["Next.js", "Framer Motion", "CSS"],
    theme: "web",
    heroText:
      "A premium developer portfolio built with motion, personality, responsive design, and strong visual hierarchy.",
    overviewTitle:
      "A portfolio experience designed to feel like a digital product, not just a personal website.",
    overviewText:
      "The site combines custom cursor behaviour, animated hero sections, scroll-based interactions, hover effects, responsive layouts, and premium visual direction to create a memorable developer brand.",
    roadmap: [
      {
        step: "Step 01",
        title: "Direction",
        desc: "Defined the dark visual style, motion language, and developer positioning.",
      },
      {
        step: "Step 02",
        title: "Components",
        desc: "Built reusable sections for hero, services, portfolio, testimonials, and CTA.",
      },
      {
        step: "Step 03",
        title: "Animation",
        desc: "Added scroll animation, hover interactions, custom cursor, and section reveals.",
      },
      {
        step: "Step 04",
        title: "Responsive",
        desc: "Optimized layouts for desktop, tablet, and mobile devices.",
      },
    ],
    challenge: {
      title: "Portfolio Needs",
      items: [
        "Premium first impression",
        "Interactive motion experience",
        "Responsive structure",
        "Clean project presentation",
      ],
    },
    benchmarks: {
      title: "Build Benchmarks",
      items: [
        "Next.js routing",
        "Framer Motion animation",
        "Reusable components",
        "Mobile responsive layout",
      ],
    },
    solutionIntro:
      "The portfolio was structured as a full experience, with each section designed to feel distinct while staying inside one visual system.",
    solutionCards: [
      {
        title: "Motion Hero",
        desc: "Built a scroll-based hero that changes model, icons, text, and content.",
      },
      {
        title: "Custom Sections",
        desc: "Created unique sections including snake text, metrics, services, and case studies.",
      },
      {
        title: "Premium Styling",
        desc: "Used dark backgrounds, gold highlights, soft glows, and sharp typography.",
      },
      {
        title: "Responsive System",
        desc: "Adjusted every section for mobile and tablet layouts.",
      },
    ],
    stack: [
      { name: "Next.js", label: "Framework" },
      { name: "Motion", label: "Animation" },
      { name: "CSS", label: "Styling" },
    ],
    impact: [
      { value: "100%", label: "Responsive" },
      { value: "Motion", label: "Driven" },
      { value: "Clean", label: "Code" },
    ],
    testimonial: {
      quote:
        "The portfolio, animations, layout, and mobile responsiveness came together beautifully. It feels premium and different.",
      author: "Sebastian, Personal Brand Owner",
    },
    finalCta: {
      title: "Design your digital presence.",
      text: "Ready to create a portfolio that feels premium and memorable?",
    },
  },
  {
    id: "05",
    slug: "business-website-system",
    title: "Business Website System",
    category: "Full Stack Development",
    year: "2025",
    timeline: "1 Month",
    tech: "Next.js",
    liveUrl: "#",
    desc: "A conversion-focused business website structure with strong landing sections, enquiry flows, and performance-first build.",
    tags: ["Next.js", "Backend", "SEO"],
    theme: "business",
    heroText:
      "A conversion-focused business website system built to guide visitors from first impression to enquiry.",
    overviewTitle:
      "A business website structure built for trust, clarity, speed, and conversion.",
    overviewText:
      "This project focused on creating a strong online presence with service sections, enquiry flow, SEO-friendly structure, fast loading, and clear calls-to-action.",
    roadmap: [
      {
        step: "Step 01",
        title: "Content Strategy",
        desc: "Planned the offer, service flow, and conversion points.",
      },
      {
        step: "Step 02",
        title: "Design System",
        desc: "Created a clean website structure with strong hierarchy and CTAs.",
      },
      {
        step: "Step 03",
        title: "Development",
        desc: "Built responsive pages, reusable sections, and enquiry-ready components.",
      },
      {
        step: "Step 04",
        title: "Optimization",
        desc: "Improved performance, SEO structure, and mobile experience.",
      },
    ],
    challenge: {
      title: "Business Needs",
      items: [
        "Clear service presentation",
        "Better enquiry flow",
        "Trust-building layout",
        "Fast mobile experience",
      ],
    },
    benchmarks: {
      title: "Website Benchmarks",
      items: [
        "SEO-ready sections",
        "Responsive design",
        "Conversion-focused CTAs",
        "Performance-first build",
      ],
    },
    solutionIntro:
      "The website was built around clear messaging, simple navigation, trust signals, and direct enquiry pathways.",
    solutionCards: [
      {
        title: "Landing Structure",
        desc: "Designed sections to quickly explain who the business helps and what it offers.",
      },
      {
        title: "Conversion Flow",
        desc: "Placed CTAs and enquiry points where users naturally make decisions.",
      },
      {
        title: "SEO Layout",
        desc: "Structured content for better search visibility and local service discovery.",
      },
      {
        title: "Fast Build",
        desc: "Built clean responsive pages that feel smooth and reliable.",
      },
    ],
    stack: [
      { name: "Next.js", label: "Frontend" },
      { name: "Backend", label: "Forms" },
      { name: "SEO", label: "Growth" },
    ],
    impact: [
      { value: "Lead", label: "Focused" },
      { value: "Fast", label: "Loading" },
      { value: "SEO", label: "Ready" },
    ],
    testimonial: {
      quote:
        "The website looked professional, loaded fast, and made the business much easier to understand online.",
      author: "Business Website Client",
    },
    finalCta: {
      title: "Build a website that sells.",
      text: "Ready to create a business website that turns visitors into enquiries?",
    },
  },
];