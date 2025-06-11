import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Product = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  description: string;
};

function getCart(): Record<
  number,
  { id: number; title: string; price: number; amount: number }
> {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};
}

function setCart(
  cart: Record<
    number,
    { id: number; title: string; price: number; amount: number }
  >
) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function ProductCard({ product }: { product: Product }) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const cart = getCart();
    if (cart[product.id]) {
      setAmount(cart[product.id].amount);
    }
  }, [product.id]);

  // Обновление количества и синхронизация с локалсторейдж
  const updateAmount = (nextAmount: number) => {
    if (nextAmount < 0) nextAmount = 0;
    if (nextAmount > 999) nextAmount = 999; // ограничим максимальное значение

    const cart = getCart();

    if (nextAmount === 0) {
      delete cart[product.id];
    } else {
      cart[product.id] = {
        id: product.id,
        title: product.title,
        price: product.price,
        amount: nextAmount,
      };
    }

    setCart(cart);
    setAmount(nextAmount);
  };

  // Обработка ввода в поле
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // только цифры
    const num = val === "" ? 0 : parseInt(val, 10);
    updateAmount(num);
  };

  return (
    <div className="xl:w-[301px] lg:w-[301px] w-[280px]  h-[812px] rounded-[15px] bg-[#D9D9D9] flex flex-col px-[10px] py-2">
      <img
        src={product.image_url}
        alt={product.title}
        className="lg:w-[281px] lg:h-[366px] xl:w-[281px] xl:h-[366px] w-[245px] h-[356px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col h-[312px]">
        <p className="font-bold text-[36px] leading-[100%] text-black text-center line-clamp-2">
          {product.title}
        </p>
        <p className="text-[24px] text-black leading-[100%] mt-2 line-clamp-8">
          {product.description}
        </p>
      </div>
      <p className="mt-2 text-black text-[36px] w-full text-center">
        цена: {product.price}₽
      </p>

      <div className="relative mt-2 w-full h-[68px]">
        <AnimatePresence mode="wait">
          {amount === 0 ? (
            <motion.div
              key="buy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => updateAmount(1)}
              className="absolute top-0 left-0 text-center w-full h-full bg-[#222222] text-[#F0F0F0] text-[36px] rounded-[15px] cursor-pointer select-none"
            >
              купить
            </motion.div>
          ) : (
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full h-full text-[36px] flex justify-between gap-2"
            >
              <button
                onClick={() => updateAmount(amount - 1)}
                className="bg-[#222222] text-[#F0F0F0] rounded-[15px] w-[68px] h-full flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 active:outline-none hover:scale-95 active:scale-90 select-none"
                type="button"
              >
                -
              </button>

              <div className="w-[128px] h-full">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={amount}
                  onChange={handleInputChange}
                  className="bg-[#222222] text-[#F0F0F0] rounded-[15px] w-full h-full text-center text-[36px] appearance-none outline-none"
                />
              </div>
              <button
                onClick={() => updateAmount(amount + 1)}
                className="bg-[#222222] text-[#F0F0F0] rounded-[15px] w-[68px] h-full flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 active:outline-none hover:scale-95 active:scale-90 select-none"
                type="button"
              >
                +
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
