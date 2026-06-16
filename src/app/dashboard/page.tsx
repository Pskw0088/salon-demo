import Link from "next/link";
import { Calendar, Star, Gift, Clock, ArrowRight, Crown, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Dashboard - Glamour Studio",
  description: "Manage your appointments, view loyalty points, and access your account.",
};

// Mock data - would come from session/API in real app
const userData = {
  name: "Meera Kapoor",
  email: "meera@example.com",
  loyaltyPoints: 2500,
  loyaltyTier: "silver",
  totalVisits: 15,
  membershipStatus: "Premium",
};

const upcomingAppointment = {
  id: 1,
  bookingId: "GS12345ABC",
  date: "2024-02-15",
  time: "14:00",
  stylist: "Priya Sharma",
  services: ["Hair Color", "Hair Spa"],
  totalAmount: 5500,
};

const recentTransactions = [
  { id: 1, type: "earned", points: 250, description: "Appointment completed", date: "2024-02-01" },
  { id: 2, type: "bonus", points: 100, description: "Birthday bonus", date: "2024-01-15" },
  { id: 3, type: "redeemed", points: -500, description: "Discount applied", date: "2024-01-10" },
];

export default function DashboardPage() {
  const tierColors: Record<string, string> = {
    bronze: "from-amber-600 to-amber-800",
    silver: "from-gray-400 to-gray-600",
    gold: "from-yellow-400 to-yellow-600",
    diamond: "from-cyan-400 to-blue-600",
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="gradient-text">{userData.name}</span>!
          </h1>
          <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your account</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <Calendar className="w-8 h-8 text-rose-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userData.totalVisits}</p>
                <p className="text-sm text-gray-500">Total Visits</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <Star className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userData.loyaltyPoints}</p>
                <p className="text-sm text-gray-500">Loyalty Points</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 capitalize">{userData.loyaltyTier}</p>
                <p className="text-sm text-gray-500">Loyalty Tier</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-md">
                <Gift className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{userData.membershipStatus}</p>
                <p className="text-sm text-gray-500">Membership</p>
              </div>
            </div>

            {/* Upcoming Appointment */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointment</h2>
                <Link href="/my-appointments" className="text-rose-gold text-sm font-medium hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {upcomingAppointment ? (
                <div className="bg-gradient-to-br from-rose-gold/10 to-gold/10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-rose-gold font-medium mb-1">
                        Booking #{upcomingAppointment.bookingId}
                      </p>
                      <div className="flex items-center gap-4 text-gray-700 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-rose-gold" />
                          {new Date(upcomingAppointment.date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-rose-gold" />
                          {upcomingAppointment.time}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        <strong>{upcomingAppointment.stylist}</strong> • {upcomingAppointment.services.join(", ")}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/appointments/${upcomingAppointment.id}`} className="btn-secondary text-sm">
                        Reschedule
                      </Link>
                      <Link href="/book" className="btn-primary text-sm">
                        Check In
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No upcoming appointments</p>
                  <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Book Now
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/book" className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-rose-gold/10 flex items-center justify-center mb-3 group-hover:bg-rose-gold/20">
                  <Calendar className="w-6 h-6 text-rose-gold" />
                </div>
                <p className="font-medium text-gray-900">Book</p>
              </Link>
              <Link href="/services" className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium text-gray-900">Services</p>
              </Link>
              <Link href="/offers" className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-200">
                  <Gift className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="font-medium text-gray-900">Offers</p>
              </Link>
              <Link href="/profile" className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg transition-all group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-900">Profile</p>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Loyalty Card */}
            <div className={`bg-gradient-to-br ${tierColors[userData.loyaltyTier]} rounded-2xl p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-8 h-8" />
                <span className="text-sm uppercase tracking-wider opacity-80">
                  {userData.loyaltyTier} Member
                </span>
              </div>
              <p className="text-4xl font-bold mb-2">{userData.loyaltyPoints}</p>
              <p className="text-white/80 text-sm mb-4">Loyalty Points</p>
              
              {/* Progress to next tier */}
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-white rounded-full h-full"
                  style={{ width: `${Math.min((userData.loyaltyPoints / 5000) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-white/70">
                {5000 - userData.loyaltyPoints} points to Gold tier
              </p>

              <Link href="/loyalty" className="mt-4 block text-center py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                View Details
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Points Activity</h3>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <span className={`font-bold ${tx.points > 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {tx.points > 0 ? "+" : ""}{tx.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
