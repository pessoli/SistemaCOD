package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.TipoDespesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContaRepository extends JpaRepository<Conta,Long>{

    @Query(
            """
                SELECT c FROM Conta c
                WHERE c.idUsuario = :idUsuario
                ORDER BY c.id DESC
            """
    )
    List<Conta> findByContaPorUsuarioId(Long idUsuario);

}
