package com.example.SistemaCOD.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Despesa implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate data;

    @Column
    private Long idTipoDespesa;

    @Column
    private Long idUsuario;

    @Column
    private double valor;

    @Column
    private String observacao;
}
