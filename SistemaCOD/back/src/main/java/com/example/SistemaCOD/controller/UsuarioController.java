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
    public ResponseEntity<String> salvarUsuario(@RequestBody Usuario usuario) {
        try {
            if (this.usuarioService.validarUsuarioLogado(usuario.getEmail(), usuario.getSenha())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Já existe um usuário cadastrado com este email e senha.");
            }

           usuarioService.salvarUsuario(usuario);
           return ResponseEntity.status(HttpStatus.CREATED).body("");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar o usuário: " + e.getMessage());
        }
    }
}
