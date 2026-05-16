'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, CheckCircle2, AlertCircle, HelpCircle,
  Globe, Users, Target, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';

const contactInfo = [
  {
    title: 'Email Us',
    value: 'hello@greenpulse.com',
    description: 'We aim to respond within 24 hours.',
    icon: Mail,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Call Us',
    value: '+1 (555) 000-0000',
    description: 'Mon-Fri from 9am to 6pm.',
    icon: Phone,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    title: 'Visit Us',
    value: '123 Eco Way, Green City',
    description: 'Our doors are always open.',
    icon: MapPin,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Message sent! We will get back to you soon.');
    
    // Reset after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Contact Header */}
      <section className="bg-white border-b py-20 relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6"
          >
            <MessageSquare className="h-4 w-4" /> Get in Touch
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter italic">
            Let&apos;s <span className="text-green-600">Connect</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have questions about challenges, partnerships, or just want to say hi? 
            We&apos;re here to listen and help you on your green journey.
          </p>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-8 border-green-600" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full border-8 border-slate-900" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Contact Information</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Reach us through any channel</p>
              </div>
              
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all group">
                    <CardContent className="p-8 flex items-start gap-6">
                      <div className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className={`h-7 w-7 ${item.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-xl font-bold text-slate-700 mb-1">{item.value}</p>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Follow our journey</h4>
                <div className="flex gap-4">
                  {[Globe, Users, Target, Shield].map((Icon, i) => (
                    <Button key={i} variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 hover:border-green-600 hover:text-green-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
              >
                {isSuccess ? (
                  <div className="py-20 text-center">
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h2>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                      Thank you for reaching out. We have received your message and will get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="h-12 rounded-xl px-8 font-bold border-2">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h2 className="text-3xl font-black text-slate-900 mb-4">Send a Message</h2>
                      <p className="text-slate-500">Fill out the form below and our team will get back to you.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
                          <Input 
                            required 
                            placeholder="John Doe" 
                            className="h-14 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50 px-6 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                          <Input 
                            required 
                            type="email" 
                            placeholder="john@example.com" 
                            className="h-14 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50 px-6 font-bold"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Subject</label>
                        <Input 
                          required 
                          placeholder="How can we help?" 
                          className="h-14 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50 px-6 font-bold"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Your Message</label>
                        <Textarea 
                          required 
                          placeholder="Write your message here..." 
                          className="min-h-[200px] rounded-[2rem] border-2 focus-visible:ring-green-500 bg-slate-50/50 p-6 font-bold resize-none"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-[2rem] bg-slate-900 hover:bg-green-600 text-white font-black text-lg transition-all shadow-xl hover:shadow-green-200"
                      >
                        {isSubmitting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Send className="h-6 w-6" />
                          </motion.div>
                        ) : (
                          <div className="flex items-center gap-3">
                            Send Message <Send className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Summary */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Quick Answers</h2>
            <p className="text-slate-500">Check these common questions before reaching out.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { q: 'How do I join a challenge?', a: 'Sign up for a free account, browse the challenges page, and click "Join Now" on any active challenge.' },
              { q: 'Are my points redeemable?', a: 'Yes! Points can be redeemed for eco-friendly products, tree planting certificates, and community rewards.' },
              { q: 'How is proof verified?', a: 'Our community and expert moderators review every submission to ensure the action was completed as described.' },
              { q: 'Can I create a challenge?', a: 'Currently, only Admins can create challenges, but members can suggest them through our community forum.' },
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <h4 className="text-lg font-black text-slate-900 mb-3 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed ml-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button variant="ghost" className="font-black text-green-600 hover:bg-green-50 px-8 h-12 rounded-xl" asChild>
              <Link href="/help">View Full Help Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
