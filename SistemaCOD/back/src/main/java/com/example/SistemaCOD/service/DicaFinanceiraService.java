package com.example.SistemaCOD.service;

import com.example.SistemaCOD.repository.DicaFinanceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DicaFinanceiraService {

    @Autowired
    public DicaFinanceiraRepository dicaFinanceiraRepository;


}
