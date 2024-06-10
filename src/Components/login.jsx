import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Login({ next }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
      imageUrls: [], // Initialize with an empty array
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    next();
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 text-center z-10">
      <div className="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl">
        <p className="text-3xl font-semibold">Live Video Chat</p>
        <p className="mt-3 leading-relaxed max-w-[32ch] mx-auto [&>span]:font-semibold">
          Know each other and enjoy{" "}
          <span className="text-yellow-400">private, secure</span> and{" "}
          <span className="text-yellow-400">hasslefree</span> live moment with
          your dating partner
        </p>
        <p className="text-xl font-semibold mt-3">Login with Megapersonals</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-4">
          <p className="bg-neutral-200 p-2 rounded text-sm hidden">
            Please enter correct password
          </p>
          <input
            type="email"
            placeholder="Enter email here"
            className="border h-11 rounded px-4 outline-none border-yellow-400 disabled:border-yellow-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password here"
            className="border h-11 rounded px-4 outline-none border-yellow-400 disabled:border-yellow-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="h-11 rounded text-neutral-50 font-medium bg-yellow-400 disabled:bg-yellow-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
