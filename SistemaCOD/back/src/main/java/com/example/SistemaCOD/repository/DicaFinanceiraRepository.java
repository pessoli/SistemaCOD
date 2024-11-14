package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.DicaFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DicaFinanceiraRepository extends JpaRepository<DicaFinanceira, Long> {

    boolean existsByLinkVideoStartingWith(String link);
}
