import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <section className="py-16 bg-white  max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Welcome To <span className="text-primary">KOEB</span> Industrial Solutions Ltd.
            </h2>

            <div className="space-y-4 text-industrial-gray leading-relaxed">
              <p>
                At KOEB Industrial Solutions, we specialize in the sales, repair, and maintenance of all categories of air compressors, dryers, ensuring optimal performance and longevity. Our commitment to quality extends beyond sales—we provide genuine spare parts and cost-effective solutions to maximize your equipment uptime.
              </p>

              <p>
                Our highly skilled technical team undergoes continuous training in customer management, modern diagnostics, and industry-leading repair practices. This dedication to excellence is reflected in the way we engage with and support our customers, making us the preferred choice for industrial air solutions.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2"
            >
              <a href="/about">Read more</a>
            </Button>
          </div>

          <div className="relative">
            <img
              src="/images/intro.jpg"
              alt="Industrial technician working"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;