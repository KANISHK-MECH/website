import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: 'B.E Mechanical Engineering',
      institution: 'Sri Eshwar College of Engineering',
      duration: '2022 – 2026',
      grade: 'CGPA: 7.8 (up to 6th Semester)',
      location: 'Coimbatore, Tamil Nadu',
      description: 'Specializing in UAV development, CAD design, and mechatronics systems.'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Nirmala Matha Convent Hr. Sec. School',
      duration: '2020 – 2022',
      grade: '80.83%',
      location: 'Tamil Nadu',
      description: 'Mathematics, Physics, Chemistry focus with strong foundation in engineering subjects.'
    },
    {
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Nirmala Matha Convent Hr. Sec. School',
      duration: '2019 – 2020',
      grade: '79.80%',
      location: 'Tamil Nadu',
      description: 'Comprehensive secondary education with excellent academic performance.'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background for Dark Mode */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(213,170,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_75%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(250,208,201,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

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
            Education
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6"
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            My academic journey in mechanical engineering with a focus on UAV technology and design
          </p>
        </motion.div>

        <div className="relative">
          {/* Enhanced Timeline line for Dark Mode */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Enhanced Timeline dot for Dark Mode */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 rounded-full z-10 shadow-lg"></div>

                {/* Enhanced Content card for Dark Mode */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(213, 170, 255, 0.2)"
                    }}
                    className="bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <GraduationCap className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {edu.degree}
                          </h3>
                          <p className="text-pastel-lavender dark:text-purple-400 font-medium">
                            {edu.institution}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {edu.location}
                      </div>
                      <div className="bg-gradient-to-r from-pastel-lavender/10 to-pastel-orange/10 dark:from-purple-500/20 dark:to-orange-500/20 rounded-lg p-3 border border-pastel-lavender/20 dark:border-purple-400/30">
                        <p className="text-pastel-lavender dark:text-purple-300 font-semibold">
                          {edu.grade}
                        </p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;