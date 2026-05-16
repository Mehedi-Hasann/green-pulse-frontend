'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Bookmark, Tag, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: 1,
    title: '10 Simple Ways to Reduce Plastic Waste at Home',
    excerpt: 'Discover how small changes in your kitchen and bathroom can lead to a massive reduction in your annual plastic footprint.',
    category: 'Sustainability',
    author: 'Elena Rossi',
    date: 'May 12, 2024',
    image: 'https://images.unsplash.com/photo-1595273670150-db0a3d3664e3?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'The Future of Solar Energy in Urban Environments',
    excerpt: 'How balcony solar panels and community grids are changing the way cities consume power.',
    category: 'Energy',
    author: 'James Chen',
    date: 'May 10, 2024',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb5843e0c?q=80&w=2070&auto=format&fit=crop',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Understanding Your Carbon Footprint: A Deep Dive',
    excerpt: 'Everything you need to know about CO2 equivalents and how to calculate your personal impact.',
    category: 'Education',
    author: 'Sarah Miller',
    date: 'May 08, 2024',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop',
    readTime: '12 min read',
  },
  {
    id: 4,
    title: 'Zero-Waste Travel: Tips for the Conscious Explorer',
    excerpt: 'How to see the world without leaving a trail of trash behind you. From packing to local transit.',
    category: 'Travel',
    author: 'Marcus Thorne',
    date: 'May 05, 2024',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Regenerative Gardening: Healing the Soil',
    excerpt: 'Transform your backyard into a carbon sink with these simple regenerative techniques.',
    category: 'Nature',
    author: 'Elena Rossi',
    date: 'May 02, 2024',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'The Economic Case for Green Investing',
    excerpt: 'Why putting your money into sustainable funds is not just good for the planet, but for your wallet too.',
    category: 'Finance',
    author: 'James Chen',
    date: 'April 28, 2024',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop',
    readTime: '10 min read',
  },
];

const categories = ['All', 'Sustainability', 'Energy', 'Education', 'Travel', 'Nature', 'Finance'];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Blog Header */}
      <section className="bg-white border-b py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6"
            >
              <Tag className="h-4 w-4" /> Latest Insights
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter italic">
              Green <span className="text-green-600">Journal</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed">
              Explore the latest in sustainable living, climate science, and community 
              stories from the heart of the Green Pulse movement.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search articles, topics, or authors..." 
                className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Posts */}
      <section className="py-20">
        <div className="container">
          {/* Categories Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={cat === 'All' ? 'default' : 'outline'} 
                className={`rounded-full px-6 h-10 font-bold transition-all ${
                  cat === 'All' ? 'bg-green-600 hover:bg-green-700' : 'hover:border-green-600 hover:text-green-600'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 backdrop-blur text-green-700 border-none font-black px-4 py-1.5 rounded-xl">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-6 right-6">
                    <button className="h-10 w-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <div>{post.readTime}</div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-slate-100">
                        <Image src={`https://i.pravatar.cc/100?u=${post.author}`} alt={post.author} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{post.author}</span>
                    </div>
                    
                    <Link href={`/blog/${post.id}`} className="inline-flex items-center text-sm font-black text-green-600 hover:gap-3 transition-all">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-12 w-12 font-bold p-0">1</Button>
              <Button variant="ghost" className="rounded-xl h-12 w-12 font-bold p-0">2</Button>
              <Button variant="ghost" className="rounded-xl h-12 w-12 font-bold p-0">3</Button>
              <div className="mx-2 text-slate-400 font-bold">...</div>
              <Button variant="ghost" className="rounded-xl h-12 w-12 font-bold p-0">12</Button>
              <Button variant="outline" className="rounded-xl h-12 px-6 font-bold ml-4">Next Page</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto bg-green-600 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Mail className="h-48 w-48 -rotate-12" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Stay Connected with Green Pulse</h2>
              <p className="text-xl text-green-100/80 mb-10 max-w-2xl mx-auto">
                Join our newsletter to receive the latest eco-tips, challenge announcements, 
                and inspiring community stories every week.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="h-14 rounded-2xl border-none bg-white/90 text-slate-900 placeholder:text-slate-400 px-6 font-bold"
                />
                <Button size="lg" className="h-14 rounded-2xl px-10 bg-slate-900 hover:bg-slate-800 text-white font-black text-lg">
                  Subscribe
                </Button>
              </form>
              <p className="mt-6 text-xs font-bold text-green-200 uppercase tracking-widest opacity-60">
                No spam, ever. Unsubscribe with one click.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
