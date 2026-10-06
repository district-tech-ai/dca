/** Public origin of the site, used for canonical URLs, social previews and structured data. */
export const siteUrl = "https://dca.rotaractdistrict9216.org";
export const ogImageUrl = `${siteUrl}/og-image.jpg`;

export const conference = {
  name: "DCA Addis 2027",
  theme: "One family. One vision.",
  dates: "April 15–18, 2027",
  venue: "Ethiopian Skylight Hotel",
  city: "Addis Ababa, Ethiopia",
  earlyBirdUrl: "https://rotary9216.org/page/dca-2027-welcome/",
  midBirdUrl: "https://rotary9216.org/page/dca-2027-registration",
};

export const registrationCovers = {
  included: ["Full conference access", "Conference meals"],
  excluded: ["Accommodation", "Transport & flights", "Visa & travel logistics"],
};

export const aboutDca = [
  "District Conference and Awards (DCA) is an annual gathering where Rotarians and Rotaractors in the districts come together to learn, share and celebrate the year's milestones. This Rotary year, the conference takes place from 15th to 18th April 2027 in Addis Ababa, Ethiopia at Ethiopian Skylight Hotel.",
  "The theme for this year's conference is \u201cOne Family, One Vision\u201d. It reminds us that true service is not measured only by what we do today, but by the legacy we leave behind. Lasting impact means building stronger communities, empowering people, and creating solutions that continue to change lives long after the applause has ended. This Assembly is therefore a platform for learning, sharing, and strengthening the collective resolve.",
];

export const whyAttend = [
  ["Professional growth", "A chance to learn new leadership skills from Regional and Global Leaders."],
  ["Networking", "A chance to build strong connections with local and international leaders."],
  ["Collaborations", "A chance to foster potential collaborations with other clubs, with the aim of creating lasting impact in our communities."],
  ["Visibility", "A chance to represent our clubs and highlight our commitment to service."],
  ["Actionable ideas", "A chance to bring back proven strategies for local projects and community development."],
] as const;

export const messages = [
  { from: "District Rotaract Representative", role: "Message from the DRR", body: "" },
  { from: "Esther & Rediet", role: "Message from the DCA Co-chairs", body: "" },
];

export const team = [
  { name: "Esther", role: "DCA Co-chair" },
  { name: "Rediet", role: "DCA Co-chair" },
  { name: "District Rotaract Representative", role: "DRR" },
  { name: "Organising committee", role: "Announced soon" },
];

export const programme = [
  { date: "Thu 15 Apr 2027", time: "Evening", title: "DGs Cocktail" },
  { date: "Fri 16 Apr 2027", time: "Day", title: "Full conference day" },
  { date: "Fri 16 Apr 2027", time: "Evening", title: "Awards Dinner" },
  { date: "Sat 17 Apr 2027", time: "Day", title: "Full conference day" },
  { date: "Sat 17 Apr 2027", time: "Evening", title: "DGs and DRRs installation dinners" },
];

export const addisEssentials = [
  ["Currency", "Ethiopian Birr (ETB). Carry some cash; cards are accepted mainly at larger hotels and restaurants."],
  ["Time zone", "East Africa Time (UTC+3). Ethiopians also count hours from sunrise, so confirm whether a time is local or international."],
  ["Altitude", "Addis sits at roughly 2,355 m. Take it easy on day one and stay hydrated."],
  ["Weather in April", "Mild days around 15–25°C with occasional showers. Pack a light jacket and umbrella."],
  ["Language", "Amharic is the working language; English is widely spoken in hotels and business settings."],
  ["Entry & visa", "Check visa requirements for your passport early. Many visitors can apply for an Ethiopian e-Visa online before travel."],
  ["Power", "220V. Sockets are mostly European (Type C/F) — bring a universal adapter."],
  ["Arrival", "International flights land at Addis Ababa Bole International Airport (ADD)."],
];

/** Event structured data (schema.org/Event) rendered as JSON-LD in the page head. */
export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "DCA Addis 2027 — District 9215 & 9216 Conference & Awards",
  alternateName: "DCA Addis 2027",
  description:
    "Four days of fellowship, leadership, conference sessions and awards bringing Rotary and Rotaract Districts 9215 and 9216 together in Addis Ababa, Ethiopia.",
  startDate: "2027-04-15T09:00:00+03:00",
  endDate: "2027-04-18T18:00:00+03:00",
  url: `${siteUrl}/`,
  image: [ogImageUrl],
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Ethiopian Skylight Hotel",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressRegion: "Addis Ababa",
      addressCountry: "ET",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Rotary & Rotaract Districts 9215 and 9216",
    url: `${siteUrl}/`,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Early Bird registration",
      url: conference.earlyBirdUrl,
      price: "160",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      category: "Conference Registration",
    },
    {
      "@type": "Offer",
      name: "Mid Bird registration",
      url: conference.midBirdUrl,
      price: "180",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "Conference Registration",
    },
  ],
};


export const destinationHighlights = [
  { number: "01", title: "The birthplace of coffee", text: "Experience Ethiopia's celebrated coffee culture, where coffee is a ritual of connection and hospitality.", image: "coffee", alt: "A woman in a traditional white embroidered dress pours coffee from a black jebena pot into small cups in a room of woven baskets and a smoking brazier" },
  { number: "02", title: "Culture & history", text: "Discover extraordinary history, distinctive traditions and a cultural identity unlike anywhere else.", image: "city", alt: "Pedestrians on a sunny Addis Ababa sidewalk beside a stall of colorful woven baskets, with glass office towers, a blue bus and purple jacaranda trees" },
  { number: "03", title: "Taste Ethiopia", text: "Discover bold flavours, shared plates and one of Africa's most distinctive culinary traditions.", image: "food", alt: "Several hands sharing injera topped with brightly colored stews from a large woven serving tray" },
];

export const faqs = [
  ["What does my conference registration cover?", "Only the conference and conference meals. Travel, accommodation and related logistics are arranged separately."],
  ["How many Early Bird slots are available?", "Only 20 Early Bird slots are available, offered on a first-registered basis."],
  ["Can I pay the Early Bird fee in installments?", "No. The $160 Early Bird fee is paid once in full."],
  ["What if I prefer installments?", "Choose Mid Bird to reserve your place with $60 and complete three payments of $60."],
  ["When must I finish paying Mid Bird installments?", "The full Mid Bird balance is due by March 20, 2027."],
  ["Does registration include accommodation or transport?", "No. Registration covers the conference and conference meals only. Accommodation and transport details are coming soon."],
  ["Where and when is DCA Addis 2027?", "April 15–18, 2027 at Ethiopian Skylight Hotel in Addis Ababa, Ethiopia."],
  ["Has the programme been released?", "A brief programme is available above. Detailed programmes will be released as time goes."],
];

/** FAQ structured data (schema.org/FAQPage) built from the on-page FAQs. */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
