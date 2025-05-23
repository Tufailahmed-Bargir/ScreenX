import { useState } from "react";
import axios from "axios";
export const backend_url = 'https://lexi-backend-production-f1da.up.railway.app'
const useTweetScreenshot = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateScreenshot = async (tweetUrl) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    
    try {
      const res = await axios.post(`${backend_url}/generate-screenshot`, {
        url: tweetUrl,
      });

      if (res.data.success) {
        setImageUrl(`${backend_url}${res.data.imageUrl}`);
      } else {
        setError(res.data.error || "Unknown error occurred.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return { generateScreenshot, loading, imageUrl, error };
};

export default useTweetScreenshot;
