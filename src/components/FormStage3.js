const FormStage3 = ({ backStage, nextStage }) => {
  return (
    <div>
      FormStage3
      <button type="button" onClick={backStage}>
        Voltar
      </button>
      <button type="button" onClick={nextStage}>
        Próximo
      </button>
    </div>
  );
};

export default FormStage3;
