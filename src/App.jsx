import { useRef } from "react";
import Webcam from "react-webcam";
// import Login from "./Components/login";
import Onboarding from "./Components/Onboarding";

function App() {
  const webcamRef = useRef(null);
  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
    },
    webcam: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };
  return (
    <div className="relative">
      <div style={styles.container}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={styles.webcam}
        />
      </div>
      <Onboarding />
    </div>
  );
}

export default App;
