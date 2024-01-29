import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App() {
  //Objeto programa
  const programa = {
    idPrograma: 0,
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
      setObjPrograma((prevPrograma) => ({
        ...prevPrograma,
        autores: [
          ...prevPrograma.autores,
          { nome: e.target.value, porcentagem: 0 },
        ],
      }));
    } else if (e.target.name === "porcentagem") {
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
      const selectedLanguage = linguagens.find(
        (lang) => lang.idLinguagem === parseInt(e.target.value, 10)
      );
      if (selectedLanguage) {
        setObjPrograma((prevPrograma) => ({
          ...prevPrograma,
          idLinguagem: [...prevPrograma.idLinguagem, selectedLanguage],
        }));
      }
    } else {
      // Certifique-se de não adicionar inadvertidamente o atributo "programas"
      setObjPrograma((prevPrograma) => ({
        ...objPrograma, // Usar o "objPrograma" ao invés de "prevPrograma" aqui
        [e.target.name]: e.target.value
      }));
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

  // Cadastro e alterar
  const cadastrar = (e) => {
    e.preventDefault();
  
    // Verifica se há linguagens selecionadas
    if (objPrograma.idLinguagem.length === 0) {
      alert("Selecione pelo menos uma linguagem antes de cadastrar.");
      return;
    }
  
    fetch("http://localhost:1000/api/save&edit", {
      method: "post",
      body: JSON.stringify(objPrograma),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.text())
      .then((textoResposta) => {
        console.log(textoResposta);
  
        // Tenta converter o texto para JSON
        try {
          const respostaJSON = JSON.parse(textoResposta);
  
          // Se a conversão for bem-sucedida, continua com o processamento
          console.log(respostaJSON);
          alert("Programa inserido com sucesso!");
          setProgramas((prevProgramas) => [...prevProgramas, respostaJSON]);
          limparformulario();
        } catch (erro) {
          // Se o erro for SyntaxError, atualiza o formulário e a página
          if (erro instanceof SyntaxError) {
            console.error("Erro ao processar a resposta:", erro);
            alert("Programa inserido com sucesso!");
            limparformulario();
            buscarProgramasELinguagens();
          } else {
            // Se houver um erro diferente, exibe mensagem de erro padrão
            console.error("Erro ao processar a resposta:", erro);
            alert("Erro ao processar a resposta da API. Verifique o console para mais detalhes.");
            window.location.reload();
          }
        }
      })
      .catch((erro) => {
        alert("Não foi possível fazer o cadastro. Verifique o console para mais detalhes.");
        console.error("Erro ao inserir:", erro);
        limparformulario();
      });
  };

  const buscarProgramasELinguagens = () => {
    fetch("http://localhost:1000/api/listar", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProgramas(retorno_convertido));

    fetch("http://localhost:1000/api/listarlang", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setLinguagem(retorno_convertido));
  };

  useEffect(() => {
    buscarProgramasELinguagens();
  }, []);
  
  const limparformulario = () => {
    setObjPrograma(programa);
  }

  // Selecionar Programa

  const selecionarPrograma = (indice) => {
    setObjPrograma(programas[indice]);
    setBtnCadastrar(false);
  }

  const cancelarSelecao = () => {
    limparformulario();
    buscarProgramasELinguagens();
    setBtnCadastrar(true)
  }

  // Remover produto
  const removerPrograma = () => {
    fetch("http://localhost:1000/api/delete/"+objPrograma.idPrograma, {
      method: "delete",
      headers: {
        'Content-type':'application/json',
        'Accept': "application/json",
      },
    })
    .then((retorno) => retorno.text())
      .then((textoResposta) => {
        console.log(textoResposta);
        // Tenta converter o texto para JSON
        try {
          const respostaJSON = JSON.parse(textoResposta);
  
          // Se a conversão for bem-sucedida, continua com o processamento
          console.log(respostaJSON);
          alert("Programa deletado com sucesso!");
          setProgramas((prevProgramas) => [...prevProgramas, respostaJSON]);
          limparformulario();
          buscarProgramasELinguagens();
          cancelarSelecao();
        } catch (erro) {
          // Se o erro for SyntaxError, atualiza o formulário e a página
          if (erro instanceof SyntaxError) {
            console.error("Erro ao processar a resposta:", erro);
            alert("Programa deletado com sucesso!");
            limparformulario();
            buscarProgramasELinguagens();
            cancelarSelecao();
          } else {
            // Se houver um erro diferente, exibe mensagem de erro padrão
            console.error("Erro ao processar a resposta:", erro);
            alert("Erro ao processar a resposta da API. Verifique o console para mais detalhes.");
            window.location.reload();
          }
        }
      })
      .catch((erro) => {
        alert("Não foi possível fazer a exclusão do programa. Verifique o console para mais detalhes.");
        console.error("Erro ao deletar:", erro);
        limparformulario();
        cancelarSelecao()
      });
  }

  //Teste de listagem dos programas, <p>{JSON.stringify(programas)}</p>
  //Teste para ver se esta pegando os dados <p>{JSON.stringify(objPrograma)}</p>

  // Retorno
  return (
    <div>
      <p>{JSON.stringify(objPrograma)}</p>
      <Formulario botao={btnCadastrar}
        vetor={linguagens}
        eventoTeclado={aoDigitar}
        addPrograma={cadastrar}
        objPrograma={objPrograma}
        setObjPrograma={setObjPrograma}
        obj={objPrograma} 
        cancelar={cancelarSelecao} deletar={removerPrograma}/>
      <Tabela vetor={programas} selecionar={selecionarPrograma} />
    </div>
  );
}

export default App;
