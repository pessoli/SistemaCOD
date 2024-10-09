package com.example.SistemaCOD.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TipoDespesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String tipoDespesa;

    @Column
    private double valorLimite;

    @Column
    private boolean temLimite;

    @Column
    private Long idUsuario;

    @Column
    private boolean ativo;
}
