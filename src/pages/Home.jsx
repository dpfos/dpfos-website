import Hero from "../features/hero/Hero";
import Introduction from "../features/introduction/Introduction";
import Architecture from "../features/architecture/Architecture";
import Ecosystem from "../features/ecosystem/Ecosystem";
import Intelligence from "../features/intelligence/Intelligence";

export default function Home() {
  return (
    <>
      <Hero />

      <Introduction />

      <Architecture />

      <Ecosystem />

      <Intelligence />
    </>
  );
}