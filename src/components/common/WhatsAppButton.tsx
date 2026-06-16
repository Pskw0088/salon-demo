"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to book an appointment at Glamour Studio."
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="animate-fade-in bg-white rounded-lg shadow-xl p-4 max-w-xs relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-700 pr-4">
            👋 Hi there! Need help booking or have questions? Chat with us on WhatsApp!
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className={cn(
          "w-14 h-14 rounded-full bg-green-500 text-white shadow-lg",
          "flex items-center justify-center",
          "hover:bg-green-600 hover:scale-110 transition-all duration-300",
          "animate-float"
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
}
