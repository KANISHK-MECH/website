import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Target, Rocket, Plane, Settings, Building2, Users, Globe } from 'lucide-react';

const About: React.FC = memo(() => {
  const highlights = useMemo(() => [
    {
      icon: Award,
      title: 'DGCA Certified Drone Pilot',
      description: 'Licensed for Small Category UAV operations',
      color: 'from-pastel-cream to-pastel-orange dark:from-yellow-500 dark:to-orange-500'
    },
    {
      icon: Zap,
      title: 'Advanced CAD & Simulation Expert',
      description: 'Proficient in multiple design software platforms',
      color: 'from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500'
    },
    {
      icon: Target,
      title: 'National Finalist',
      description: 'Smart India Hackathon 2023',
      color: 'from-pastel-peach to-pastel-cream dark:from-pink-500 dark:to-yellow-500'
    },
    {
      icon: Building2,
      title: 'Startup Founder - DRONOTIC HUB',
      description: 'Connecting drone pilots with customers nationwide',
      color: 'from-pastel-pink to-pastel-lavender dark:from-pink-500 dark:to-purple-500'
    }
  ], []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-pastel-peach/10 via-white to-pastel-cream/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(213,170,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,208,201,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Reduced Floating Elements */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 opacity-15 dark:opacity-25 will-change-transform"
      >
        <Rocket className="w-16 h-16 text-pastel-lavender dark:text-purple-400" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 opacity-15 dark:opacity-25 will-change-transform"
      >
        <Plane className="w-14 h-14 text-pastel-pink dark:text-pink-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Pioneering the future of mechanical engineering through innovation and entrepreneurship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Optimized Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Simplified effects */}
              <div className="absolute -inset-6 bg-gradient-to-r from-pastel-lavender/10 via-pastel-peach/10 to-pastel-cream/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 rounded-3xl blur-lg" />
              
              <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-xl border border-pastel-lavender/30 dark:border-purple-400/50 bg-gradient-to-br from-white/50 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/30 backdrop-blur-sm">
                <img
                  src="/WhatsApp Image 2025-06-20 at 00.22.32_49ff0e19.jpg"
                  alt="Kanishk R - Professional Photo"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pastel-lavender/10 via-transparent to-pastel-peach/10 dark:from-purple-900/30 dark:via-transparent dark:to-pink-900/20" />
                
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 border-2 border-pastel-lavender dark:border-purple-400 rounded-full flex items-center justify-center">
                    <Settings className="w-3 h-3 text-pastel-lavender dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                I'm a <span className="text-pastel-lavender dark:text-purple-400 font-bold">certified drone pilot</span> and 
                <span className="text-pastel-pink dark:text-pink-400 font-bold"> mechanical engineer</span> passionate about 
                UAV development, CAD modeling, and innovative mechatronic systems. I design, build, 
                and test drone technologies for real-world applications ranging from agriculture to 
                autonomous delivery.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                With hands-on experience in <span className="text-pastel-cream dark:text-yellow-400 font-bold">flight control systems</span>, 
                precision manufacturing, and advanced CAD design, I bring a unique blend of theoretical 
                knowledge and practical expertise to every project I undertake.
              </p>
            </div>

            {/* DRONOTIC HUB Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gradient-to-br from-pastel-lavender/10 to-pastel-pink/10 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl border border-pastel-lavender/30 dark:border-purple-400/50 hover:border-pastel-pink/50 dark:hover:border-pink-400/70 transition-all duration-300 group"
            >
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 rounded-xl overflow-hidden shadow-lg border-2 border-pastel-lavender/30 dark:border-purple-400/50">
                    <img 
                      src="/logo dh.png" 
                      alt="DRONOTIC HUB Logo"
                      className="w-full h-full object-contain bg-white dark:bg-gray-800"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-400 dark:to-pink-400">
                      DRONOTIC HUB
                    </h3>
                    <p className="text-pastel-orange dark:text-orange-400 font-bold text-sm">Startup Founder & CEO</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  <span className="text-pastel-lavender dark:text-purple-400 font-bold">"Drones & Pilots, Anytime, Anywhere"</span> - 
                  Our innovative platform revolutionizes how businesses access professional drone services, 
                  connecting certified pilots with customers for aerial photography, surveying, agriculture, 
                  and industrial inspections.
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center px-3 py-2 bg-pastel-peach/20 dark:bg-orange-500/20 rounded-lg border border-pastel-peach/30 dark:border-orange-400/50">
                    <Users className="w-4 h-4 text-pastel-lavender dark:text-purple-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Pilot Network</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-pastel-cream/20 dark:bg-yellow-500/20 rounded-lg border border-pastel-cream/30 dark:border-yellow-400/50">
                    <Globe className="w-4 h-4 text-pastel-pink dark:text-pink-400 mr-2" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Nationwide Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Optimized Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center mr-3">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Key Highlights
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group relative p-6 bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-xl border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 transition-all duration-300"
                >
                  <div className="relative flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-2 text-lg group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;