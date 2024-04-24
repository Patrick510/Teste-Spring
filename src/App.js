import "./App.css";
import { useState, useEffect } from "react";

// Import Images
import Back from "./components/assets/Upload-Circle--Streamline-Core.svg";

// Import Hook
import { useFetchLang } from "./components/hooks/useFetchLang";
import FormSection1 from "./components/FormSection1";

// Import CORS/Data
const url = "http://localhost:1000/api";

function App() {
  const { data: lang, httpConfigLang } = useFetchLang(url);

  const [autores, setAutores] = useState([]);

  const [programa, setPrograma] = useState([]);

  const handleClickMode = () => {
    const btn = document.querySelector(".btn-mode");
    const container = document.querySelector(".App");
    const btnBack = document.querySelector(".btn");
    const iconBack = document.querySelector(".icon-back");

    btn.classList.toggle("active");
    btnBack.classList.toggle("active");
    container.classList.toggle("active");
    iconBack.classList.toggle("active");
  };

  useEffect(() => {
    const handleGetLanguage = async () => {
      const urlEndpoint = `${url}/listarlang`;
      httpConfigLang(null, "GET", urlEndpoint);
    };
    handleGetLanguage();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <button className="btn btn-outline-light" id="btn-back">
          {" "}
          <img src={Back} alt="Voltar" className="icon-back" /> Voltar{" "}
        </button>

        <div className="container-btn">
          <div className="btn-mode" onClick={handleClickMode}></div>
        </div>
      </div>

      <div className="menuSection"></div>
      <div className="content">
        <FormSection1 linguagens={lang} />
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default App;
