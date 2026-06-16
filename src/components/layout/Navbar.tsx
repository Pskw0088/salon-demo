"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  User,
  Calendar,
  ChevronDown,
  Sparkles,
  Gift,
  Star,
  Phone,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/stylists", label: "Our Stylists" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/offers", label: "Offers", badge: "Hot" },
  { href: "/membership", label: "Membership" },
  { href: "/blog", label: "Blog & Tips" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      {/* Top Bar */}
      <div
        className={cn(
          "border-b border-gray-100 transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        )}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Mon-Sun: 9AM - 9PM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/queue" className="flex items-center gap-1 text-rose-gold hover:text-rose-gold-dark">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Live Queue: </span>
              <span className="font-semibold">3 waiting</span>
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="/offers" className="hidden sm:flex items-center gap-1 text-gold hover:text-amber-600">
              <Gift className="w-4 h-4" />
              Special Offers
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide">
                <span className="text-rose-gold">Glamour</span>
                <span className="text-gray-800">Studio</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-rose-gold"
                    : "text-gray-700 hover:text-rose-gold"
                )}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-1 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold rounded-full" />
                )}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-2 text-sm font-medium text-gray-700 hover:text-rose-gold">
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navLinks.slice(7).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-gold/5 hover:text-rose-gold"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-gold/5 hover:text-rose-gold"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-rose-gold transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>
            
            <Link
              href="/book"
              className="hidden sm:flex items-center gap-2 btn-primary"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-full bg-white shadow-xl transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                  isActive(link.href)
                    ? "bg-rose-gold/10 text-rose-gold"
                    : "hover:bg-gray-50"
                )}
              >
                <span className="font-medium">{link.label}</span>
                {link.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
            >
              <span className="font-medium">About Us</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Login / Sign Up</span>
            </Link>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full btn-primary"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-6 text-sm text-gray-600">
            <Link href="/queue" className="flex items-center gap-1 text-rose-gold">
              <Star className="w-4 h-4" />
              Queue Status
            </Link>
            <span>|</span>
            <a href="tel:+919876543210" className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
