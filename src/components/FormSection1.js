import { useState, useEffect, useMemo } from "react";
import "./FormSection1.css";

const FormSection1 = ({ linguagens, onSelectedLanguagesChange }) => {
  const [selectedLang, setSelectedLang] = useState([]);
  const [section1Data, setSection1Data] = useState([]);
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
    <div className="section-3">
      <div className="section1">
        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Titulo do Programa: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </label>
        </div>
        {/* <div className="titleProg">
          <label htmlFor="">
            {" "}
            Titulo do Programa: <br />
            <input type="text" placeholder="Nome do Programa" />
          </label>
        </div> */}

        {/* <div className="typeProg">
          <label htmlFor="">
            {" "}
            Tipo de Programa: <br />
            <input type="text" placeholder="Software..." />
          </label>
        </div> */}
        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Tipo do Programa: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </label>
        </div>

        <div className="typeProg">
          <label htmlFor="">
            {" "}
            Data de Criação ou Publicação <br />
            <input type="date" />
          </label>
        </div>

        {/* <div className="dataProg">
          <label htmlFor="">
            {" "}
            Campo de Aplicação <br />
            <input type="text" placeholder="Técnologia, Saúde..." />
          </label>
        </div> */}
        <div className="input-group mb-0">
          <label htmlFor="">
            {" "}
            Campo de Aplicação: <br />
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </label>
        </div>
      </div>

      <div id="select-lang">
        <div className="selectLang">
          <span id="lang-used">Linguagens Utilizadas: </span>
          <div className="search-box">
            <div className="row-box">
              <input
                type="text"
                id="input-box"
                placeholder="Search language"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#a8a8a8"
                className="bi bi-search"
                id="search-lang-1"
                viewBox="0 0 16 16"
                onClick={() => onSelectedLanguagesChange(selectedLang)}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
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
                        width="30"
                        height="30"
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
                      width="30"
                      height="30"
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
    </div>
  );
};

export default FormSection1;
