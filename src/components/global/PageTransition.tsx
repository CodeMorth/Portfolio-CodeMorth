'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="overflow-x-hidden overflow-y-hidden"
        key={pathname}
        variants={{
          initial: { opacity: 0, y: -1000 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 1, y: 1000 }
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// style={{
//   position: 'fixed',
//   width: '100%',
//   height: '100%',
//   backgroundColor: '#FFC300',
//   zIndex: 1000
// }}