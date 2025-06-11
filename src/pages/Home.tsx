import { motion } from "framer-motion";
import Reviews from "../components/Reviews";
import AddProducts from "../components/AddProducts";
import Products from "../components/Products";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <motion.div
      className="w-screen min-h-screen flex flex-col items-start justify-center  relative pb-10 overflow-x-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", damping: 12 },
      }}
    >
      <div>
        <Toaster />
      </div>
      <div className="w-full h-[132px] xl:px-[225px] lg:px-[40px] px-0  xl:mt-[55px] lg:mt-[35px] mt-0 ">
        <div className="w-full h-full flex items-center justify-center bg-[#777777]">
          <p className="text-[#F0F0F0] xl:text-[96px] lg:text-[98px] text-[64px] leading-[100%]">
            тестовое задание
          </p>
        </div>
      </div>
      <div className="w-full mt-[105px]">
        <Reviews />
      </div>
      <div className="w-full mt-[243px]">
        <AddProducts />
      </div>
      <div className="w-full mt-[43px] flex justify-center px-20">
        <Products />
      </div>
    </motion.div>
  );
}
