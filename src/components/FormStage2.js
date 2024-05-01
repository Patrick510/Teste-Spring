const Stage2 = ({ previousStage, nextStage }) => {
  return (
    <div>
      Stage2
      <button type="button" onClick={previousStage}>
        Voltar
      </button>
      <button type="button" onClick={nextStage}>
        Próximo
      </button>
    </div>
  );
};

export default Stage2;
