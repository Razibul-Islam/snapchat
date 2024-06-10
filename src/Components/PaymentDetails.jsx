import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function PaymentDetails() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [zip, setZip] = useState("");

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "");
    setNumber(value);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setExpiry(value);
    }
  };

  const formatNumber = (num) => {
    return num.replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiry = (exp) => {
    return exp.length === 4 ? `${exp.slice(0, 2)}/${exp.slice(2, 4)}` : exp;
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 text-center">
      <div className="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl">
        <p className="text-2xl font-semibold">Payment Details</p>
        <form className="grid grid-cols-2 gap-4 mt-3">
          <div className="col-span-full mb-1">
            <Cards
              number={formatNumber(number)}
              name={name}
              expiry={formatExpiry(expiry)}
              cvc={cvc}
              focused={focused}
            />
          </div>
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none col-span-full border-yellow-400 disabled:border-yellow-200"
            placeholder="Card number"
            name="number"
            maxLength={19}
            value={formatNumber(number)}
            onChange={handleNumberChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none col-span-full border-yellow-400 disabled:border-yellow-200"
            placeholder="Name on card"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none border-yellow-400 disabled:border-yellow-200"
            placeholder="MM/YY"
            name="expiry"
            maxLength={5}
            value={formatExpiry(expiry)}
            onChange={handleExpiryChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none border-yellow-400 disabled:border-yellow-200"
            placeholder="CVC"
            name="cvc"
            maxLength={3}
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none col-span-full border-yellow-400 disabled:border-yellow-200"
            placeholder="Address"
            name="address"
            onChange={(e) => setFocused(e.target.name)}
            required
          />
          <input
            type="text"
            className="border h-11 rounded px-4 outline-none col-span-full border-yellow-400 disabled:border-yellow-200"
            placeholder="Zip code"
            name="zip"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            onFocus={handleInputFocus}
            required
          />
          <button className="h-11 rounded text-neutral-50 font-medium col-span-full bg-yellow-400 disabled:bg-yellow-200">
            Pay 0.10$
          </button>
        </form>
      </div>
    </div>
  );
}
