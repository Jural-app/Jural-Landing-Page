import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Pillars } from "@/components/Pillars";
import { Conversation } from "@/components/Conversation";
import { Features } from "@/components/Features";
import { Trust } from "@/components/Trust";
import { Start } from "@/components/Start";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Pillars />
      <Conversation />
      <Features />
      <Trust />
      <Start />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
