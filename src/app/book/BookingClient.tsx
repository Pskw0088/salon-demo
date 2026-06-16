"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Home,
  Building,
  CreditCard,
  Wallet,
  Gift,
} from "lucide-react";
import { cn, formatCurrency, formatTime, getTimeSlots, serviceIcons } from "@/lib/utils";
import type { Service, Stylist } from "@/db/schema";

interface StylistWithUser {
  id: number;
  userId: number;
  designation: "junior" | "senior" | "master" | "expert";
  specializations: string[] | null;
  experience: number;
  bio: string | null;
  rating: string | null;
  totalReviews: number;
  isAvailable: boolean;
  workingHours: Record<string, { start: string; end: string; isOff: boolean }> | null;
  user: {
    id: number;
    name: string;
    profilePhoto: string | null;
  };
}

interface Props {
  services: Service[];
  stylists: StylistWithUser[];
}

const steps = [
  { id: 1, label: "Services", icon: Sparkles },
  { id: 2, label: "Stylist", icon: User },
  { id: 3, label: "Date & Time", icon: Calendar },
  { id: 4, label: "Details", icon: MessageSquare },
  { id: 5, label: "Confirm", icon: Check },
];

export function BookingClient({ services, stylists }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<"inSalon" | "homeService">("inSalon");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });
  const [homeAddress, setHomeAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    landmark: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Initialize from URL params
  useEffect(() => {
    const servicesParam = searchParams.get("services");
    if (servicesParam) {
      const ids = servicesParam.split(",").map(Number).filter(Boolean);
      setSelectedServices(ids);
    }
    
    const stylistParam = searchParams.get("stylist");
    if (stylistParam) {
      setSelectedStylist(Number(stylistParam));
      setCurrentStep(2);
    }
  }, [searchParams]);

  // Calculate totals
  const selectedServiceDetails = useMemo(() => {
    return services.filter((s) => selectedServices.includes(s.id));
  }, [services, selectedServices]);

  const totalPrice = useMemo(() => {
    return selectedServiceDetails.reduce((sum, s) => sum + parseFloat(s.priceMin), 0);
  }, [selectedServiceDetails]);

  const totalDuration = useMemo(() => {
    return selectedServiceDetails.reduce((sum, s) => sum + s.duration, 0);
  }, [selectedServiceDetails]);

  // Generate dates for the next 30 days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  }, []);

  // Generate time slots
  const timeSlots = useMemo(() => {
    return getTimeSlots("09:00", "20:00", 30);
  }, []);

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedServices.length > 0;
      case 2:
        return true; // Stylist is optional
      case 3:
        return selectedDate && selectedTime;
      case 4:
        return customerDetails.name && customerDetails.phone;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: 1, // Would come from auth in real app
          stylistId: selectedStylist,
          services: selectedServiceDetails.map((s) => ({
            serviceId: s.id,
            serviceName: s.name,
            price: parseFloat(s.priceMin),
            duration: s.duration,
          })),
          appointmentType,
          date: selectedDate,
          timeSlot: selectedTime,
          specialRequests: customerDetails.specialRequests,
          homeAddress: appointmentType === "homeService" ? homeAddress : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingId(data.data.bookingId);
        setBookingComplete(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-cream py-12 flex items-center justify-center">
        <div className="max-w-lg w-full mx-4">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-500 mb-1">Booking ID</p>
              <p className="text-2xl font-bold text-rose-gold">{bookingId}</p>
            </div>

            <div className="space-y-3 text-left mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-rose-gold" />
                <span>{new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-rose-gold" />
                <span>{formatTime(selectedTime)}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Sparkles className="w-5 h-5 text-rose-gold" />
                <span>{selectedServiceDetails.map((s) => s.name).join(", ")}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/dashboard" className="btn-primary w-full">
                View My Appointments
              </Link>
              <Link href="/" className="btn-secondary w-full">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">
            Follow the steps to schedule your visit
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                        isActive
                          ? "bg-rose-gold text-white"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs mt-2 font-medium",
                        isActive ? "text-rose-gold" : "text-gray-500"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-2",
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Panel - Step Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6">
                {/* Step 1: Services */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Select Services
                    </h2>
                    <div className="space-y-3">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4",
                            selectedServices.includes(service.id)
                              ? "border-rose-gold bg-rose-gold/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <span className="text-3xl">
                            {serviceIcons[service.subCategory] || "✨"}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {service.duration} mins
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-rose-gold">
                              {formatCurrency(service.priceMin)}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                              selectedServices.includes(service.id)
                                ? "bg-rose-gold border-rose-gold text-white"
                                : "border-gray-300"
                            )}
                          >
                            {selectedServices.includes(service.id) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Stylist */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Choose Your Stylist
                    </h2>
                    
                    {/* Any Stylist Option */}
                    <button
                      onClick={() => setSelectedStylist(null)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all mb-4",
                        selectedStylist === null
                          ? "border-rose-gold bg-rose-gold/5"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Any Available Stylist
                          </h3>
                          <p className="text-sm text-gray-500">
                            We&apos;ll assign the best available stylist
                          </p>
                        </div>
                      </div>
                    </button>

                    <div className="space-y-3">
                      {stylists.map((stylist) => (
                        <button
                          key={stylist.id}
                          onClick={() => setSelectedStylist(stylist.id)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 text-left transition-all",
                            selectedStylist === stylist.id
                              ? "border-rose-gold bg-rose-gold/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                              style={{
                                background: `linear-gradient(135deg, var(--color-rose-gold) 0%, var(--color-gold) 100%)`,
                              }}
                            >
                              {stylist.user.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {stylist.user.name}
                              </h3>
                              <p className="text-sm text-rose-gold capitalize">
                                {stylist.designation} Stylist
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-gold fill-gold" />
                                <span className="text-sm font-medium">
                                  {stylist.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({stylist.totalReviews} reviews)
                                </span>
                              </div>
                            </div>
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                selectedStylist === stylist.id
                                  ? "bg-rose-gold border-rose-gold text-white"
                                  : "border-gray-300"
                              )}
                            >
                              {selectedStylist === stylist.id && (
                                <Check className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Select Date & Time
                    </h2>

                    {/* Date Selection */}
                    <div className="mb-8">
                      <h3 className="font-medium text-gray-700 mb-4">Choose a Date</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {availableDates.slice(0, 14).map((date) => {
                          const dateObj = new Date(date);
                          const isSelected = selectedDate === date;
                          const isToday = date === new Date().toISOString().split("T")[0];
                          
                          return (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={cn(
                                "flex-shrink-0 p-3 rounded-xl text-center min-w-[70px] transition-all",
                                isSelected
                                  ? "bg-rose-gold text-white"
                                  : "bg-gray-100 hover:bg-gray-200"
                              )}
                            >
                              <p className="text-xs opacity-70">
                                {isToday ? "Today" : dateObj.toLocaleDateString("en-IN", { weekday: "short" })}
                              </p>
                              <p className="text-lg font-bold">
                                {dateObj.getDate()}
                              </p>
                              <p className="text-xs opacity-70">
                                {dateObj.toLocaleDateString("en-IN", { month: "short" })}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-4">Choose a Time</h3>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          // Simulate some slots being unavailable
                          const isUnavailable = Math.random() < 0.2;
                          
                          return (
                            <button
                              key={time}
                              onClick={() => !isUnavailable && setSelectedTime(time)}
                              disabled={isUnavailable}
                              className={cn(
                                "p-2 rounded-lg text-sm font-medium transition-all",
                                isSelected
                                  ? "bg-rose-gold text-white"
                                  : isUnavailable
                                  ? "bg-gray-100 text-gray-400 line-through cursor-not-allowed"
                                  : "bg-gray-100 hover:bg-gray-200"
                              )}
                            >
                              {formatTime(time)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Customer Details */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Your Details
                    </h2>

                    {/* Appointment Type */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">
                        Appointment Type
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setAppointmentType("inSalon")}
                          className={cn(
                            "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                            appointmentType === "inSalon"
                              ? "border-rose-gold bg-rose-gold/5"
                              : "border-gray-200"
                          )}
                        >
                          <Building className="w-8 h-8 text-rose-gold" />
                          <span className="font-medium">In Salon</span>
                        </button>
                        <button
                          onClick={() => setAppointmentType("homeService")}
                          className={cn(
                            "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                            appointmentType === "homeService"
                              ? "border-rose-gold bg-rose-gold/5"
                              : "border-gray-200"
                          )}
                        >
                          <Home className="w-8 h-8 text-rose-gold" />
                          <span className="font-medium">Home Service</span>
                          <span className="text-xs text-gray-500">+₹200</span>
                        </button>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={customerDetails.name}
                          onChange={(e) =>
                            setCustomerDetails((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="input-field"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={customerDetails.phone}
                          onChange={(e) =>
                            setCustomerDetails((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="input-field"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={customerDetails.email}
                          onChange={(e) =>
                            setCustomerDetails((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="input-field"
                          placeholder="Enter your email"
                        />
                      </div>

                      {appointmentType === "homeService" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address *
                            </label>
                            <textarea
                              value={homeAddress.address}
                              onChange={(e) =>
                                setHomeAddress((prev) => ({
                                  ...prev,
                                  address: e.target.value,
                                }))
                              }
                              className="input-field"
                              rows={2}
                              placeholder="Enter your full address"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                value={homeAddress.city}
                                onChange={(e) =>
                                  setHomeAddress((prev) => ({
                                    ...prev,
                                    city: e.target.value,
                                  }))
                                }
                                className="input-field"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pincode
                              </label>
                              <input
                                type="text"
                                value={homeAddress.pincode}
                                onChange={(e) =>
                                  setHomeAddress((prev) => ({
                                    ...prev,
                                    pincode: e.target.value,
                                  }))
                                }
                                className="input-field"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={customerDetails.specialRequests}
                          onChange={(e) =>
                            setCustomerDetails((prev) => ({
                              ...prev,
                              specialRequests: e.target.value,
                            }))
                          }
                          className="input-field"
                          rows={3}
                          placeholder="Any specific requests or notes..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Review & Confirm
                    </h2>

                    <div className="space-y-6">
                      {/* Services */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-medium text-gray-700 mb-3">Services</h3>
                        {selectedServiceDetails.map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                          >
                            <span>{service.name}</span>
                            <span className="font-medium">
                              {formatCurrency(service.priceMin)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Appointment Details */}
                      <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-rose-gold" />
                          <span>
                            {new Date(selectedDate).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-rose-gold" />
                          <span>{formatTime(selectedTime)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-rose-gold" />
                          <span>
                            {selectedStylist
                              ? stylists.find((s) => s.id === selectedStylist)?.user
                                  .name
                              : "Any Available Stylist"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {appointmentType === "inSalon" ? (
                            <Building className="w-5 h-5 text-rose-gold" />
                          ) : (
                            <Home className="w-5 h-5 text-rose-gold" />
                          )}
                          <span>
                            {appointmentType === "inSalon"
                              ? "In Salon"
                              : "Home Service"}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                        <p className="font-medium">{customerDetails.name}</p>
                        <p className="text-sm text-gray-600">{customerDetails.phone}</p>
                        {customerDetails.email && (
                          <p className="text-sm text-gray-600">
                            {customerDetails.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                      currentStep === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>

                  {currentStep < 5 ? (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={cn(
                        "flex items-center gap-2 btn-primary",
                        !canProceed() && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-primary flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-28">
                <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>

                {selectedServices.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-6">
                      {selectedServiceDetails.map((service) => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{service.name}</span>
                          <span className="font-medium">
                            {formatCurrency(service.priceMin)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span>{totalDuration} mins</span>
                      </div>
                      {appointmentType === "homeService" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Home Service</span>
                          <span>+₹200</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-rose-gold">
                          {formatCurrency(
                            totalPrice + (appointmentType === "homeService" ? 200 : 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Select services to see the summary
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
