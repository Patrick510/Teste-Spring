import { useState } from "react";
import "./FormStage3.css";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const FormStage3 = ({ previousStage, nextStage, qtdAutor, setModal }) => {
  const [autores, setAutores] = useState(
    Array.from({ length: qtdAutor }, () => ({
      nome: "",
      porcentagem: "",
      instituicao: "",
    }))
  );

  const atualzarAutor = (indice, campo, valor) => {
    const novosAutores = [...autores];
    novosAutores[indice] = { ...novosAutores[indice], [campo]: valor };
    setAutores(novosAutores);
  };

  const isFormatValid = () => {
    let totalPorcentagem = 0;
    autores.forEach((autor) => {
      totalPorcentagem += parseFloat(autor.porcentagem) || 0;
      const isPorcentagemValida = totalPorcentagem > 100;
      if (
        autor.nome.trim() === "" ||
        autor.porcentagem.trim() === "" ||
        autor.instituicao.trim() === "" ||
        isPorcentagemValida === false
      ) {
        return true;
      }
    });
    return false;
  };

  console.log(autores);
  return (
    <div className="content-stage-3 container-fluid">
      <div className="section1-3">
        <Table className="table-bordered">
          <thead>
            <tr id="thead">
              <th>Nome</th>
              <th>%</th>
              <th>Instituição</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor, id) => (
              <tr key={id}>
                <td className="p-1">
                  <input
                    type="text"
                    className="form-control"
                    value={autor.nome}
                    onChange={(e) => atualzarAutor(id, "nome", e.target.value)}
                  />
                </td>
                <td className="p-1 w-25" id="porcentagem">
                  <input
                    type="number"
                    className="form-control"
                    value={autor.porcentagem}
                    onChange={(e) =>
                      atualzarAutor(id, "porcentagem", e.target.value)
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="text"
                    className="form-control"
                    value={autor.instituicao}
                    onChange={(e) =>
                      atualzarAutor(id, "instituicao", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="btnStage d-flex justify-content-between">
        <button
          type="button"
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={previousStage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
          Voltar
        </button>
        <button
          type="button"
          className="btn-stage btn btn-outline-success d-flex align-items-center gap-2 p-2"
          onClick={() => {
            if (isFormatValid()) {
              nextStage();
            } else {
              setModal(true);
            }
          }}
        >
          Próximo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

FormStage3.propTypes = {
  previousStage: PropTypes.func.isRequired,
  nextStage: PropTypes.func.isRequired,
  qtdAutor: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default FormStage3;
