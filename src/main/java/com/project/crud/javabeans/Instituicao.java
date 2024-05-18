package com.project.crud.javabeans;

import jakarta.persistence.Embeddable;

@Embeddable
public class Instituicao {
	private boolean teveParticipacao;
	private String nomeInstituicao;
	private String cnpjInstituicao;
	private String nitInstituicao;
	
	public boolean isTeveParticipacao() {
		return teveParticipacao;
	}
	public void setTeveParticipacao(boolean teveParticipacao) {
		this.teveParticipacao = teveParticipacao;
	}

	public String getNomeInstituicao() {
		return nomeInstituicao;
	}
	public void setNomeInstituicao(String nomeInstituicao) {
		this.nomeInstituicao = nomeInstituicao;
	}
	public String getCnpjInstituicao() {
		return cnpjInstituicao;
	}
	public void setCnpjInstituicao(String cnpjInstituicao) {
		this.cnpjInstituicao = cnpjInstituicao;
	}
	public String getNitInstituicao() {
		return nitInstituicao;
	}
	public void setNitInstituicao(String nitInstituicao) {
		this.nitInstituicao = nitInstituicao;
	}
	
}
