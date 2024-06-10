import { useState } from "react";
import Login from "./login";
import Verified from "./Verified";
import GetVerified from "./GetVerified";
import SSN from "./SSN";
import Premium from "./premium";
import PaymentDetails from "./PaymentDetails";

export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };
  return (
    <div>
      {currentScreen === 0 && <Login next={handleNext} />}
      {currentScreen === 1 && <Verified next={handleNext} />}
      {currentScreen === 2 && <GetVerified next={handleNext} />}
      {currentScreen === 3 && <SSN next={handleNext} />}
      {currentScreen === 4 && <Premium next={handleNext} />}
      {currentScreen === 5 && <PaymentDetails next={handleNext} />}
    </div>
  );
}
