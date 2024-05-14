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
import FormStage3 from "./components/FormStage3";
import FormStage4 from "./components/FormStage4";
import FormStage5 from "./components/FormStage5";

// Import CORS/Data
const url = "http://localhost:1000/api/listarlang";

const steps = [
  { id: 1, stage: "Informações Técnicas" },
  { id: 2, stage: "Empresa Parceira" },
  { id: 3, stage: "Dados dos autores" },
  { id: 4, stage: "Finalizar" },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const { data: lang, loading } = useFetchLang(url);

  // Dados do estágio 1 do formulário
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [data1, setData1] = useState([]);

  const moveToNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const moveToPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const finalizeForm = () => {
    setCurrentStep(1);
    setComplete(true);
  };

  // Guarda as linguagens selecionadas em "selectedLanguages"
  const handleSelectedLanguagesChange = (languages) => {
    const selected = languages.map((language) => ({
      idLinguagem: language.idLang,
      nomeLinguagem: language.nome,
    }));
    setSelectedLanguages(selected);
  };

  const handleStage1Data = (
    title,
    type,
    date,
    aplication,
    cripto,
    original
  ) => {
    console.log(selectedLanguages);
    const selectLangsId = selectedLanguages.map(
      (language) => language.idLinguagem
    );

    console.log(selectLangsId);
    setData1({
      nomePrograma: title,
      tipoPrograma: type,
      dataPrograma: date,
      campoAplicacao: aplication,
      criptografia: cripto,
      derivaDeObraProtegida: original ? true : false,
      tituloProgramaOriginal: original,
      idLinguagem: [],
    });

    moveToNext();
  };

  if (selectedLanguages !== null) {
    console.log(data1);
  } else {
    console.error("vazio paizao");
  }

  // Apenas verificando se a linguagem está entrando
  useEffect(() => {
    console.log(selectedLanguages);
  }, [selectedLanguages]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <a
          className="navbar-brand btn btn-outline-success d-flex align-items-center gap-2"
          href="https://fonts.google.com/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
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
          Voltar
        </a>
      </nav>

      <div className="sidebar">
        <ul className="nav flex-lg-column flex-row p-3 gap-3 justify-content-between">
          {steps?.map((step) => (
            <li
              key={step.id}
              id={step.id === 4 ? "finalizar" : undefined}
              className={`nav-item d-flex align-items-center gap-1 step-item ${
                currentStep === step.id && "active"
              } ${(step.id < currentStep || complete) && "complete"}`}
            >
              {step.id < currentStep || complete ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#f0eff4"
                    stroke="rgba(0, 0, 0, 0.31)"
                    strokeWidth="1"
                  />
                  <circle cx="12" cy="12" r="7.5" fill="#008a17" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#f0eff4"
                    stroke="rgba(0, 0, 0, 0.31)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="7"
                    fill="#f0eff4"
                    stroke="#f0eff4"
                  />
                </svg>
              )}
              <span>{step.stage}</span>
            </li>
          ))}
        </ul>
      </div>

      <main className="content">
        {/* <h2>Conteúdo Dinâmico</h2>
        <p>
          Este é um exemplo de como o conteúdo pode mudar dinamicamente enquanto
          o menu lateral permanece fixo.
        </p> */}

        {currentStep === 1 && (
          <FormStage1
            linguagens={lang ?? []}
            loading={loading}
            onSelectedLanguagesChange={handleSelectedLanguagesChange}
            nextStage={moveToNext}
            handleStage1Data={handleStage1Data}
          />
        )}

        {currentStep === 2 && (
          <FormStage2 nextStage={moveToNext} previousStage={moveToPrevious} />
        )}
        {currentStep === 3 && (
          <FormStage3 nextStage={moveToNext} previousStage={moveToPrevious} />
        )}

        {currentStep === 4 && (
          <FormStage4 nextStage={moveToNext} previousStage={moveToPrevious} />
        )}

        {currentStep === 5 && (
          <FormStage5
            previousStage={moveToPrevious}
            finalizeForm={finalizeForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
