package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.DicaFinanceira;
import com.example.SistemaCOD.repository.DicaFinanceiraRepository;
import com.example.SistemaCOD.service.DicaFinanceiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/dica_financeira")
public class DicaFinanceiraController {

    @Autowired
    private DicaFinanceiraService dicaFinanceiraService;

    @GetMapping()
    public ResponseEntity<List<DicaFinanceira>> listarDicaFinanceira() {
        return ResponseEntity.ok(dicaFinanceiraService.buscarTodos());
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> verificarDicaExistente(@RequestParam String linkVideo) {
        return ResponseEntity.ok(dicaFinanceiraService.verificarDicaExistente(linkVideo)); // Verifica se a dica já existe
    }

    @PostMapping()
    public ResponseEntity<DicaFinanceira> salvaDicaFinanceira(
            @RequestPart("dicaFinanceira") DicaFinanceira dicaFinanceira,
            @RequestPart("imagem") MultipartFile imagem) {
        try {
            return ResponseEntity.ok(dicaFinanceiraService.salvarDicaFinanceiraComImagem(dicaFinanceira, imagem));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/imagem/{id}")
    public ResponseEntity<byte[]> getImagem(@PathVariable Long id) {
        DicaFinanceira dica = dicaFinanceiraService.buscaDicaPorId(id);
        byte[] imagem = dica.getImagem();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // Defina o tipo da imagem
                .body(imagem);
    }
}
