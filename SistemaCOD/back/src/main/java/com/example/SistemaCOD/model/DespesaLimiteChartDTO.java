package com.example.SistemaCOD.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DespesaLimiteChartDTO {
    private String tipoDespesa;
    private String mesAno;
    private double somaDespesas;
    private double limite;
    private String statusLimite; // "LIMITE_ULTRAPASSADO" ou "DENTRO_DO_LIMITE"

    public DespesaLimiteChartDTO(String tipoDespesa, String mesAno, double somaDespesas, double limite, String statusLimite) {
        this.tipoDespesa = tipoDespesa;
        this.mesAno = mesAno;
        this.somaDespesas = somaDespesas;
        this.limite = limite;
        this.statusLimite = statusLimite;
    }
}