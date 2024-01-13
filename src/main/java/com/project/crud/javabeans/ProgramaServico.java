package com.project.crud.javabeans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.crud.repository.ProgramaRepository;

@Service
public class ProgramaServico {

	@Autowired
	private ProgramaRepository pr;
	
	
	public Iterable<Programa> listar(){
		return pr.findAll();
	}
}
