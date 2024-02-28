package com.project.crud.javabeans;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class RespostaModelo {

	private static final ResponseEntity<String> MSG_NOME_OBRIGATORIO = ResponseEntity.badRequest().body("O nome do programa é obrigadtório");
	private static final ResponseEntity<String> MSG_AUTORES_OBRIGATORIOS = ResponseEntity.badRequest().body("Os dados dos autores são obrigatórios");
	private static final ResponseEntity<String> MSG_DATA_FUTURA = ResponseEntity.badRequest().body("A data do programa não pode ser on futuro");
	private static final ResponseEntity<String> MSG_LINGUAGEM_OBRIGATORIA = ResponseEntity.badRequest().body("É necessário associar pelo menos uma linguagem ao programa");
	private static final ResponseEntity<String> MSG_PORCENTAGEM_LIMITE = ResponseEntity.badRequest().body("A soma das porcentagens dos autores não pode passar de 100%");
	private static final ResponseEntity<String> MSG_DATA_OBRIGATORIA = ResponseEntity.badRequest().body("A data do programa é obrigatória");
	private static final ResponseEntity<String> MSG_CAMPO_APLICACAO_OBRIGATORIO = ResponseEntity.badRequest().body("O campo de aplicação do programa é obrigatória");
	private static final ResponseEntity<String> ERROR_USER_INEXISTENTE = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado");
	private static final ResponseEntity<String> ERROR_LINGUAGEM_VERIFICADA = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A lista de linguagens é inválida");
	
	private static final ResponseEntity<String> MSG_PROGRAMA_SALVO = ResponseEntity.ok().body("Programa salvo com sucesso.");
	private static final ResponseEntity<String> MSG_LINGUAGEM_SALVA = ResponseEntity.ok().body("Linguagens salvas com sucesso.");
	private static final ResponseEntity<String> OK_PROGRAMA_ALTERADO = ResponseEntity.status(HttpStatus.ACCEPTED).body("Programa alterado com sucesso");
	private static final ResponseEntity<String> OK_PROGRAMA_VERIFICADO = ResponseEntity.status(HttpStatus.ACCEPTED).body("Todos os dados presentes.");
	
	
	public static final ResponseEntity<String> getMsgLinguagemSalva(){
		return MSG_LINGUAGEM_SALVA;
	}
	
	public static final ResponseEntity<String> getErroLangVerif(){
		return ERROR_LINGUAGEM_VERIFICADA;
	}
	
	public static final ResponseEntity<String> getOkVerificado(){
		return OK_PROGRAMA_VERIFICADO;
	}
	
	public static final ResponseEntity<String> getOkAlterado(){
		return OK_PROGRAMA_ALTERADO;
	}
	
	public static final ResponseEntity<String> getErrorInexistente(){
		return ERROR_USER_INEXISTENTE;
	}
	
	public static ResponseEntity<String> getMsgCampoObrigatorio(){
		return MSG_CAMPO_APLICACAO_OBRIGATORIO;
	}
	
	public static ResponseEntity<String> getMsgNomeObrigatorio() {
		return MSG_NOME_OBRIGATORIO;
	}
	
	public static ResponseEntity<String> getMsgAutoresObrigatorios() {
		return MSG_AUTORES_OBRIGATORIOS;
	}
	
	public static ResponseEntity<String> getMsgDataFutura() {
		return MSG_DATA_FUTURA;
	}
	
	public static ResponseEntity<String> getMsgLinguagemObrigatoria() {
		return MSG_LINGUAGEM_OBRIGATORIA;
	}
	
	public static ResponseEntity<String> getMsgPorcentagemLimite() {
		return MSG_PORCENTAGEM_LIMITE;
	}
	
	public static ResponseEntity<String> getMsgProgramaSalvoSucesso() {
		return MSG_PROGRAMA_SALVO;
	}
	
	public static ResponseEntity<String> getMsgDataObrigatoria() {
		return MSG_DATA_OBRIGATORIA;
	}
	
}
