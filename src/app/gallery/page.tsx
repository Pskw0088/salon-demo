import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Gallery - Glamour Studio",
  description: "View stunning before and after transformations by our talented stylists.",
};

const galleryItems = [
  { id: 1, type: "Hair Color", stylist: "Priya Sharma", gradient: "from-rose-gold to-pink-400" },
  { id: 2, type: "Bridal Makeup", stylist: "Ananya Patel", gradient: "from-gold to-amber-400" },
  { id: 3, type: "Haircut", stylist: "Rahul Verma", gradient: "from-blue-500 to-indigo-500" },
  { id: 4, type: "Nail Art", stylist: "Neha Gupta", gradient: "from-pink-500 to-rose-500" },
  { id: 5, type: "Hair Treatment", stylist: "Priya Sharma", gradient: "from-purple-500 to-violet-500" },
  { id: 6, type: "Men's Grooming", stylist: "Rahul Verma", gradient: "from-slate-600 to-gray-700" },
  { id: 7, type: "Facial", stylist: "Ananya Patel", gradient: "from-emerald-500 to-teal-500" },
  { id: 8, type: "Balayage", stylist: "Priya Sharma", gradient: "from-amber-500 to-orange-500" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stunning
            <span className="gradient-text"> Transformations</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our portfolio of before & after looks created by our talented team
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Hair Color", "Haircut", "Bridal", "Nail Art", "Facial", "Men's"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                tab === "All"
                  ? "bg-rose-gold text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

              {/* Before/After Labels */}
              <div className="absolute inset-0 flex">
                <div className="w-1/2 flex items-center justify-center border-r border-white/20">
                  <span className="text-white/50 text-sm font-medium">BEFORE</span>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <span className="text-white/50 text-sm font-medium">AFTER</span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs text-rose-gold-light font-medium">{item.type}</span>
                  <p className="font-semibold mt-1">by {item.stylist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
