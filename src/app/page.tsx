import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative overflow-x-clip">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
