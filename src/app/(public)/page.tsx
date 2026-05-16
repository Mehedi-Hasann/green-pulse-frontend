'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Leaf, Shield, Trophy, Users, 
  TreePine, Wind, Droplets, Sun, CheckCircle2,
  BarChart3, MessageSquare, Mail, HelpCircle,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const features = [
  {
    title: 'Daily Challenges',
    description: 'Join small, actionable eco-challenges that make a big impact over time.',
    icon: Leaf,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    title: 'Community Driven',
    description: 'Connect with thousands of like-minded individuals working towards a greener planet.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    title: 'Earn Points',
    description: 'Track your progress and earn points for every green action you complete.',
    icon: Trophy,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  {
    title: 'Verified Proofs',
    description: 'Submit photos or evidence of your actions to get verified by our community.',
    icon: Shield,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
];

const stats = [
  { label: 'Trees Planted', value: '12,450', icon: TreePine },
  { label: 'CO2 Saved (kg)', value: '85,000+', icon: Wind },
  { label: 'Water Saved (L)', value: '250,000', icon: Droplets },
  { label: 'Active Warriors', value: '10k+', icon: Users },
];

const categories = [
  { name: 'Energy', icon: Sun, count: 12, color: 'bg-orange-100 text-orange-600' },
  { name: 'Water', icon: Droplets, count: 8, color: 'bg-blue-100 text-blue-600' },
  { name: 'Waste', icon: Leaf, count: 15, color: 'bg-green-100 text-green-600' },
  { name: 'Nature', icon: TreePine, count: 10, color: 'bg-emerald-100 text-emerald-600' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Climate Activist',
    content: 'Green Pulse has completely changed how I think about my daily habits. The challenges are fun and rewarding!',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    name: 'Michael Chen',
    role: 'Student',
    content: 'The community support here is amazing. Seeing others complete challenges motivates me to do more every day.',
    avatar: 'https://i.pravatar.cc/150?u=michael',
  },
  {
    name: 'Emma Wilson',
    role: 'Graphic Designer',
    content: 'I love how easy it is to track my impact. The points system makes living sustainably feel like a game.',
    avatar: 'https://i.pravatar.cc/150?u=emma',
  },
];

const faqs = [
  {
    q: 'How do I earn points?',
    a: 'You earn points by joining challenges and submitting valid proof (photos or documentation) of your eco-friendly actions.',
  },
  {
    q: 'Are challenges free to join?',
    a: 'Most of our challenges are free! Some special community-led challenges might require a small entry fee which goes towards environmental causes.',
  },
  {
    q: 'How is my proof verified?',
    a: 'Our community and moderators review submitted proofs to ensure they meet the challenge requirements before awarding points.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-white pb-24 pt-10 lg:pt-40">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-50/40 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-50/20 blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-yellow-50/10 blur-[80px]" />
        </div>

        <div className="container max-w-7xl mx-auto relative z-10 px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Content Left */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-bold text-green-700 shadow-sm ring-1 ring-green-100 mb-10"
              >
                <span className="mr-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Join 10,000+ eco-warriors today
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-[4.5rem] leading-[1.1] mb-10"
              >
                Small Actions, <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent italic">Global</span> Impact
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg leading-relaxed text-slate-500 lg:max-w-lg mb-12"
              >
                The ultimate platform for sustainable living. Join actionable challenges, 
                track your environmental footprint, and earn rewards for protecting our planet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-5 lg:justify-start"
              >
                <Button size="lg" className="h-16 rounded-2xl bg-slate-900 px-10 text-lg font-black hover:bg-green-600 transition-all hover:scale-[1.02] shadow-2xl shadow-slate-200" asChild>
                  <Link href="/challenges">
                    Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 rounded-2xl px-10 text-lg font-bold border-2 border-slate-100 hover:bg-slate-50 transition-all" asChild>
                  <Link href="/about">See How it Works</Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-14 flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden ring-2 ring-slate-50">
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-400">
                  <span className="text-slate-900">4.9/5</span> from over 1k reviews
                </p>
              </motion.div>
            </div>

            {/* Visual Right */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[400px] w-[400px] lg:h-[550px] lg:w-[550px]"
              >
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 z-20 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">+120 Points</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Verified</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 -right-3 z-20 bg-slate-900 p-4 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-3 text-white">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs font-black italic text-green-400">Rank #1</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Weekly</p>
                    </div>
                  </div>
                </motion.div>

                {/* Main Illustration */}
                <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(22,163,74,0.2)] border-8 border-white">
                  <Image 
                    src="/images/hero-eco.png" 
                    alt="Eco Illustration" 
                    fill 
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="bg-green-900 py-16 text-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 rounded-2xl bg-white/10 p-3">
                  <stat.icon className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-green-300 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Why Green Pulse?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Building a Sustainable Future
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col items-start p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-slate-900">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Explore by Interest</h2>
              <p className="text-slate-600 mt-2">Find challenges that align with your lifestyle</p>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/challenges">
                View all categories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="cursor-pointer border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="flex flex-col items-center p-8">
                    <div className={`mb-4 rounded-full p-4 ${cat.color}`}>
                      <cat.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{cat.count} active challenges</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="bg-slate-900 py-24">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-green-400 font-semibold mb-2">Community Voices</h2>
            <p className="text-3xl font-bold text-white sm:text-4xl">Trusted by Eco-Warriors</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Image 
                    src={t.avatar} 
                    alt={t.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full ring-2 ring-green-500/20"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-slate-400 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-6 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Sun key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Blog Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Latest Insights</h2>
              <p className="text-slate-600 mt-2">Tips and stories from our green community</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">Read our blog</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
             {[1, 2, 3].map((post) => (
               <motion.div
                 key={post}
                 whileHover={{ y: -5 }}
                 className="group"
               >
                 <div className="aspect-video relative overflow-hidden rounded-2xl bg-slate-100 mb-6">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-green-700">
                     SUSTAINABILITY
                   </div>
                 </div>
                 <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                   10 Simple Ways to Reduce Plastic Waste at Home
                 </h3>
                 <p className="text-slate-600 line-clamp-2 mb-4">
                   Discover how small changes in your kitchen and bathroom can lead to a massive reduction in your annual plastic footprint.
                 </p>
                 <Link href={`/blog/${post}`} className="inline-flex items-center text-sm font-bold text-green-600">
                   Learn More <ArrowRight className="ml-1 h-4 w-4" />
                 </Link>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="bg-slate-50 py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Got questions? We&apos;ve got answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <h4 className="text-lg font-bold flex items-center gap-3 mb-2">
                  <HelpCircle className="h-5 w-5 text-green-600" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section className="py-24 bg-green-600 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <Mail className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Join our Green Newsletter</h2>
            <p className="text-green-50 mb-8 text-lg">
              Get weekly tips, new challenge alerts, and community success stories 
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12 bg-white text-slate-900 border-none"
              />
              <Button size="lg" className="h-12 bg-slate-900 hover:bg-slate-800 px-8">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm text-green-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full border-8 border-white" />
        </div>
      </section>

      {/* CTA Section (Original but updated) */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container">
          <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to make a <span className="text-green-500">difference?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-slate-300">
              Join thousands of eco-warriors and start your journey towards a 
              more sustainable life today.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Button size="lg" className="h-14 bg-green-600 text-white hover:bg-green-700 px-10 text-lg" asChild>
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 text-white border-white/20 hover:bg-white/10 px-10 text-lg" asChild>
                <Link href="/challenges">Explore More</Link>
              </Button>
            </div>
            
            {/* Background elements */}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx="512" cy="512" r="512" fill="url(#gradient-cta)" fillOpacity="0.15" />
              <defs>
                <radialGradient id="gradient-cta">
                  <stop stopColor="#16a34a" />
                  <stop offset="1" stopColor="#0f172a" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

