"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full shadow-sm border-b fixed top-0 z-50">
      {/* Top Contact Bar - Hidden on mobile */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2 px-4 ">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@koebltd.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>19, Mojidi Street, Off Toyin Street, Ikeja Lagos</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <a href="https://www.facebook.com/share/1N62CWs5DU/" target="_blank"><span className="text-xs font-bold">f</span></a>
              </div>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <a href="https://www.instagram.com/koebindustrial_ltd?igsh=MWM4bGNyZTd0MDcxcA==" target="_blank"><span className="text-xs font-bold">in</span></a>
              </div>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <a href="https://www.instagram.com/koeb_industrial/" target="_blank"><span className="text-xs font-bold">i</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/images/koeb-logo.png"
                alt="koeb  logo"
                className="w-20 h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-industrial-black hover:text-primary font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            {isSignedIn ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Avatar className="w-8 h-8 cursor-pointer" onClick={() => signOut({ redirectUrl: "/" })}>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="text-xs">{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={() => signOut({ redirectUrl: "/" })}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-industrial-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full bg-white z-40 w-4/5 max-w-sm transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col h-full pt-8 px-4">
            <button
              onClick={toggleMenu}
              className="self-end mb-8 text-industrial-black focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col space-y-8 flex-grow">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl text-industrial-black hover:text-primary font-medium py-2 px-4"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pb-8 space-y-3">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                onClick={toggleMenu}
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              {isSignedIn ? (
                <>
                  <Button variant="outline" className="w-full" onClick={toggleMenu} asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => { toggleMenu(); signOut({ redirectUrl: "/" }); }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={toggleMenu} asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;