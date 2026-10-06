import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Menu, Phone, Plane, BedDouble, CircleCheck, CircleX, Quote, Utensils, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VenueVideo } from "@/components/venue-video";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { conference, siteUrl, ogImageUrl, destinationHighlights, faqs, eventSchema, faqSchema, registrationCovers, aboutDca, whyAttend, messages, team, programme, addisEssentials } from "@/data/conference";
import heroImage from "@/assets/addis-hero2.jpg";
import hotelVideo from "@/assets/skylight-hotel.mp4";
import hotelPoster from "@/assets/skylight-hotel-poster.webp";
import addisVideo from "@/assets/skylight-addis.mp4";
import addisPoster from "@/assets/skylight-addis-poster.webp";
import logoImage from "@/assets/dca-logo.webp";
import emblemImage from "@/assets/dca-emblem.webp";
import coffeeImage from "@/assets/addis-coffee.jpg";
import foodImage from "@/assets/addis-food.jpg";
import cityImage from "@/assets/addis-city.jpg";
import ethImage from "@/assets/eth.webp";
import eth2Image from "@/assets/eth2.jpg";
import rotaryLogo from "@/assets/logo1.png";
import rotaractLogo from "@/assets/logo2.png";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "DCA Addis 2027 | District 9215 & 9216 Conference & Awards";
    const description = "Join Rotary and Rotaract Districts 9215 & 9216 at Ethiopian Skylight Hotel, Addis Ababa, April 15–18, 2027. Early Bird registration is $160.";
    const shareTitle = "DCA Addis 2027 — Addis Is Calling";
    const shareDescription = "Four days. Two districts. One family. One vision. Join DCA Addis 2027, April 15–18 in Addis Ababa, Ethiopia.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: shareTitle },
        { property: "og:description", content: shareDescription },
        { property: "og:url", content: `${siteUrl}/` },
        { property: "og:image", content: ogImageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "DCA Addis 2027 logo over the Addis Ababa skyline at dusk" },
        { name: "twitter:title", content: shareTitle },
        { name: "twitter:description", content: shareDescription },
        { name: "twitter:image", content: ogImageUrl },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/` }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(eventSchema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
  component: Index,
});

const nav = [
  ["Venue", "#venue"], ["Register", "#registration"], ["Why Addis", "#why-addis"],
  ["Destination", "#destination"], ["Travel", "#travel"], ["Programme", "#programme"],
  ["Know Before You Go", "#essentials"], ["FAQs", "#faqs"],
];

const countdownTarget = new Date("2027-04-15T09:00:00+03:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

function useTimeLeft() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, countdownTarget - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return left;
}

function HeaderCountdown() {
  const left = useTimeLeft();
  const units = [
    [left === null ? "--" : pad(Math.floor(left / 86400000)), "Days"],
    [left === null ? "--" : pad(Math.floor((left / 3600000) % 24)), "Hours"],
    [left === null ? "--" : pad(Math.floor((left / 60000) % 60)), "Mins"],
  ] as const;
  return <div className="flex items-center gap-3 border-l border-primary-foreground/15 pl-4 lg:hidden" aria-label="Countdown to Addis"><span className="hidden text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-event-gold sm:block">Countdown<br/>to Addis</span><div className="flex gap-3">{units.map(([value, label]) => <div key={label} className="text-center"><div className="font-display text-base font-black leading-none tabular-nums">{value}</div><div className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">{label}</div></div>)}</div></div>;
}

function Countdown() {
  const left = useTimeLeft();
  const units = [
    [left === null ? "--" : pad(Math.floor(left / 86400000)), "Days"],
    [left === null ? "--" : pad(Math.floor((left / 3600000) % 24)), "Hours"],
    [left === null ? "--" : pad(Math.floor((left / 60000) % 60)), "Mins"],
    [left === null ? "--" : pad(Math.floor((left / 1000) % 60)), "Secs"],
  ] as const;
  return <div className="flex w-full max-w-xl items-center gap-4 rounded-full border border-primary/50 bg-event-dark/70 px-5 py-3 backdrop-blur-md" aria-label="Countdown to DCA Addis 2027"><span className="border-r border-primary-foreground/15 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-event-gold">Countdown</span><div className="grid flex-1 grid-cols-4 gap-2">{units.map(([value, label]) => <div key={label} className="text-center"><div className="font-display text-xl font-black tabular-nums md:text-2xl">{value}</div><div className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">{label}</div></div>)}</div></div>;
}

function VenueVideos() {
  const [unmuted, setUnmuted] = useState<string | null>(null);
  const toggle = (id: string) => setUnmuted((current) => (current === id ? null : id));
  // Column ratio 256:81 gives the 16:9 and 9:16 videos equal heights side by side.
  return <div className="mt-14 grid gap-4 lg:grid-cols-[256fr_81fr]">
    <VenueVideo src={hotelVideo} poster={hotelPoster} width={1280} height={720} label="Inside Ethiopian Skylight" muted={unmuted !== "hotel"} onToggleMute={() => toggle("hotel")} className="aspect-video" />
    <VenueVideo src={addisVideo} poster={addisPoster} width={576} height={1024} label="Skylight, Addis Ababa" muted={unmuted !== "addis"} onToggleMute={() => toggle("addis")} className="aspect-[9/16] w-full" />
  </div>;
}

function Brand() {
  return <a href="#home" aria-label="DCA Addis home" className="flex items-center gap-2 font-display font-black uppercase"><span className="grid size-12 place-items-center rounded-full bg-event-warm p-1.5"><img src={emblemImage} width={256} height={207} alt="" className="w-full" /></span><span className="hidden text-sm sm:block">Addis 2027</span></a>;
}

function useScrollHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 120) setHidden(false);
      else if (Math.abs(y - lastY) > 6) setHidden(y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { hidden, scrolled };
}

function Index() {
  const imageMap = { coffee: coffeeImage, food: foodImage, city: cityImage };
  const { hidden, scrolled } = useScrollHeader();
  return <main className="bg-background text-foreground">
    <div className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
    <div className="flex min-h-10 items-center justify-center gap-2 whitespace-nowrap border-b border-primary/50 bg-event-dark px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground sm:gap-3 sm:tracking-[0.28em] md:text-xs">
      <span>Early Bird</span><span className="text-primary">•</span><span>$160</span><span className="text-primary max-[374px]:hidden">•</span><span className="max-[374px]:hidden">20 slots<span className="hidden sm:inline"> only</span></span>
      <a href="#registration" className="rounded-full border border-primary-foreground/30 px-3 py-1 hover:bg-primary-foreground/10">Register <span aria-hidden="true">→</span></a>
    </div>

    <header className={`border-b text-primary-foreground transition-colors duration-300 ${scrolled ? "border-primary-foreground/10 bg-event-dark/90 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 sm:px-6 lg:px-10"><Brand /><HeaderCountdown />
        <nav className="mx-auto hidden items-center gap-2 lg:flex xl:gap-4" aria-label="Main navigation">{nav.map(([label, href]) => <a key={label} href={href} className="whitespace-nowrap px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70 transition-colors hover:text-primary">{label}</a>)}</nav>
        <Button asChild variant="eventOutline" size="sm" className="hidden px-5 text-primary-foreground lg:inline-flex"><a href="#registration">Register</a></Button>
        <Sheet><SheetTrigger asChild><Button variant="outline" size="icon" className="ml-auto rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger><SheetContent className="border-primary/30 bg-event-dark text-primary-foreground"><SheetTitle className="font-display text-primary-foreground">DCA Addis 2027</SheetTitle><nav className="mt-10 flex flex-col" aria-label="Mobile navigation">{nav.map(([label, href], index) => <SheetClose key={label} asChild><a href={href} className="border-b border-primary-foreground/10 py-4 font-display text-xl font-bold uppercase"><span className="mr-4 text-xs text-primary">0{index + 1}</span>{label}</a></SheetClose>)}</nav></SheetContent></Sheet>
      </div>
    </header>
    </div>

    <section id="home" className="relative flex min-h-[900px] items-center justify-center overflow-hidden bg-event-dark pt-32 text-primary-foreground md:min-h-screen">
      <img src={heroImage} width={1280} height={1536} alt="Addis Ababa skyline glowing at sunset" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-event-dark/45" /><div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-24 text-center">
        <div className="rounded-3xl bg-event-warm/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:p-4"><img src={logoImage} width={720} height={787} alt={`DCA Addis 2027 logo — ${conference.theme}`} className="w-32 md:w-44" fetchPriority="high" /></div>
        <h1 className="mt-7 font-display text-[12vw] font-black uppercase leading-[0.86] sm:text-7xl md:text-8xl lg:text-[8.5rem]"><span className="mb-5 block font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-event-gold md:mb-7 md:text-sm">Welcome to the 2027 District Conference &amp; Awards</span>Addis<br/><span className="block whitespace-nowrap text-primary">is calling</span><span className="sr-only"> — the District 9215 and 9216 Conference and Awards, April 15–18, 2027 at Ethiopian Skylight Hotel, Addis Ababa</span></h1>
        <p className="mt-7 max-w-xl text-base font-semibold leading-relaxed text-primary-foreground/85 md:text-lg">From Vasha to Addis — welcome to the first DCA for Districts 9215 &amp; 9216.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold"><span className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur"><CalendarDays className="mr-2 inline size-3 text-accent" />{conference.dates}</span><span className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur"><MapPin className="mr-2 inline size-3 text-accent" />{conference.venue}</span></div>
        <Button asChild variant="event" size="lg" className="mt-7 h-12 px-8"><a href="#registration">Register now</a></Button>
        <p className="mt-4 text-xs font-semibold text-primary-foreground/80">Registration covers the conference and conference meals only.</p>
        <div className="mt-8"><Countdown /></div>
      </div>
    </section>
    
    <section id="venue" className="bg-event-dark px-5 py-24 text-primary-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-event-gold">The venue</p><div className="mt-5 grid gap-8 lg:grid-cols-2"><h2 className="font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.92] md:text-7xl">Ethiopian<br/>Skylight</h2><div className="self-end"><p className="flex items-center gap-2 font-display text-2xl font-bold"><MapPin className="size-5 text-primary"/>{conference.venue}</p><p className="mt-2 text-lg text-primary-foreground/65">{conference.city} · {conference.dates}</p></div></div>
      <VenueVideos />
</div></section>

    <section id="registration" className="bg-background px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-primary">Register now</p><h2 className="mt-4 max-w-4xl font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.95] md:text-7xl">Choose how you want to secure your spot</h2>
      <div className="mt-10 rounded-3xl border-2 border-primary bg-primary/5 p-5 md:p-8"><p className="font-display text-xl font-black uppercase sm:text-2xl md:text-3xl">What your conference registration covers</p><p className="mt-2 max-w-3xl leading-relaxed text-foreground/70">Your fee covers <strong className="text-foreground">only the conference and conference meals</strong>. Please plan and budget for your stay in Addis separately.</p><div className="mt-6 grid gap-6 sm:grid-cols-2"><div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Included</h3><ul className="mt-3 space-y-3 text-sm">{registrationCovers.included.map(x=><li key={x} className="flex gap-2">{x === "Conference meals" ? <Utensils className="size-4 text-primary"/> : <CircleCheck className="size-4 text-primary"/>}{x}</li>)}</ul></div><div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Not included</h3><ul className="mt-3 space-y-3 text-sm text-foreground/70">{registrationCovers.excluded.map(x=><li key={x} className="flex gap-2"><CircleX className="size-4 text-muted-foreground"/>{x}</li>)}</ul></div></div></div><div className="mt-8 grid gap-6 lg:grid-cols-2">
      <article className="min-w-0 rounded-3xl border border-border bg-event-warm p-6 md:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><span className="font-display text-2xl font-black uppercase">Early Bird</span><span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">Best value</span></div><div className="mt-8 font-display text-6xl font-black md:text-7xl">$160</div><p className="mt-2 text-sm text-muted-foreground">USD · one-time payment · only 20 slots</p><p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary"><Utensils className="size-4"/>Conference + meals</p><p className="mt-7 leading-relaxed text-foreground/70">Pay once and you're fully registered. The Early Bird option must be paid in full at registration.</p><ul className="mt-6 space-y-3 text-sm">{["Conference registration","Conference meals","One-time payment","Limited to 20 slots"].map(x=><li key={x} className="flex gap-2"><CircleCheck className="size-4 text-primary"/>{x}</li>)}</ul><Button asChild variant="event" size="lg" className="mt-8 h-auto min-h-12 w-full whitespace-normal py-3 text-center"><a href={conference.earlyBirdUrl} target="_blank" rel="noreferrer">Register now — $160 <ArrowRight/></a></Button></article>
      <article className="min-w-0 rounded-3xl border border-event-dark bg-event-dark p-6 text-primary-foreground md:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><span className="font-display text-2xl font-black uppercase">Mid Bird</span><span className="rounded-full bg-event-gold px-3 py-1 text-xs font-bold uppercase text-event-dark">Pay in installments</span></div><div className="mt-8 font-display text-6xl font-black md:text-7xl">$180</div><p className="mt-2 text-sm text-primary-foreground/55">USD · 3 × $60 · balance by March 20, 2027</p><p className="mt-4 inline-flex items-center gap-2 rounded-full border border-event-gold/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-event-gold"><Utensils className="size-4"/>Conference + meals</p><p className="mt-7 leading-relaxed text-primary-foreground/70">Reserve your place with the first $60 payment, then complete the remaining balance in installments.</p><ul className="mt-6 space-y-3 text-sm">{["Conference registration","Conference meals","Three $60 payments","First payment reserves your slot"].map(x=><li key={x} className="flex gap-2"><CircleCheck className="size-4 text-event-gold"/>{x}</li>)}</ul><Button asChild variant="event" size="lg" className="mt-8 h-auto min-h-12 w-full whitespace-normal py-3 text-center"><a href={conference.midBirdUrl} target="_blank" rel="noreferrer">Reserve with $60 <ArrowRight/></a></Button></article>
    </div></div></section>

    <section id="why-addis" className="bg-event-dark px-5 py-24 text-primary-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-event-gold">Why Addis</p><div className="mt-5 grid gap-8 lg:grid-cols-2"><h2 className="font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.92] md:text-7xl">One family.<br/><span className="text-primary">One vision.</span></h2><div className="space-y-4 self-end">{aboutDca.map(p=><p key={p.slice(0,24)} className="leading-relaxed text-primary-foreground/65">{p}</p>)}</div></div>
      <h3 className="mt-20 font-display text-2xl font-black uppercase md:text-3xl">Why the conference matters to Rotaractors</h3><div className="mt-8 grid border-t border-primary-foreground/15 md:grid-cols-2 lg:grid-cols-3">{whyAttend.map(([title,text],i) => <article key={title} className="border-b border-primary-foreground/15 px-2 py-6 sm:p-7 md:border-r"><div className="flex items-start justify-between"><span className="font-display text-4xl font-black text-primary sm:text-5xl">{title[0]}</span><span className="text-xs text-primary-foreground/40">0{i+1}</span></div><h4 className="mt-4 sm:mt-8 font-display text-xl font-black uppercase">{title}</h4><p className="mt-3 text-sm leading-relaxed text-primary-foreground/55">{text}</p></article>)}</div>
      <div className="mt-16 grid gap-6 lg:grid-cols-2">{messages.map((m,i)=><article key={m.role} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 md:p-10"><div className="flex items-start justify-between"><Quote className="size-10 text-primary"/><span className="text-xs font-black text-event-gold">0{i+1}</span></div><p className="mt-8 eyebrow text-event-gold">{m.role}</p><h4 className="mt-3 font-display text-2xl font-black uppercase sm:text-3xl">{m.from}</h4><p className="mt-5 leading-relaxed text-primary-foreground/65">{m.body || "Message coming soon."}</p></article>)}</div></div></section>

    <section id="team" className="bg-event-warm px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-2"><div><p className="eyebrow text-primary">The people behind DCA</p><h2 className="mt-4 font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase md:text-7xl">The DCA<br/>team</h2></div><p className="max-w-xl self-end text-lg text-foreground/65">A cross-district team from 9215 and 9216 working to bring the first joint DCA to life in Addis.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{team.map((member,i)=><div key={member.name} className="flex min-h-40 flex-col rounded-2xl border border-foreground/15 bg-background p-6 sm:aspect-[4/5]"><div className="flex justify-between"><span className="text-xs font-black text-primary">0{i+1}</span><UserRound className="size-6 text-foreground/25"/></div><div className="mt-auto"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{member.role}</p><h3 className="mt-2 font-display text-2xl font-black uppercase">{member.name}</h3></div></div>)}</div></div></section>

    <section id="destination" className="bg-background px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-primary">Addis as a destination 🥳</p><div className="mt-4 grid gap-8 lg:grid-cols-2"><h2 className="font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.9] md:text-7xl">Discover<br/>Addis</h2><div><p className="font-display text-2xl font-bold">Because the destination is part of the experience.</p><p className="mt-4 max-w-xl leading-relaxed text-foreground/65">Addis Ababa is more than where DCA happens. It is part of the adventure — a city of history, culture, coffee, food and modern African energy waiting to be experienced.</p></div></div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">{destinationHighlights.map((item) => <article key={item.number} className="group overflow-hidden rounded-3xl bg-event-warm"><div className="overflow-hidden"><img src={imageMap[item.image as keyof typeof imageMap]} width={1200} height={800} loading="lazy" alt={item.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-6"><span className="text-xs font-black text-primary">{item.number}</span><h3 className="mt-3 font-display text-xl font-black uppercase">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div></article>)}</div></div></section>

    <section id="travel" className="bg-event-warm px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-primary">Plan your trip</p><h2 className="mt-4 font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase md:text-7xl">Travel details<br/>coming soon.</h2><p className="mt-6 max-w-xl text-lg text-foreground/65">The team is finalizing accommodation and transport. Full information will be shared once confirmed.</p><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">{[{icon:<BedDouble className="size-7 text-primary"/>,label:"Accommodation details"},{icon:<Plane className="size-7 text-primary"/>,label:"Transport details"}].map((item)=><div key={item.label} className="bg-background p-7 md:p-10">{item.icon}<h3 className="mt-8 font-display text-2xl font-black uppercase">{item.label}</h3><p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Coming soon</p></div>)}</div></div></section>

    <section id="programme" className="relative overflow-hidden bg-event-dark px-5 py-24 text-primary-foreground lg:px-8 lg:py-32"><img src={ethImage} width={1360} height={1020} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-event-dark/85" /><div className="relative z-10 mx-auto max-w-5xl"><div className="text-center"><p className="eyebrow">DCA Addis 2027 programme</p><h2 className="mt-5 font-display text-[clamp(2rem,11vw,3rem)] font-black uppercase md:text-7xl">Brief<br/><span className="text-stroke">programme</span></h2><p className="mx-auto mt-7 max-w-xl text-primary-foreground/75">Detailed programmes shall be released as time goes. For clarification, contact either conference chair.</p></div>
      <ol className="mt-12 border-t border-primary-foreground/25">{programme.map((item)=><li key={item.date+item.time} className="grid gap-2 border-b border-primary-foreground/25 py-5 sm:grid-cols-[12rem_7rem_1fr] sm:items-center"><span className="font-display text-lg font-black uppercase">{item.date}</span><span className="w-fit rounded-full border border-primary-foreground/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">{item.time}</span><span className="text-lg font-semibold">{item.title}</span></li>)}</ol>
      <div id="programme-contacts" className="mt-10 grid gap-4 text-left sm:grid-cols-2"><a href="tel:+254790162522" className="flex items-center gap-4 rounded-2xl border border-primary-foreground/25 p-5 transition-colors hover:bg-primary-foreground/10"><Phone className="size-5"/><div><strong className="block">Nelson Samoei</strong><span className="text-sm text-primary-foreground/65">DCA Chair D9215 · +254 790 162 522</span></div></a><a href="tel:+254707913149" className="flex items-center gap-4 rounded-2xl border border-primary-foreground/25 p-5 transition-colors hover:bg-primary-foreground/10"><Phone className="size-5"/><div><strong className="block">Esther Jerinah</strong><span className="text-sm text-primary-foreground/65">DCA Chair D9216 · +254 707 913 149</span></div></a></div></div></section>

    <section id="essentials" className="bg-event-dark px-5 py-24 text-primary-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="eyebrow text-event-gold">Know before you go</p><div className="mt-5 grid gap-8 lg:grid-cols-2"><h2 className="font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.92] md:text-7xl">Addis<br/>what I should know</h2><p className="max-w-xl self-end text-xl leading-relaxed text-primary-foreground/65">A few practical essentials to help you arrive prepared and enjoy the city.</p></div><div className="mt-16 grid border-t border-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{addisEssentials.map(([title,text],i)=><article key={title} className="border-b border-primary-foreground/15 px-2 py-6 sm:border-r sm:p-7"><span className="text-xs text-primary-foreground/40">0{i+1}</span><h3 className="mt-3 sm:mt-6 font-display text-lg font-black uppercase text-event-gold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">{text}</p></article>)}</div></div></section>

    <section id="faqs" className="bg-background px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow text-primary">FAQs</p><h2 className="mt-4 font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase md:text-7xl">Questions,<br/>answered.</h2><p className="mt-5 max-w-sm text-foreground/60">Everything you need to know before you register. If it isn't confirmed yet, we say so.</p></div><Accordion type="single" collapsible className="border-t border-border">{faqs.map(([question,answer],i)=><AccordionItem value={`item-${i}`} key={question}><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline md:text-lg">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section id="contact" className="relative overflow-hidden bg-event-dark px-5 py-24 text-center text-primary-foreground lg:px-8 lg:py-32"><img src={eth2Image} width={2048} height={1152} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-event-dark/80" /><div className="relative z-10 mx-auto max-w-5xl"><p className="eyebrow">One family. One vision.</p><h2 className="mt-5 font-display text-5xl max-[374px]:text-[2.5rem] font-black uppercase leading-[0.9] md:text-8xl">Addis is calling.<br/><span className="text-stroke">Will you answer?</span></h2><p className="mt-7 font-bold uppercase tracking-[0.12em]">Four days. Two districts. One family. One vision.</p><p className="mt-4">{conference.dates} · {conference.venue}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="event" size="lg"><a href={conference.earlyBirdUrl} target="_blank" rel="noreferrer">Register now — $160</a></Button><Button asChild variant="eventOutline" size="lg"><a href={conference.midBirdUrl} target="_blank" rel="noreferrer">Reserve with $60</a></Button></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.12em]">Only 20 Early Bird slots available.</p></div></section>

    <footer className="bg-event-dark px-5 py-16 text-primary-foreground lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_1fr_1fr]"><div><Brand/><p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/55">District 9215 & 9216 Conference & Awards. Fellowship, leadership and celebration in Addis Ababa.</p><p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-event-gold">Hosted by</p><div className="mt-4 flex items-center gap-3"><span className="rounded-2xl bg-white px-3 py-2"><img src={rotaryLogo} width={892} height={597} alt="Rotary Districts 9215 and 9216" loading="lazy" className="h-14 w-auto" /></span><span className="rounded-2xl bg-white px-3 py-2"><img src={rotaractLogo} width={990} height={582} alt="Rotaract Districts 9215 and 9216" loading="lazy" className="h-14 w-auto" /></span></div></div><nav aria-label="Footer navigation"><h3 className="text-xs font-black uppercase tracking-[0.2em] text-event-gold">Explore</h3><ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-primary-foreground/65">{nav.map(([label, href]) => <li key={label}><a href={href} className="hover:text-primary">{label}</a></li>)}</ul></nav><div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-event-gold">Event</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/65">{conference.dates}<br/>{conference.venue}<br/>{conference.city}</p></div><div><h3 className="text-xs font-black uppercase tracking-[0.2em] text-event-gold">Contact</h3><div className="mt-4 space-y-2 text-sm text-primary-foreground/65"><a className="block hover:text-primary" href="tel:+254790162522">D9215 Chair · +254 790 162 522</a><a className="block hover:text-primary" href="tel:+254707913149">D9216 Chair · +254 707 913 149</a></div></div></div><div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/45 md:flex-row"><span>© 2026 DCA Addis 2027 · Districts 9215 & 9216</span><span>Registration covers the conference and conference meals only.</span></div></footer>
  </main>;
}