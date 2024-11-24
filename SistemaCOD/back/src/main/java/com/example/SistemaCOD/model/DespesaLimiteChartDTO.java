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

    public String getTipoDespesa() {
        return tipoDespesa;
    }

    public void setTipoDespesa(String tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    public String getMesAno() {
        return mesAno;
    }

    public void setMesAno(String mesAno) {
        this.mesAno = mesAno;
    }

    public double getSomaDespesas() {
        return somaDespesas;
    }

    public void setSomaDespesas(double somaDespesas) {
        this.somaDespesas = somaDespesas;
    }

    public double getLimite() {
        return limite;
    }

    public void setLimite(double limite) {
        this.limite = limite;
    }

    public String getStatusLimite() {
        return statusLimite;
    }

    public void setStatusLimite(String statusLimite) {
        this.statusLimite = statusLimite;
    }
}