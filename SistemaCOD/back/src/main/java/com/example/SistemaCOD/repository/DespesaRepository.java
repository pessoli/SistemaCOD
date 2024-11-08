package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
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
                td
            FROM
                Despesa d
            INNER JOIN
                TipoDespesa td ON td.id = d.idTipoDespesa
            WHERE
                d.idTipoDespesa = :idTipoDespesa
                and td.limite = 'COM_LIMITE'
                and td.ativo = true
            GROUP BY
                td.id, td.tipoDespesa, td.valorLimite
            HAVING
                SUM(d.valor, :valor) > td.valorLimite
        """
    )
    List<TipoDespesa> findTipoDespesaLimiteUltrapassadoComValor(Long idTipoDespesa);
}



