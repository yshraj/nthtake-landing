export const site = {
  name: "Nthtake",
  tagline: "One studio link to review, revise, and unlock the master.",
  nav: [
    { href: "#how", label: "How" },
    { href: "#takes", label: "Takes" },
    { href: "#questions", label: "Questions" },
  ],
  hero: {
    badge: "Waitlist - video & design",
    line1: "Less back-and-forth.",
    line2Before: "Clearer ",
    rotating: ["feedback.", "takes.", "rounds.", "pay."] as const,
    body: "Send a watermarked preview. The client marks the take. When they pay, the master unlocks.",
    waitlistLabel: "Work email",
    waitlistPlaceholder: "you@studio.com",
    waitlistCta: "Get early access",
    waitlistSending: "Sending",
    waitlistSuccess: "Spot reserved for",
    waitlistError: "Enter a work email.",
    proof: ["3,200 freelancers", "Minor monthly fees", "No subscription"],
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
    kicker: "The hole in the handoff",
    titleBefore: "Ghosting after ",
    titleAccent: "delivery.",
    body: "A single question about unpaid finished work pulled 3,200 freelancer replies. Nthtake keeps the master locked until the client pays.",
    items: [
      { value: "3,200", label: "Freelancers asked" },
      { value: "Minor", label: "Monthly fees" },
      { value: "1", label: "Studio link" },
      { value: "0", label: "Subscriptions" },
    ],
  },
  how: {
    kicker: "How it works",
    titleBefore: "One round. Then the next ",
    titleAccent: "take.",
    cards: [
      {
        title: "Lock brief",
        description:
          "Scope, due date, and fee live on the link before anyone cuts.",
      },
      {
        title: "Cut version",
        description:
          "Upload the take. We stream a watermarked preview. No blind download.",
      },
      {
        title: "Client reviews",
        description:
          "Numbered notes on the timeline. No email recap of what they already said.",
      },
      {
        title: "Approve",
        description:
          "They pay. The watermark drops. Masters unlock.",
      },
    ],
  },
  studio: {
    kicker: "Studio tools",
    titleBefore: "Cuts in the tools you ",
    titleAccent: "already use",
    body: "Premiere, After Effects, DaVinci, Figma, Photoshop, Final Cut. One link for the handoff.",
  },
  review: {
    kicker: "Review",
    titleBefore: "Numbered notes. Submit this ",
    titleAccent: "round.",
    body: "Each take is a round. Notes attach here, not in a 40-message thread.",
  },
  unlock: {
    kicker: "The gate",
    titleBefore: "Hold to unlock the ",
    titleAccent: "master.",
    body: "Clients watch the whole cut with a watermark. They hold to confirm. Let go early and the lock eases back.",
    holdLabel: "Hold to unlock",
    lockedLabel: "Preview · watermarked",
    unlockedLabel: "Master · clean files",
    url: "[ NTHTAKE.STUDIO / TAKE-03 ]",
  },
  takes: {
    kicker: "Takes",
    titleBefore: "Version compare, not ",
    titleAccent: "vibes.",
    before: "Take 02 · watermarked",
    after: "Take 03 · still locked",
  },
  updates: {
    kicker: "Updates",
    titleBefore: "Send the take, not a ",
    titleAccent: "recap.",
  },
  faq: {
    badge: "Questions",
    title: "What clients actually ask.",
    items: [
      {
        id: "q1",
        question: "Do they pay before they see the work?",
        answer:
          "No. They watch the watermarked preview in full. Payment is the gate for the master, not for the review.",
      },
      {
        id: "q2",
        question: "Can't they just screen-record it?",
        answer:
          "The watermark is in the stream. A grab still reads as preview. The unlocked files are what they paid for.",
      },
      {
        id: "q3",
        question: "What counts as one round?",
        answer:
          "One take. Notes live on that version. The next upload is the next take, not another email chain.",
      },
      {
        id: "q4",
        question: "What happens to old takes?",
        answer:
          "They stay in the studio so the client can compare. Nothing gets overwritten into FINAL_v7.",
      },
      {
        id: "q5",
        question: "What's the fee?",
        answer:
          "No subscription. Minor monthly fees.",
      },
    ],
  },
  closer: {
    kicker: "Get early access",
    title: "Join the waitlist.",
    body: "No subscription. Minor monthly fees.",
    emailLabel: "Work email",
    emailPlaceholder: "you@studio.com",
    craftLabel: "Craft",
    crafts: [
      { value: "video", label: "Video" },
      { value: "design", label: "Design" },
      { value: "other", label: "Other" },
    ],
    cta: "Request a spot",
    sending: "Requesting",
    success: "Spot reserved for",
  },
  voices: {
    kicker: "The handoff",
    titleBefore: "Heard this ",
    titleAccent: "before.",
    body: "The loudest freelancer pain is not finding clients. It is getting paid by the ones you already have.",
    items: [
      {
        id: 1,
        content: "Delivered the cut, they vanished. I still chase that invoice.",
        author: "Aarav",
        handle: "Editor · Mumbai",
        platform: "dm" as const,
      },
      {
        id: 2,
        content: "Drive folder named FINAL_v7 and a polite WhatsApp every Friday.",
        author: "Meera",
        handle: "Motion · Bengaluru",
        platform: "tweet" as const,
      },
      {
        id: 3,
        content: "They loved the preview. Payment was 'next week' for two months.",
        author: "Kabir",
        handle: "Color · Pune",
        platform: "dm" as const,
      },
      {
        id: 4,
        content: "I don't want escrow drama. I want them to see the work, then pay.",
        author: "Sana",
        handle: "Design · Delhi",
        platform: "linkedin" as const,
      },
      {
        id: 5,
        content: "3,200 people answered one Reddit thread about this exact hole.",
        author: "Research",
        handle: "Post-delivery ghosting",
        platform: "tweet" as const,
      },
      {
        id: 6,
        content: "UPI is easy. Sending the master first is the part that still hurts.",
        author: "Rohan",
        handle: "Freelance editor",
        platform: "dm" as const,
      },
    ],
  },
  footer: {
    blurb: "One studio link to review, revise, and unlock the master.",
    status: "Waitlist open",
    product: [
      { href: "#how", label: "How it works" },
      { href: "#takes", label: "Takes" },
      { href: "#questions", label: "Questions" },
    ],
    legal: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
    company: [{ href: "#access", label: "Waitlist" }],
  },
};
