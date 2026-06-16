"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Award, Star, UserCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Clients",
    color: "text-rose-gold",
  },
  {
    icon: Award,
    value: 8,
    suffix: "+",
    label: "Years Experience",
    color: "text-gold",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Star Rating",
    color: "text-amber-500",
    decimals: 1,
  },
  {
    icon: UserCheck,
    value: 15,
    suffix: "+",
    label: "Expert Stylists",
    color: "text-rose-gold",
  },
];

function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;
      
      setCount(decimals > 0 ? Number(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, decimals]);

  return { count, ref };
}

export function StatsBar() {
  return (
    <section className="relative -mt-16 z-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const { count, ref } = useCountUp(stat.value, 2000, stat.decimals || 0);
              const Icon = stat.icon;
              
              return (
                <div
                  key={index}
                  ref={ref}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream mb-3 group-hover:scale-110 transition-transform">
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">
                    {count}{stat.suffix}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
