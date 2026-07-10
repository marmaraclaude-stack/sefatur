import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { NextDeparture } from "@/components/site/next-departure";
import { Schedule } from "@/components/site/schedule";
import { RouteTimeline } from "@/components/site/route-timeline";
import { Services } from "@/components/site/services";
import { Fleet } from "@/components/site/fleet";
import { IslandStory } from "@/components/site/island-story";
import { FaqAccordion } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { CallDock } from "@/components/site/call-dock";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/jsonld";

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
        <NextDeparture />
        <Schedule />
        <RouteTimeline />
        <Services />
        <Fleet />
        <IslandStory />
        <FaqAccordion />
      </main>
      <Footer />
      <CallDock />
    </>
  );
}
