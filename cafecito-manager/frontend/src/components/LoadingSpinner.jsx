import { motion } from 'framer-motion';
import { TbCoffee } from 'react-icons/tb';

const LoadingSpinner = ({ message = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 bg-[#6b3a2a] rounded-2xl flex items-center justify-center shadow-lg">
      <TbCoffee className="text-[#f5ede6] text-xl" />
    </motion.div>
    <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm font-medium">{message}</p>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl overflow-hidden animate-pulse border border-[#e8d8ce] dark:border-[#3d2b22]">
    <div className="h-48 bg-[#f0d9d0] dark:bg-[#3d2b22]" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-[#f0d9d0] dark:bg-[#3d2b22] rounded-full w-3/4" />
      <div className="h-3 bg-[#f0d9d0] dark:bg-[#3d2b22] rounded-full w-full" />
      <div className="h-3 bg-[#f0d9d0] dark:bg-[#3d2b22] rounded-full w-2/3" />
      <div className="flex justify-between pt-1">
        <div className="h-5 bg-[#f0d9d0] dark:bg-[#3d2b22] rounded-full w-16" />
        <div className="h-8 bg-[#f0d9d0] dark:bg-[#3d2b22] rounded-full w-20" />
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
