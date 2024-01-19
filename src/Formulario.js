function Formulario({ botao, vetor, eventoTeclado }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Nome do Programa"
        onChange={eventoTeclado}
        name="nomeProg"
        required
        className="form-control"
      />

      <label className="form-check-label" id="create-date">
        {" "}
        <input
          type="checkbox"
          name="create"
          className="form-check-input"
        />{" "}
        Data de Criação
        <input
          type="date"
          placeholder=""
          name="data"
          required
          onChange={eventoTeclado}
          //disabled
          className="form-control"
        />
      </label>

      <label className="form-check-label">
        {" "}
        <input
          type="checkbox"
          name="publica"
          className="form-check-input"
        />{" "}
        Data de Publicação{" "}
        <input
          type="date"
          name="data"
          required
          onChange={eventoTeclado}
          //disabled
          className="form-control"
        />
      </label>

      <div className="input-group mb-3">
        <label className="input-group-text">Linguagem</label>
        <select
          name="idlinguagem"
          onChange={eventoTeclado}
          className="form-select"
          id="inputGroupSelect03"
          aria-label="Example select with button addon"
        >
          {vetor.map((obj) => (
            <option key={obj.idLinguagem} value={obj.idLinguagem}>
              {" "}
              {obj.nomeLinguagem}{" "}
            </option>
          ))}
        </select>
        <button className="btn btn-outline-secondary">+</button>
        <span className="input-group-text"></span>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Autor"
          id="nome-autor"
          name="nome"
          onChange={eventoTeclado}
        />
        <button className="btn btn-primary" id="btn-autor">
          Add
        </button>
        <button className="btn btn-danger" id="btn-autor">
          Del
        </button>
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
          %
        </span>
      </div>

      {botao ? (
        <input type="button" value="Cadastrar" className="btn btn-primary" />
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
