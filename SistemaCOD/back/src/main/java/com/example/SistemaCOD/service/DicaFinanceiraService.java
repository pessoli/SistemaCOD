package com.example.SistemaCOD.service;

import com.example.SistemaCOD.model.DicaFinanceira;
import com.example.SistemaCOD.repository.DicaFinanceiraRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class DicaFinanceiraService {

    @Autowired
    public DicaFinanceiraRepository dicaFinanceiraRepository;

    public List<DicaFinanceira> buscarTodos() {
        return dicaFinanceiraRepository.findAll();
    }

    public DicaFinanceira buscaDicaPorId(Long id) {
        return this.dicaFinanceiraRepository.findById(id).orElseThrow();
    }


    public DicaFinanceira salvarDicaFinanceiraComImagem(DicaFinanceira dicaFinanceira, MultipartFile imagem) throws IOException {
        // Configura os atributos da dica financeira
        DicaFinanceira dica = new DicaFinanceira();
        dica.setTitulo(dicaFinanceira.getTitulo());
        dica.setLinkVideo(dicaFinanceira.getLinkVideo());
        dica.setAtivo(dicaFinanceira.isAtivo());

        // Converte a imagem recebida para bytes
        dica.setImagem(imagem.getBytes());

        // Salva no banco de dados
        return dicaFinanceiraRepository.save(dica);
    }

    public Boolean verificarDicaExistente(String link) {
        String linkTruncado = link.length() > 44 ? link.substring(0, 44) : link;
        return dicaFinanceiraRepository.existsByLinkVideoStartingWith(linkTruncado);
    }
}
