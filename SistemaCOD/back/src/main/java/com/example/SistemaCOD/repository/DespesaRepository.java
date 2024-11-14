package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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

    @Query(
        """
            SELECT
                td
            FROM
                Despesa d
            INNER JOIN
                TipoDespesa td ON td.id = d.idTipoDespesa
            WHERE
                d.idUsuario = :idUsuario
            	and td.limite = 'COM_LIMITE'
            	and td.ativo = true
            GROUP BY
                td.id, td.tipoDespesa, td.valorLimite
            HAVING
                SUM(d.valor) > td.valorLimite
        """
    )
    List<TipoDespesa> findTipoDespesaLimiteUltrapassado(Long idUsuario);

    @Query(
            """
            SELECT
                d,
                td.tipoDespesa
            FROM
                Despesa d
            INNER JOIN
                TipoDespesa td ON td.id = d.idTipoDespesa
            WHERE
                d.idUsuario = :idUsuario
            AND d.data BETWEEN :dataInicio AND :dataFim
            AND (:idTipoDespesa IS NULL OR d.idTipoDespesa IN :idTipoDespesa)
            GROUP BY
                d.id, d.observacao, d.valor, d.data, td.id, td.tipoDespesa, td.valorLimite
            """
    )
    List<Despesa> exportarDespesa(Long idUsuario, LocalDate dataInicio, LocalDate dataFim, List<Long> idTipoDespesa);

}



