import AnimatedFeatures from "@/components/AnimatedFeatures";
import Hero from "@/components/Hero";
import ScrollBar from "@/components/ScrollBar";

export default function page() {
  return (
    <>
      <ScrollBar />
      <main className="flexCenter flex-col gap-4  bg-gradient-to-r from-[#f7f6f6] to-[#efffff]">
        <Hero />
        <AnimatedFeatures />
      </main>
    </>
  );
}
