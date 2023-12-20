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

@RestController
@RequestMapping("/api")
public class ProgramaResource {

	@Autowired
	ProgramaRepository repository;
	
	
	@GetMapping(value = "/msg")
	public String mensagem() {
		
		
		return "Mensagem";
		
	}
	
	@PostMapping(value="/post")
	public String inserir(@RequestBody Programa programa) {
		System.out.println("Nome do Programa recebido: " + programa.getNomePrograma());
		return ""+repository.save(programa);
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
}
