import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import HomeProducts from "@/components/HomeProducts";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Welcome />
      <HomeProducts />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
