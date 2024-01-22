package com.project.crud.javabeans;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Linguagem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idLinguagem;
	private String nomeLinguagem;
	
	@ManyToMany(mappedBy = "idLinguagem")
	private List<Programa> programas;

	public long getIdLinguagem() {
		return idLinguagem;
	}

	public void setIdLinguagem(long idLinguagem) {
		this.idLinguagem = idLinguagem;
	}

	public String getNomeLinguagem() {
		return nomeLinguagem;
	}
	
	public void setNomeLinguagem(String nomeLinguagem) {
		this.nomeLinguagem = nomeLinguagem;
	}
}
