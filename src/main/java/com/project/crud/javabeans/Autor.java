package com.project.crud.javabeans;
import jakarta.persistence.Embeddable;

@Embeddable
public class Autor {

    private String nome;
    private double porcentagem;
    
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public double getPorcentagem() {
		return porcentagem;
	}
	public void setPorcentagem(double porcentagem) {
		this.porcentagem = porcentagem;
	}

    // getters e setters

    // construtor padrão e construtor com parâmetros
}
