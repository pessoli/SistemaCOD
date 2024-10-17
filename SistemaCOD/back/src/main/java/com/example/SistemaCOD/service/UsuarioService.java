package com.example.SistemaCOD.service;


import com.example.SistemaCOD.model.Usuario;
import com.example.SistemaCOD.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;


    public boolean validarUsuarioLogado(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmailAndSenha(email, senha);
        return usuario != null && usuario.isAtivo(); // Retorna true se o usuário existe e está ativo
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }


}
