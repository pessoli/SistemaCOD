package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.repository.DespesaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@Controller
public class DespesaController {
    private DespesaRepository despesaRepository;

    public DespesaController(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Despesa> listar() {
        return despesaRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Despesa buscar(@PathVariable Integer id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);
        return despesa.get();
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void excluir(@PathVariable Integer id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);
        despesaRepository.delete(despesa.get());
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvar(@RequestBody Despesa despesa) {
        despesaRepository.save(despesa);
    }

}
