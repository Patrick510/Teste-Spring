import React, { useState } from 'react';

function Formulario({ botao, vetor, eventoTeclado, addPrograma, objPrograma, setObjPrograma, obj, cancelar, deletar }) {
  const [nomeAutor, setNomeAutor] = useState("");
  const [porcentagemAutor, setPorcentagemAutor] = useState(0);

  const adicionarOuRemoverAutor = () => {
    if (nomeAutor.trim() !== "") {
      // Verifica se o autor já existe
      const existentIndex = objPrograma.autores.findIndex((autor) => autor.nome === nomeAutor);
  
      if (existentIndex === -1) {
        // Adiciona o autor se não existir
        setObjPrograma((prevPrograma) => ({
          ...prevPrograma,
          autores: [
            ...prevPrograma.autores,
            { nome: nomeAutor, porcentagem: porcentagemAutor },
          ],
        }));
      }
    }
  
    // Limpa os campos após adicionar autor
    setNomeAutor("");
    setPorcentagemAutor(0);
  };
  
  const removerAutor = (index) => {
    setObjPrograma((prevPrograma) => {
      const novaListaAutores = [...prevPrograma.autores];
      novaListaAutores.splice(index, 1);
      return { ...prevPrograma, autores: novaListaAutores };
    });
  };

  const adicionarOuRemoverLinguagem = (e) => {
    const selectedLanguageId = parseInt(e.target.value, 10);
  
    if (!isNaN(selectedLanguageId)) {
      console.log("Antes da modificação:", objPrograma);
  
      const existentIndex = objPrograma.idLinguagem.findIndex(
        (lang) => lang.idLinguagem === selectedLanguageId
      );
  
      if (existentIndex === -1) {
        // Adiciona a linguagem se não existir
        const selectedLanguage = vetor.find((lang) => lang.idLinguagem === selectedLanguageId);
        if (selectedLanguage) {
          // Remove a propriedade 'programas' do objeto antes de adicioná-lo
          const { programas, ...languageWithoutProgramas } = selectedLanguage;
          console.log("Adicionando linguagem:", languageWithoutProgramas);
          setObjPrograma((prevPrograma) => ({
            ...prevPrograma,
            idLinguagem: [...prevPrograma.idLinguagem, languageWithoutProgramas],
          }));
        }
      } else {
        // Remove a linguagem se já existir
        console.log("Removendo linguagem:", selectedLanguageId);
        setObjPrograma((prevPrograma) => ({
          ...prevPrograma,
          idLinguagem: prevPrograma.idLinguagem.filter((lang) => lang.idLinguagem !== selectedLanguageId),
        }));
      }
  
      console.log("Após a modificação:", objPrograma);
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
    <form noValidate onSubmit={addPrograma}>
      <input type="text" placeholder="Nome do Programa" value={obj.nomePrograma} onChange={eventoTeclado} name="nomePrograma" required
        className="form-control"/>

      <label className="form-check-label">
        {" "}
        Data de Criação ou de Publicação{" "}
        <input type="date" name="dataPrograma" value={obj.dataPrograma} onChange={eventoTeclado}
        className="form-control" required/>
      </label>

      <div className="input-group mb-3" id='linguagens-list'>
        <label className="input-group-text"> Linguagem</label>{" "}
        <select name="idLinguagem" onChange={adicionarOuRemoverLinguagem} className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" required>
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
            <button className="btn btn-danger btn-sm" onClick={() => removerLinguagem(index)} type='button' id="botao-l">
              X </button>
            {index < objPrograma.idLinguagem.length - 1 && " "}
          </li>
        ))}
      </ul>


      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Autor" id="nome-autor" name="nome" 
        onChange={(e) => setNomeAutor(e.target.value)} value={nomeAutor} required />
        <span className="input-group-text" id="perc-autor">{" "}%{" "}</span>
        <input type="number" className="form-control" required name="porcentagem" min="1" max="100" onChange={(e) => setPorcentagemAutor(parseInt(e.target.value, 10))} value={porcentagemAutor}/>

        <button type='button' className="btn btn-primary" id="btn-autor" onClick={adicionarOuRemoverAutor}> + </button>
      </div>

      <div className="input-group mb-3" >
          {objPrograma.autores.map((autor, index) => (
            <span className="input-group-text" id="mostraAutor" key={index}>
              <span className="input-group-text" id="nome"> {autor.nome} </span>
            <span className="input-group-text" id='porcentagem'> {autor.porcentagem}% </span>
              <button type='button'  className="btn btn-danger btn-sm" onClick={() => removerAutor(index)} id="btn-del">
                X </button>
              {index < objPrograma.autores.length - 1 && " "}
            </span>
          ))}
        </div>

      {botao ? (
      <input type="button" value="Cadastrar" onClick={addPrograma} className="btn btn-primary"/>
      ) : (
        <div>
          <input type="button" value="Alterar" onClick={addPrograma} className="btn btn-warning" />
          <input type="button" value="Deletar" onClick={deletar} className="btn btn-danger" />
          <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary" />
        </div>
      )}

      <br />
    </form>
  );
}

export default Formulario;
