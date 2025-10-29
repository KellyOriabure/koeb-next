import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsComponent from "@/components/Products";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-industrial-black">Our Products</h1>
              <p className="text-industrial-gray text-lg mt-4 max-w-2xl mx-auto">
                Discover our range of high-quality air compressors and industrial equipment
              </p>
            </div> */}
            
            <ProductsComponent />
          </div>
        </section>

      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Products;
