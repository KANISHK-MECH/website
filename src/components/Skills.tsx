import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Plane, Settings, Code, Zap } from 'lucide-react';
import { skills } from '../data/portfolio';

const Skills: React.FC = () => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryConfig = {
    'Flight Controllers': {
      color: 'from-pastel-orange to-pastel-peach dark:from-orange-500 dark:to-pink-500',
      icon: Rocket,
      bgGradient: 'from-pastel-orange/10 to-pastel-peach/10 dark:from-orange-500/10 dark:to-pink-500/10'
    },
    'UAV Software': {
      color: 'from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500',
      icon: Plane,
      bgGradient: 'from-pastel-lavender/10 to-pastel-pink/10 dark:from-purple-500/10 dark:to-pink-500/10'
    },
    'Design Software': {
      color: 'from-pastel-pink to-pastel-cream dark:from-pink-500 dark:to-yellow-500',
      icon: Settings,
      bgGradient: 'from-pastel-pink/10 to-pastel-cream/10 dark:from-pink-500/10 dark:to-yellow-500/10'
    },
    'Programming': {
      color: 'from-pastel-cream to-pastel-orange dark:from-yellow-500 dark:to-orange-500',
      icon: Code,
      bgGradient: 'from-pastel-cream/10 to-pastel-orange/10 dark:from-yellow-500/10 dark:to-orange-500/10'
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-pastel-lavender/10 via-white to-pastel-pink/10 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/50 relative overflow-hidden">
      {/* Enhanced Background for Dark Mode */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(213,170,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(250,208,201,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.2),transparent_50%)]" />
      </div>

      {/* Enhanced Floating Tech Icons for Dark Mode */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 opacity-20 dark:opacity-30"
      >
        <Settings className="w-20 h-20 text-pastel-lavender dark:text-purple-400" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          rotate: [0, -180]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 opacity-20 dark:opacity-30"
      >
        <Code className="w-16 h-16 text-pastel-pink dark:text-pink-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-pastel-pink to-pastel-orange dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Technical Arsenal
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6"
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Mastery across flight control systems, cutting-edge CAD software, and advanced programming languages
          </p>
        </motion.div>

        {/* Enhanced Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config.icon;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(213, 170, 255, 0.2)"
                }}
                className={`relative bg-gradient-to-br ${config.bgGradient} backdrop-blur-sm rounded-2xl p-8 border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 transition-all duration-500 group overflow-hidden`}
              >
                {/* Enhanced Animated Background Effect for Dark Mode */}
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(213,170,255,0.1), transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(250,208,201,0.1), transparent 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(213,170,255,0.1), transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity dark:opacity-30 dark:group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 group-hover:text-pastel-lavender dark:group-hover:text-purple-400 transition-colors">
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                          <motion.span 
                            className="text-pastel-lavender dark:text-purple-400 font-bold text-sm bg-white/50 dark:bg-gray-700/50 px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill.proficiency}%
                          </motion.span>
                        </div>
                        
                        <div className="relative w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ 
                              delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, 
                              duration: 1.2,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${config.color} rounded-full relative overflow-hidden`}
                          >
                            <motion.div
                              animate={{ x: [-100, 100] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center mr-3"
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              Complete Technology Stack
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => {
              const config = categoryConfig[skill.category as keyof typeof categoryConfig];
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 10px 30px rgba(213, 170, 255, 0.3)"
                  }}
                  className={`group relative px-6 py-3 bg-gradient-to-r ${config.color} text-white rounded-full font-bold cursor-pointer shadow-lg overflow-hidden`}
                >
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
                  />
                  <span className="relative z-10 text-sm">{skill.name}</span>
                  
                  {/* Proficiency indicator */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;