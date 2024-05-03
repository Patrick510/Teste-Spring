import { useState, useEffect } from "react";

export const useFetchLang = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [urlUse, setUrlUse] = useState("");

  const httpConfigLang = (data, method, urlUsed) => {
    if (method === "GET") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
    }
    setMethod(method);
    setUrlUse(urlUsed);
  };

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "GET" && urlUse) {
        try {
          setLoading(true);
          let fetchOptions = [urlUse, config];
          const res = await fetch(...fetchOptions);
          const json = await res.json();

          setCallFetch(json);
        } catch (error) {
          console.log(error.message);
          setError(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    };
    httpRequest();
  }, [config, method, urlUse]);

  return { data: callFetch, httpConfigLang, loading, error };
};
