package com.example.SistemaCOD.controller;

import com.example.SistemaCOD.model.Financa;
import com.example.SistemaCOD.model.Reserva;
import com.example.SistemaCOD.repository.ReservaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/reservas")
public class ReservaController {
    private ReservaRepository reservaRepository;

    public ReservaController(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> listar() {
        return reservaRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Reserva buscar(@PathVariable Integer id) {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        return reserva.get();
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void excluir(@PathVariable Integer id) {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        reservaRepository.delete(reserva.get());
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvar(@RequestBody Reserva reserva) {
        reservaRepository.save(reserva);
    }
}
