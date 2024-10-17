package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Usuario;
import com.example.SistemaCOD.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    public UsuarioService usuarioService;

    @GetMapping("/validaUsuario")
    public boolean validaUsuario(@RequestParam String email, @RequestParam String senha) {
        return usuarioService.validarUsuarioLogado(email, senha);
    }

//    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
//    public Usuario buscar(@PathVariable Integer id) {
//        Optional<Usuario> usuario = usuarioService.findById(id);
//        return usuario.get();
//    }

    @PostMapping()
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {
           return ResponseEntity.ok(usuarioService.salvarUsuario(usuario));
    }
}
