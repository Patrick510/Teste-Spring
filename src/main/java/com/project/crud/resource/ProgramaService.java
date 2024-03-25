package com.project.crud.resource;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.project.crud.javabeans.Linguagem;
import com.project.crud.javabeans.Programa;
import com.project.crud.javabeans.RespostaModelo;
import com.project.crud.repository.LinguagemRepository;
import com.project.crud.repository.ProgramaRepository;
import com.project.crud.user.dataMapper;
import com.project.crud.user.documentGenerator;

@Service
public class ProgramaService {
	
	@Autowired
	ProgramaRepository repository;
	
	@Autowired
	LinguagemRepository repositoryLang;
	
	@Autowired
	dataMapper dataMapper;
	
	@Autowired
	private documentGenerator documentGenerator;
	
	@Autowired
    private SpringTemplateEngine templateEngine;
	
    public String generateDocument(Programa programa) {
        LocalDate hoje = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd 'de' MMM 'de' yyyy");
        String dataFormatada = hoje.format(formatter);
        
        String finalHtml = null;
        
        if (programa.getAutores() != null) {
            Context dataContext = dataMapper.setData(programa);
            dataContext.setVariable("dataAtual", dataFormatada); 
            finalHtml = templateEngine.process("template", dataContext);
        }

        return finalHtml;
    }   
    
    public byte[] generatePdf(Programa programa) {
        String html = generateDocument(programa); // Aqui está a modificação
        return documentGenerator.convertHtmlToPdf(html);
    }
	
	public ResponseEntity<Object> salvar(Programa programa) {
	    ResponseEntity<String> validacaoPrograma = verificarPrograma(programa);
	    if (validacaoPrograma.getStatusCode() != HttpStatus.OK) {
	    	System.out.print(validacaoPrograma);
	    }

	    List<Linguagem> linguagensSalvas = new ArrayList<>();
	    for (Linguagem linguagem : programa.getIdLinguagem()) {
	        Linguagem linguagemSalva = repositoryLang.findById(linguagem.getidLinguagem()).orElse(null);
	        if (linguagemSalva == null) {
	            linguagemSalva = repositoryLang.save(linguagem);
	        }
	        linguagensSalvas.add(linguagemSalva);
	    }
	    programa.setIdLinguagem(linguagensSalvas);

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
	    existente.setCriptografia(novo.getCriptografia());
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
	
	public boolean programaExiste(long id) {
		return repository.existsById(id);
	}

	public ResponseEntity<String> inserirLang(List<Linguagem> linguagens) {
		if (linguagens == null || linguagens.isEmpty() || linguagens.stream().anyMatch(l -> l.getNomeLinguagem().isEmpty())) {
	        return RespostaModelo.getErroLangVerif();
	    }
	    
	    linguagens.forEach(linguagem -> System.out.println("Nome da linguagem recebida: " + linguagem.getNomeLinguagem()));
	    linguagens.forEach(linguagem -> System.out.println("Id da linguagem recebida: " + linguagem.getNomeLinguagem()));
	
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
        if (programaExiste(id)) {
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
	
	public Programa listarPrograma(long id) {
		return repository.findById(id).orElse(null);
	}
}