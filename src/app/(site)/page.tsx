import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import HomeProducts from "@/components/HomeProducts";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <HomeProducts />
      <WhatsAppFloatingButton />
    </>
  );
}
