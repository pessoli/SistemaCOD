package com.example.SistemaCOD.service;

import com.example.SistemaCOD.repository.TipoDespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoDespesaService {

    @Autowired
    public TipoDespesaRepository tipoDespesaRepository;
}
