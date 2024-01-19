function Formulario() {
  return (
    <form>
      <input
        type="text"
        placeholder="Nome do Programa"
        required
        className="form-control"
      />

      <label className="form-check-label" id="create-date">
        {" "}
        <input type="checkbox" className="form-check-input" /> Data de Criação
        <input
          type="date"
          placeholder=""
          required
          disabled
          className="form-control"
        />
      </label>

      <label className="form-check-label">
        {" "}
        <input type="checkbox" className="form-check-input" /> Data de
        Publicação{" "}
        <input type="date" required disabled className="form-control" />
      </label>

      <div className="input-group mb-3">
        <label className="input-group-text">Linguagem</label>
        <select
          className="form-select"
          id="inputGroupSelect03"
          aria-label="Example select with button addon"
        >
          <option selected>#</option>
          <option value="1"> Java </option>
          <option value="2"> Python </option>
          <option value="3"> JavaScript </option>
          <option value="4"> Ruby </option>
          <option value="5"> PHP </option>
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
        />
        <button className="btn btn-primary" id="btn-autor">
          +
        </button>
        <button className="btn btn-danger" id="btn-autor">
          -
        </button>
        <input type="number" className="form-control" required />
        <span className="input-group-text" id="perc-autor">
          %
        </span>
      </div>

      <input type="button" value="enviar" className="btn btn-primary" />
      <br />
    </form>
  );
}

export default Formulario;
