"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QuoteRequestDialog from '@/components/QuoteRequestDialog';
import eqCompressor from '@/assets/eq-series-thumbnail.jpg';
import rotaryCompressor from '@/assets/rotary-compressor.jpg';
import sierraCompressor from '@/assets/sierra-compressor.jpg';

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

const HomeProducts: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(staticProducts);
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch("/api/products/")
            .then((res) => res.json())
            .then((data: Product[]) => {
                if (data && data.length > 0) {
                    setProducts(data);
                }
            })
            .catch(() => { })
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

    const maxIndex = Math.max(0, products.length - cardsPerView);

    // Autoplay functionality
    useEffect(() => {
        if (!isHovered) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
            }, 5000); // Change slide every 5 seconds
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, maxIndex]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const newCardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                setCardsPerView(newCardsPerView);
                setCurrentIndex(0); // Reset to first slide on resize
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    useEffect(() => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
            const gap = 32; // gap-8 in pixels
            const offset = currentIndex * (cardWidth + gap);
            carouselRef.current.style.transform = `translateX(-${offset}px)`;
        }
    }, [currentIndex, cardsPerView]);

    return (
        <section className="py-16 bg-industrial-light">
            <div className="container mx-auto px-4 max-w-7xl ">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-black mb-4">
                        Featured Products
                    </h2>
                    <p className="text-industrial-gray text-lg max-w-2xl mx-auto">
                        Discover our premium selection of industrial air compressors and equipment
                    </p>
                </div>
                <div className="relative">
                    {/* Carousel Container */}
                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div
                            ref={carouselRef}
                            className="flex gap-8 transition-transform duration-300 ease-in-out"
                            style={{ width: 'fit-content' }}
                        >
                            {products.map((product, index) => (
                                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                                    <Card className="bg-white shadow-sm hover:shadow-sm transition-shadow duration-300 overflow-hidden mx-auto h-full">
                                        <div className="aspect-[16/5] sm:aspect-[16/13] overflow-hidden bg-muted">
                                            {getImageSrc(product) ? (
                                                <img
                                                    src={getImageSrc(product)}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
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
                                            <div className="text-industrial-gray text-sm leading-relaxed mb-4 prose prose-sm max-w-none [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1]">
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous products"
                        >
                            <ChevronLeft className="w-6 h-6 text-industrial-black" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: maxIndex + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentIndex === maxIndex}
                            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next products"
                        >
                            <ChevronRight className="w-6 h-6 text-industrial-black" />
                        </button>
                    </div>

                    {/* Responsive indicators */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-industrial-gray">
                            {currentIndex + 1} / {maxIndex + 1}
                        </span>
                    </div>
                </div>
            </div>



            <div className="text-center mt-12">
                <Button asChild
                    className="bg-industrial-black text-white hover:bg-industrial-black/90 px-8 py-3"
                >
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>

            <QuoteRequestDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                productName={selectedProduct}
            />
        </section>
    );
};

export default HomeProducts;
