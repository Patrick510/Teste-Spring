package com.project.crud.resource;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.crud.javabeans.Linguagem;
import com.project.crud.javabeans.Programa;
import com.project.crud.javabeans.RespostaModelo;
import com.project.crud.repository.LinguagemRepository;
import com.project.crud.repository.ProgramaRepository;

@Service
public class ProgramaService {
	
	@Autowired
	ProgramaRepository repository;
	
	@Autowired
	LinguagemRepository repositoryLang;
	
	public ResponseEntity<Object> salvar(Programa programa) {
		System.out.println("Recebendo dados do frontend: " + programa); // Verificando os dados
		
	    verificarPrograma(programa);

	    if (programa.calcularPorcentagemTotal() > 100){
	    	return ResponseEntity.badRequest().body("A soma das porcentagens dos autores não pode passar de 100%");
	    }
	    
	   Programa programaSalvo = repository.save(programa);
	   return ResponseEntity.status(HttpStatus.CREATED).body("Programa salvo com sucesso. Id: " + programaSalvo.getIdPrograma());
	}

	public ResponseEntity<String> editar(long id, Programa programa){
	    java.util.Optional<Programa> programaExistenteOptional = repository.findById(id);
	    
		if (programaExistenteOptional.isPresent()) {
	    	Programa programaExistente = programaExistenteOptional.get();
	    	if (programaExistente != null){
	    		atualizarProgramaExistente(programaExistente, programa);
	    	} else {
	    		return RespostaModelo.getErrorInexistente();
	    	}
		} else {
			return RespostaModelo.getErrorInexistente();
		}
		
		return RespostaModelo.getOkAlterado();
	}
	
	public ResponseEntity<String> atualizarProgramaExistente(Programa existente, Programa novo) {		
	    existente.setNomePrograma(novo.getNomePrograma());
	    existente.setDataPrograma(novo.getDataPrograma());
	    existente.setTipoPrograma(novo.getTipoPrograma());
	    existente.setCampoAplicacao(novo.getCampoAplicacao());
	    existente.setOriginal(novo.getOriginal());
	    existente.setAutores(novo.getAutores());
		
		repository.save(existente);
		
		List<Linguagem> linguagens = existente.getIdLinguagem();
    	List<String> nomesLinguagens = linguagens.stream().map(Linguagem::getNomeLinguagem).collect(Collectors.toList());
    	return ResponseEntity.ok().body(String.join(", ", nomesLinguagens));
	}
	
	private ResponseEntity<String> verificarPrograma(Programa programa) {
		if(programa.getNomePrograma().isEmpty()) {
			return RespostaModelo.getMsgNomeObrigatorio();
		} else if (programa.getAutores().isEmpty()) {
			return RespostaModelo.getMsgAutoresObrigatorios();
		} else if (programa.getCampoAplicacao().isEmpty()) {
			return RespostaModelo.getMsgCampoObrigatorio();
		} else if (programa.getDataPrograma() == null) {
			return RespostaModelo.getMsgDataObrigatoria();
		} else if (programa.getDataPrograma().isAfter(LocalDate.now())) {
			return RespostaModelo.getMsgDataFutura();
		} else if (programa.getIdLinguagem().isEmpty()) {
			return RespostaModelo.getMsgLinguagemObrigatoria();
		} 
		return RespostaModelo.getOkVerificado();
	}

	public ResponseEntity<String> inserirLang(List<Linguagem> linguagens) {
		if (linguagens == null || linguagens.isEmpty() || linguagens.stream().anyMatch(l -> l.getNomeLinguagem().isEmpty())) {
	        return RespostaModelo.getErroLangVerif();
	    }
	    
	    linguagens.forEach(linguagem -> System.out.println("Nome da linguagem recebida: " + linguagem.getNomeLinguagem()));
	    linguagens.forEach(linguagem -> System.out.println("Id da linguagem recebida: " + linguagem.getIdLinguagem()));
	
	    repositoryLang.saveAll(linguagens);
	
	    return RespostaModelo.getMsgLinguagemSalva();
	}
	
	public ResponseEntity<String> editarLinguagem(long id, Linguagem linguagem) {
		Linguagem linguagemExistente = repositoryLang.findById(id).orElse(null);
		
		if (linguagemExistente != null) {
	        linguagemExistente.setNomeLinguagem(linguagem.getNomeLinguagem());
	        repositoryLang.save(linguagemExistente);
	        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Linguagem editada com sucesso. Novo nome: " + linguagem.getNomeLinguagem());
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Linguagem não encontrada com o ID: " + id);
	    }
	}

    public ResponseEntity<String> deletar(long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().body("Registro deletado com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("Programa não encontrado com o ID: " + id);
        }
    }
    
    public List<Programa> listar() {
        System.out.println("Chamando o método listar()");
        List<Programa> programas = repository.findAll();
        System.out.println("Programas encontrados: " + programas.size());
        return programas;
    }
    
	public List<Linguagem> listarLang(){
		return repositoryLang.findAll();
	}

}



