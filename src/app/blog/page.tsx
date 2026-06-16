import Link from "next/link";
import { db } from "@/db";
import { blogPosts, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Calendar, Clock, Eye, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog & Tips - Glamour Studio",
  description: "Beauty tips, tutorials, trends, and expert advice from our stylists.",
};

async function getBlogPosts() {
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      thumbnail: blogPosts.thumbnail,
      category: blogPosts.category,
      readTime: blogPosts.readTime,
      views: blogPosts.views,
      publishedAt: blogPosts.publishedAt,
      author: {
        id: users.id,
        name: users.name,
      },
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));

  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Blog & Tips
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beauty
            <span className="gradient-text"> Insights</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expert tips, tutorials, and trends from our stylists to help you look your best
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Hair Care", "Skin Care", "Trends", "Tutorials", "Product Reviews"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                cat === "All"
                  ? "bg-rose-gold text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-rose-gold/20 to-gold/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-rose-gold/30" />
                </div>
                {post.category && (
                  <span className="absolute top-4 left-4 bg-white/90 text-rose-gold text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-rose-gold font-medium flex items-center gap-1 hover:underline"
                  >
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for beauty tips and insights!</p>
          </div>
        )}
      </div>
    </div>
  );
}
