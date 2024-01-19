import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App() {
  //Objeto programa
  const programa = {
    nomeProg: "",
    data: "",
    idlinguagem: [],
    autor: [{ nome: "", porcentagem: 0 }],
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
        autor: [{ nome: e.target.value, porcentagem: 0 }],
      }));
    } else if (e.target.name === "porcentagem") {
      setObjPrograma((prevPrograma) => {
        const updatedAutores = prevPrograma.autor.map((autor) => ({
          ...autor,
          porcentagem: e.target.value,
        }));
        return { ...prevPrograma, autor: updatedAutores };
      });
    } else {
      setObjPrograma({ ...objPrograma, [e.target.name]: e.target.value });
    }
    console.log(e.target.value);
  };

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:1000/api/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProgramas(retorno_convertido));
  }, []);

  useEffect(() => {
    fetch("http://localhost:1000/api/listarlang")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setLinguagem(retorno_convertido));
  });

  //Teste de listagem dos programas, <p>{JSON.stringify(programas)}</p>

  // Retorno
  return (
    <div>
      <p>{JSON.stringify(objPrograma)}</p>
      <Formulario
        botao={btnCadastrar}
        vetor={linguagens}
        eventoTeclado={aoDigitar}
      />
      <Tabela vetor={programas} />
    </div>
  );
}

export default App;
