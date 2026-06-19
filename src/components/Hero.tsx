import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-industrial.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-start overflow-hidden  mt-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/slide-1.jpg" 
          alt="Industrial workers in factory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-black/80 via-industrial-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-6xl font-bold text-white mb-6 leading-tight">
            KOEB Provides The Best Industrial Solution
          </h1>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            We uphold high standards of conduct, professionalism, punctuality, courtesy, and respect in every business interaction
          </p>
          {/* <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-industrial"
          >
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;