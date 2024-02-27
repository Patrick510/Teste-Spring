package com.project.crud.javabeans;
import jakarta.persistence.Embeddable;

@Embeddable
public class Autor {

    private String nome;
    private double porcentagem;
    private String instituicao;
    
    public String getinstituicao() {
    	return instituicao;
    }
    
    public void setInstituicao(String instituicao) {
    	this.instituicao = instituicao;
    }
    
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
}
