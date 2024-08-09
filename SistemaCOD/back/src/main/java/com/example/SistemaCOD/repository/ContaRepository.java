package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContaRepository extends JpaRepository<Conta,Integer>{

}
