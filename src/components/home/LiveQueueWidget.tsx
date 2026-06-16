"use client";

import Link from "next/link";
import { Users, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export function LiveQueueWidget() {
  const [queueData, setQueueData] = useState({
    currentlyServing: 12,
    peopleWaiting: 3,
    estimatedWait: 25,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshQueue = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setQueueData({
        currentlyServing: queueData.currentlyServing,
        peopleWaiting: Math.max(0, queueData.peopleWaiting + Math.floor(Math.random() * 3) - 1),
        estimatedWait: Math.max(5, queueData.estimatedWait + Math.floor(Math.random() * 10) - 5),
      });
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData((prev) => ({
        ...prev,
        estimatedWait: Math.max(5, prev.estimatedWait - 1),
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-rose-gold via-rose-gold-dark to-rose-gold">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="text-white text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium opacity-90">Live Queue Status</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Skip The Wait - Join Virtual Queue!
            </h3>
            <p className="text-white/80 max-w-xl">
              Join our virtual queue from anywhere and get notified when it&apos;s your turn.
              No more waiting in line!
            </p>
          </div>

          {/* Queue Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-white/70 text-sm mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Now Serving
              </div>
              <p className="text-3xl font-bold text-white">#{queueData.currentlyServing}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-white/70 text-sm mb-1">
                <Users className="w-4 h-4" />
                In Queue
              </div>
              <p className="text-3xl font-bold text-white">{queueData.peopleWaiting}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-white/70 text-sm mb-1">
                <Clock className="w-4 h-4" />
                Est. Wait
              </div>
              <p className="text-3xl font-bold text-white">{queueData.estimatedWait} min</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="/queue"
              className="btn-gold flex items-center justify-center gap-2"
            >
              Join Queue Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={refreshQueue}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
