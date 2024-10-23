import { useEffect, useState } from "react";
import { makeReq } from "../../makeReq";

const useFetch = (url) => {
  const [data, setData] = useState([])  // Initialize with an empty array
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;  // Don't fetch if url is null or undefined
      try {
        setLoading(true)
        const res = await makeReq.get(url, {
          headers: { Authorization: "bearer " + import.meta.env.VITE_API_TOKEN }
        });

        setData(res.data.data);  // Ensure we always set an array
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error }
}

export default useFetch;