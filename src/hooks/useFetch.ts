import { useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const sendRequest = async ({ url }: { url: string }) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (response.status === 404) {
        setData(null);
      } else if (response.status >= 400 && response.status < 600) {
        throw new Error(response.status.toString());
      } else {
        setData(await response.json());
      }
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendRequest, data, error };
};

export { useFetch };
