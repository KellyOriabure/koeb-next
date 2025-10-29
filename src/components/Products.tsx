import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuoteRequestDialog from "@/components/QuoteRequestDialog";
import eqCompressor from "@/assets/eq-series-thumbnail.jpg";
import rotaryCompressor from "@/assets/rotary-compressor.jpg";
import sierraCompressor from "@/assets/sierra-compressor.jpg";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestQuote = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsDialogOpen(true);
  };

  const products = [
    {
      title: "EQ Series Screw Air Compressors 11 – 45 kW",
      description: "The ELGi EG Series 11-45kW screw air compressors offers unmatched reliability, built for a long-lasting performance. Backed by a best-in-class warranty and requiring minimal maintenance, it stands out as a reliable air compressor.",
      image: eqCompressor,
      category: "Air Compressors"
    },
    {
      title: "Rotary screw air compressors",
      description: "Explore the advantages of rotary screw compressors for your application. Be ready to realize energy savings, and more. Find the right compressor for your application with help from the experts in compressed air.",
      image: rotaryCompressor,
      category: "Compressors"
    },
    {
      title: "Sierra Oil-Free Rotary Screw Air Compressors 37-75",
      description: "Sierra oil-free rotary screw compressors are ISO 8573-1:2010 Class 0 certified, delivering 100% oil-free air for the most critical applications. With an efficient and robust design, these compressors are a reliable workhorse that ensure...",
      image: sierraCompressor,
      category: "Oil-Free Compressors"
    },
    {
      title: "Oil Separator",
      description: "We have all types of Oil Separators in our inventory. For Atlas Copco, Ingersoll Rand, name it.",
      image: sierraCompressor,
      category: "Parts & Accessories"
    }
  ];

  return (

    <div className="container mx-auto px-4  max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-industrial-black mb-4">Our Products</h2>
        <p className="text-industrial-gray text-lg">Discover our range of high-quality air compressors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {products.map((product, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-sm transition-shadow duration-300 overflow-hidden max-w-sm mx-auto">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-industrial-black leading-tight capitalize">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-industrial-gray text-sm leading-relaxed mb-4">
                {product.description}
              </CardDescription>
              <Button
                variant="outline"
                size="sm"
                className="border-industrial-black text-industrial-black hover:bg-industrial-black hover:text-white"
                onClick={() => handleRequestQuote(product.title)}
              >
                Request Quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <QuoteRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
};

export default Products;