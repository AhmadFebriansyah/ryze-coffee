import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { Hero } from "@/components/home/Hero";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { VisitCta } from "@/components/home/VisitCta";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryTeaser />
      <FeaturedMenu />
      <VisitCta />
    </>
  );
}
