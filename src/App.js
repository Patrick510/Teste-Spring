// Import CSS
import "./App.css";

// Import React
import { useState, useEffect } from "react";

// Import Images

// Import Hook
import { useFetchLang } from "./components/hooks/useFetchLang";

// Import Components
import FormStage1 from "./components/FormStage1";
import FormStage2 from "./components/FormStage2";

// Import CORS/Data
const url = "http://localhost:1000/api";

const steps = [
  { id: 1, stage: "Informações Técnicas" },
  { id: 2, stage: "Empresa Parceira" },
  { id: 3, stage: "Dados dos autores" },
  { id: 4, stage: "Finalizar" },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const { data: lang, httpConfigLang } = useFetchLang(url);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const moveToNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const moveToPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  // Chama as linguagens do banco de dados
  useEffect(() => {
    const handleGetLanguage = async () => {
      const urlEndpoint = `${url}/listarlang`;
      httpConfigLang(null, "GET", urlEndpoint);
    };
    handleGetLanguage();
  }, []);

  // Guarda as linguagens selecionadas em "selectedLanguages"
  const handleSelectedLanguagesChange = (languages) => {
    const selected = languages.map((language) => ({
      idLinguagem: language.idLang,
      nomeLinguagem: language.nome,
    }));
    setSelectedLanguages(selected);
  };

  // Apenas verificando se a linguagem está entrando
  useEffect(() => {
    console.log(selectedLanguages);
  }, [selectedLanguages]);

  return (
    <div className="App">
      <div className="header">
        <button className="btn btn-outline-success" id="btn-back">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
          Voltar{" "}
        </button>
      </div>

      <div className="menuSection">
        {steps?.map((step) => (
          <div
            key={step.id}
            className={`step-item ${currentStep === step.id && "active"} ${
              (step.id < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {" "}
              {step.id < currentStep || complete ? (
                <div className="complete"></div>
              ) : (
                []
              )}
            </div>
            <span>{step.stage}</span>
          </div>
        ))}
      </div>

      <div className="content">
        {currentStep === 1 && (
          <FormStage1
            linguagens={lang}
            onSelectedLanguagesChange={handleSelectedLanguagesChange}
            nextStage={moveToNext}
          />
        )}

        {currentStep === 2 && (
          <FormStage2 nextStage={moveToNext} previousStage={moveToPrevious} />
        )}
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default App;
