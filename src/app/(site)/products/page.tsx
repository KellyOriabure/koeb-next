"use client";

import ProductsComponent from "@/components/Products";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <ProductsComponent />
          </div>
        </section>
      </main>
    </div>
  );
}
