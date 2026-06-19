import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function AboutPage() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-primary mr-4"></div>
                  <span className="text-primary font-medium">About KOEB</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-industrial-black leading-tight">
                  We Provide the Best{" "}
                  <span className="text-primary">Industrial Solutions</span>
                </h1>
              </div>

              <div className="space-y-4 text-industrial-gray leading-relaxed">
                <p>
                  KOEB Industrial Solutions Ltd was founded over a decade ago by seasoned professionals whose combined experiences in air compressor business and other industrial machineries span over 20 years. We have constantly demonstrated our experience, our professionalism and competences in every customer&apos;s engagement. And this has set us apart in the industry as the preferred service provider.
                </p>

                <p>
                  As at today, we have the best technical team to handle your Air driers whether stand alone or integrated unit. Not leaving behind your variable speed drive, air end (element) overhaul, total service level agreement, your air audit and health check. Our client base is a living testament to what we stand for. We have been called in where others could not deliver on the terms of agreement. Our extra value service, our commitment and our understanding that machine reliability and performance is key to your operations are the driving forces behind our operations. At KOEB Industrial Solutions Ltd, we believe that trust, loyalty, and long-term success are built on delivering exceptional value. Let us partner with you to achieve amazing goals in your quality air delivery.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/about.png"
                alt="Industrial technicians working on air compressor equipment"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <WhatsAppFloatingButton />
    </>
  );
}
