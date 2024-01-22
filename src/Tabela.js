function Tabela({ vetor,}) {
  
  const handleClick = () => {
    // Coloque aqui a lógica que você deseja executar
    alert('Clicou no botão!');
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Data</th>
          <th>Linguagem</th>
          <th>Autores</th>
          <th>AutoresComPorcentagem</th>
          <th>Selecionar</th>
        </tr>
      </thead>

      <tbody>
        {vetor.map((obj, indice) => (
          <tr key={indice}>
            <td>{indice + 1}</td>
            <td>{obj.nomePrograma}</td>
            <td>{obj.dataPrograma}</td>
            <td>
              {obj.idLinguagem
                .map((linguagem) => linguagem.nomeLinguagem)
                .join(", ")}
            </td>
            <td>{obj.autores.map((autor) => autor.nome).join(", ")}</td>
            <td>
              {obj.autores
                .map((autor) => `${autor.nome} - ${autor.porcentagem}%`)
                .join(", ")}
            </td>
            <td>
              <button className="btn btn-success" onClick={handleClick}>Selecionar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabela;
