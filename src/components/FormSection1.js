import { useState } from "react";

const FormSection1 = ({ linguagens }) => {
  const [selectedLang, setSelectedLang] = useState("");

  return (
    <div>
      <form action="">
        <div className="setLang">
          <div className="addLang">
            <input type="text" placeholder="JavaScritp..." />
          </div>
          <div className="handleLang"></div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="">Selecione uma linguagem</option>
            {linguagens &&
              linguagens.map((linguagem) => (
                <option name="" id="" key={linguagem.idLinguagem}>
                  {" "}
                  {linguagem.nomeLinguagem}{" "}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FormSection1;
