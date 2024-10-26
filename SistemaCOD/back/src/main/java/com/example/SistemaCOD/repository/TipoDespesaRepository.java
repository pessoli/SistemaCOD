package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.TipoDespesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoDespesaRepository extends JpaRepository<TipoDespesa, Long> {

    @Query(
            """
                SELECT tp FROM TipoDespesa tp
                WHERE tp.idUsuario = :idUsuario
                ORDER BY tp.id DESC
            """
    )
    List<TipoDespesa> findByTipoDespesaPorUsuarioId(Long idUsuario);
}
