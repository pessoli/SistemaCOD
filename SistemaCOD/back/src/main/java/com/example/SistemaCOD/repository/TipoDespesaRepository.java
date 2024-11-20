package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.DespesaLimiteChartDTO;
import com.example.SistemaCOD.model.DespesaSomaChartDTO;
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


    @Query(
            """
                SELECT
                    CASE WHEN COALESCE(SUM(d.valor), 0) + :novoValor - COALESCE(dAtual.valor, 0) > td.valorLimite THEN true ELSE false END
                FROM
                    TipoDespesa td
                LEFT JOIN
                    Despesa d ON td.id = d.idTipoDespesa
                              AND d.idTipoDespesa = :idTipoDespesa
                              AND EXTRACT(MONTH FROM d.data) = EXTRACT(MONTH FROM CURRENT_DATE)
                              AND EXTRACT(YEAR FROM d.data) = EXTRACT(YEAR FROM CURRENT_DATE)
                LEFT JOIN
                    Despesa dAtual ON dAtual.id = :idDespesa AND :idDespesa != 0
                WHERE
                    td.id = :idTipoDespesa
                    AND td.limite = 'COM_LIMITE'
                    AND td.ativo = true
                GROUP BY
                    td.id, dAtual.valor
            """
    )
    Boolean isTipoDespesaLimiteUltrapassado(Long idTipoDespesa, double novoValor, Long idDespesa);


    @Query(
            """
                SELECT new com.example.SistemaCOD.model.DespesaLimiteChartDTO(
                    td.tipoDespesa,
                    TO_CHAR(d.data, 'YYYY-MM'),
                    COALESCE(SUM(d.valor), 0),
                    td.valorLimite,
                    CASE
                        WHEN COALESCE(SUM(d.valor), 0) > td.valorLimite THEN 'LIMITE_ULTRAPASSADO'
                        ELSE 'DENTRO_DO_LIMITE'
                    END
                )
                FROM
                    TipoDespesa td
                LEFT JOIN
                    Despesa d
                    ON td.id = d.idTipoDespesa
                    AND d.idUsuario = :idUsuario
                    AND TO_CHAR(d.data, 'YYYY-MM') = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
                WHERE
                    td.idUsuario = :idUsuario
                    AND td.ativo = true
                    AND td.limite = 'COM_LIMITE'
                GROUP BY
                    td.tipoDespesa, td.valorLimite, TO_CHAR(d.data, 'YYYY-MM')
            """
    )
    List<DespesaLimiteChartDTO> chartTipoDespesaSomaLimitePorMes(Long idUsuario);


    @Query(
        """
            SELECT new com.example.SistemaCOD.model.DespesaSomaChartDTO(
                td.tipoDespesa,
                TO_CHAR(d.data, 'YYYY-MM'),
                COALESCE(SUM(d.valor), 0)
            )
            FROM
                TipoDespesa td
            LEFT JOIN
                Despesa d
                ON td.id = d.idTipoDespesa
                AND d.idUsuario = :idUsuario
            WHERE
                td.idUsuario = :idUsuario
                AND td.ativo = true
            GROUP BY
                td.tipoDespesa, TO_CHAR(d.data, 'YYYY-MM')
        """
    )
    List<DespesaSomaChartDTO> chartTipoDespesaSomaMes(Long idUsuario);
}
