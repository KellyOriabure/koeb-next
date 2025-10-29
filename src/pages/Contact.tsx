import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Globe } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen mt-20">
      <Header />
      
      {/* Contact Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Office Address */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-black mb-2">Office Address</h3>
                  <p className="text-industrial-gray">19, Mojidi Str, Off Toyin Str, Lagos</p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-black mb-2">Email Us</h3>
                  <p className="text-industrial-gray">info@koebltd.com</p>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-black mb-2">Phone Number</h3>
                  <div className="text-industrial-gray">
                    <p>08023508817, 08031335765,</p>
                    <p>08038672377</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Left Side - Get In Touch */}
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-primary mr-4"></div>
                  <span className="text-primary font-medium">Get In Touch</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-industrial-black mb-6">
                  Send a<br />
                  Message?
                </h2>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <div className="bg-primary p-3 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <Facebook className="h-5 w-5 text-white" />
                </div>
                <div className="bg-primary p-3 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <Twitter className="h-5 w-5 text-white" />
                </div>
                <div className="bg-primary p-3 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <div className="bg-primary p-3 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                  <Globe className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-industrial-black">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      className="mt-2 bg-gray-100 border-gray-200 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-industrial-black">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="Phone Number" 
                      className="mt-2 bg-gray-100 border-gray-200 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-industrial-black">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email Address" 
                    className="mt-2 bg-gray-100 border-gray-200 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-industrial-black">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Your Message" 
                    rows={6}
                    className="mt-2 bg-gray-100 border-gray-200 focus:border-primary"
                  />
                </div>
                
                <div className="relative">
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 relative overflow-hidden"
                  >
                    Submit Now
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-primary border-t-[20px] border-t-white"></div>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-green-500 p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;