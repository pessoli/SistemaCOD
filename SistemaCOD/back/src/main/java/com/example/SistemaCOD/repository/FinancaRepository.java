package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Financa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancaRepository extends JpaRepository<Financa,Integer> {
}
