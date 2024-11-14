package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
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

    @GetMapping("/isTipoDespesaLimiteUltrapassado")
    public ResponseEntity<Boolean> isTipoDespesaLimiteUltrapassado(
            @RequestParam Long idTipoDespesa,
            @RequestParam double valor,
            @RequestParam Long idDespesa
    ) {
        return ResponseEntity.ok(despesaService.isTipoDespesaLimiteUltrapassado(idTipoDespesa, valor, idDespesa));
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

    @GetMapping("/exportarRelatorio")
    public ResponseEntity<ByteArrayResource> exportarRelatorio(
            @RequestParam Long idUsuario,
            @RequestParam boolean geraExcel,
            @RequestParam LocalDate dataInicio,
            @RequestParam LocalDate dataFim,
            @RequestParam Optional<List<Long>> idTipoDespesa
    ) {
        List<Long> tipoDespesa = idTipoDespesa.orElse(null);

        List<Despesa> despesas = despesaService.exportarDespesa(idUsuario, dataInicio, dataFim, tipoDespesa);
        ByteArrayInputStream byteArrayInputStream;

        if (geraExcel) {
            byteArrayInputStream = despesaService.exportarRelatorioXlsx(despesas);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(new ByteArrayResource(byteArrayInputStream.readAllBytes()));
        } else {
            byteArrayInputStream = despesaService.exportarRelatorioPdf(despesas);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new ByteArrayResource(byteArrayInputStream.readAllBytes()));
        }
    }

}
