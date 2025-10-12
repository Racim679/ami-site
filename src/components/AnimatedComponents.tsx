import React from "react";
import { motion } from "framer-motion";

// Variantes d'animation
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.6
  }
};
export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0
  },
  transition: {
    duration: 0.6
  }
};
export const fadeInRight = {
  initial: {
    opacity: 0,
    x: 60
  },
  animate: {
    opacity: 1,
    x: 0
  },
  transition: {
    duration: 0.6
  }
};
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  transition: {
    duration: 0.5
  }
};
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Composants animés
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = "",
  delay = 0
}) => <motion.div initial={{
  opacity: 0,
  y: 50
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true,
  margin: "-100px"
}} transition={{
  duration: 0.6,
  delay
}} className={className}>
    {children}
  </motion.div>;
export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = "",
  delay = 0
}) => <motion.div initial={{
  opacity: 0,
  y: 30,
  scale: 0.95
}} whileInView={{
  opacity: 1,
  y: 0,
  scale: 1
}} viewport={{
  once: true,
  margin: "-50px"
}} whileHover={{
  y: -5,
  scale: 1.02
}} transition={{
  duration: 0.4,
  delay
}} className={className}>
    {children}
  </motion.div>;
export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({
  children,
  className = "",
  onClick
}) => <motion.button onClick={onClick} className={className} whileHover={{
  scale: 1.05
}} whileTap={{
  scale: 0.95
}} transition={{
  duration: 0.2
}}>
    {children}
  </motion.button>;
export const AnimatedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({
  src,
  alt,
  className = ""
}) => <motion.img src={src} alt={alt} className={className} initial={{
  opacity: 0,
  scale: 1.1
}} whileInView={{
  opacity: 1,
  scale: 1
}} viewport={{
  once: true
}} transition={{
  duration: 0.6
}} whileHover={{
  scale: 1.05
}} />;
export const AnimatedText: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = "",
  delay = 0
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5,
  delay
}} className={className}>
    {children}
  </motion.div>;
export const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
}> = ({
  value,
  suffix = "",
  className = ""
}) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCount(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);
  return <motion.span className={className} initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      {count}{suffix}
    </motion.span>;
};

// Hook pour les animations au scroll
export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return {
    ref,
    isVisible
  };
};