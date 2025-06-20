import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kanishk.r2022mech@sece.ac.in',
      href: 'mailto:kanishk.r2022mech@sece.ac.in'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8248942062',
      href: 'tel:+918248942062'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Coimbatore, Tamil Nadu',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: '#',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background for Dark Mode */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(213,170,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,208,201,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
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
            Get In Touch
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-orange dark:from-purple-500 dark:to-orange-500 mx-auto mb-6"
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next UAV project or discuss opportunities? 
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Information for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Whether you're interested in UAV development, CAD design collaboration, 
                or just want to discuss the latest in drone technology, I'm always 
                excited to connect with fellow engineers and innovators.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(213, 170, 255, 0.2)"
                  }}
                  className="flex items-center p-4 bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-lg border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Social Links for Dark Mode */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(213, 170, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 border border-pastel-lavender/20 dark:border-purple-400/30 hover:border-pastel-pink/40 dark:hover:border-pink-400/60 transition-all duration-300"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Enhanced Resume Download for Dark Mode */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(213, 170, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden relative"
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <Mail className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Contact Form for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/80 to-pastel-peach/10 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-pastel-lavender/20 dark:border-purple-400/30"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-pastel-lavender/30 dark:border-purple-400/50 rounded-lg focus:ring-2 focus:ring-pastel-lavender dark:focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm resize-none transition-all duration-300"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ 
                  scale: status === 'sending' ? 1 : 1.02,
                  boxShadow: "0 20px 40px rgba(213, 170, 255, 0.3)"
                }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full px-8 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-pink dark:from-purple-500 dark:to-pink-500 hover:from-pastel-pink hover:to-pastel-orange dark:hover:from-pink-500 dark:hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                {status !== 'sending' && (
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                )}
                {status === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Message Sent!</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Try Again</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;