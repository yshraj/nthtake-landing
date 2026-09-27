export const site = {
  name: "Nthtake",
  tagline: "Send the client the work. Get paid. Then give them the clean files.",
  nav: [
    { href: "#how", label: "How" },
    { href: "#feedback", label: "Feedback" },
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
    waitlistCta: "Get early access to Nthtake",
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
    body: "You send the final file. Client says: I'll pay tomorrow. Tomorrow becomes next week. Now you're chasing your own money. Nthtake keeps the final files locked until you're paid.",
    items: [
      { value: "0", label: "Awkward follow-ups" },
      { value: "Minor", label: "Monthly fees" },
      { value: "1", label: "Link for review & pay" },
      { value: "Instant", label: "Master unlock" },
    ],
  },
  how: {
    kicker: "How it works",
    titleBefore: "Preview. Approve. ",
    titleAccent: "Pay.",
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
    kicker: "AI assistance",
    titleBefore: "Turn client comments into a ",
    titleAccent: "to-do list",
    body: "Client gives feedback. Nthtake helps turn that feedback into a clear list of changes for the next version.",
  },
  review: {
    kicker: "The feedback problem",
    titleBefore: "One project. Every ",
    titleAccent: "version.",
    body: "Stop tracking feedback across WhatsApp, Email, and Drive. Every version, and every comment, stays in one place until final approval.",
  },
  unlock: {
    kicker: "The gate",
    titleBefore: "Watermarked preview. Locked ",
    titleAccent: "master.",
    body: "Your client can watch or view the whole file. But they cannot download the clean version until they pay the invoice.",
    holdLabel: "Hold to unlock",
    lockedLabel: "PREVIEW → UNPAID",
    unlockedLabel: "MASTER → PAID",
    url: "[ NTHTAKE / PREVIEW ]",
  },
  takes: {
    kicker: "Versions",
    titleBefore: "Take 1 → Feedback → Take 2 → ",
    titleAccent: "Final.",
    before: "Take 1 · comments",
    after: "Take 2 · current version",
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
          "If the client leaves messy comments, Nthtake can turn those comments into a simple bulleted list of changes for you to make.",
      },
      {
        id: "q5",
        question: "What does it cost?",
        answer:
          "There is no expensive subscription. We charge a minor monthly fee to use the tool.",
      },
    ],
  },
  closer: {
    kicker: "Stop chasing clients for payment",
    title: "Get early access to Nthtake.",
    body: "Stop chasing your own money. No expensive subscriptions.",
    emailLabel: "Work email",
    emailPlaceholder: "you@studio.com",
    craftLabel: "I am a",
    crafts: [
      { value: "video", label: "Video Editor" },
      { value: "design", label: "Graphic Designer" },
      { value: "agency", label: "Creative Agency" },
      { value: "other", label: "Other" },
    ],
    cta: "Get early access to Nthtake",
    sending: "Requesting",
    success: "Spot reserved for",
  },
  voices: {
    kicker: "Who it's for",
    titleBefore: "Built for freelancers who ",
    titleAccent: "deliver digital work.",
    body: "If you send large files to clients and need to get paid for them, Nthtake is for you.",
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
    blurb: "Send the client the work. Get paid. Then give them the clean files.",
    status: "Waitlist open",
    product: [
      { href: "#how", label: "How it works" },
      { href: "#feedback", label: "Feedback" },
      { href: "#questions", label: "Questions" },
    ],
    legal: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
    company: [{ href: "#access", label: "Waitlist" }],
  },
};
