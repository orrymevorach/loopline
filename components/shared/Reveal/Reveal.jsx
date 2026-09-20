import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Reveal = ({ children, delay = 0.1, className = '', threshold = 0.2 }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allows it to animate again when scrolled back into view
    threshold, // Triggers when 20% of the component is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
