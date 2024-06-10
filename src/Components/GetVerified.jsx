import { useState } from "react";
import axios from "axios";
import imgselfi from "../assets/idselfie.webp";

// eslint-disable-next-line react/prop-types
export default function GetVerified({ next }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = "baca7cebf7d1365bf97c10bb391342f9";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      setError("Please select only image files.");
      return;
    }

    setError(null);
    const imagePreviews = validImages.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePreviews).then((previews) => {
      setImages(previews);
    });
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
    if (images.length === 0) {
      setError("Selfie with ID is required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const uploadPromises = images.map(async (imageDataUrl) => {
        const blob = await fetch(imageDataUrl).then((r) => r.blob());
        return handleImageUpload(blob);
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.imageUrls = uploadedImageUrls;

      localStorage.setItem("userData", JSON.stringify(userData));

      // Only call next() after images are successfully uploaded
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
    <div className="relative min-h-dvh flex items-center justify-center p-4 text-center z-10">
      <div className="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl flex flex-col">
        <p className="text-2xl font-semibold">Get Verified</p>
        <p className="mt-4 mb-7 [&>span]:font-semibold">
          Please upload a clear <span className="text-yellow-400">selfie</span>{" "}
          holding your government provided{" "}
          <span className="text-yellow-400">ID card</span> or{" "}
          <span className="text-yellow-400">driving license</span> front side
          next to your face.
        </p>
        {error && <p className="bg-neutral-200 p-2 rounded text-sm">{error}</p>}
        <label className="border-2 mb-4 border-neutral-300 border-dashed rounded-lg p-2 bg-neutral-100 cursor-pointer">
          <div className="aspect-video relative rounded overflow-hidden">
            {images.length === 0 ? (
              <img
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                sizes="100vw"
                src={imgselfi}
                alt=""
                style={overlayStyle}
              />
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  sizes="100vw"
                  src={image}
                  alt={`Preview ${index}`}
                  style={overlayStyle}
                />
              ))
            )}
          </div>
          <input
            onChange={handleImageChange}
            type="file"
            className="hidden w-0 h-0"
            accept="image/*"
            multiple
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
