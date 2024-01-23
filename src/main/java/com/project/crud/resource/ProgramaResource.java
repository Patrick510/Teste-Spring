package com.project.crud.resource;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.crud.repository.ProgramaRepository;
import com.project.crud.repository.LinguagemRepository;
import com.project.crud.javabeans.Autor;
import com.project.crud.javabeans.Linguagem;
import com.project.crud.javabeans.Programa;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProgramaResource {

	@Autowired
	ProgramaRepository repository;
	
	@Autowired
	LinguagemRepository repositoryLang;
	
	@GetMapping(value = "/")
	public String mensagem() {
		return "Mensagem Entrou";
	}

	@PostMapping(value = "/save&edit") 	// Tentando mesclar os métodos de salvar e editar.
	public ResponseEntity<Object> salvar(@RequestBody Programa programa) {
	    if (programa.getNomePrograma().isEmpty()) {
	        System.out.println("O nome do programa é obrigatório");
	        return ResponseEntity.badRequest().body("O nome do programa é obrigatório");
	    } else if (programa.getAutores().isEmpty()) {
	        System.out.println("Os dados dos autores são obrigatórios");
	        return ResponseEntity.badRequest().body("Os dados dos autores são obrigatórios");
	    } else if (programa.getDataPrograma() == null) {
	        System.out.println("A data do programa é obrigatória");
	        return ResponseEntity.badRequest().body("A data do programa é obrigatória");
	    } else if (programa.getDataPrograma().isAfter(LocalDate.now())) {
	        System.out.println("A data do programa não pode ser no futuro");
	        return ResponseEntity.badRequest().body("A data do programa não pode ser no futuro");
	    }

	    // Verifica se o programa já existe pelo ID
	    java.util.Optional<Programa> programaExistenteOptional = repository.findById(programa.getIdPrograma());

	    if (programaExistenteOptional.isPresent()) {
	        // Se existe, atualiza os dados do programa existente
	        Programa programaExistente = programaExistenteOptional.get();
	        programaExistente.setAutores(programa.getAutores());
	        programaExistente.setIdLinguagem(programa.getIdLinguagem());
	        repository.save(programaExistente);

	        List<Linguagem> linguagens = programaExistente.getIdLinguagem();
	        List<String> nomesLinguagens = linguagens.stream().map(Linguagem::getNomeLinguagem).collect(Collectors.toList());
	        return ResponseEntity.ok().body(String.join(", ", nomesLinguagens));
	    } else {
	        // Se não existe, salva um novo programa
	        Programa programaSalvo = repository.save(programa);
	        return ResponseEntity.ok().body("Programa salvo com sucesso. Id: " + programaSalvo.getIdPrograma());
	    }
	}

	
    @PutMapping(value = "/editarLang/{id}")
    public String editarLinguagem(@PathVariable long id, @RequestBody Linguagem linguagem) {
        Linguagem linguagemExistente = repositoryLang.findById(id).orElse(null);

        if (linguagemExistente != null) {
            linguagemExistente.setNomeLinguagem(linguagem.getNomeLinguagem());
            repositoryLang.save(linguagemExistente);
            return "Linguagem editada com sucesso. Novo nome: " + linguagem.getNomeLinguagem();
        } else {
            return "Linguagem não encontrada com o ID: " + id;
        }
    }
    
    @GetMapping(value="/listar")
    public List<Programa> listar() {
        System.out.println("Chamando o método listar()");
        List<Programa> programas = repository.findAll();
        System.out.println("Programas encontrados: " + programas.size());
        return programas;
    }

	
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deletar(@PathVariable long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().body("Registro deletado com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("Programa não encontrado com o ID: " + id);
        }
    }

	
	@PostMapping(value="/postlang")
	public ResponseEntity<String> inserirLang(@RequestBody List<Linguagem> linguagens) {
	    if (linguagens == null || linguagens.isEmpty() || linguagens.stream().anyMatch(l -> l.getNomeLinguagem().isEmpty())) {
	        System.out.println("A lista de linguagens é inválida");
	        return ResponseEntity.badRequest().body("A lista de linguagens é inválida");
	    }
	    
	    linguagens.forEach(linguagem -> System.out.println("Nome da linguagem recebida: " + linguagem.getNomeLinguagem()));
	    linguagens.forEach(linguagem -> System.out.println("Id da linguagem recebida: " + linguagem.getIdLinguagem()));

	    repositoryLang.saveAll(linguagens);

	    return ResponseEntity.ok().body("Linguagens salvas com sucesso");
	}
	
	@GetMapping(value="/listarlang")
	public List<Linguagem> listarLang(){
		return repositoryLang.findAll();
	}

}
