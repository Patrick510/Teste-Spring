import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App() {
  //Objeto programa
  const programa = {
    nomePrograma: "",
    dataPrograma: "",
    autores: [{ nome: "", porcentagem: 0 }],
    idLinguagem: [],
  };

  //Use state
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [programas, setProgramas] = useState([]);
  const [linguagens, setLinguagem] = useState([]);
  const [objPrograma, setObjPrograma] = useState(programa);

  // Verifica se esta funcionando o event.target -> console.log(e.target);
  //Obtendo os dados do formulario
  const aoDigitar = (e) => {
    if (e.target.name === "nome") {
      setObjPrograma((prevPrograma) => ({
        ...prevPrograma,
        autores: [{ nome: e.target.value, porcentagem: 0 }],
      }));
    } else if (e.target.name === "porcentagem") {
      setObjPrograma((prevPrograma) => {
        const updatedAutores = prevPrograma.autores.map((autor) => ({
          ...autor,
          porcentagem: e.target.value,
        }));
        return { ...prevPrograma, autores: updatedAutores };
      });
    } else if (e.target.name === "idLinguagem") {
      // Adiciona um objeto com o campo "idLinguagem" no array idLinguagem
      const selectedLanguage = linguagens.find(
        (lang) => lang.idLinguagem === parseInt(e.target.value, 10)
      );
      //const selectedLanguageId = parseInt(e.target.value, 10);
      if (selectedLanguage) {
        setObjPrograma((prevPrograma) => ({
          ...prevPrograma,
          idLinguagem: [...prevPrograma.idLinguagem, selectedLanguage],
        }));
      }
    } else if (e.target.name === "autorNome") {
      // Adiciona um novo autor com o nome informado
      setObjPrograma((prevPrograma) => ({
        ...prevPrograma,
        autores: [
          ...prevPrograma.autores,
          { nome: e.target.value, porcentagem: 0 },
        ],
      }));
    } else if (e.target.name === "autorPorcentagem") {
      // Atualiza a porcentagem de um autor específico
      const authorIndex = parseInt(e.target.dataset.authorIndex, 10);
      if (!isNaN(authorIndex)) {
        setObjPrograma((prevPrograma) => {
          const updatedAutores = prevPrograma.autores.map((autor, index) => {
            if (index === authorIndex) {
              return { ...autor, porcentagem: e.target.value };
            }
            return autor;
          });
          return { ...prevPrograma, autores: updatedAutores };
        });
      }
    } else {
      setObjPrograma({ ...objPrograma, [e.target.name]: e.target.value });
    }
  };

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:1000/api/listar", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProgramas(retorno_convertido));
  }, []);

  useEffect(() => {
    fetch("http://localhost:1000/api/listarlang", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setLinguagem(retorno_convertido));
  }, []);

  const cadastrar = () => {
    fetch("http://localhost:1000/api/post", {
      method: "post",
      body: JSON.stringify(objPrograma),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        console.log(retorno_convertido);
      });
  };

  //Teste de listagem dos programas, <p>{JSON.stringify(programas)}</p>
  //Teste para ver se esta pegando os dados <p>{JSON.stringify(objPrograma)}</p>

  // Retorno
  return (
    <div>
      <p>{JSON.stringify(objPrograma)}</p>
      <Formulario
        botao={btnCadastrar}
        vetor={linguagens}
        eventoTeclado={aoDigitar}
        addPrograma={cadastrar}
        objPrograma={objPrograma}
        setObjPrograma={setObjPrograma}
      />
      <Tabela vetor={programas} />
    </div>
  );
}

export default App;
