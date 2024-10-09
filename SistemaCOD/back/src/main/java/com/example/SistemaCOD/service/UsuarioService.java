package com.example.SistemaCOD.service;


import com.example.SistemaCOD.model.Usuario;
import com.example.SistemaCOD.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;


    public boolean validarUsuarioLogado(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha).isAtivo();
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }


}
