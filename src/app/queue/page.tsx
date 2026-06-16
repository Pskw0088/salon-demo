"use client";

import { useState } from "react";
import { Users, Clock, Hash, Phone, User, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QueuePage() {
  const [queueData] = useState({
    currentlyServing: 12,
    peopleWaiting: 3,
    estimatedWait: 25,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const [myQueueNumber, setMyQueueNumber] = useState<number | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setMyQueueNumber(queueData.currentlyServing + queueData.peopleWaiting + 1);
      setIsJoining(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Live
            <span className="gradient-text"> Queue Status</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Skip the wait! Join our virtual queue and get notified when it&apos;s your turn
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Current Status */}
          <div className="bg-gradient-to-r from-rose-gold to-rose-gold-dark rounded-3xl p-8 text-white mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium">Live Queue Status</span>
              </div>
              <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <Hash className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold">#{queueData.currentlyServing}</p>
                <p className="text-white/70 text-sm">Now Serving</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold">{queueData.peopleWaiting}</p>
                <p className="text-white/70 text-sm">In Queue</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <Clock className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold">{queueData.estimatedWait} min</p>
                <p className="text-white/70 text-sm">Est. Wait</p>
              </div>
            </div>
          </div>

          {/* My Queue Card or Join Form */}
          {myQueueNumber ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-white">#{myQueueNumber}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You&apos;re in the Queue!
              </h2>
              <p className="text-gray-600 mb-6">
                Your estimated wait time is approximately <strong>{(myQueueNumber - queueData.currentlyServing) * 15} minutes</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Notify Me When Ready
                </button>
                <button
                  onClick={() => setMyQueueNumber(null)}
                  className="btn-secondary"
                >
                  Leave Queue
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Join Virtual Queue
              </h2>

              <form onSubmit={handleJoinQueue} className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field pl-12"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field pl-12"
                      placeholder="For SMS notification"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service (Optional)
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a service</option>
                    <option value="haircut">Haircut</option>
                    <option value="color">Hair Color</option>
                    <option value="spa">Spa</option>
                    <option value="facial">Facial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isJoining}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isJoining ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Queue
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
