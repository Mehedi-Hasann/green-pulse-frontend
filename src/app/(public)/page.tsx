'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Shield, Trophy, Users } from 'lucide-react';
import Image from 'next/image';

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
              🚀 Join 10,000+ eco-warriors today
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:max-w-2xl"
            >
              Turn Small Actions into <span className="text-green-600">Big Environmental</span> Impact
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-600 lg:max-w-xl"
            >
              Green Pulse is a platform where you join eco-friendly challenges, 
              submit daily proofs, and earn points for being a sustainable hero.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-4 lg:justify-start"
            >
              <Button size="lg" className="h-12 bg-green-600 px-8 hover:bg-green-700" asChild>
                <Link href="/challenges">
                  Explore Challenges <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                <Link href="/about">How it Works</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Hero Background Decoration */}
        <div className="absolute right-0 top-0 -z-10 hidden lg:block">
          <svg
            viewBox="0 0 1024 1024"
            className="h-[64rem] w-[64rem] [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.1" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#16a34a" />
                <stop offset="1" stopColor="#dcfce7" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Why Green Pulse?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to live sustainably
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg}`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container">
          <div className="relative isolate overflow-hidden bg-green-700 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your first challenge?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-green-100">
              Join thousands of others making a positive impact on the world. 
              It's free, fun, and meaningful.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50" asChild>
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-green-600" asChild>
                <Link href="/challenges">View All Challenges</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
