'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Zap, Shield, Users, TrendingUp, LayoutGrid, ChevronDown } from 'lucide-react';

const allFeatures = [
  {
    title: 'Real-Time Analytics',
    description: 'Track your metrics in real-time with beautiful dashboards.',
    image: '/f1.webp',
    icon: TrendingUp,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: 'Advanced Automation',
    description: 'Automate repetitive tasks and workflows.',
    image: '/f2.webp',
    icon: Zap,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools easily.',
    image: '/f3.webp',
    icon: LayoutGrid,
    gradient: "from-orange-500/20 to-yellow-500/20"
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-level security with compliance.',
    image: '/f4.webp',
    icon: Shield,
    gradient: "from-red-500/20 to-rose-500/20"
  },
  {
    title: 'Smart Collaboration',
    description: 'Real-time teamwork without friction.',
    image: '/f5.webp',
    icon: Users,
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Built to grow globally with your business.',
    image: '/f6.webp',
    icon: Sparkles,
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
];

export function Features() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleFeatures = allFeatures.slice(0, visibleCount);
  const hasMore = visibleCount < allFeatures.length;

  return (
    <section className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <span>Features</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          
          <p className="mt-4 text-lg text-muted-foreground">
            Built for modern teams. Everything you need to succeed.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={800}
                      height={600}
                      loading={idx < 3 ? "eager" : "lazy"}
                      quality={80}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon Badge */}
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                   
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* See More Button */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 3, allFeatures.length))}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              See More Features
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {visibleCount === allFeatures.length && allFeatures.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setVisibleCount(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 text-sm"
            >
              <ChevronDown className="w-4 h-4 rotate-180" />
              Show Less
            </button>
          </div>
        )}

        {/* Counter Indicator */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Showing {visibleCount} of {allFeatures.length} features
          </p>
        </div>
      </div>
    </section>
  );
}