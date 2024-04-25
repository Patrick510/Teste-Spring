// Import CSS
import "./App.css";

// Import React
import { useState, useEffect } from "react";

// Import Images

// Import Hook
import { useFetchLang } from "./components/hooks/useFetchLang";

// Import Components
import FormSection1 from "./components/FormSection1";

// Import CORS/Data
const url = "http://localhost:1000/api";

// Function toggle dark mode
const handleClickMode = () => {
  const btn = document.querySelector(".btn-mode");
  const container = document.querySelector(".App");
  const btnBack = document.querySelector(".btn");
  const body = document.querySelector(".body");
  const header = document.querySelector(".header");
  const menuS = document.querySelector(".menuSection");
  const content = document.querySelector(".content");

  btn.classList.toggle("active");
  btnBack.classList.toggle("active");
  container.classList.toggle("active");
  body.classList.toggle("active");
  header.classList.toggle("active");
  menuS.classList.toggle("active");
  content.classList.toggle("active");
};

function App() {
  const { data: lang, httpConfigLang } = useFetchLang(url);

  const [autores, setAutores] = useState([]);

  const [programa, setPrograma] = useState([]);

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
        <button className="btn btn-outline-success" id="btn-back">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            height="16"
            width="14"
            id="Line-Arrow-Left-Circle-1--Streamline-Core"
          >
            <desc>
              Line Arrow Left Circle 1 Streamline Icon: https://streamlinehq.com
            </desc>
            <g id="line-arrow-left-circle-1--arrow-keyboard-circle-button-left">
              <path
                id="Vector"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 13.5c3.5899 0 6.5 -2.9101 6.5 -6.5C13.5 3.41015 10.5899 0.5 7 0.5 3.41015 0.5 0.5 3.41015 0.5 7c0 3.5899 2.91015 6.5 6.5 6.5Z"
                strokeWidth="1"
              ></path>
              <path
                id="Vector 4425"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.5 5 -2 2 2 2"
                strokeWidth="1"
              ></path>
              <path
                id="Vector 4443"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 7h-7"
                strokeWidth="1"
              ></path>
            </g>
          </svg>{" "}
          Voltar{" "}
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
