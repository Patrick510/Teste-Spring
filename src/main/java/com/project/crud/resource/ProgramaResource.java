package com.project.crud.resource;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.project.crud.javabeans.Linguagem;
import com.project.crud.javabeans.Programa;

@RestController
@RequestMapping("/api")
public class ProgramaResource {

	@Autowired
	ProgramaRepository repository;
	
	@Autowired
	LinguagemRepository repositoryLang;
	
	
	@GetMapping(value = "/msg")
	public String mensagem() {
		return "Mensagem Entrou";
	}
	
	
	@PostMapping(value="/post")
	public String inserir(@RequestBody Programa programa) {	    	    
	    Programa programaExistente = repository.findById(programa.getIdPrograma()).orElse(null);

	    if (programaExistente != null) {
	        List<Linguagem> linguagens = programaExistente.getIdLinguagem();
	        List<String> nomesLinguagens = linguagens.stream().map(Linguagem::getNomeLinguagem).collect(Collectors.toList());
	        return String.join(", ", nomesLinguagens);
	    } else {
	        Programa programaSalvo = repository.save(programa);
	        return "Programa salvo com sucesso. Id: " + programaSalvo.getIdPrograma();
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
    
    @PutMapping(value = "/editarNomePrograma/{id}")
    public String editarNomePrograma(@PathVariable long id, @RequestBody Map<String, Object> novosDados) {
        Programa programaExistente = repository.findById(id).orElse(null);

        if (programaExistente != null) {
            if (novosDados.containsKey("nomePrograma")) {
                programaExistente.setNomePrograma((String) novosDados.get("nomePrograma"));
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + programaExistente.getNomePrograma();
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }
    
    @PutMapping(value = "/editarDataPrograma/{id}")
    public String editarDataPrograma(@PathVariable long id, @RequestBody Map<String, Object> novosDados) {
        Programa programaExistente = repository.findById(id).orElse(null);

        if (programaExistente != null) {
            if (novosDados.containsKey("dataPrograma")) {
                programaExistente.setDataPrograma(LocalDate.parse((CharSequence) novosDados.get("dataPrograma")));
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + programaExistente.getDataPrograma();
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }
    
    @PutMapping(value = "/editarAutorPrograma/{id}")
    public String editarAutorPrograma(@PathVariable long id, @RequestBody Map<String, Object> novosDados) {
        Programa programaExistente = repository.findById(id).orElse(null);

        if (programaExistente != null) {
            if (novosDados.containsKey("nomeAutor")) {
                programaExistente.setNomeAutor((List<String>) novosDados.get("nomeAutor"));
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + programaExistente.getNomeAutor();
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }
    
    /*
    Essa função não funcionou infelizmente, pedir ajuda pro márcio
   */
    @PutMapping(value = "/editarLinguagemPrograma/{id}")
    public String editarLangPrograma(@PathVariable long id, @RequestBody Map<String, Object> novosDados) {
        Programa programaExistente = repository.findById(id).orElse(null);

        if (programaExistente != null) {
            if (novosDados.containsKey("idLinguagem")) {
            	programaExistente.setIdLinguagem((List<Linguagem>) novosDados.get("idLinguagem"));
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + programaExistente.toString();
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }
	
	@GetMapping(value="/listar")
    public List<Programa> listar() {
		return repository.findAll();	
	}
	
	@DeleteMapping(value="/delete/{id}")
	public String deletar(@PathVariable long id) {
	    repository.deleteById(id);
	    return "Registro deletado com sucesso.";
	}
	
	@PostMapping(value="/postlang")
	public String inserirLang(@RequestBody List<Linguagem> linguagens) {
	    linguagens.forEach(linguagem -> System.out.println("Nome da linguagem recebida: " + linguagem.getNomeLinguagem()));
	    linguagens.forEach(linguagem -> System.out.println("Id da linguagem recebida: " + linguagem.getIdLinguagem()));
	    repositoryLang.saveAll(linguagens);
	    return "Linguagens salvas com sucesso";
	}
	
	@GetMapping(value="/listarlang")
	public List<Linguagem> listarLang(){
		return repositoryLang.findAll();
	}

}
