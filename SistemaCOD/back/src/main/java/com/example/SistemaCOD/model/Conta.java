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
