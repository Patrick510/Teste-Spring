import { useState, useEffect } from "react";

//4 - custom hook

export const useFetch = (url) => {
  const [data, setDada] = useState(null);
  //5 - refatorando post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //desafio
  const [deleteProduct, setDeleteProduct] = useState(null);

  //6 - loading

  const [loading, setLoanding] = useState(false);

  //7 tratando erros
  const [error, setError] = useState(null);

  //desafio

  //5 - refatorando post
  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setDeleteProduct(data);
    }
  };
  httpConfig();

  useEffect(() => {
    const fetchData = async () => {
      //6 - loanding
      setLoanding(true);
      try {
        const res = await fetch(url);

        const json = await res.json();

        setDada(json);
      } catch (error) {
        console.log(error.massage);
        setError("Houve um erro ao carregar dados");
      }

      setLoanding(false);
    };
    fetchData();
  }, [url, callFetch]);

  //5 - refatorando post

  useEffect(() => {
    const httpRequest = async (id) => {
      if (method === "POST") {
        let fetchOption = [url, config];

        const res = await fetch(...fetchOption);

        const json = await res.json();

        setCallFetch(json);
      } else if (method === "DELETE") {
        try {
          const urlToDelete = `http://localhost:3000/products/${deleteProduct}`;

          const res = await fetch(urlToDelete, config);

          const json = await res.json();
          setCallFetch(json);
        } catch (error) {
          console.error(error.message);
          setError("Houve um erro ao realizar a requisição DELETE");
        }
      }
    };
    httpRequest();
  }, [config, method, url, deleteProduct]);

  return { data, httpConfig, loading, error };
};
