package com.example.SistemaCOD.repository;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.PagamentoParcelaHistorico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagamentoParcelaHistoricoRepository extends JpaRepository<PagamentoParcelaHistorico, Long> {

    @Query(
            """
                SELECT p FROM PagamentoParcelaHistorico p
                WHERE p.idConta = :idConta
            """
    )
    List<PagamentoParcelaHistorico> findByPagamentoHistoricoIdConta(Long idConta);
}
