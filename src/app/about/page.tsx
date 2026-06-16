import { Award, Heart, Users, ShieldCheck, Star, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us - Glamour Studio",
  description: "Learn about Glamour Studio's story, our mission, values, and the team behind your beauty transformations.",
};

const values = [
  {
    icon: Heart,
    title: "Passion for Beauty",
    description: "We're driven by our love for beauty and helping our clients look and feel their best.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from service quality to customer experience.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your satisfaction is our priority. We listen, understand, and deliver personalized solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We believe in honest recommendations and transparent pricing with no hidden costs.",
  },
];

const milestones = [
  { year: "2016", title: "Founded", description: "Glamour Studio opens its first location in Mumbai" },
  { year: "2018", title: "100 Stylists", description: "Expanded our team to serve more clients" },
  { year: "2019", title: "Award Winning", description: "Recognized as Best Salon in the city" },
  { year: "2021", title: "Digital First", description: "Launched online booking and virtual consultations" },
  { year: "2023", title: "10,000+ Clients", description: "Milestone of serving ten thousand happy customers" },
  { year: "2024", title: "Expansion", description: "Opened 3 new locations across the city" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-gold via-rose-gold-dark to-rose-gold overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gold/20 blur-2xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-flex items-center gap-2 text-white/80 font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Where Beauty Meets Excellence
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              For over 8 years, Glamour Studio has been the destination for those
              seeking premium beauty services. We combine artistry with expertise
              to create transformative experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Journey to
                <span className="gradient-text"> Beauty Excellence</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Glamour Studio was founded in 2016 with a simple vision: to create
                  a space where everyone can feel beautiful and confident. What started
                  as a small salon with just three stylists has grown into one of the
                  most trusted names in beauty services.
                </p>
                <p>
                  Our founder, Meera Sharma, believed that great beauty services should
                  be accessible to everyone. She assembled a team of passionate professionals
                  who share her commitment to quality and customer satisfaction.
                </p>
                <p>
                  Today, we serve over 500 clients every week, but our core values remain
                  the same. We treat every client like family, listen to their needs, and
                  deliver results that exceed expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-gold/20 to-gold/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center">
                    <Award className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Award Winning Salon
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Best Salon Award 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core
              <span className="gradient-text"> Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do, from how we serve our clients
              to how we train our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-cream hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-gold/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-rose-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our
              <span className="text-rose-gold"> Milestones</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A journey of growth, learning, and countless happy clients
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-gold/30 transform -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"} hidden md:block`}>
                      {index % 2 === 0 && (
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                          <span className="text-rose-gold font-bold text-lg">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                          <p className="text-gray-400 text-sm mt-2">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="w-4 h-4 rounded-full bg-rose-gold ring-4 ring-rose-gold/30 flex-shrink-0 hidden md:block" />

                    <div className={`flex-1 ${index % 2 === 1 ? "text-left" : "text-right"} hidden md:block`}>
                      {index % 2 === 1 && (
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                          <span className="text-rose-gold font-bold text-lg">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                          <p className="text-gray-400 text-sm mt-2">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile view */}
                    <div className="md:hidden flex-1">
                      <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                        <span className="text-rose-gold font-bold text-lg">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm mt-2">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-rose-gold">8+</p>
                <p className="text-gray-600 mt-2">Years of Excellence</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-rose-gold">15+</p>
                <p className="text-gray-600 mt-2">Expert Stylists</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-rose-gold">10k+</p>
                <p className="text-gray-600 mt-2">Happy Clients</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-rose-gold">4.9</p>
                <p className="text-gray-600 mt-2">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Glamour Difference?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Join thousands of satisfied clients who trust us for their beauty needs
          </p>
          <Link href="/book" className="btn-gold inline-flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
