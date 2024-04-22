import "./App.css";
import { useState, useEffect } from "react";

// Import Hook
import { useFetchLang } from "./components/hooks/useFetchLang";

// Import CORS/Data
const url = "http://localhost:1000/api";

function App() {
  const [linguagens, setLinguagens] = useState([]);
  const { data: lang, httpConfigLang } = useFetchLang(url);

  const handleGetLanguage = async () => {
    const urlEndpoint = `${url}/listarlang`;
    httpConfigLang(null, "GET", urlEndpoint);
  };

  useEffect(() => {
    setLinguagens(lang);
    if (lang !== null) {
      console.log(linguagens);
    }
  }, [lang, linguagens]);

  return (
    <div className="App">
      <button onClick={handleGetLanguage}> Chamar linguagens</button>
      <ul>
        {linguagens &&
          linguagens.map((linguagem) => (
            <li key={linguagem.idLinguagem}>{linguagem.nomeLinguagem}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
