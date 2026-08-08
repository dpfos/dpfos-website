import Hero from "../features/hero/Hero";
import Introduction from "../features/introduction/Introduction";
import CoreSystem from "../features/core-system/CoreSystem";
import Architecture from "../features/architecture/Architecture";
import Ecosystem from "../features/ecosystem/Ecosystem";
import Library from "../features/library/Library";
import Research from "../features/research/Research";

export default function Home() {
  return (
    <>
      <Hero />

      <Introduction />

      <CoreSystem />

      <Architecture />

      <Ecosystem />

      <Library />

      <Research />
    </>
  );
}
