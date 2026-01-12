import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/vision";
import Exp from "@/components/exp";
import Captions from "@/components/captions";
import Highlights from "@/components/Highlights";
import Crusher from "@/components/Crusher";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Vision />
      <Exp />
      <Captions />
      <Highlights />
      <Crusher />
      <Crusher />
    </main>
  );
}
