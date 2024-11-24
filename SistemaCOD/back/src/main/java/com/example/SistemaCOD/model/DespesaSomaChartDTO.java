package com.example.SistemaCOD.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DespesaSomaChartDTO {
    private String tipoDespesa;
    private String mesAno;
    private double somaDespesas;

    public DespesaSomaChartDTO(String tipoDespesa, String mesAno, Double somaDespesas) {
        this.tipoDespesa = tipoDespesa;
        this.mesAno = mesAno;
        this.somaDespesas = somaDespesas;
    }
}
