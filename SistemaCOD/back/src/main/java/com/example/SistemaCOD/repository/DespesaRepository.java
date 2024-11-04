package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query(
            """
                SELECT d FROM Despesa d
                WHERE d.idUsuario = :idUsuario
                ORDER BY d.id DESC
            """
    )
    List<Despesa> findByDespesaPorUsuarioId(Long idUsuario);
}
