"use client";

import Link from "next/link";
import { Calendar, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform
              <span className="gradient-text"> Your Look?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Book your appointment today and let our expert stylists bring out
              your best self. Whether it&apos;s a quick trim or a complete makeover,
              we&apos;re here to make you shine!
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-rose-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Us</p>
                  <p className="font-medium text-gray-900">
                    123 Beauty Lane, Fashion District, Mumbai
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-rose-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <a
                    href="tel:+919876543210"
                    className="font-medium text-gray-900 hover:text-rose-gold transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-rose-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opening Hours</p>
                  <p className="font-medium text-gray-900">
                    Mon-Sat: 9AM-9PM | Sun: 10AM-6PM
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Content - Map/Image placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-rose-gold/20 to-gold/20 relative">
              {/* Decorative salon image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Book Online 24/7
                  </h3>
                  <p className="text-gray-600 max-w-xs mx-auto">
                    Instant confirmation, easy rescheduling, and exclusive online offers
                  </p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-8 right-8 bg-white rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Today</p>
                    <p className="font-semibold text-gray-900">5 slots available</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-gold/20 flex items-center justify-center">
                    <span className="text-rose-gold text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-semibold text-gray-900">4.9/5 (2.5k reviews)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
