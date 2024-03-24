package com.project.crud.resource;
	
import java.util.List;
	
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	
import com.project.crud.javabeans.Linguagem;
import com.project.crud.javabeans.Programa;
	
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProgramaResource {

	@Autowired
	private ProgramaService programaService;

	
	@GetMapping(value = "/")
	public String mensagem() {
		return "Mensagem Entrou";
	}
	
	@PostMapping(value = "/save") 	// Teste de Salvar e Editar na mesma função
	public ResponseEntity<Object> salvar(@RequestBody Programa programa) {
		return programaService.salvar(programa);
	}

	@PostMapping(value = "/edit/{id}")
	public ResponseEntity<String> editar(@PathVariable long id, @RequestBody Programa programa){
		return programaService.editar(id, programa);
	}
	
	@PostMapping(value="/postlang")
	public ResponseEntity<String> inserirLang(@RequestBody List<Linguagem> linguagens) {
		return programaService.inserirLang(linguagens);
	}
	
    @PutMapping(value = "/editarLang/{id}")
    public ResponseEntity<String> editarLinguagem(@PathVariable long id, @RequestBody Linguagem linguagem) {
    	return programaService.editarLinguagem(id, linguagem);
    }
    
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deletar(@PathVariable long id) {
    	return programaService.deletar(id);
    }
    
    @GetMapping(value="/listarProgramas")
    public List<Programa> listar() {
    	return programaService.listar();
    }
   
	@GetMapping(value="/listarlang")
	public List<Linguagem> listarLang(){
		return programaService.listarLang();
	}
	
	@GetMapping(value="/gerar-pdf/{id}")
	public ResponseEntity<String> gerarPdf(@PathVariable long id) {
	    Programa programa = programaService.listarPrograma(id);
	    if (programa != null) {
	    	String path = programaService.generatePdf(programa);
		    if (path != null) {
		    	return ResponseEntity.ok().body("PDF gerado com sucesso em: " + path);
		    } else {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o PDF.");
		    }
		    
	    } else {
	    	return ResponseEntity.badRequest().body("Programa não encontrado com o ID: " + id);
	    }
	}
	
	@GetMapping(value="/listarPrograma/{id}")
	public ResponseEntity<Object> obterPrograma(@PathVariable long id){
		Programa programa =  programaService.listarPrograma(id);
		return ResponseEntity.ok(programa);
	}
}
	
