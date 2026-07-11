import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { MarqueeStrip } from "@/components/site/marquee-strip";
import { Schedule } from "@/components/site/schedule";
import { RouteMap } from "@/components/site/route-map";
import { Services } from "@/components/site/services";
import { Fleet } from "@/components/site/fleet";
import { IslandStory } from "@/components/site/island-story";
import { FaqAccordion } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { CallDock } from "@/components/site/call-dock";
import { WaveDivider } from "@/components/ui/wave-divider";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/jsonld";

/* Bölüm zemin renkleri (globals.css tokenlarıyla aynı) */
const MARBLE = "#FAFCFE";
const SAND = "#E9F5FC";
const FOREST = "#385737";
const NAVY = "#2C4630";
const DEEP = "#182B1A";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <WaveDivider from={MARBLE} fill={FOREST} />
        <MarqueeStrip />
        <Schedule />
        <WaveDivider from={DEEP} fill={MARBLE} />
        <RouteMap />
        <Services />
        <WaveDivider from={MARBLE} fill={SAND} />
        <Fleet />
        <WaveDivider from={SAND} fill={MARBLE} />
        <IslandStory />
        <WaveDivider from={MARBLE} fill={SAND} />
        <FaqAccordion />
        <WaveDivider from={SAND} fill={NAVY} />
      </main>
      <Footer />
      <CallDock />
    </>
  );
}
