package com.project.crud.javabeans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Linguagem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idLinguagem;
	private String nomeLinguagem;
	
	public String getNomeLinguagem() {
		return nomeLinguagem;
	}
	
	public void setNomeLinguagem(String nomeLinguagem) {
		this.nomeLinguagem = nomeLinguagem;
	}
}
