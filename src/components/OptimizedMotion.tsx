import React, { memo, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  enableGPU?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

const OptimizedMotion: React.FC<OptimizedMotionProps> = memo(({ 
  children, 
  enableGPU = true, 
  priority = 'medium',
  style,
  ...props 
}) => {
  const optimizedStyle = useMemo(() => ({
    ...style,
    ...(enableGPU && {
      transform: 'translateZ(0)',
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
    }),
    contain: priority === 'high' ? 'layout style paint' : 'paint',
  }), [style, enableGPU, priority]);

  // Optimize animation props based on performance
  const optimizedProps = useMemo(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isReducedMotion || isLowEnd) {
      return {
        ...props,
        transition: {
          ...props.transition,
          duration: (props.transition?.duration || 0.6) * 0.5,
          ease: 'easeOut'
        }
      };
    }
    
    return props;
  }, [props]);

  return (
    <motion.div
      {...optimizedProps}
      style={optimizedStyle}
      className={`gpu-accelerated ${props.className || ''}`}
    >
      {children}
    </motion.div>
  );
});

OptimizedMotion.displayName = 'OptimizedMotion';

export default OptimizedMotion;