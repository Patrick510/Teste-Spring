package com.project.crud.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.crud.javabeans.Linguagem;

public interface LinguagemRepository extends JpaRepository<Linguagem, Long> {
    List<Linguagem> saveAll(Iterable<Linguagem> linguagens);
}
