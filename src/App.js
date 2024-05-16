// Import CSS
import "./App.css";

// Import React
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  const [modal, setModal] = useState(false);
  const [qtdAutor, setQtdAutor] = useState("");
  const { data: lang, loading } = useFetchLang(url);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});

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

    setData1((prevData1) => ({
      ...prevData1,
      idLinguagem: selected.map((language) => ({
        idLinguagem: language.idLinguagem,
        nomeLinguagem: language.nomeLinguagem,
      })),
    }));
  };

  const handleStage1Data = (
    title,
    type,
    date,
    application,
    cripto,
    showOriginal,
    original
  ) => {
    setData1((prevData1) => ({
      ...prevData1,
      nomePrograma: title,
      tipoPrograma: type,
      dataPrograma: date,
      campoAplicacao: application,
      criptografia: cripto,
      derivaDeObraProtegida: showOriginal,
      tituloProgramaOriginal: showOriginal ? original : "",
    }));

    moveToNext();
  };

  const handleStage2Data = (data2) => {
    setData2({
      razaoSocial: data2.razao,
      cnpjParceira: data2.cnpj,
      ruaParceira: data2.rua,
      numeroParceira: data2.numero,
      bairroParceira: data2.bairro,
      cidadeParceira: data2.cidade,
      estadoParceira: data2.estado,
      cepParceira: data2.cep,
      nomeSocio: data2.nome,
      nacionalidadeSocio: data2.nacionalidade,
      estadoCivilSocio: data2.estadocivil,
      rgSocio: data2.rg,
      cpfSocio: data2.cpf,
      orgaoExpedidorSocio: data2.orgao,
      residAtualSocio: data2.residencia,
    });

    moveToNext();
  };

  // Verificando se os dados entraram.
  useEffect(() => {
    console.log(selectedLanguages);
    console.log(data1);
    console.log(data2);
    console.log(qtdAutor);
  }, [selectedLanguages, data1, data2, qtdAutor]);

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
        <div className="row text-center">
          <div className="col-12 progress-container">
            <div className="progress-bar-bg"></div>
          </div>
        </div>
        <ul
          className="flex-lg-column ps-lg-4 gap-lg-4 mb-1 mt-1 row text-center gap-1 justify-content-between"
          style={{ position: "relative" }}
        >
          {steps?.map((step) => (
            <li
              key={step.id}
              id={step.id === 4 ? "finalizar" : undefined}
              className={`col p-0 d-flex flex-lg-row flex-column align-items-center ${
                step.id === 1 && "pt-lg-1"
              } ${currentStep === step.id ? "active" : ""} ${
                step.id < currentStep || complete ? "complete" : ""
              }`}
            >
              {step.id === currentStep || step.id < currentStep || complete ? (
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
        {currentStep === 1 && (
          <FormStage1
            linguagens={lang ?? []}
            loading={loading}
            onSelectedLanguagesChange={handleSelectedLanguagesChange}
            nextStage={moveToNext}
            handleStage1Data={handleStage1Data}
            data1={data1 || {}}
            setQtdAutor={setQtdAutor}
            setModal={setModal}
          />
        )}

        {currentStep === 2 && (
          <FormStage2
            previousStage={moveToPrevious}
            handleStage2Data={handleStage2Data}
            nameProgram={data1.nomePrograma || ""}
            data2={data2 || {}}
            setQtdAutor={setQtdAutor}
            setModal={setModal}
          />
        )}
        {currentStep === 3 && (
          <FormStage3
            nextStage={moveToNext}
            previousStage={moveToPrevious}
            qtdAutor={qtdAutor}
            setModal={setModal}
          />
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

      {modal && (
        <Modal
          show={modal}
          onHide={() => setModal(false)}
          className="emergente-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Aviso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Por favor, preencha todos os campos corretamente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;
