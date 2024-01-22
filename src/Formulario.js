function Formulario({
  botao,
  vetor,
  eventoTeclado,
  addPrograma,
  objPrograma,
  setObjPrograma,
}) {
  const adicionarOuRemoverLinguagem = (e) => {
    const selectedLanguageId = parseInt(e.target.value, 10);

    if (!isNaN(selectedLanguageId)) {
      const existentIndex = objPrograma.idLinguagem.findIndex(
        (lang) => lang.idLinguagem === selectedLanguageId
      );

      if (existentIndex === -1) {
        // Adiciona a linguagem se não existir
        setObjPrograma((prevPrograma) => ({
          ...prevPrograma,
          idLinguagem: [
            ...prevPrograma.idLinguagem,
            vetor.find((lang) => lang.idLinguagem === selectedLanguageId),
          ],
        }));
      } else {
        // Remove a linguagem se já existir
        setObjPrograma((prevPrograma) => {
          const novaListaLinguagens = [...prevPrograma.idLinguagem];
          novaListaLinguagens.splice(existentIndex, 1);
          return { ...prevPrograma, idLinguagem: novaListaLinguagens };
        });
      }
    }
  };

  const removerLinguagem = (index) => {
    setObjPrograma((prevPrograma) => {
      const novaListaLinguagens = [...prevPrograma.idLinguagem];
      novaListaLinguagens.splice(index, 1);
      return { ...prevPrograma, idLinguagem: novaListaLinguagens };
    });
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Nome do Programa"
        onChange={eventoTeclado}
        name="nomePrograma"
        required
        className="form-control"
      />

      <label className="form-check-label">
        {" "}
        Data de Criação ou de Publicação{" "}
        <input
          type="date"
          name="dataPrograma"
          id="date-pb"
          required
          onChange={eventoTeclado}
          className="form-control"
        />
      </label>

      <div className="input-group mb-3">
        <label className="input-group-text"> Linguagem</label>{" "}
        <select
          name="idLinguagem"
          onChange={adicionarOuRemoverLinguagem}
          className="form-select"
          id="inputGroupSelect03"
          aria-label="Example select with button addon"
        >
          <option> # </option>
          {vetor.map((obj) => (
            <option key={obj.idLinguagem} value={obj.idLinguagem}>
              {" "}
              {obj.nomeLinguagem}{" "}
            </option>
          ))}
        </select>
      </div>

      <ul className="list-group" id="linguagens-l">
        {objPrograma.idLinguagem.map((lang, index) => (
          <li className="list-group-item" key={index}>
            {lang.nomeLinguagem}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removerLinguagem(index)}
              id="botao-l"
            >
              X
            </button>
            {index < objPrograma.idLinguagem.length - 1 && " "}
          </li>
        ))}
      </ul>

      <div className="input-group mb-3">
        <button className="btn btn-primary" id="btn-autor">
          +
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Autor"
          id="nome-autor"
          name="nome"
          onChange={eventoTeclado}
        />

        <input
          type="number"
          className="form-control"
          required
          name="porcentagem"
          min="1"
          max="100"
          onChange={eventoTeclado}
        />

        <span className="input-group-text" id="perc-autor">
          {" "}
          %{" "}
        </span>
        <button className="btn btn-danger" id="btn-autor">
          {" "}
          -{" "}
        </button>
      </div>

      {botao ? (
        <input
          type="button"
          value="Cadastrar"
          onClick={addPrograma}
          className="btn btn-primary"
        />
      ) : (
        <div>
          <input type="button" value="Alterar" className="btn btn-warning" />
          <input type="button" value="Deletar" className="btn btn-danger" />
          <input type="button" value="Cancelar" className="btn btn-secondary" />
        </div>
      )}

      <br />
    </form>
  );
}

export default Formulario;
