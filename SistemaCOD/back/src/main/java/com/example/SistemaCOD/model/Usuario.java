package com.example.SistemaCOD.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;

@Getter
@Setter
@Entity
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String login;

    @Column
    private String senha;

    @ManyToMany
    @JoinColumn(name = "fk_despesa_id")
    private ArrayList<Despesa> despesa;

    @ManyToMany
    @JoinColumn(name = "fk_financa_id")
    private ArrayList<Financa> financa;

    @ManyToMany
    @JoinColumn(name = "fk_reserva_id")
    private ArrayList<Reserva> reserva;

    @ManyToMany
    @JoinColumn(name = "fk_conta_id")
    private ArrayList<Conta> conta;
}