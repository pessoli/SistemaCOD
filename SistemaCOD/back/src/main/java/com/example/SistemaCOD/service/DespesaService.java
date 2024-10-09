package com.example.SistemaCOD.service;


import com.example.SistemaCOD.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DespesaService {

    @Autowired
    public DespesaRepository despesaRepository;
}
