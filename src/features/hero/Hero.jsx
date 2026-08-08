import "./Hero.css";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="hero">

      <HeroBackground />

      <div className="hero-container">

        <div className="hero-left">
          <HeroContent />
          <HeroActions />
          <HeroStats />
        </div>

        <div className="hero-right">
          <HeroVisual />
        </div>

      </div>

    </section>
  );
}
