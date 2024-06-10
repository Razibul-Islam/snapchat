import { useState } from "react";
import axios from "axios";
import imgFront from "../assets/idfront.webp";
import imgBack from "../assets/idback.webp";

// eslint-disable-next-line react/prop-types
export default function Verified({ next }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = "baca7cebf7d1365bf97c10bb391342f9";

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        return response.data.data.url;
      } else {
        throw new Error(response.data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      setError("Both front and back images are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const frontBlob = await fetch(frontImage).then((r) => r.blob());
      const backBlob = await fetch(backImage).then((r) => r.blob());

      const frontImageUrl = await handleImageUpload(frontBlob);
      const backImageUrl = await handleImageUpload(backBlob);

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.frontImageUrl = frontImageUrl;
      userData.backImageUrl = backImageUrl;

      localStorage.setItem("userData", JSON.stringify(userData));

      // Call next() after successful uploads
      next();
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Error uploading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const overlayStyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    inset: 0,
    color: "transparent",
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 text-center">
      <div className="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl flex flex-col">
        <p className="text-2xl font-semibold">Get Verified</p>
        <p className="mt-4 mb-7 [&>span]:font-semibold">
          Please upload image of your government provided{" "}
          <span className="text-yellow-400">id card</span> or{" "}
          <span className="text-yellow-400">driving licence</span>. Image should
          be <span className="text-yellow-400">clear</span> and{" "}
          <span className="text-yellow-400">not cropped</span>
        </p>
        {error && <p className="bg-neutral-200 p-2 rounded text-sm">{error}</p>}
        <label className="border-2 border-neutral-300 border-dashed rounded-lg p-2 bg-neutral-100 cursor-pointer">
          <div className="aspect-video relative rounded overflow-hidden">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              sizes="100vw"
              src={frontImage || imgFront}
              alt="Front of ID"
              style={overlayStyle}
            />
          </div>
          <input
            type="file"
            className="hidden w-0 h-0"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFrontImage)}
          />
        </label>
        <label className="my-4 border-2 border-neutral-300 border-dashed rounded-lg p-2 bg-neutral-100 cursor-pointer">
          <div className="aspect-video relative rounded overflow-hidden">
            <img
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              sizes="100vw"
              src={backImage || imgBack}
              alt="Back of ID"
              style={overlayStyle}
            />
          </div>
          <input
            type="file"
            className="hidden w-0 h-0"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setBackImage)}
          />
        </label>
        <button
          onClick={handleSubmit}
          className="h-11 rounded text-neutral-50 font-medium bg-yellow-400 disabled:bg-yellow-200"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
