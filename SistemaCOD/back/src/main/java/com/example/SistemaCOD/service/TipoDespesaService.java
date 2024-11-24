package com.example.SistemaCOD.service;

import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.DespesaLimiteChartDTO;
import com.example.SistemaCOD.model.DespesaSomaChartDTO;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.DespesaRepository;
import com.example.SistemaCOD.repository.TipoDespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TipoDespesaService {

    @Autowired
    public TipoDespesaRepository tipoDespesaRepository;

    @Autowired
    public DespesaRepository despesaRepository;

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

    public List<Map<String, Object>> chartTipoDespesaSoma(Long idUsuario) {
        List<Map<String, Object>> resultado = new ArrayList<>();

        // Buscar todas as despesas para o idUsuario
        List<Despesa> despesas = despesaRepository.findByDespesaPorUsuarioId(idUsuario);

        // Agrupar despesas por tipo
        Map<Long, Double> despesasPorTipo = new HashMap<>();
        Map<Long, Long> despesasIds = new HashMap<>(); // Map para armazenar os IDs das despesas
        for (Despesa despesa : despesas) {
            TipoDespesa tipo = tipoDespesaRepository.findById(despesa.getIdTipoDespesa()).orElse(null);
            if (tipo != null) {
                // Acumulando os valores das despesas
                despesasPorTipo.put(tipo.getId(), despesasPorTipo.getOrDefault(tipo.getId(), 0.0) + despesa.getValor());
                // Guardando o ID da despesa
                despesasIds.put(tipo.getId(), despesa.getId());
            } else {
                System.out.println("Tipo de despesa não encontrado para ID: " + despesa.getIdTipoDespesa());
            }
        }
        for (Map.Entry<Long, Double> entry : despesasPorTipo.entrySet()) {
            TipoDespesa tipo = tipoDespesaRepository.findById(entry.getKey()).orElse(null);
            if (tipo != null) {
                Map<String, Object> tipoDespesaData = new HashMap<>();
                tipoDespesaData.put("tipoDespesa", tipo.getTipoDespesa());
                tipoDespesaData.put("valorTotal", entry.getValue());
                tipoDespesaData.put("limite", tipo.getValorLimite());
                tipoDespesaData.put("idDespesa", despesasIds.get(entry.getKey())); // Adicionando o ID da despesa
                System.out.println("tipoDespesaData (com ID): " + tipoDespesaData); // Verifique no log se o ID está correto
                resultado.add(tipoDespesaData);
            }
        }
        return resultado;
    }
        public List<DespesaLimiteChartDTO> chartTipoDespesaSomaLimitePorMes (Long idUsuario){
            return tipoDespesaRepository.chartTipoDespesaSomaLimitePorMes(idUsuario);
        }

        public List<DespesaSomaChartDTO> chartTipoDespesaSomaMes (Long idUsuario){
            return tipoDespesaRepository.chartTipoDespesaSomaMes(idUsuario);
        }

}
