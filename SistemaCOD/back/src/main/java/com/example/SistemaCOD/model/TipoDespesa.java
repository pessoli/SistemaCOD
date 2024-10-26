package com.example.SistemaCOD.model;

import com.example.SistemaCOD.enumClass.LimiteStatus;
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
    @Enumerated(EnumType.STRING)  // Armazena como string no banco de dados
    private LimiteStatus limite;

    @Column
    private Long idUsuario;

    @Column
    private boolean ativo;
}
