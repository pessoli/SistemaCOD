package com.example.SistemaCOD.service;


import com.example.SistemaCOD.model.Usuario;
import com.example.SistemaCOD.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;


    public Usuario validarUsuarioLogado(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmailAndSenha(email, senha);
        if (usuario != null && usuario.isAtivo()) {
            return usuario;
        }

        return null;
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizarUsuario(Long id, Usuario usuario) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

        if (optionalUsuario.isEmpty()) {
            throw new EntityNotFoundException(STR."Usuário não encontrado com o ID: \{id}");
        }

        Usuario novoUsuario = optionalUsuario.get();

        if (usuario.getNome() != null && !usuario.getNome().isEmpty()) {
            novoUsuario.setNome(usuario.getNome());
        }

        if (usuario.getEmail() != null && !usuario.getEmail().isEmpty()) {
            novoUsuario.setEmail(usuario.getEmail());
        }

        if (usuario.getDataNascimento() != null) {
            novoUsuario.setDataNascimento(usuario.getDataNascimento());
        }

        if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
            novoUsuario.setSenha(usuario.getSenha());
        }

        return usuarioRepository.save(novoUsuario);
    }
}
