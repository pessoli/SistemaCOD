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

    public double getValorLimite() {
        return valorLimite;
    }

    public void setValorLimite(double valorLimite) {
        this.valorLimite = valorLimite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoDespesa() {
        return tipoDespesa;
    }

    public void setTipoDespesa(String tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    public LimiteStatus getLimite() {
        return limite;
    }

    public void setLimite(LimiteStatus limite) {
        this.limite = limite;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

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
