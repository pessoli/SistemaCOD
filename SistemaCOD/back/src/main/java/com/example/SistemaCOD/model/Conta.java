package com.example.SistemaCOD.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
public class Conta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String conta;

    @Column
    private Integer totalParcelas;

    public Integer getParcelasRestantes() {
        return parcelasRestantes;
    }

    public void setParcelasRestantes(Integer parcelasRestantes) {
        this.parcelasRestantes = parcelasRestantes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConta() {
        return conta;
    }

    public void setConta(String conta) {
        this.conta = conta;
    }

    public Integer getTotalParcelas() {
        return totalParcelas;
    }

    public void setTotalParcelas(Integer totalParcelas) {
        this.totalParcelas = totalParcelas;
    }

    public Integer getParcelasPagas() {
        return parcelasPagas;
    }

    public void setParcelasPagas(Integer parcelasPagas) {
        this.parcelasPagas = parcelasPagas;
    }

    public double getValorParcela() {
        return valorParcela;
    }

    public void setValorParcela(double valorParcela) {
        this.valorParcela = valorParcela;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public double getValorRestante() {
        return valorRestante;
    }

    public void setValorRestante(double valorRestante) {
        this.valorRestante = valorRestante;
    }

    public double getValorPago() {
        return valorPago;
    }

    public void setValorPago(double valorPago) {
        this.valorPago = valorPago;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    @Column
    private Integer parcelasRestantes;

    @Column
    private Integer parcelasPagas;

    @Column
    private double valorParcela;

    @Column
    private double valorTotal;

    @Column
    private double valorRestante;

    @Column
    private double valorPago;

    @Column
    private boolean ativo;

    @Column
    private Long idUsuario;
}
