package com.project.crud.javabeans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Criptografia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String algoritmoCriptografia;
	
	@ManyToOne
	@JoinColumn(name = "programa_id")
	private Programa programa;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAlgoritmoCriptografia() {
		return algoritmoCriptografia;
	}

	public void setAlgoritmoCriptografia(String algoritmoCriptografia) {
		this.algoritmoCriptografia = algoritmoCriptografia;
	}

	public Programa getPrograma() {
		return programa;
	}

	public void setPrograma(Programa programa) {
		this.programa = programa;
	}
	
	
}
