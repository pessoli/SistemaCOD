package com.example.SistemaCOD.model;

public  class AtualizarValorRequest {
    private double valor;  // Somente o valor será enviado no corpo da requisição

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
