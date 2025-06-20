import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Target, Rocket, Plane, Settings, Building2, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: 'DGCA Certified Drone Pilot',
      description: 'Licensed for Small Category UAV operations',
      color: 'from-emerald-500 to-mint-500'
    },
    {
      icon: Zap,
      title: 'Advanced CAD & Simulation Expert',
      description: 'Proficient in multiple design software platforms',
      color: 'from-forest-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'National Finalist',
      description: 'Smart India Hackathon 2023',
      color: 'from-mint-500 to-sage-500'
    },
    {
      icon: Building2,
      title: 'Startup Founder - DRONOTIC HUB',
      description: 'Connecting drone pilots with customers nationwide',
      color: 'from-sage-500 to-cream-600'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-forest-900 relative overflow-hidden">
      {/* Minimalist Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(198,218,191,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(26,147,111,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(136,212,152,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(17,75,95,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 opacity-10 dark:opacity-20"
      >
        <Rocket className="w-20 h-20 text-emerald-500" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 opacity-10 dark:opacity-20"
      >
        <Plane className="w-16 h-16 text-mint-500" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 dark:text-cream-100 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-mint-500 mx-auto mb-6"></div>
          <p className="text-forest-600 dark:text-sage-300 text-lg max-w-3xl mx-auto">
            Pioneering the future of mechanical engineering through innovation and entrepreneurship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 bg-gradient-to-r from-sage-200/30 to-mint-200/30 dark:from-emerald-500/20 dark:to-forest-500/20 rounded-3xl blur-xl"
              />
              
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-xl border border-sage-200 dark:border-forest-700 bg-white dark:bg-forest-800">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/WhatsApp Image 2025-06-20 at 00.22.32_49ff0e19.jpg"
                  alt="Kanishk R - Professional Photo"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/20 via-transparent to-transparent dark:from-forest-900/40"></div>
                
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <Settings className="w-3 h-3 text-emerald-500" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg max-w-none">
              <motion.p 
                className="text-forest-600 dark:text-sage-300 leading-relaxed text-lg mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                I'm a <span className="text-emerald-600 dark:text-emerald-400 font-semibold">certified drone pilot</span> and 
                <span className="text-mint-600 dark:text-mint-400 font-semibold"> mechanical engineer</span> passionate about 
                UAV development, CAD modeling, and innovative mechatronic systems. I design, build, 
                and test drone technologies for real-world applications ranging from agriculture to 
                autonomous delivery.
              </motion.p>
              
              <motion.p 
                className="text-forest-600 dark:text-sage-300 leading-relaxed text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                With hands-on experience in <span className="text-forest-600 dark:text-forest-400 font-semibold">flight control systems</span>, 
                precision manufacturing, and advanced CAD design, I bring a unique blend of theoretical 
                knowledge and practical expertise to every project I undertake.
              </motion.p>
            </div>

            {/* DRONOTIC HUB Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-6 bg-sage-50 dark:bg-forest-800 rounded-2xl border border-sage-200 dark:border-forest-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 mr-4 rounded-xl overflow-hidden shadow-lg border border-sage-200 dark:border-forest-600"
                >
                  <img 
                    src="/logo dh.png" 
                    alt="DRONOTIC HUB Logo"
                    className="w-full h-full object-contain bg-white dark:bg-forest-700"
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-forest-800 dark:text-cream-100">
                    DRONOTIC HUB
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">Startup Founder & CEO</p>
                </div>
              </div>

              <p className="text-forest-600 dark:text-sage-300 leading-relaxed mb-4">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Drones & Pilots, Anytime, Anywhere"</span> - 
                Our innovative platform revolutionizes how businesses access professional drone services, 
                connecting certified pilots with customers for aerial photography, surveying, agriculture, 
                and industrial inspections.
              </p>

              <div className="flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center px-3 py-2 bg-mint-100 dark:bg-emerald-800/30 rounded-lg border border-mint-200 dark:border-emerald-700"
                >
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  <span className="text-sm font-medium text-forest-600 dark:text-sage-300">Pilot Network</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center px-3 py-2 bg-sage-100 dark:bg-forest-700/50 rounded-lg border border-sage-200 dark:border-forest-600"
                >
                  <Globe className="w-4 h-4 text-mint-600 dark:text-mint-400 mr-2" />
                  <span className="text-sm font-medium text-forest-600 dark:text-sage-300">Nationwide Service</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Key Highlights */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-forest-700 dark:text-cream-200 mb-6 flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-mint-500 rounded-full flex items-center justify-center mr-3"
                >
                  <Zap className="w-3 h-3 text-white" />
                </motion.div>
                Key Highlights
              </h3>
              
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative p-6 bg-white dark:bg-forest-800 rounded-xl border border-sage-200 dark:border-forest-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <highlight.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-forest-700 dark:text-cream-200 mb-2 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-forest-500 dark:text-sage-400 text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;