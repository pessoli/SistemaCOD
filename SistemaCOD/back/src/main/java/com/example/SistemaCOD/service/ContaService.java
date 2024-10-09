package com.example.SistemaCOD.service;

import com.example.SistemaCOD.repository.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContaService {

    @Autowired
    public ContaRepository contaRepository;
}
