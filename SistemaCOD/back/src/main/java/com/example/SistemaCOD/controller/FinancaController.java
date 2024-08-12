package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.Financa;
import com.example.SistemaCOD.repository.FinancaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/financas")
public class FinancaController {
    private FinancaRepository financaRepository;

    public FinancaController(FinancaRepository financaRepository) {
        this.financaRepository = financaRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Financa> listar() {
        return financaRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Financa buscar(@PathVariable Integer id) {
        Optional<Financa> financa = financaRepository.findById(id);
        return financa.get();
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void excluir(@PathVariable Integer id) {
        Optional<Financa> financa = financaRepository.findById(id);
        financaRepository.delete(financa.get());
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvar(@RequestBody Financa financa) {
        financaRepository.save(financa);
    }
}
