package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Financa;
import com.example.SistemaCOD.model.Usuario;
import com.example.SistemaCOD.repository.UsuarioRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {
    private UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Usuario buscar(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.get();
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void excluir(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        usuarioRepository.delete(usuario.get());
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvar(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
    }
}
