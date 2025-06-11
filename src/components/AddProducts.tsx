import { useEffect, useState } from "react";
import PhoneInput from "./PhoneInput";
import { useMutation } from "@tanstack/react-query";
import { PostOrder } from "../quries/queries";
import toast from "react-hot-toast";

type CartItem = {
  id: number;
  title: string;
  price: number;
  amount: number;
};

function getCart(): Record<number, CartItem> {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};
}

export default function AddProducts() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = getCart();
      setCartItems(Object.values(cart));
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const cartPost = useMutation({
    mutationFn: PostOrder,
    onSuccess: () => {
      toast("Поздравляем с успешным закаказом!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
    onError: () => {
      toast("Произошла ошибка, попробуйте позже!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const handleOrder = () => {
    if (phone.length !== 11) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }
    if (cartItems.length === 0) {
      alert("Корзина пуста");
      return;
    }

    const payload = {
      phone,
      cart: cartItems.map((item) => ({
        id: item.id,
        quantity: item.amount,
      })),
    };

    cartPost.mutate(payload);
  };

  return (
    <div className="w-full h-max px-20 flex items-center justify-center">
      <div className="px-3 py-[10px] xl:min-w-[708px] lg:min-w-[708px] min-w-[280px] rounded-[15px] bg-[#D9D9D9] w-full max-w-[600px]">
        <p className="text-[36px] text-black leading-[100%] mb-4">
          Добавленные товары
        </p>

        {cartItems.length === 0 ? (
          <p className="text-[20px] text-black">Корзина пуста</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="xl:text-[20px] lg:text-[20px] text-[14px] text-black flex justify-between"
              >
                <span>
                  {item.title} x {item.amount}
                </span>
                <span>{item.price * item.amount}₽</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex xl:flex-row lg:flex-row flex-col xl:gap-0 lg:gap-0 gap-4 mt-5 justify-between items-center">
          <PhoneInput onChange={setPhone} />
          <button
            onClick={handleOrder}
            className="xl:w-[248px] xl:h-[68px] lg:w-[248px] lg:h-[68px] w-full h-[68px] active:scale-95 bg-[#222222] text-[36px] text-white flex items-center justify-center rounded-[15px] transition-opacity duration-300 ease-in-out disabled:opacity-50"
            disabled={
              cartItems.length === 0 ||
              phone.length !== 11 ||
              cartPost.isPending
            }
          >
            {cartPost.isPending ? "Отправка..." : "Заказать"}
          </button>
        </div>
      </div>
    </div>
  );
}
