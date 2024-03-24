package com.project.crud.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.crud.javabeans.Programa;

import org.thymeleaf.context.Context;

@Service
public class dataMapper {
	
	public Context setData(Programa programa) {
		
		Context context = new Context();
		
		Map<String, Object> data = new HashMap<>();
		
		data.put("programas", programa);
		
		context.setVariables(data);
		
		return context;
	}
}
