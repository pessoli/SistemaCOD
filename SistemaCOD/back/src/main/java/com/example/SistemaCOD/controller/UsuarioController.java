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
    public ResponseEntity<Usuario> validaUsuario(@RequestParam String email, @RequestParam String senha) {
        return ResponseEntity.ok(usuarioService.validarUsuarioLogado(email, senha));
    }

    @GetMapping("/login")
    public ResponseEntity<Usuario> login(@RequestParam String email, @RequestParam String senha) {
        Usuario usuario = usuarioService.validarUsuarioLogado(email, senha);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // se nao achar o carai vai retornar 401
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscaUsuarioId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PostMapping()
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {
           return ResponseEntity.ok(usuarioService.salvarUsuario(usuario));
    }

    @PutMapping("/atualizaUsuario")
    public ResponseEntity<Usuario> atualizarUsuario(
            @RequestParam Long id,
            @RequestBody Usuario usuario
    ) {
        return ResponseEntity.ok(usuarioService.atualizarUsuario(id, usuario));
    }
}
