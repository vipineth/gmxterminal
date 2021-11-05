import { useEffect, useState } from "react";

const defaultFetcher = (url) => fetch(url).then((res) => res.json());

export function useFetch(url, defaultValue, fetcher = defaultFetcher, update) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(defaultValue);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await fetcher(url);
      setData(data);
    } catch (err) {
      console.error(err);
      setError(err);
    }
    setLoading(false);
  }, [url, update]);

  return [data, loading, error];
}
