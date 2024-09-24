import { Feature } from "@/lib/definitions";

export const navLinks = [
  {
    id: 1,
    name: "Features",
    url: "/",
  },
  {
    id: 2,
    name: "Industries",
    url: "/",
  },
  {
    id: 3,
    name: "Pricing",
    url: "/",
  },
  {
    id: 4,
    name: "Resources",
    url: "/",
  },
] as const;

export const footerLinks = [
  {
    heading: "Product",
    links: [
      { name: "Overview", href: "/" },
      { name: "Key Features", href: "/" },
      { name: "Integrations", href: "/" },
      { name: "Customisation Options", href: "/" },
      { name: "AI-led Insights", href: "/" },
    ],
  },
  {
    heading: "Academy",
    links: [
      { name: "Training Programme", href: "/" },
      { name: "Webinars", href: "/" },
      { name: "Education Blog", href: "/" },
      { name: "FAQs", href: "/" },
    ],
  },
  {
    heading: "Support",
    links: [
      { name: "Support Center", href: "/" },
      { name: "Account Login", href: "/" },
      { name: "Schedule a call", href: "/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "Partnerships", href: "/" },
      { name: "Media + Press", href: "/" },
      { name: "Contact Us", href: "/" },
      { name: "About", href: "/" },
    ],
  },
] as const;

export const footerSocialLinks = [
  {
    id: 1,
    url: "/images/x-logo.png",
    alt: "Twitter",
  },
  {
    id: 2,
    url: "/images/instagram-logo.png",
    alt: "Instagram",
  },
  {
    id: 3,
    url: "/images/linkedin-logo.png",
    alt: "LinkedIn",
  },
  {
    id: 4,
    url: "/images/youtube-logo.png",
    alt: "YouTube",
  },
  {
    id: 5,
    url: "/images/facebook-logo.png",
    alt: "Facebook",
  },
] as const;

export const featuresData: Record<number, Feature> = {
  1: {
    title: "Effortless interface",
    subtext: "Simplify your marketing",
    images: [
      "/images/feature-image-1.png",
      "/images/feature-image-2.png",
      "/images/feature-image-3.png",
    ],
  },
  2: {
    title: "Seamless connections",
    subtext: "Total sync with your tools",
    images: [
      "/images/feature-image-4.png",
      "/images/feature-image-5.png",
      "/images/feature-image-6.png",
    ],
  },
  3: {
    title: "Tailored experience",
    subtext: "Customise with ease",
    images: [
      "/images/feature-image-7.png",
      "/images/feature-image-8.png",
      "/images/feature-image-9.png",
    ],
  },
  4: {
    title: "All-in-One platform",
    subtext: "Unified marketing mastery",
    images: [
      "/images/feature-image-10.png",
      "/images/feature-image-11.png",
      "/images/feature-image-12.png",
    ],
  },
  5: {
    title: "Smart insights",
    subtext: "AI-powered marketing intelligence",
    images: [
      "/images/feature-image-14.png",
      "/images/feature-image-15.png",
      "/images/feature-image-16.png",
    ],
  },
};

export const bookingsFormTimeSlots = [
  "9:00 AM",
  "10:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export const countryCodes = [
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+91", label: "India" },
  { code: "+971", label: "UAE" },
];

export const bookingsFormDefaultValues = {
  fullName: "",
  email: "",
  countryCode: "+1",
  phoneNumber: "",
  callNotes: "",
  consent: false,
  date: new Date(),
  time: bookingsFormTimeSlots[0],
};
