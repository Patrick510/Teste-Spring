import { useState, useEffect, useMemo } from "react";
import "./FormStage1.css";

const FormSection1 = ({ linguagens, onSelectedLanguagesChange, nextStage }) => {
  const [selectedLang, setSelectedLang] = useState([]);
  const [titleProgram, setTitleProgram] = useState("");
  const [typeProgram, setTypeProgram] = useState("");
  const [dateProgram, setDateProgram] = useState("");
  const [aplicationProgram, setAplicationProgram] = useState("");
  const [criptoProgram, setCriptoProgram] = useState("");
  const [showOriginal, setShowOriginal] = useState(true);
  const [programData, setProgramData] = useState([]);
  const [search, setSearch] = useState("");

  const [langs, setLangs] = useState([]);
  const handleLangClick = (id, name) => {
    if (selectedLang.some((selected) => selected.idLang === id)) {
      const updatedLangs = selectedLang.filter(
        (selected) => selected.idLang !== id
      );
      setSelectedLang(updatedLangs);
    } else {
      setSelectedLang([...selectedLang, { idLang: id, nome: name }]);
    }
  };

  useEffect(() => {
    if (linguagens) {
      setLangs(linguagens);
    } else {
      console.log("linguagens vazio");
    }
  }, [linguagens, search]);

  const filtroLangSearch = useMemo(() => {
    const searchLower = search.toLowerCase();
    return langs.filter((lang) => {
      const isSelected = selectedLang.some(
        (selected) => selected.idLang === lang.idLinguagem
      );
      return (
        !isSelected && lang.nomeLinguagem.toLowerCase().includes(searchLower)
      );
    });
  }, [search, langs, selectedLang]);

  return (
    <div className="content-stage-1">
      <div className="section1">
        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Titulo do Programa: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Programa"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={titleProgram}
              onChange={(e) => setTitleProgram(e.target.value)}
            />
          </label>
        </div>

        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Tipo do Programa: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Software..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={typeProgram}
              disabled={!titleProgram}
              onChange={(e) => setTypeProgram(e.target.value)}
            />
          </label>
        </div>

        <div className="typeProg">
          <label htmlFor="">
            {" "}
            Data de Criação ou Publicação <br />
            <input
              type="date"
              value={dateProgram}
              disabled={!typeProgram}
              onChange={(e) => setDateProgram(e.target.value)}
            />
          </label>
        </div>

        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Campo de Aplicação: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Técnologia, Saúde..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              id="camp-aplica"
              value={aplicationProgram}
              disabled={!dateProgram}
              onChange={(e) => setAplicationProgram(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      <div className="section2">
        <span>Criptografia:</span>
        <div className="mb-1">
          <textarea
            placeholder="Algoritmo ou função HASH para criptografia"
            className="form-control"
            rows="3"
            value={criptoProgram}
            disabled={!aplicationProgram}
            onChange={(e) => setCriptoProgram(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="section3" id="select-lang">
        <div className="selectLang">
          <span id="lang-used">Linguagens Utilizadas:</span>
          <div className="search-box">
            <div className="input-group">
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar Linguagem"
                aria-label="Input group example"
                aria-describedby="basic-addon1"
                id="search-lang-box"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
              </span>
            </div>
            <div className="result-box">
              <ul className="list-group">
                {filtroLangSearch.length > 0 &&
                  filtroLangSearch.map((linguagem) => (
                    <li
                      key={linguagem.idLinguagem}
                      className="list-group-item d-flex justify-content-start align-items-center"
                      onClick={() =>
                        handleLangClick(
                          linguagem.idLinguagem,
                          linguagem.nomeLinguagem
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="rgba(16, 55, 22, 0.05)"
                        className="bi bi-plus-circle"
                        id="svg-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                          fill="rgba(16, 55, 22, 0.1)"
                        />
                        <path
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                          fill="#0E6BA8"
                        />
                      </svg>
                      {linguagem.nomeLinguagem}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="handleLang">
            <ul className="list-group">
              {selectedLang.length > 0 &&
                selectedLang.map((linguagem) => (
                  <li
                    className="list-group-item d-flex justify-content-start align-items-center"
                    name=""
                    key={linguagem.idLang}
                    onClick={() =>
                      handleLangClick(linguagem.idLang, linguagem.nome)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="rgba(16, 55, 22, 0.05)"
                      className="bi bi-dash-circle"
                      id="svg-minus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                        fill="rgba(16, 55, 22, 0.1)"
                      />
                      <path
                        d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                        fill="#ff0000"
                      />
                    </svg>
                    {linguagem.nome}{" "}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section4">
        <span>Este programa é derivação de outra obra protegida: </span>
        <div id="nao">
          <input
            type="radio"
            value="nao"
            className="form-check-input mt-0"
            checked={!showOriginal}
            onChange={() => setShowOriginal(false)}
            disabled={!criptoProgram}
          />{" "}
          <label htmlFor="nao">Não</label>
        </div>

        <div id="input-obra-original">
          <input
            type="radio"
            value="sim"
            className="form-check-input mt-0"
            checked={showOriginal}
            onChange={() => setShowOriginal(true)}
            disabled={!criptoProgram}
          />{" "}
          <label htmlFor="sim">Sim</label>
          <input
            type="text"
            className="form-control"
            placeholder=" Informe o título do programa original ou o número do registro no INPI"
            disabled={!showOriginal || !criptoProgram}
          />
        </div>
      </div>

      <div className="btnStage">
        <button type="button" className="btn-stage" onClick={nextStage}>
          {" "}
          Próximo{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormSection1;
