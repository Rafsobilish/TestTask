import { useState, useEffect } from "react";

type PhoneInputProps = {
  onChange: (phone: string) => void;
};

const LOCAL_STORAGE_KEY = "phoneNumber";

export default function PhoneInput({ onChange }: PhoneInputProps) {
  const [digits, setDigits] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPhone && savedPhone.startsWith("7")) {
      setDigits(savedPhone.slice(1, 11));
      onChange(savedPhone);
    }
  }, [onChange]);

  const formatDigits = (input: string, maskStars = false) => {
    const d = input.slice(0, 10);
    let formatted = "";
    for (let i = 0; i < d.length; i++) {
      if (i === 0) formatted += "(";
      if (i === 3) formatted += ") ";
      if (i === 6) formatted += " ";
      if (i === 8) formatted += "-";
      formatted += maskStars ? "*" : d[i];
    }
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setDigits(onlyDigits);
    localStorage.setItem(LOCAL_STORAGE_KEY, "7" + onlyDigits);
  };

  useEffect(() => {
    onChange("7" + digits);
  }, [digits, onChange]);

  const displayValue = focused
    ? formatDigits(digits, false)
    : formatDigits(digits, true);

  return (
    <div className="xl:w-[418px] lg:w-[418px] w-full h-[68px] rounded-[15px] flex items-center px-4 text-[36px] text-white bg-[#222222]">
      <span className="xl:text-[36px] lg:text-[36px] text-[20px] select-none">
        +7&nbsp;
      </span>
      <input
        type="tel"
        value={displayValue}
        onChange={handleChange}
        maxLength={18}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-[#222222] outline-none w-full xl:text-[36px] lg:text-[36px] text-[20px] tracking-widest placeholder:text-white text-white caret-white rounded-[15px]"
        placeholder="(___) ___ __-__"
      />
    </div>
  );
}
