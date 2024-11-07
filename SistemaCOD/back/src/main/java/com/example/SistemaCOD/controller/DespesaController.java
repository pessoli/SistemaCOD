package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.DespesaRepository;
import com.example.SistemaCOD.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    @GetMapping("/busca/{idUsuario}")
    public ResponseEntity<List<Despesa>> buscarDespesaPorUsuarioId(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(despesaService.buscarDespesaPorUsuarioId(idUsuario));
    }

    @GetMapping("/tipoDespesaLimiteUltrapassado")
    public ResponseEntity<List<TipoDespesa>> buscaTipoDespesaLimiteUltrapassado(
            @RequestParam Long idUsuario
    ) {
        return ResponseEntity.ok(despesaService.buscarTipoDespesaLimiteUltrapassado(idUsuario));
    }

    @PostMapping()
    public ResponseEntity<Despesa> salvarDespesa(@RequestBody Despesa despesa) {
        return ResponseEntity.ok(despesaService.salvarDespesa(despesa));
    }

    @DeleteMapping()
    public ResponseEntity<Void> excluir(@RequestParam Long id) {
        despesaService.deletarDespesa(id);

        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/atualizaDespesa")
    public ResponseEntity<Despesa> atualizarDespesa(
            @RequestBody Despesa despesa
    ) {
        return ResponseEntity.ok(despesaService.atualizarDespesa(despesa));
    }

}
