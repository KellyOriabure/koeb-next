import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const services = [
  {
    title: "Sales of industrial Equipment",
    description: "We offer a comprehensive range of industrial equipment to ensure optimal performance for your business operations."
  },
  {
    title: "After Sales Service",
    description: "We provide comprehensive after-sales service to ensure your equipment operates at peak performance."
  },
  {
    title: "Pre-Delivery inspection",
    description: "We conduct thorough pre-delivery inspections to guarantee the quality and reliability of your equipment."
  },
  {
    title: "Installation & Commission",
    description: "Our expert team provides comprehensive installation and commissioning services, ensuring your equipment is properly set up"
  },
  {
    title: "Repairs and Maintenance",
    description: "We offer reliable repairs and maintenance services to keep your equipment running smoothly."
  }
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-industrial-black">Our Services</h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="group relative bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-primary transition-transform duration-300 ease-in-out transform scale-y-0 group-hover:scale-y-100 origin-bottom"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-industrial-black mb-3 group-hover:text-white transition-colors duration-300">{service.title}</h3>
                    <p className="text-industrial-gray leading-relaxed group-hover:text-white transition-colors duration-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Services;
