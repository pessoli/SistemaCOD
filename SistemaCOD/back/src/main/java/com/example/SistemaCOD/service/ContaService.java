package com.example.SistemaCOD.service;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.PagamentoParcelaHistorico;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.ContaRepository;
import com.example.SistemaCOD.repository.PagamentoParcelaHistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaService {

    @Autowired
    public ContaRepository contaRepository;

    @Autowired
    public PagamentoParcelaHistoricoRepository pagamentoParcelaHistoricoRepository;

    public List<Conta> buscarContaPorUsuarioId(Long idUsuario){
        return contaRepository.findByContaPorUsuarioId(idUsuario);
    }

    public List<PagamentoParcelaHistorico> buscarPagamentoIdConta(Long idConta){
        return pagamentoParcelaHistoricoRepository.findByPagamentoHistoricoIdConta(idConta);
    }

    public Conta buscarPorId(Long idConta){
        return contaRepository.findById(idConta).get();
    }

    public int calculaParcelasRestantes(int totalParcelas, int parcelasPagas) {
        return totalParcelas - parcelasPagas;
    }

    public double calculaValorPago(double valorParcela, int parcelasPagas) {
        return valorParcela * parcelasPagas;
    }

    public double calculaValorRestante(double valorTotal, double valorPago) {
        return valorTotal - valorPago;
    }

    public Conta salvarConta(Conta conta){

        int parcelasRestantes = calculaParcelasRestantes(conta.getTotalParcelas(), conta.getParcelasPagas());

        double valorPago = calculaValorPago(conta.getValorParcela(), conta.getParcelasPagas());

        double valorRestante = calculaValorRestante(conta.getValorTotal(), valorPago);

        conta.setValorPago(valorPago);
        conta.setParcelasRestantes(parcelasRestantes);
        conta.setValorRestante(valorRestante);

        return contaRepository.save(conta);
    }

    public Conta atualizarConta(Conta conta){
        Conta novaConta = this.buscarPorId(conta.getId());

        int parcelasRestantes = calculaParcelasRestantes(conta.getTotalParcelas(), conta.getParcelasPagas());
        double valorPago = calculaValorPago(conta.getValorParcela(), conta.getParcelasPagas());
        double valorRestante = calculaValorRestante(conta.getValorTotal(), valorPago);

        novaConta.setValorPago(valorPago);
        novaConta.setParcelasRestantes(parcelasRestantes);
        novaConta.setValorRestante(valorRestante);
        novaConta.setConta(conta.getConta());
        novaConta.setParcelasPagas(conta.getParcelasPagas());
        novaConta.setTotalParcelas(conta.getTotalParcelas());
        novaConta.setValorParcela(conta.getValorParcela());
        novaConta.setValorTotal(conta.getValorTotal());
        novaConta.setAtivo(conta.isAtivo());

        return contaRepository.save(novaConta);
    }

    public Conta atualizarParcelasPagas(Long idConta) {
        Conta novaConta = this.buscarPorId(idConta);

        int parcelasPagas = novaConta.getParcelasPagas() + 1;
        int parcelasRestantes = calculaParcelasRestantes(novaConta.getTotalParcelas(), parcelasPagas);
        double valorPago = calculaValorPago(novaConta.getValorParcela(), parcelasPagas);
        double valorRestante = calculaValorRestante(novaConta.getValorTotal(), valorPago);

        novaConta.setParcelasRestantes(parcelasRestantes);
        novaConta.setParcelasPagas(parcelasPagas);
        novaConta.setValorRestante(valorRestante);
        novaConta.setValorPago(valorPago);

        return contaRepository.save(novaConta);
    }

    public PagamentoParcelaHistorico salvarMesPagamento(PagamentoParcelaHistorico pagamentoParcelaHistorico) {
        return this.pagamentoParcelaHistoricoRepository.save(pagamentoParcelaHistorico);
    }
}
