export const site = {
  name: "EditTrack",
  tagline: "Send the client the work. Get paid. Then give them the clean files.",
  nav: [
    { href: "#how", label: "How" },
    { href: "#feedback", label: "Feedback" },
    { href: "#pricing", label: "Pricing" },
    { href: "#questions", label: "Questions" },
  ],
  hero: {
    badge: "For video editors & designers",
    line1: "Get paid before you",
    line2Before: "hand over the ",
    rotating: ["final files.", "clean master.", "high-res export.", "source project."] as const,
    body: "Send a watermarked preview. Your client reviews it, approves it, pays, and the clean files unlock.",
    waitlistLabel: "Work email",
    waitlistPlaceholder: "you@studio.com",
    waitlistCta: "Get early access to EditTrack",
    waitlistSending: "Sending",
    waitlistSuccess: "Spot reserved for",
    waitlistError: "Enter a work email.",
    proof: ["Video Editors", "Graphic Designers", "Creative Agencies"],
  },
  tools: [
    "Premiere",
    "After Effects",
    "DaVinci",
    "Figma",
    "Photoshop",
    "Final Cut",
  ],
  stats: {
    kicker: "The payment problem",
    titleBefore: "Chasing your own ",
    titleAccent: "money.",
    body: "You send the final file. Client says: I'll pay tomorrow. Tomorrow becomes next week. Now you're chasing your own money. EditTrack keeps the final files locked until you're paid.",
    items: [
      { value: "0", label: "Awkward follow-ups" },
      { value: "0%", label: "Commission taken" },
      { value: "1", label: "Link for review & pay" },
      { value: "Instant", label: "Master unlock" },
    ],
  },
  how: {
    kicker: "How it works",
    titleBefore: "Preview. Feedback. ",
    titleAccent: "Get paid.",
    cards: [
      {
        title: "1. Send the preview",
        description:
          "Client gets the full work with a watermark.",
      },
      {
        title: "2. Get feedback",
        description:
          "They comment directly on the work.",
      },
      {
        title: "3. Make changes",
        description:
          "Keep each version and its feedback together.",
      },
      {
        title: "4. Get paid & unlock",
        description:
          "Client approves and pays. Clean final files become available.",
      },
    ],
  },
  studio: {
    kicker: "AI-assisted feedback",
    titleBefore: "Feedback that actually ",
    titleAccent: "means something.",
    body: "When a client says \"the color feels off,\" EditTrack checks what was already agreed — and helps them say what they actually mean. The result is a clear, decided revision note, not another guessing game.",
    // Full feature description: saas-info/ai-feature-brief.md
    // Tier 1 (live: hackathon MVP): voice transcription → summary via Groq whisper + llama
    // Tier 2 (vision): project context lookup → contextual challenge → option presentation → revision note
  },
  ai: {
    kicker: "Context-aware AI",
    titleBefore: "Your project decisions, ",
    titleAccent: "remembered.",
    body: "EditTrack's AI knows what you and your client already agreed on — the brief, the palette decisions, the notes from round one. When new feedback contradicts something that was already settled, it asks the client to clarify before it reaches your to-do list.",
    // Conversation flow for landing page animation (see saas-info/ai-feature-brief.md § Example)
    flow: [
      {
        role: "client" as const,
        text: "the background color isn't looking good here",
      },
      {
        role: "ai" as const,
        text: "The teal was approved in your V1 review based on the brand guide (page 3). Is the palette the issue, or how it's applied in this scene?",
        context: "Brand_Palette_Final.pdf · page 3 · V1 approved",
      },
      {
        role: "client" as const,
        text: "palette is fine, it just feels too strong",
      },
      {
        role: "ai" as const,
        text: "Got it. Here are three options based on your approved palette:",
        options: [
          "A  Teal at 60% opacity — softer, same hue",
          "B  Secondary navy — stronger contrast",
          "C  Light neutral background — color in type only",
        ],
      },
      {
        role: "choice" as const,
        text: "A  Teal at 60% opacity — softer, same hue",
      },
      {
        role: "note" as const,
        text: "Revision note #2: Reduce background teal to 60% opacity in scenes 1–3. Palette approved — issue was intensity, not hue.",
      },
    ],
  },
  review: {
    kicker: "The feedback problem",
    titleBefore: "Show them exactly what you ",
    titleAccent: "mean.",
    body: "Click the exact part you want changed, leave a comment, and keep every request attached to the right version. No more guessing what “that part” means.",
  },
  unlock: {
    kicker: "The gate",
    titleBefore: "Watermarked preview. Locked ",
    titleAccent: "master.",
    body: "Your client can watch or view the whole file. But they cannot download the clean version until they pay the invoice.",
    holdLabel: "Hold to unlock",
    lockedLabel: "PREVIEW → UNPAID",
    unlockedLabel: "MASTER → PAID",
    url: "[ EDITTRACK / PREVIEW ]",
  },
  takes: {
    kicker: "Versions",
    titleBefore: "Take 1 → Feedback → Take 2 → ",
    titleAccent: "Final.",
    before: "Take 1 · comments",
    after: "Take 2 · current version",
    body: "Send the take, not a recap.",
  },
  updates: {
    kicker: "Updates",
    titleBefore: "Send the take, not a ",
    titleAccent: "recap.",
  },
  faq: {
    badge: "Questions",
    title: "How does it actually work?",
    items: [
      {
        id: "q1",
        question: "Does the client pay before they see the work?",
        answer:
          "No. They watch the entire watermarked preview. Payment is required to download the clean final files, not to review the work.",
      },
      {
        id: "q2",
        question: "Can they just screen-record the preview?",
        answer:
          "The watermark is visible on the screen. A screen record will still have the watermark. They have to pay to get the clean files.",
      },
      {
        id: "q3",
        question: "How do revisions work?",
        answer:
          "Each time you upload, it creates a new version. The client's feedback stays attached to that specific version.",
      },
      {
        id: "q4",
        question: "How does the AI work?",
        answer:
          "When a client leaves vague feedback, the AI checks what was already agreed in the project — the brief, previous decisions, reference documents — and asks the client one focused clarifying question. Then it presents a few concrete options. The client picks one, and that becomes a clear revision note for you. No more guessing what \"make it pop more\" means.",
      },
      {
        id: "q5",
        question: "What does it cost?",
        answer:
          "EditTrack takes 0% commission on your client payments. We charge a minor monthly fee to use the platform — no percentage of what you earn.",
      },
    ],
  },
  pricing: {
    kicker: "Simple pricing",
    titleBefore: "You keep 100% of what your client ",
    titleAccent: "pays.",
    body: "EditTrack charges a minor monthly fee. 0% taken from your client payments — ever.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "/ month",
        target: "For freelancers who want to try EditTrack.",
        features: [
          "1 active project",
          "Up to 10 GB storage",
          "Up to 3 takes/revisions per project",
          "Basic client preview",
          "Feedback and comments",
          "Payment unlock",
          "EditTrack watermark",
          "0% commission",
        ],
        excluded: ["AI summaries not included"],
        cta: "Start free",
        popular: false,
      },
      {
        name: "Pro",
        price: "$19",
        period: "/ month",
        target: "For freelancers using EditTrack regularly.",
        features: [
          "20 active projects",
          "250 GB storage",
          "Unlimited takes/revisions",
          "Client preview",
          "Feedback and comments",
          "Payment unlock",
          "100 AI summaries / month",
          "Custom watermark",
          "0% commission",
        ],
        excluded: [] as string[],
        cta: "Get Pro",
        popular: true,
      },
      {
        name: "Agency",
        price: "$49",
        period: "/ month",
        target: "For small creative teams and agencies.",
        features: [
          "Unlimited projects",
          "1 TB storage",
          "Unlimited takes/revisions",
          "Client preview",
          "Feedback and comments",
          "Payment unlock",
          "500 AI summaries / month",
          "3 team seats",
          "Custom watermark",
          "Priority support",
          "0% commission",
        ],
        excluded: [] as string[],
        cta: "Start with Agency",
        popular: false,
      },
    ],
    faqs: [
      {
        id: "p1",
        question: "Do you take a percentage of my client payments?",
        answer: "No. EditTrack takes 0% of your client payment. You pay a minor monthly fee.",
      },
      {
        id: "p2",
        question: "Can I use EditTrack for free?",
        answer: "Yes. The Free plan lets you try the core workflow with one active project.",
      },
      {
        id: "p3",
        question: "What are AI summaries?",
        answer: "They turn client feedback into a simple list of changes for your next version.",
      },
      {
        id: "p4",
        question: "Can I upgrade later?",
        answer: "Yes.",
      },
      {
        id: "p5",
        question: "What happens when I reach my storage limit?",
        answer: "You will need to free up storage or upgrade your plan.",
      },
    ],
  },
  closer: {
    kicker: "Stop chasing clients for payment",
    title: "Get early access to EditTrack.",
    body: "Stop chasing your own money. 0% commission. Work stays private — secret link, never indexed.",
    emailLabel: "Work email",
    emailPlaceholder: "you@studio.com",
    craftLabel: "I am a",
    crafts: [
      { value: "video", label: "Video Editor" },
      { value: "design", label: "Graphic Designer" },
      { value: "agency", label: "Creative Agency" },
      { value: "other", label: "Other" },
    ],
    cta: "Get early access to EditTrack",
    sending: "Requesting",
    success: "Spot reserved for",
  },
  voices: {
    kicker: "Who it's for",
    titleBefore: "Built for freelancers who ",
    titleAccent: "deliver digital work.",
    body: "If you send large files to clients and need to get paid for them, EditTrack is for you.",
    items: [
      {
        id: 1,
        content: "Send cuts, collect feedback, get paid, release the master.",
        author: "Video editors",
        handle: "Premiere, DaVinci, Final Cut",
        platform: "dm" as const,
      },
      {
        id: 2,
        content: "Share previews, track changes, get approval, release final assets.",
        author: "Designers",
        handle: "Figma, Photoshop",
        platform: "tweet" as const,
      },
      {
        id: 3,
        content: "Keep client review, versions, approval, and payment in one place.",
        author: "Creative agencies",
        handle: "Client services",
        platform: "linkedin" as const,
      },
      {
        id: 4,
        content: "Upload the mix, let the client listen, and get paid before they download the WAV.",
        author: "Audio engineers",
        handle: "Pro Tools, Logic",
        platform: "dm" as const,
      },
      {
        id: 5,
        content: "Share the render, get notes on the lighting, lock the final file behind a payment.",
        author: "3D Artists",
        handle: "Blender, Cinema4D",
        platform: "tweet" as const,
      },
      {
        id: 6,
        content: "Deliver the graded timeline with a watermark, get the sign-off, get paid.",
        author: "Colorists",
        handle: "Resolve",
        platform: "dm" as const,
      },
    ],
  },
  footer: {
    blurb: "Review, revise, get paid. Work stays private. No client account needed.",
    status: "Waitlist open",
    product: [
      { href: "#how", label: "How it works" },
      { href: "#feedback", label: "Feedback" },
      { href: "#pricing", label: "Pricing" },
      { href: "#questions", label: "Questions" },
    ],
    legal: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
    company: [{ href: "#access", label: "Waitlist" }],
  },
};
