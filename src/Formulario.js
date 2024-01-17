function Formulario() {
  return (
    <form>
      <label> Nome do Programa: </label>
      <input type="text" placeholder="Nome do Programa" required />
      <br />

      <br />
      <label>
        {" "}
        <input type="checkbox" /> Data de Criação
      </label>
      <input type="date" placeholder="" required disabled />
      <br />

      <label>
        {" "}
        <input type="checkbox" /> Data de Publicação{" "}
      </label>
      <input type="date" placeholder="" required disabled />

      <br />
      <br />
      <div>
        <label> Linguagem: </label>
        <select>
          <option> Java </option>
          <option> Python </option>
          <option> JavaScript </option>
          <option> Ruby </option>
          <option> PHP </option>
        </select>
        <textarea rows="4" disabled></textarea>
      </div>
      <br />

      <label> Autor ou Autores: </label>
      <input type="button" value="+" />
      <input type="text" placeholder="Nome" required />
      <label> % </label>
      <input type="number" />

      <br />
      <br />
      <input type="button" value="enviar" />
      <br />
    </form>
  );
}

export default Formulario;
