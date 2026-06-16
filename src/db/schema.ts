import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  date,
  time,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "admin",
  "stylist",
  "receptionist",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const hairTypeEnum = pgEnum("hair_type", [
  "straight",
  "wavy",
  "curly",
  "coily",
]);

export const skinTypeEnum = pgEnum("skin_type", [
  "normal",
  "oily",
  "dry",
  "combination",
]);

export const loyaltyTierEnum = pgEnum("loyalty_tier", [
  "bronze",
  "silver",
  "gold",
  "diamond",
]);

export const stylistDesignationEnum = pgEnum("stylist_designation", [
  "junior",
  "senior",
  "master",
  "expert",
]);

export const serviceCategoryEnum = pgEnum("service_category", [
  "mens",
  "womens",
  "kids",
  "unisex",
]);

export const serviceSubCategoryEnum = pgEnum("service_sub_category", [
  "haircut",
  "color",
  "spa",
  "nail",
  "facial",
  "bridal",
  "treatment",
  "massage",
  "grooming",
]);

export const appointmentTypeEnum = pgEnum("appointment_type", [
  "inSalon",
  "homeService",
]);

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "inProgress",
  "completed",
  "cancelled",
  "noShow",
]);

export const walkInStatusEnum = pgEnum("walkin_status", [
  "waiting",
  "inProgress",
  "completed",
  "cancelled",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "online",
  "cash",
  "wallet",
  "membership",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

export const offerTypeEnum = pgEnum("offer_type", [
  "percentage",
  "flat",
  "freeService",
  "buyOneGetOne",
]);

export const loyaltyTransactionTypeEnum = pgEnum("loyalty_transaction_type", [
  "earned",
  "redeemed",
  "bonus",
  "expired",
]);

export const membershipStatusEnum = pgEnum("membership_status", [
  "active",
  "expired",
  "cancelled",
]);

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: uuid("uid").defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  phone: varchar("phone", { length: 20 }).unique(),
  role: userRoleEnum("role").default("customer").notNull(),
  profilePhoto: text("profile_photo"),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  addresses: jsonb("addresses").$type<Array<{
    id: string;
    label: string;
    address: string;
    city: string;
    pincode: string;
    isDefault: boolean;
  }>>().default([]),
  hairType: hairTypeEnum("hair_type"),
  skinType: skinTypeEnum("skin_type"),
  favoriteServices: jsonb("favorite_services").$type<number[]>().default([]),
  favoriteStylists: jsonb("favorite_stylists").$type<number[]>().default([]),
  loyaltyPoints: integer("loyalty_points").default(0).notNull(),
  loyaltyTier: loyaltyTierEnum("loyalty_tier").default("bronze").notNull(),
  referralCode: varchar("referral_code", { length: 20 }).unique(),
  referredBy: varchar("referred_by", { length: 20 }),
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0"),
  visitCount: integer("visit_count").default(0).notNull(),
  lastVisit: timestamp("last_visit"),
  birthDayOfferUsed: boolean("birthday_offer_used").default(false),
  isVerified: boolean("is_verified").default(false).notNull(),
  otp: varchar("otp", { length: 6 }),
  otpExpiry: timestamp("otp_expiry"),
  notificationPreferences: jsonb("notification_preferences").$type<{
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
  }>().default({ email: true, sms: true, push: true, whatsapp: true }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Stylists Table
export const stylists = pgTable("stylists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  designation: stylistDesignationEnum("designation").default("junior").notNull(),
  specializations: jsonb("specializations").$type<string[]>().default([]),
  experience: integer("experience").default(0).notNull(),
  bio: text("bio"),
  about: text("about"),
  certifications: jsonb("certifications").$type<string[]>().default([]),
  training: jsonb("training").$type<string[]>().default([]),
  portfolio: jsonb("portfolio").$type<Array<{
    id: string;
    beforePhoto: string;
    afterPhoto: string;
    serviceType: string;
    description: string;
    likes: number;
    createdAt: string;
  }>>().default([]),
  workingHours: jsonb("working_hours").$type<{
    [key: string]: { start: string; end: string; isOff: boolean };
  }>().default({
    monday: { start: "09:00", end: "20:00", isOff: false },
    tuesday: { start: "09:00", end: "20:00", isOff: false },
    wednesday: { start: "09:00", end: "20:00", isOff: false },
    thursday: { start: "09:00", end: "20:00", isOff: false },
    friday: { start: "09:00", end: "20:00", isOff: false },
    saturday: { start: "09:00", end: "21:00", isOff: false },
    sunday: { start: "10:00", end: "18:00", isOff: false },
  }),
  leaveDays: jsonb("leave_days").$type<string[]>().default([]),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: integer("total_reviews").default(0).notNull(),
  totalAppointments: integer("total_appointments").default(0).notNull(),
  revenue: decimal("revenue", { precision: 12, scale: 2 }).default("0"),
  commission: decimal("commission", { precision: 5, scale: 2 }).default("30"),
  socialMedia: jsonb("social_media").$type<{
    instagram?: string;
    facebook?: string;
  }>().default({}),
  isAvailable: boolean("is_available").default(true).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Services Table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: serviceCategoryEnum("category").notNull(),
  subCategory: serviceSubCategoryEnum("sub_category").notNull(),
  priceMin: decimal("price_min", { precision: 10, scale: 2 }).notNull(),
  priceMax: decimal("price_max", { precision: 10, scale: 2 }),
  duration: integer("duration").notNull(), // in minutes
  image: text("image"),
  icon: varchar("icon", { length: 100 }),
  isPopular: boolean("is_popular").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  availableFor: varchar("available_for", { length: 50 }).default("both"),
  productsUsed: jsonb("products_used").$type<string[]>().default([]),
  aftercareInstructions: text("aftercare_instructions"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Appointments Table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  bookingId: varchar("booking_id", { length: 20 }).notNull().unique(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  stylistId: integer("stylist_id").references(() => stylists.id),
  services: jsonb("services").$type<Array<{
    serviceId: number;
    serviceName: string;
    price: number;
    duration: number;
  }>>().notNull(),
  appointmentType: appointmentTypeEnum("appointment_type").default("inSalon").notNull(),
  date: date("date").notNull(),
  timeSlot: time("time_slot").notNull(),
  totalDuration: integer("total_duration").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: appointmentStatusEnum("status").default("pending").notNull(),
  homeAddress: jsonb("home_address").$type<{
    address: string;
    city: string;
    pincode: string;
    landmark?: string;
  }>(),
  referencePhotos: jsonb("reference_photos").$type<string[]>().default([]),
  specialRequests: text("special_requests"),
  queueNumber: integer("queue_number"),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  couponCode: varchar("coupon_code", { length: 50 }),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  loyaltyPointsEarned: integer("loyalty_points_earned").default(0),
  reminderSent: boolean("reminder_sent").default(false),
  cancelReason: text("cancel_reason"),
  cancelledBy: varchar("cancelled_by", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// WalkIn Table
export const walkIns = pgTable("walk_ins", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }),
  stylistId: integer("stylist_id").references(() => stylists.id),
  services: jsonb("services").$type<Array<{
    serviceId: number;
    serviceName: string;
    price: number;
    duration: number;
  }>>().notNull(),
  queueNumber: integer("queue_number").notNull(),
  estimatedWaitTime: integer("estimated_wait_time"),
  status: walkInStatusEnum("status").default("waiting").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

// Packages Table
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  services: jsonb("services").$type<number[]>().notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  packagePrice: decimal("package_price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).notNull(),
  validFor: integer("valid_for").default(30), // days
  image: text("image"),
  tag: varchar("tag", { length: 50 }),
  category: varchar("category", { length: 100 }),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  purchaseCount: integer("purchase_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Memberships Table
export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  benefits: jsonb("benefits").$type<string[]>().notNull(),
  discountPercentage: decimal("discount_percentage", { precision: 5, scale: 2 }).notNull(),
  freeServices: jsonb("free_services").$type<number[]>().default([]),
  freeServicesCount: integer("free_services_count").default(0),
  priorityBooking: boolean("priority_booking").default(false).notNull(),
  homeServiceIncluded: integer("home_service_included").default(0),
  personalStylist: boolean("personal_stylist").default(false).notNull(),
  validityDays: integer("validity_days").default(30).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User Memberships Table
export const userMemberships = pgTable("user_memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  membershipId: integer("membership_id").references(() => memberships.id).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date").notNull(),
  status: membershipStatusEnum("status").default("active").notNull(),
  autoRenew: boolean("auto_renew").default(false).notNull(),
  freeServicesUsed: jsonb("free_services_used").$type<Array<{
    serviceId: number;
    usedAt: string;
  }>>().default([]),
  homeServicesUsed: integer("home_services_used").default(0),
  paymentHistory: jsonb("payment_history").$type<Array<{
    amount: number;
    date: string;
    transactionId: string;
  }>>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Payments Table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
  razorpayOrderId: varchar("razorpay_order_id", { length: 100 }),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 100 }),
  walletUsed: boolean("wallet_used").default(false),
  walletAmount: decimal("wallet_amount", { precision: 10, scale: 2 }).default("0"),
  loyaltyPointsUsed: integer("loyalty_points_used").default(0),
  pointsDiscount: decimal("points_discount", { precision: 10, scale: 2 }).default("0"),
  invoiceNumber: varchar("invoice_number", { length: 50 }),
  receiptUrl: text("receipt_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews Table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id).notNull(),
  stylistId: integer("stylist_id").references(() => stylists.id),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  overallRating: integer("overall_rating").notNull(),
  ratings: jsonb("ratings").$type<{
    service: number;
    stylist: number;
    cleanliness: number;
    value: number;
    ambience: number;
  }>(),
  comment: text("comment"),
  photos: jsonb("photos").$type<string[]>().default([]),
  salonReply: text("salon_reply"),
  replyDate: timestamp("reply_date"),
  isVerified: boolean("is_verified").default(false).notNull(),
  isAnonymous: boolean("is_anonymous").default(false).notNull(),
  likes: integer("likes").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 100 }),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  mrp: decimal("mrp", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).default("0"),
  images: jsonb("images").$type<string[]>().default([]),
  stock: integer("stock").default(0).notNull(),
  lowStockAlert: integer("low_stock_alert").default(10),
  ingredients: text("ingredients"),
  howToUse: text("how_to_use"),
  suitableFor: jsonb("suitable_for").$type<string[]>().default([]),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isSalonRecommended: boolean("is_salon_recommended").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Offers Table
export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: offerTypeEnum("type").notNull(),
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minAmount: decimal("min_amount", { precision: 10, scale: 2 }).default("0"),
  applicableOn: varchar("applicable_on", { length: 50 }).default("all"),
  services: jsonb("services").$type<number[]>().default([]),
  couponCode: varchar("coupon_code", { length: 50 }).unique(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  usageLimit: integer("usage_limit"),
  usedCount: integer("used_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Loyalty Transactions Table
export const loyaltyTransactions = pgTable("loyalty_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: loyaltyTransactionTypeEnum("type").notNull(),
  points: integer("points").notNull(),
  description: text("description"),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications Table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  channel: varchar("channel", { length: 50 }),
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Blog Posts Table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  thumbnail: text("thumbnail"),
  authorId: integer("author_id").references(() => users.id),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags").$type<string[]>().default([]),
  readTime: integer("read_time").default(5),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Inventory Table
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 100 }),
  category: varchar("category", { length: 100 }),
  unit: varchar("unit", { length: 50 }),
  currentStock: integer("current_stock").default(0).notNull(),
  minStock: integer("min_stock").default(10).notNull(),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),
  supplier: varchar("supplier", { length: 255 }),
  lastRestocked: timestamp("last_restocked"),
  usagePerService: jsonb("usage_per_service").$type<{
    [serviceId: string]: number;
  }>().default({}),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  appointments: many(appointments),
  reviews: many(reviews),
  payments: many(payments),
  notifications: many(notifications),
  loyaltyTransactions: many(loyaltyTransactions),
  membership: one(userMemberships),
  stylistProfile: one(stylists),
}));

export const stylistsRelations = relations(stylists, ({ one, many }) => ({
  user: one(users, {
    fields: [stylists.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
  reviews: many(reviews),
  walkIns: many(walkIns),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  // Services can be in many appointments through the JSON field
}));

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  customer: one(users, {
    fields: [appointments.customerId],
    references: [users.id],
  }),
  stylist: one(stylists, {
    fields: [appointments.stylistId],
    references: [stylists.id],
  }),
  payment: one(payments),
  review: one(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  stylist: one(stylists, {
    fields: [reviews.stylistId],
    references: [stylists.id],
  }),
  appointment: one(appointments, {
    fields: [reviews.appointmentId],
    references: [appointments.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Stylist = typeof stylists.$inferSelect;
export type NewStylist = typeof stylists.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type WalkIn = typeof walkIns.$inferSelect;
export type NewWalkIn = typeof walkIns.$inferInsert;
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
export type Membership = typeof memberships.$inferSelect;
export type NewMembership = typeof memberships.$inferInsert;
export type UserMembership = typeof userMemberships.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Offer = typeof offers.$inferSelect;
export type LoyaltyTransaction = typeof loyaltyTransactions.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Inventory = typeof inventory.$inferSelect;
