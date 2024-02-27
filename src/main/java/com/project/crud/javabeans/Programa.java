package com.project.crud.javabeans;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    
    @Column(name = "campoAplicacao")
    private String campoAplicacao;
    private String tipoPrograma;
    
    @Column(name = "original")
    private String original;

	@ElementCollection
    @Embedded
    private List<Autor> autores;

    @ManyToMany
    @JoinTable(
        name = "programa_linguagem", 
        joinColumns = @JoinColumn(name = "idPrograma"),
        inverseJoinColumns = @JoinColumn(name = "linguagem_id"))
    private List<Linguagem> idLinguagem;

    public List<Autor> getAutores() {
		return autores;
	}

	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}
	
	public String getOriginal() {
		return original;
	}
	
	public void setOriginal(String original) {
		this.original = original;
	}
	
	public String getCampoAplicacao() {
		return campoAplicacao;
	}

	public void setCampoAplicacao(String campoAplicacao) {
		this.campoAplicacao = campoAplicacao;
	}

	public String getTipoPrograma() {
		return tipoPrograma;
	}

	public void setTipoPrograma(String tipoPrograma) {
		this.tipoPrograma = tipoPrograma;
	}

    public long getIdPrograma() {
    	System.out.println("Id do Programa recebido: "+idPrograma);
		return idPrograma;
	}

	public void setIdPrograma(long idPrograma) {
		this.idPrograma = idPrograma;
	}

	public List<Linguagem> getIdLinguagem() {
		System.out.println("Id da(s) linguagens recebidas: "+idLinguagem);
		return idLinguagem;
	}

	public void setIdLinguagem(List<Linguagem> linguagens) {
		this.idLinguagem = linguagens;
	}
    
    public LocalDate getDataPrograma() {
    	System.out.println("Data do Programa recebido: "+dataPrograma);
    	return dataPrograma;
    }
    
    public void setDataPrograma(LocalDate dataPrograma) {
    	this.dataPrograma = dataPrograma;
    }
    
	public String getNomePrograma() {
		System.out.println("Nome do Programa recebido: "+nomePrograma);
		return nomePrograma;
	}
	
	public void setNomePrograma(String nomePrograma) {
		this.nomePrograma = nomePrograma;
	}
	
	public double calcularPorcentagemTotal() {
		return autores.stream().mapToDouble(Autor::getPorcentagem).sum();
	}
}