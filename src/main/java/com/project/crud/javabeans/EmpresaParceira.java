package com.project.crud.javabeans;

import jakarta.persistence.Embeddable;

@Embeddable
public class EmpresaParceira {
	
	private String razaoSocial;
	private String cnpjParceira;
	
	private String ruaParceira;
	private String numeroParceira;
	private String bairroParceira;
	private String cidadeParceira;
	private String estadoParceira;
	private String cepParceira;
	
	private String nomeSocio;
	private String nacionalidadeSocio;
	private String estadoCivilSocio;
	private String rgSocio;
	private String orgaoExpedidorSocio; 
	private String cpfSocio;
	private String residAtualSocio;
	
	public String getRazaoSocial() {
		return razaoSocial;
	}
	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}
	public String getCnpjParceira() {
		return cnpjParceira;
	}
	public void setCnpjParceira(String cnpjParceira) {
		this.cnpjParceira = cnpjParceira;
	}
	public String getRuaParceira() {
		return ruaParceira;
	}
	public void setRuaParceira(String ruaParceira) {
		this.ruaParceira = ruaParceira;
	}
	public String getNumeroParceira() {
		return numeroParceira;
	}
	public void setNumeroParceira(String numeroParceira) {
		this.numeroParceira = numeroParceira;
	}
	public String getBairroParceira() {
		return bairroParceira;
	}
	public void setBairroParceira(String bairroParceira) {
		this.bairroParceira = bairroParceira;
	}
	public String getCidadeParceira() {
		return cidadeParceira;
	}
	public void setCidadeParceira(String cidadeParceira) {
		this.cidadeParceira = cidadeParceira;
	}
	public String getEstadoParceira() {
		return estadoParceira;
	}
	public void setEstadoParceira(String estadoParceira) {
		this.estadoParceira = estadoParceira;
	}
	public String getCepParceira() {
		return cepParceira;
	}
	public void setCepParceira(String cepParceira) {
		this.cepParceira = cepParceira;
	}
	public String getNomeSocio() {
		return nomeSocio;
	}
	public void setNomeSocio(String nomeSocio) {
		this.nomeSocio = nomeSocio;
	}
	public String getNacionalidadeSocio() {
		return nacionalidadeSocio;
	}
	public void setNacionalidadeSocio(String nacionalidadeSocio) {
		this.nacionalidadeSocio = nacionalidadeSocio;
	}
	public String getEstadoCivilSocio() {
		return estadoCivilSocio;
	}
	public void setEstadoCivilSocio(String estadoCivilSocio) {
		this.estadoCivilSocio = estadoCivilSocio;
	}
	public String getRgSocio() {
		return rgSocio;
	}
	public void setRgSocio(String rgSocio) {
		this.rgSocio = rgSocio;
	}
	public String getOrgaoExpedidorSocio() {
		return orgaoExpedidorSocio;
	}
	public void setOrgaoExpedidorSocio(String orgaoExpedidorSocio) {
		this.orgaoExpedidorSocio = orgaoExpedidorSocio;
	}
	public String getCpfSocio() {
		return cpfSocio;
	}
	public void setCpfSocio(String cpfSocio) {
		this.cpfSocio = cpfSocio;
	}
	public String getResidAtualSocio() {
		return residAtualSocio;
	}
	public void setResidAtualSocio(String residAtualSocio) {
		this.residAtualSocio = residAtualSocio;
	}
	
	
}
