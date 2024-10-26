package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.service.TipoDespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipo_despesa")
public class TipoDespesaController {

    @Autowired
    public TipoDespesaService tipoDespesaService;

    @GetMapping("busca/{idUsuario}")
    public ResponseEntity<List<TipoDespesa>> buscarTipoDespesaPorUsuarioId(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(tipoDespesaService.buscarTipoDespesaPorUsuarioId(idUsuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoDespesa> buscarTipoDespesaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tipoDespesaService.buscarPorId(id));
    }

    @PostMapping()
    public ResponseEntity<TipoDespesa> salvarTipoDespesa(@RequestBody TipoDespesa tipoDespesa) {
        return ResponseEntity.ok(tipoDespesaService.salvarTipoDespesa(tipoDespesa));
    }

    @PutMapping("/atualizaTipoDespesa")
    public ResponseEntity<TipoDespesa> atualizarTipoDespesa(
            @RequestBody TipoDespesa tipoDespesa
    ) {
        return ResponseEntity.ok(tipoDespesaService.atualizarTipoDespesa(tipoDespesa));
    }
}
