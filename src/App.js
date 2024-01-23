import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App() {
  //Objeto programa
  const programa = {
    nomePrograma: "",
    dataPrograma: "",
    autores: [],
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
       // Adiciona um novo autor com o nome informado
      setObjPrograma((prevPrograma) => ({
        ...prevPrograma,
        autores: [
          ...prevPrograma.autores,
          { nome: e.target.value, porcentagem: 0 },
        ],
      }));
    } else if (e.target.name === "porcentagem") {
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

  const cadastrar = (e) => {
    e.preventDefault(); // Evita a submissão padrão do formulário

    fetch("http://localhost:1000/api/save&edit", {
      method: "post",
      body: JSON.stringify(objPrograma),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
    .then((retorno) => retorno.json())
    .then((retorno_convertido) => {
      alert("Programa cadastrado com sucesso!");

      // Atualiza a lista de programas diretamente no estado do componente
      setProgramas((prevProgramas) => [...prevProgramas, retorno_convertido]);

      // Limpa o formulário após o cadastro
      limparformulario();

      console.log(retorno_convertido);
    })
    .catch((erro) => {
      // Se ocorrer um erro, exibe mensagem de alerta
      alert("Não foi possível fazer o cadastro, falta informação");
      console.error("Erro ao cadastrar:", erro);
      limparformulario();
    });
  };

  const limparformulario = () => {
    setObjPrograma(programa);
  }

  //Teste de listagem dos programas, <p>{JSON.stringify(programas)}</p>
  //Teste para ver se esta pegando os dados <p>{JSON.stringify(objPrograma)}</p>

  // Retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} vetor={linguagens} eventoTeclado={aoDigitar} addPrograma={cadastrar}objPrograma={objPrograma} setObjPrograma={setObjPrograma} obj={objPrograma} />
      <Tabela vetor={programas} />
    </div>
  );
}

export default App;
