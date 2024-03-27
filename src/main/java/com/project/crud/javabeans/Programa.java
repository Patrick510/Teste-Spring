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
import java.util.stream.Collectors;

@Entity
@Data
public class Programa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)  
	private long idPrograma;
    private String nomePrograma;
    private LocalDate dataPrograma;
    private String tipoPrograma;
    private boolean derivaDeObraProtegida;
    private String tituloProgramaOriginal;
    

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "programa_id")
    private List<Criptografia> criptografia;

	@Column(name = "campoAplicacao")
    private String campoAplicacao;
    
    @ManyToMany
    @JoinTable(
        name = "programa_linguagem", 
        joinColumns = @JoinColumn(name = "idPrograma"),
        inverseJoinColumns = @JoinColumn(name = "linguagem_id"))
    private List<Linguagem> idLinguagem;
    
    @ElementCollection
    @Embedded
    private List<Autor> autores;

    public List<Autor> getAutores() {
		return autores;
	}

	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}
	
	public boolean isDerivaDeObraProtegida() {
		return derivaDeObraProtegida;
	}

	public void setDerivaDeObraProtegida(boolean derivaDeObraProtegida) {
		this.derivaDeObraProtegida = derivaDeObraProtegida;
	}

	public String getTituloProgramaOriginal() {
		return tituloProgramaOriginal;
	}

	public void setTituloProgramaOriginal(String tituloProgramaOriginal) {
		this.tituloProgramaOriginal = tituloProgramaOriginal;
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
		return idLinguagem;
	}

	public void setIdLinguagem(List<Linguagem> idLinguagem) {
		this.idLinguagem = idLinguagem;
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
	
	public List<Criptografia> getCriptografia() {
		return criptografia;
	}

	public void setCriptografia(List<Criptografia> criptografia) {
		this.criptografia = criptografia;
	}

	public double calcularPorcentagemTotal() {
		return autores.stream().mapToDouble(Autor::getPorcentagem).sum();
	}
	
	public String langList(Programa programa) {
		List<String> nomesLinguagens = programa.getIdLinguagem().stream().map(Linguagem::getNomeLinguagem).collect(Collectors.toList());
		String lista = String.join(", ", nomesLinguagens);
		return lista;
	}
	
	public String criptografias(Programa programa) {
		List<String> criptografias = programa.getCriptografia().stream().map(Criptografia::getAlgoritmoCriptografia).collect(Collectors.toList());
		String lista = String.join(",", criptografias);
		return lista;
	}
	
	public String verificaDerivadoSim(boolean deriva) {
		if (deriva != false) {
			return "(x) Sim";
		} else  {
			return "( ) Sim";
		}
	}
	
	public String verificaDerivadoNao(boolean deriva) {
		if (deriva == false) {
			return "(x) Não";
		} else  {
			return "( ) Não";
		}
	}
	
	public Integer numeroAutores(Programa programa) {
		List<String> nomesAutores = programa.getAutores().stream().map(Autor::getNome).collect(Collectors.toList());
		Integer numeroAutores = nomesAutores.size();
		if (nomesAutores.size() != 0){
			return numeroAutores;
		} else {
			return null;
		}
	}
	
	public String listarAutores(Programa programa) {
	    StringBuilder builder = new StringBuilder();
	    for (Autor autor : programa.getAutores()) {
	        builder.append("Nome: ").append(autor.getNome()).append("\n");
	        builder.append("CPF: ").append(autor.getCpf()).append("\n");
	        builder.append("Instituição: ").append(autor.getInstituicao()).append("\n");
	        builder.append("\n");
	    }
	    return builder.toString();
	}
	
    public String formatarCEP(Integer cep) {
        if (cep != null && String.valueOf(cep).length() == 8) {
            return "CEP: " + cep.toString().substring(0, 5) + "-" + cep.toString().substring(5);
        } else {
            return "CEP inválido";
        }
    }
    
    public String formatarUf(String uf) {
        return "UF: "+uf;           
    }

    public String formatarNumero(Integer numero) {
        return "n°: " + String.valueOf(numero);
    }

    public String formatarCelular(String celular) {
        return "Celular: " + celular;
    }
    
    public String formatVinculo(String programa) {
    	if("estudante".equals(programa)) {
    		return "( ) servidor  (x) estudante ( ) outros:_______________ ";
    	} else if ("servidor".equals(programa)) {
    		return "(x) servidor  ( ) estudante ( ) outros:_______________ ";
    	} else {
    		return "( ) servidor  ( ) estudante (x) outros: "+programa;
    	}
    }
	
}