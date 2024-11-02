package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.PagamentoParcelaHistorico;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.ContaRepository;
import com.example.SistemaCOD.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @GetMapping("busca/{idUsuario}")
    public ResponseEntity<List<Conta>> buscarContaPorUsuarioId(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(contaService.buscarContaPorUsuarioId(idUsuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conta> buscarContaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(contaService.buscarPorId(id));
    }

    @PostMapping()
    public ResponseEntity<Conta> salvarConta(@RequestBody Conta conta) {
        return ResponseEntity.ok(contaService.salvarConta(conta));
    }

    @PutMapping("/atualizaConta")
    public ResponseEntity<Conta> atualizarConta(
            @RequestBody Conta conta
    ) {
        return ResponseEntity.ok(contaService.atualizarConta(conta));
    }

    @PostMapping("/mesPagamentoParcela")
    public ResponseEntity<PagamentoParcelaHistorico> mesPagamentoParcela(
            @RequestBody PagamentoParcelaHistorico pagamentoParcelaHistorico
    ) {
        return ResponseEntity.ok(contaService.salvarMesPagamento(pagamentoParcelaHistorico));
    }

    @GetMapping("/buscaPagamento")
    public ResponseEntity<List<PagamentoParcelaHistorico>> buscarPagamentoParcela(@RequestParam Long idConta) {
        return ResponseEntity.ok(contaService.buscarPagamentoIdConta(idConta));
    }

    @PutMapping("/atualizaParcelasConta")
    public ResponseEntity<Conta> atualizarParcelasConta(
            @RequestParam Long idConta
    ) {
        return ResponseEntity.ok(contaService.atualizarParcelasPagas(idConta));
    }
}
