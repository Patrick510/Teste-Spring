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
import com.project.crud.javabeans.Autor;
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
	        programaExistente.setAutores(programa.getAutores());
	        repository.save(programaExistente);

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
            if (novosDados.containsKey("autores")) {
            	List<Map<String, String>> dadosAutores = (List<Map<String, String>>) novosDados.get("autores");
            	List<Autor> autores = dadosAutores.stream()
                        .map(dadosAutor -> {
                            Autor autor = new Autor();
                            autor.setNome(dadosAutor.get("nome"));
                            return autor;
                        })
                        .collect(Collectors.toList());

                    programaExistente.setAutores(autores);
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + novosDados;
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }


    @PutMapping(value = "/editarLinguagemPrograma/{id}")
    public String editarLangPrograma(@PathVariable long id, @RequestBody Map<String, Object> novosDados) {
        Programa programaExistente = repository.findById(id).orElse(null);

        if (programaExistente != null) {
            if (novosDados.containsKey("idLinguagem")) {
            	List<Map<String, Integer>> dadosLinguagens = (List<Map<String, Integer>>) novosDados.get("idLinguagem");
                List<Linguagem> linguagens = dadosLinguagens.stream()
                    .map(dadosLinguagem -> {
                        Linguagem linguagem = new Linguagem();
                        linguagem.setIdLinguagem(dadosLinguagem.get("idLinguagem").longValue());
                        return linguagem;
                    })
                    .collect(Collectors.toList());

                    programaExistente.setIdLinguagem(linguagens);
            }
            repository.save(programaExistente);
            return "Programa editado com sucesso. Novos dados: " + novosDados;
        } else {
            return "Programa não encontrado com o ID: " + id;
        }
    }
	
    
    @GetMapping(value="/listar")
    public List<Programa> listar() {
        System.out.println("Chamando o método listar()");
        List<Programa> programas = repository.findAll();
        System.out.println("Programas encontrados: " + programas.size());
        return programas;
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
