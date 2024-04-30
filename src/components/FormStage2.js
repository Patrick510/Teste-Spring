const Stage2 = ({ backStage, nextStage }) => {
  return (
    <div>
      Stage2
      <button type="button" onClick={backStage}>
        Voltar
      </button>
      <button type="button" onClick={nextStage}>
        Próximo
      </button>
    </div>
  );
};

export default Stage2;
