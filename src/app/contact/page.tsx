import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us - Glamour Studio",
  description: "Get in touch with Glamour Studio. Visit our salon, call us, or send us a message. We're here to help with all your beauty needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in
            <span className="gradient-text"> Touch</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or want to book an appointment? We&apos;d love to hear from you.
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="input-field">
                  <option value="">Select a subject</option>
                  <option value="booking">Appointment Booking</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="partnership">Partnership/Business</option>
                  <option value="careers">Careers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className="input-field resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600 text-sm">
                      123 Beauty Lane, Fashion District,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600 text-sm">
                      +91 98765 43210<br />
                      +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600 text-sm">
                      hello@glamourstudio.com<br />
                      bookings@glamourstudio.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Mon-Sat: 9:00 AM - 9:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-rose-gold mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-gold text-sm font-medium hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-green-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Chat on WhatsApp</h3>
                  <p className="text-white/80 text-sm">
                    Quick responses, easy booking
                  </p>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I book an appointment?",
                a: "You can book an appointment online through our website, call us directly, or send us a WhatsApp message. We recommend booking at least 24 hours in advance for your preferred time slot."
              },
              {
                q: "What is your cancellation policy?",
                a: "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee of 50% of the service cost."
              },
              {
                q: "Do you offer home services?",
                a: "Yes! We offer home services for most of our treatments. Additional charges apply based on your location. Book online or call us to arrange a home visit."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept cash, all major credit/debit cards, UPI, and digital wallets. Online payments are processed securely through Razorpay."
              },
              {
                q: "Do you have parking facilities?",
                a: "Yes, we have complimentary parking available for our customers. Valet parking is also available upon request."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl shadow-md overflow-hidden"
              >
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-rose-gold group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
