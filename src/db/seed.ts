import { db } from "./index";
import {
  users,
  stylists,
  services,
  appointments,
  walkIns,
  packages,
  memberships,
  reviews,
  offers,
  blogPosts,
  products,
} from "./schema";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await db.delete(reviews);
  await db.delete(appointments);
  await db.delete(walkIns);
  await db.delete(stylists);
  await db.delete(users);
  await db.delete(services);
  await db.delete(packages);
  await db.delete(memberships);
  await db.delete(offers);
  await db.delete(blogPosts);
  await db.delete(products);

  console.log("✅ Cleared existing data");

  // Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const [adminUser] = await db
    .insert(users)
    .values({
      name: "Admin User",
      email: "admin@glamourstudio.com",
      password: hashedPassword,
      phone: "9876543210",
      role: "admin",
      isVerified: true,
      referralCode: "ADMIN001",
      loyaltyPoints: 0,
      loyaltyTier: "diamond",
    })
    .returning();

  console.log("✅ Created admin user");

  // Create Stylists (Users + Stylist profiles)
  const stylistsData = [
    {
      name: "Priya Sharma",
      email: "priya@glamourstudio.com",
      phone: "9876543211",
      designation: "master" as const,
      specializations: ["Hair Color", "Bridal", "Balayage", "Hair Treatment"],
      experience: 10,
      bio: "Master colorist with expertise in balayage and bridal looks",
      rating: "4.9",
    },
    {
      name: "Rahul Verma",
      email: "rahul@glamourstudio.com",
      phone: "9876543212",
      designation: "senior" as const,
      specializations: ["Men's Grooming", "Haircuts", "Beard Styling"],
      experience: 8,
      bio: "Specialist in men's grooming and modern haircuts",
      rating: "4.8",
    },
    {
      name: "Ananya Patel",
      email: "ananya@glamourstudio.com",
      phone: "9876543213",
      designation: "expert" as const,
      specializations: ["Skin Care", "Facials", "Spa", "Body Treatments"],
      experience: 12,
      bio: "Expert in skin treatments and spa therapies",
      rating: "5.0",
    },
    {
      name: "Vikram Singh",
      email: "vikram@glamourstudio.com",
      phone: "9876543214",
      designation: "senior" as const,
      specializations: ["Hair Styling", "Hair Color", "Men's Cuts"],
      experience: 7,
      bio: "Creative stylist specializing in trendy cuts",
      rating: "4.7",
    },
    {
      name: "Neha Gupta",
      email: "neha@glamourstudio.com",
      phone: "9876543215",
      designation: "master" as const,
      specializations: ["Nail Art", "Manicure", "Pedicure", "Nail Extensions"],
      experience: 9,
      bio: "Master nail technician with creative designs",
      rating: "4.9",
    },
    {
      name: "Amit Kumar",
      email: "amit@glamourstudio.com",
      phone: "9876543216",
      designation: "junior" as const,
      specializations: ["Haircuts", "Basic Styling", "Shampoo Services"],
      experience: 2,
      bio: "Passionate junior stylist learning the craft",
      rating: "4.5",
    },
    {
      name: "Kavya Reddy",
      email: "kavya@glamourstudio.com",
      phone: "9876543217",
      designation: "expert" as const,
      specializations: ["Bridal Makeup", "Party Makeup", "HD Makeup"],
      experience: 11,
      bio: "Celebrity makeup artist specializing in bridal looks",
      rating: "4.95",
    },
    {
      name: "Arjun Mehta",
      email: "arjun@glamourstudio.com",
      phone: "9876543218",
      designation: "senior" as const,
      specializations: ["Hair Color", "Highlights", "Global Coloring"],
      experience: 6,
      bio: "Color specialist with eye for detail",
      rating: "4.6",
    },
  ];

  const createdStylists = [];
  for (const stylistData of stylistsData) {
    const [user] = await db
      .insert(users)
      .values({
        name: stylistData.name,
        email: stylistData.email,
        password: hashedPassword,
        phone: stylistData.phone,
        role: "stylist",
        isVerified: true,
        referralCode: `STY${stylistData.phone.slice(-4)}`,
      })
      .returning();

    const [stylist] = await db
      .insert(stylists)
      .values({
        userId: user.id,
        designation: stylistData.designation,
        specializations: stylistData.specializations,
        experience: stylistData.experience,
        bio: stylistData.bio,
        rating: stylistData.rating,
        totalReviews: Math.floor(Math.random() * 300) + 100,
        totalAppointments: Math.floor(Math.random() * 1000) + 200,
        isAvailable: true,
        isActive: true,
      })
      .returning();

    createdStylists.push(stylist);
  }

  console.log("✅ Created stylists");

  // Create Services
  const servicesData = [
    // Hair Services
    { name: "Women's Haircut", description: "Professional haircut with styling", category: "womens" as const, subCategory: "haircut" as const, priceMin: "500", priceMax: "1500", duration: 45, isPopular: true, isFeatured: true },
    { name: "Men's Haircut", description: "Classic or modern men's haircut", category: "mens" as const, subCategory: "haircut" as const, priceMin: "300", priceMax: "800", duration: 30, isPopular: true, isFeatured: true },
    { name: "Kids Haircut", description: "Fun haircuts for children", category: "kids" as const, subCategory: "haircut" as const, priceMin: "200", priceMax: "500", duration: 25, isPopular: false, isFeatured: false },
    { name: "Hair Spa", description: "Deep conditioning hair spa treatment", category: "unisex" as const, subCategory: "treatment" as const, priceMin: "1000", priceMax: "3000", duration: 60, isPopular: true, isFeatured: true },
    
    // Color Services
    { name: "Global Hair Color", description: "Full head single color application", category: "unisex" as const, subCategory: "color" as const, priceMin: "2000", priceMax: "5000", duration: 120, isPopular: true, isFeatured: true },
    { name: "Highlights", description: "Partial or full highlights", category: "unisex" as const, subCategory: "color" as const, priceMin: "3000", priceMax: "8000", duration: 150, isPopular: true, isFeatured: false },
    { name: "Balayage", description: "Hand-painted balayage coloring", category: "unisex" as const, subCategory: "color" as const, priceMin: "5000", priceMax: "15000", duration: 180, isPopular: true, isFeatured: true },
    { name: "Root Touch Up", description: "Root color refresh", category: "unisex" as const, subCategory: "color" as const, priceMin: "1000", priceMax: "2500", duration: 60, isPopular: false, isFeatured: false },
    
    // Spa Services
    { name: "Swedish Massage", description: "Relaxing full body massage", category: "unisex" as const, subCategory: "massage" as const, priceMin: "1500", priceMax: "3000", duration: 60, isPopular: true, isFeatured: true },
    { name: "Deep Tissue Massage", description: "Therapeutic deep tissue work", category: "unisex" as const, subCategory: "massage" as const, priceMin: "2000", priceMax: "4000", duration: 75, isPopular: false, isFeatured: false },
    { name: "Body Scrub & Polish", description: "Exfoliating body treatment", category: "unisex" as const, subCategory: "spa" as const, priceMin: "2000", priceMax: "4000", duration: 60, isPopular: false, isFeatured: false },
    
    // Facial Services
    { name: "Classic Facial", description: "Deep cleansing facial", category: "unisex" as const, subCategory: "facial" as const, priceMin: "1000", priceMax: "2000", duration: 45, isPopular: true, isFeatured: true },
    { name: "Anti-Aging Facial", description: "Premium anti-aging treatment", category: "unisex" as const, subCategory: "facial" as const, priceMin: "2500", priceMax: "5000", duration: 75, isPopular: true, isFeatured: false },
    { name: "Hydrating Facial", description: "Intense moisture boost", category: "unisex" as const, subCategory: "facial" as const, priceMin: "1500", priceMax: "3000", duration: 60, isPopular: false, isFeatured: false },
    { name: "Gold Facial", description: "Luxurious gold-infused treatment", category: "unisex" as const, subCategory: "facial" as const, priceMin: "3000", priceMax: "6000", duration: 90, isPopular: true, isFeatured: true },
    
    // Nail Services
    { name: "Classic Manicure", description: "Basic nail care and polish", category: "unisex" as const, subCategory: "nail" as const, priceMin: "400", priceMax: "800", duration: 30, isPopular: true, isFeatured: false },
    { name: "Gel Manicure", description: "Long-lasting gel polish", category: "unisex" as const, subCategory: "nail" as const, priceMin: "800", priceMax: "1500", duration: 45, isPopular: true, isFeatured: true },
    { name: "Nail Art", description: "Creative nail designs", category: "unisex" as const, subCategory: "nail" as const, priceMin: "500", priceMax: "2000", duration: 60, isPopular: true, isFeatured: false },
    { name: "Classic Pedicure", description: "Foot care and polish", category: "unisex" as const, subCategory: "nail" as const, priceMin: "600", priceMax: "1200", duration: 45, isPopular: true, isFeatured: false },
    { name: "Spa Pedicure", description: "Luxury foot spa treatment", category: "unisex" as const, subCategory: "nail" as const, priceMin: "1000", priceMax: "2000", duration: 60, isPopular: false, isFeatured: false },
    
    // Bridal Services
    { name: "Bridal Makeup", description: "Complete bridal makeup with trials", category: "womens" as const, subCategory: "bridal" as const, priceMin: "15000", priceMax: "50000", duration: 180, isPopular: true, isFeatured: true },
    { name: "Engagement Makeup", description: "Glamorous engagement look", category: "womens" as const, subCategory: "bridal" as const, priceMin: "8000", priceMax: "20000", duration: 120, isPopular: true, isFeatured: false },
    { name: "Mehndi Ceremony Makeup", description: "Fresh mehndi look", category: "womens" as const, subCategory: "bridal" as const, priceMin: "5000", priceMax: "15000", duration: 90, isPopular: false, isFeatured: false },
    
    // Men's Grooming
    { name: "Beard Trim & Style", description: "Professional beard grooming", category: "mens" as const, subCategory: "grooming" as const, priceMin: "200", priceMax: "500", duration: 20, isPopular: true, isFeatured: true },
    { name: "Clean Shave", description: "Classic straight razor shave", category: "mens" as const, subCategory: "grooming" as const, priceMin: "300", priceMax: "600", duration: 30, isPopular: false, isFeatured: false },
    { name: "Men's Facial", description: "Rejuvenating facial for men", category: "mens" as const, subCategory: "facial" as const, priceMin: "1000", priceMax: "2500", duration: 45, isPopular: true, isFeatured: false },
    
    // Treatments
    { name: "Keratin Treatment", description: "Smoothing keratin treatment", category: "unisex" as const, subCategory: "treatment" as const, priceMin: "5000", priceMax: "15000", duration: 180, isPopular: true, isFeatured: true },
    { name: "Hair Botox", description: "Deep repair hair botox", category: "unisex" as const, subCategory: "treatment" as const, priceMin: "4000", priceMax: "12000", duration: 150, isPopular: true, isFeatured: false },
    { name: "Scalp Treatment", description: "Therapeutic scalp care", category: "unisex" as const, subCategory: "treatment" as const, priceMin: "1500", priceMax: "3500", duration: 45, isPopular: false, isFeatured: false },
    { name: "Hair Smoothening", description: "Permanent straightening", category: "unisex" as const, subCategory: "treatment" as const, priceMin: "4000", priceMax: "12000", duration: 180, isPopular: true, isFeatured: false },
  ];

  const createdServices = await db.insert(services).values(servicesData).returning();
  console.log("✅ Created services");

  // Create Packages
  const packagesData = [
    {
      name: "Bridal Glow Package",
      description: "Complete bridal beauty experience for your special day",
      services: createdServices.filter(s => ["Bridal Makeup", "Gold Facial", "Hair Spa", "Gel Manicure", "Spa Pedicure"].includes(s.name)).map(s => s.id),
      originalPrice: "35000",
      packagePrice: "25000",
      discount: "28.57",
      validFor: 90,
      tag: "Bestseller",
      category: "bridal",
      isFeatured: true,
    },
    {
      name: "Couple Spa Retreat",
      description: "Relaxing spa experience for couples",
      services: createdServices.filter(s => ["Swedish Massage", "Body Scrub & Polish", "Classic Facial", "Classic Manicure", "Classic Pedicure"].includes(s.name)).map(s => s.id),
      originalPrice: "12000",
      packagePrice: "8999",
      discount: "25.01",
      validFor: 30,
      tag: "Popular",
      category: "couple",
      isFeatured: true,
    },
    {
      name: "Party Ready Package",
      description: "Get glammed up for any special occasion",
      services: createdServices.filter(s => ["Women's Haircut", "Gel Manicure", "Classic Facial"].includes(s.name)).map(s => s.id),
      originalPrice: "8000",
      packagePrice: "5999",
      discount: "25.01",
      validFor: 30,
      tag: "New",
      category: "party",
      isFeatured: true,
    },
    {
      name: "Men's Grooming Essential",
      description: "Complete grooming package for men",
      services: createdServices.filter(s => ["Men's Haircut", "Beard Trim & Style", "Men's Facial"].includes(s.name)).map(s => s.id),
      originalPrice: "2500",
      packagePrice: "1899",
      discount: "24.04",
      validFor: 30,
      tag: "Popular",
      category: "grooming",
      isFeatured: false,
    },
    {
      name: "Hair Transformation",
      description: "Complete hair makeover package",
      services: createdServices.filter(s => ["Women's Haircut", "Global Hair Color", "Hair Spa"].includes(s.name)).map(s => s.id),
      originalPrice: "6000",
      packagePrice: "4499",
      discount: "25.02",
      validFor: 30,
      tag: "Trending",
      category: "hair",
      isFeatured: false,
    },
  ];

  await db.insert(packages).values(packagesData);
  console.log("✅ Created packages");

  // Create Memberships
  const membershipsData = [
    {
      name: "Basic",
      price: "999",
      benefits: ["10% off on all services", "Priority booking", "Birthday special offer", "Earn 2x loyalty points"],
      discountPercentage: "10",
      freeServicesCount: 0,
      priorityBooking: true,
      homeServiceIncluded: 0,
      personalStylist: false,
      validityDays: 30,
    },
    {
      name: "Premium",
      price: "2499",
      benefits: ["20% off on all services", "Priority booking", "1 free facial per month", "Birthday special offer", "Earn 3x loyalty points", "1 free home service"],
      discountPercentage: "20",
      freeServicesCount: 1,
      priorityBooking: true,
      homeServiceIncluded: 1,
      personalStylist: false,
      validityDays: 30,
    },
    {
      name: "VIP",
      price: "4999",
      benefits: ["30% off on all services", "Priority booking", "2 free services per month", "Personal stylist assigned", "Birthday special offer", "Earn 5x loyalty points", "3 free home services", "Exclusive VIP events"],
      discountPercentage: "30",
      freeServicesCount: 2,
      priorityBooking: true,
      homeServiceIncluded: 3,
      personalStylist: true,
      validityDays: 30,
    },
  ];

  await db.insert(memberships).values(membershipsData);
  console.log("✅ Created memberships");

  // Create Customer Users
  const customerNames = [
    "Meera Kapoor", "Arun Sharma", "Riya Malhotra", "Sneha Reddy", "Karan Patel",
    "Pooja Nair", "Rohan Gupta", "Anjali Singh", "Vivek Kumar", "Prachi Joshi",
  ];

  const createdCustomers = [];
  for (let i = 0; i < customerNames.length; i++) {
    const [customer] = await db
      .insert(users)
      .values({
        name: customerNames[i],
        email: `customer${i + 1}@example.com`,
        password: hashedPassword,
        phone: `98765432${20 + i}`,
        role: "customer",
        isVerified: true,
        referralCode: `CUST${1000 + i}`,
        loyaltyPoints: Math.floor(Math.random() * 5000),
        loyaltyTier: ["bronze", "silver", "gold", "diamond"][Math.floor(Math.random() * 4)] as "bronze" | "silver" | "gold" | "diamond",
        visitCount: Math.floor(Math.random() * 20) + 1,
        totalSpent: String(Math.floor(Math.random() * 50000) + 5000),
      })
      .returning();
    createdCustomers.push(customer);
  }

  console.log("✅ Created customers");

  // Create Offers
  const offersData = [
    {
      title: "Welcome Offer",
      description: "Get 20% off on your first appointment",
      type: "percentage" as const,
      discountValue: "20",
      minAmount: "500",
      applicableOn: "all",
      couponCode: "WELCOME20",
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      usageLimit: 1000,
      isFeatured: true,
    },
    {
      title: "Refer & Earn",
      description: "Get ₹500 for every friend you refer",
      type: "flat" as const,
      discountValue: "500",
      minAmount: "1000",
      applicableOn: "all",
      couponCode: "REFER500",
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isFeatured: true,
    },
    {
      title: "Weekend Spa Special",
      description: "30% off on all spa services on weekends",
      type: "percentage" as const,
      discountValue: "30",
      minAmount: "1500",
      applicableOn: "specific-services",
      couponCode: "WEEKEND30",
      startDate: new Date(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      isFeatured: true,
    },
    {
      title: "Bridal Season",
      description: "Flat ₹5000 off on bridal packages",
      type: "flat" as const,
      discountValue: "5000",
      minAmount: "15000",
      applicableOn: "specific-services",
      couponCode: "BRIDAL5K",
      startDate: new Date(),
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      isFeatured: false,
    },
    {
      title: "Color Fest",
      description: "15% off on all hair coloring services",
      type: "percentage" as const,
      discountValue: "15",
      minAmount: "2000",
      applicableOn: "specific-services",
      couponCode: "COLORFEST",
      startDate: new Date(),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      isFeatured: false,
    },
  ];

  await db.insert(offers).values(offersData);
  console.log("✅ Created offers");

  // Create Blog Posts
  const blogPostsData = [
    {
      title: "10 Hair Care Tips for Monsoon Season",
      slug: "hair-care-tips-monsoon",
      excerpt: "Protect your hair from humidity and frizz with these expert tips",
      content: "Monsoon brings relief from the heat but also challenges for hair care. Here are our top 10 tips to keep your hair healthy and beautiful during the rainy season...",
      thumbnail: "/blog/monsoon-hair.jpg",
      authorId: adminUser.id,
      category: "Hair Care",
      tags: ["hair care", "monsoon", "tips"],
      readTime: 5,
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "The Ultimate Bridal Skincare Routine",
      slug: "bridal-skincare-routine",
      excerpt: "Start your bridal skincare journey months before the big day",
      content: "Your wedding day is one of the most important days of your life. Here's a comprehensive skincare routine to ensure you have that perfect bridal glow...",
      thumbnail: "/blog/bridal-skin.jpg",
      authorId: adminUser.id,
      category: "Skin Care",
      tags: ["bridal", "skincare", "wedding"],
      readTime: 8,
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "Trending Hair Colors of 2024",
      slug: "trending-hair-colors-2024",
      excerpt: "Discover the hottest hair color trends this year",
      content: "From copper tones to platinum blonde, discover the hair color trends that are taking the beauty world by storm in 2024...",
      thumbnail: "/blog/hair-colors.jpg",
      authorId: adminUser.id,
      category: "Trends",
      tags: ["hair color", "trends", "2024"],
      readTime: 6,
      isPublished: true,
      publishedAt: new Date(),
    },
  ];

  await db.insert(blogPosts).values(blogPostsData);
  console.log("✅ Created blog posts");

  // Create Products
  const productsData = [
    {
      name: "Keratin Shampoo",
      brand: "L'Oreal Professional",
      description: "Smoothing shampoo with keratin complex",
      category: "haircare",
      price: "850",
      mrp: "999",
      discount: "15",
      stock: 50,
      isSalonRecommended: true,
    },
    {
      name: "Argan Oil Serum",
      brand: "Moroccanoil",
      description: "Nourishing hair serum with argan oil",
      category: "haircare",
      price: "1200",
      mrp: "1500",
      discount: "20",
      stock: 30,
      isSalonRecommended: true,
    },
    {
      name: "Vitamin C Face Serum",
      brand: "The Ordinary",
      description: "Brightening vitamin C serum",
      category: "skincare",
      price: "650",
      mrp: "799",
      discount: "19",
      stock: 25,
      isSalonRecommended: true,
    },
    {
      name: "Gel Nail Polish Set",
      brand: "OPI",
      description: "Long-lasting gel polish set",
      category: "nailcare",
      price: "2500",
      mrp: "2999",
      discount: "17",
      stock: 20,
      isSalonRecommended: false,
    },
    {
      name: "Hair Straightener",
      brand: "GHD",
      description: "Professional ceramic hair straightener",
      category: "tools",
      price: "12000",
      mrp: "15000",
      discount: "20",
      stock: 10,
      isSalonRecommended: true,
    },
  ];

  await db.insert(products).values(productsData);
  console.log("✅ Created products");

  // Create Sample Appointments
  const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
  const today = new Date();

  for (let i = 0; i < 20; i++) {
    const customer = createdCustomers[Math.floor(Math.random() * createdCustomers.length)];
    const stylist = createdStylists[Math.floor(Math.random() * createdStylists.length)];
    const service = createdServices[Math.floor(Math.random() * createdServices.length)];
    const daysOffset = Math.floor(Math.random() * 30) - 15;
    const appointmentDate = new Date(today);
    appointmentDate.setDate(appointmentDate.getDate() + daysOffset);

    const status = daysOffset < 0 ? "completed" : appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];

    await db.insert(appointments).values({
      bookingId: `GS${Date.now().toString(36).toUpperCase()}${i}`,
      customerId: customer.id,
      stylistId: stylist.id,
      services: [{
        serviceId: service.id,
        serviceName: service.name,
        price: parseFloat(service.priceMin),
        duration: service.duration,
      }],
      appointmentType: "inSalon",
      date: appointmentDate.toISOString().split("T")[0],
      timeSlot: `${10 + Math.floor(Math.random() * 8)}:${Math.random() > 0.5 ? "00" : "30"}`,
      totalDuration: service.duration,
      totalPrice: service.priceMin,
      status,
      finalAmount: service.priceMin,
    });
  }

  console.log("✅ Created appointments");

  // Create Sample Reviews
  const reviewTexts = [
    "Amazing experience! The stylist was so professional.",
    "Best salon in the city! Will definitely come back.",
    "Loved my new haircut! Exactly what I wanted.",
    "The spa was so relaxing. Highly recommend!",
    "Great service and friendly staff.",
  ];

  for (let i = 0; i < 15; i++) {
    const customer = createdCustomers[Math.floor(Math.random() * createdCustomers.length)];
    const stylist = createdStylists[Math.floor(Math.random() * createdStylists.length)];

    await db.insert(reviews).values({
      customerId: customer.id,
      stylistId: stylist.id,
      overallRating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      ratings: {
        service: Math.floor(Math.random() * 2) + 4,
        stylist: Math.floor(Math.random() * 2) + 4,
        cleanliness: 5,
        value: Math.floor(Math.random() * 2) + 4,
        ambience: 5,
      },
      comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      isVerified: true,
    });
  }

  console.log("✅ Created reviews");

  // Create Walk-ins
  for (let i = 0; i < 5; i++) {
    const service = createdServices[Math.floor(Math.random() * createdServices.length)];
    const stylist = createdStylists[Math.floor(Math.random() * createdStylists.length)];

    await db.insert(walkIns).values({
      customerName: `Walk-in Customer ${i + 1}`,
      customerPhone: `98765400${10 + i}`,
      stylistId: stylist.id,
      services: [{
        serviceId: service.id,
        serviceName: service.name,
        price: parseFloat(service.priceMin),
        duration: service.duration,
      }],
      queueNumber: i + 1,
      estimatedWaitTime: (i + 1) * 15,
      status: i === 0 ? "inProgress" : "waiting",
    });
  }

  console.log("✅ Created walk-ins");
  console.log("🎉 Database seeding completed!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
