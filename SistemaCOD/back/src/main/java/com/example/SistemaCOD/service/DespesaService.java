package com.example.SistemaCOD.service;


import com.example.SistemaCOD.model.Conta;
import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DespesaService {

    @Autowired
    public DespesaRepository despesaRepository;

    public List<Despesa> buscarDespesaPorUsuarioId(Long idUsuario){
        return despesaRepository.findByDespesaPorUsuarioId(idUsuario);
    }

    public Despesa salvarDespesa(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public Despesa atualizarDespesa(Despesa despesa) {
        Despesa novaDespesa = this.despesaRepository.findById(despesa.getId()).get();

        novaDespesa.setObservacao(despesa.getObservacao());
        novaDespesa.setValor(despesa.getValor());
        novaDespesa.setIdTipoDespesa(despesa.getIdTipoDespesa());

        return despesaRepository.save(novaDespesa);
    }

    public void deletarDespesa(Long id) {
        this.despesaRepository.deleteById(id);
    }

    public List<TipoDespesa> buscarTipoDespesaLimiteUltrapassado(Long idUsuario) {
        return this.despesaRepository.findTipoDespesaLimiteUltrapassado(idUsuario);
    }
}
