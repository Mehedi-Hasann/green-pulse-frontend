'use client';

import { motion } from 'framer-motion';
import { Leaf, Users, Globe, Target, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  { label: 'Active Members', value: '10,000+', icon: Users },
  { label: 'CO2 Offset', value: '85 Tons', icon: Globe },
  { label: 'Trees Planted', value: '12,450', icon: Leaf },
  { label: 'Challenges Completed', value: '50,000+', icon: Award },
];

const values = [
  {
    title: 'Sustainability First',
    description: 'Every decision we make is guided by its long-term impact on the planet.',
    icon: Leaf,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    title: 'Community Power',
    description: 'We believe that collective small actions lead to massive global changes.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    title: 'Transparency',
    description: 'We are committed to open data and honest reporting of our environmental impact.',
    icon: ShieldCheck,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
  {
    title: 'Inclusivity',
    description: 'Climate action is for everyone, regardless of where they are in their journey.',
    icon: Heart,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900 text-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Target className="h-4 w-4" /> Our Mission
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tight mb-8"
            >
              Empowering <span className="text-green-500">Everyone</span> to Save the Planet.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed"
            >
              Green Pulse was founded on a simple idea: that individual actions, when multiplied by millions, 
              can solve the climate crisis. We provide the tools, community, and motivation to make 
              sustainable living accessible and rewarding for everyone.
            </motion.p>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-green-600">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl lg:text-5xl font-black mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-green-100 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              These principles guide everything we do at Green Pulse, from product development 
              to community management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`h-7 w-7 ${value.color}`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
                alt="Our Story" 
                fill 
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                Started from a <span className="text-green-600">Backyard</span>, now a Global Movement.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Green Pulse began in 2022 as a simple group chat between friends who wanted to 
                  track their recycling efforts. We quickly realized that there was no centralized 
                  platform that made eco-friendly living fun and competitive.
                </p>
                <p>
                  Today, we support over 10,000 members across 50 countries. Our platform has 
                  facilitated thousands of community-led cleanups, energy reduction challenges, 
                  and sustainable living workshops.
                </p>
                <p>
                  Our goal is to reach 1 million active eco-warriors by 2030, saving 1 million tons 
                  of CO2 from entering our atmosphere.
                </p>
              </div>
              <Button size="lg" className="mt-10 rounded-2xl h-14 px-10 bg-green-600 hover:bg-green-700 font-bold text-lg" asChild>
                <Link href="/register">Join the Movement <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">Meet the Visionaries</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A diverse team of environmental scientists, software engineers, and community 
              organizers dedicated to our mission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Elena Rossi', role: 'Chief Scientist', img: 'https://i.pravatar.cc/300?u=elena' },
              { name: 'James Chen', role: 'Lead Developer', img: 'https://i.pravatar.cc/300?u=james' },
              { name: 'Sarah Miller', role: 'Community Lead', img: 'https://i.pravatar.cc/300?u=sarah' },
              { name: 'Marcus Thorne', role: 'Product Design', img: 'https://i.pravatar.cc/300?u=marcus' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                  <Image src={member.img} alt={member.name} fill className="object-cover transition-transform group-hover:scale-110" />
                </div>
                <h4 className="text-xl font-black text-slate-900">{member.name}</h4>
                <p className="text-green-600 font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-900">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">
            Ready to start your <span className="text-green-400">Green</span> journey?
          </h2>
          <p className="text-xl text-green-200/60 mb-12 max-w-2xl mx-auto">
            Join thousands of others making a real difference. It only takes 2 minutes to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="rounded-2xl h-14 px-10 bg-white text-green-900 hover:bg-green-50 font-bold text-lg" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-10 border-white/20 text-white hover:bg-white/10 font-bold text-lg" asChild>
              <Link href="/challenges">Explore Challenges</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
