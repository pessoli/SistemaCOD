package com.example.SistemaCOD.service;

import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.TipoDespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoDespesaService {

    @Autowired
    public TipoDespesaRepository tipoDespesaRepository;

    public List<TipoDespesa> buscarTipoDespesaPorUsuarioId(Long idUsuario){
        return tipoDespesaRepository.findByTipoDespesaPorUsuarioId(idUsuario);
    }

    public TipoDespesa buscarPorId(Long idTipoDespesa){
        return tipoDespesaRepository.findById(idTipoDespesa).get();
    }

    public TipoDespesa salvarTipoDespesa(TipoDespesa tipoDespesa){
        return tipoDespesaRepository.save(tipoDespesa);
    }

    public TipoDespesa atualizarTipoDespesa(TipoDespesa tipoDespesa){
        TipoDespesa novoTipoDespesa = this.buscarPorId(tipoDespesa.getId());

        if (!tipoDespesa.getTipoDespesa().isEmpty()) {
            novoTipoDespesa.setTipoDespesa(tipoDespesa.getTipoDespesa());
        }

        novoTipoDespesa.setValorLimite(tipoDespesa.getValorLimite());
        novoTipoDespesa.setLimite(tipoDespesa.getLimite());
        novoTipoDespesa.setAtivo(tipoDespesa.isAtivo());

        return tipoDespesaRepository.save(novoTipoDespesa);
    }
}
