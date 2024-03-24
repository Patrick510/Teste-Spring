package com.project.crud.javabeans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Linguagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idLinguagem;
    private String nomeLinguagem;
    
	@ManyToMany(mappedBy = "idLinguagem")
	private List<Programa> programas;
	
	public long getidLinguagem() {
		return idLinguagem;
	}

	public String getNomeLinguagem() {
		return nomeLinguagem;
	}

	public void setNomeLinguagem(String nomeLinguagem) {
		this.nomeLinguagem = nomeLinguagem;
	}
}
