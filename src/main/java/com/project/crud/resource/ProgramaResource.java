package com.project.crud.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.crud.javabeans.Programa;
import com.project.crud.repository.ProgramaRepository;
import com.project.crud.repository.LinguagemRepository;
import com.project.crud.javabeans.Linguagem;

@RestController
@RequestMapping("/api")
public class ProgramaResource {

	@Autowired
	ProgramaRepository repository;
	
	@Autowired
	LinguagemRepository repositoryLang;
	
	
	@GetMapping(value = "/msg")
	public String mensagem() {
		return "Mensagem";
	}
	
	@PostMapping(value="/post")
	public String inserir(@RequestBody Programa programa) {	    
	    System.out.println("Id do programa: " + programa.getIdPrograma());
	    System.out.println("Nome do Programa recebido: " + programa.getNomePrograma());
	    System.out.println("Data de criação ou Publicação: "+ programa.getDataPrograma());
	    System.out.println("Nome dos autores: "+ programa.getNomeAutor());		
	    System.out.println("Id da linguagem usada: "+ programa.getIdLinguagem());
	    return "" + repository.save(programa);
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
