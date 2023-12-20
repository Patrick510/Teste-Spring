package com.project.crud.javabeans;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Programa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)  
	private long idPrograma;
    private String nomePrograma;
    private LocalDate dataPrograma;
    
    @ElementCollection
    private List<String> nomeAutor;
    
    //@ManyToOne(targetEntity = Linguagem.class)
    //@JoinColumn(name = "idLinguagem")
    //private Linguagem idLinguagem;
    
    @Column(name = "idLinguagem") // Certifique-se de que essa anotação está lá
    private Long idLinguagem;
        
    public long getIdPrograma() {
		return idPrograma;
	}

	public void setIdPrograma(long idPrograma) {
		this.idPrograma = idPrograma;
	}

	public Long getIdLinguagem() {
		return idLinguagem;
	}

	public void setIdLinguagem(Long linguagem) {
		this.idLinguagem = linguagem;
	}

	public List<String> getNomeAutor() {
    	return nomeAutor;
    }
    
    public void setNomeAutor(List<String> nomeAutor) {
    	this.nomeAutor = nomeAutor;
    }
    
    public LocalDate getDataPrograma() {
    	return dataPrograma;
    }
    
    public void setDataPrograma(LocalDate dataPrograma) {
    	this.dataPrograma = dataPrograma;
    }
    
	public String getNomePrograma() {
		return nomePrograma;
	}
	public void setNomePrograma(String nomePrograma) {
		this.nomePrograma = nomePrograma;
	}
}