package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.repository.ContaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contas")
public class ContaController {
    private ContaRepository contaRepository;
    public ContaController(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Conta> listar(){
        return contaRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path="/{id}")
    public Conta buscar(@PathVariable Integer id){
        Optional<Conta> conta = contaRepository.findById(id);
        return conta.get();
    }

    @RequestMapping(method = RequestMethod.DELETE, path="/{id}")
    public void excluir(@PathVariable Integer id){
        Optional<Conta> conta = contaRepository.findById(id);
        contaRepository.delete(conta.get());
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvar(@RequestBody Conta conta){
        contaRepository.save(conta);
    }

    @RequestMapping(method = RequestMethod.PUT, path="/{id}")
    public void editar(@RequestBody Conta conta, @PathVariable Integer id){
        Optional<Conta> objConta =  contaRepository.findById(id);
        objConta.get().setId(id);
        objConta.get().setConta(conta.getConta());
        objConta.get().setValorConta(conta.getValorConta());
        contaRepository.save(objConta.get());
    }
}
