import { useState } from "react";

type TFetchData = (url: string, options?: RequestInit) => Promise<void>;

type TUseFetch = <T>() => {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  fetchData: TFetchData;
};

const useFetch: TUseFetch = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData: TFetchData = async (path, options) => {
    error && setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("https://dummyjson.com" + path, options);
      const data = await res.json();

      if (data.message) throw new Error(data.message);

      setData(data);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "An error occurred";
      setError(errorMsg);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    data,
    fetchData,
  };
};

export default useFetch;
