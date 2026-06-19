"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuoteRequestDialog from "@/components/QuoteRequestDialog";
import eqCompressor from "@/assets/eq-series-thumbnail.jpg";
import rotaryCompressor from "@/assets/rotary-compressor.jpg";
import sierraCompressor from "@/assets/sierra-compressor.jpg";

interface Product {
  id?: number;
  title: string;
  description: string;
  image?: unknown;
  image_url?: string;
  category: string;
}

const staticProducts: Product[] = [
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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/")
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(staticProducts);
        }
      })
      .catch(() => setProducts(staticProducts))
      .finally(() => setLoading(false));
  }, []);

  const handleRequestQuote = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsDialogOpen(true);
  };

  const getImageSrc = (product: Product) => {
    if (product.image_url) {
      const key = product.image_url.replace(/^https?:\/\/[^/]+\//, "");
      return `/api/image/${key}`;
    }
    if (product.image) {
      const img = product.image as any;
      if (typeof img === 'object' && img !== null && img.src) return img.src as string;
      return String(img);
    }
    return "";
  };

  const ImagePlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
      <span className="text-xs">No Image</span>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-industrial-black mb-4">Our Products</h2>
        </div>
        <p className="text-center text-industrial-gray">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-industrial-black mb-4">Our Products</h2>
        <p className="text-industrial-gray text-lg">Discover our range of high-quality air compressors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {products.map((product, index) => (
          <Card key={product.id || index} className="bg-white shadow-sm hover:shadow-sm transition-shadow duration-300 overflow-hidden max-w-sm mx-auto">
            <div className="aspect-square overflow-hidden bg-muted">
              {getImageSrc(product) ? (
                <img
                  src={getImageSrc(product)}
                  alt={product.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-industrial-black leading-tight capitalize">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-industrial-gray text-sm leading-relaxed mb-4 prose prose-sm max-w-none [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
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