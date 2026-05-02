package com.example.recepti.controller;

import com.example.recepti.entity.Doktor;
import com.example.recepti.service.DoktorService;
import org.springframework.web.bind.annotation.*;
import com.example.recepti.dto.LoginDoktorRequest;
import com.example.recepti.dto.LoginDoktorResponse;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/doktori")
public class DoktorController {

    private final DoktorService doktorService;

    public DoktorController(DoktorService doktorService) {
        this.doktorService = doktorService;
    }

    @GetMapping
    public List<Doktor> getAllDoktori() {
        return doktorService.getAllDoktori();
    }

    @GetMapping("/{id}")
    public Doktor getDoktorById(@PathVariable Long id) {
        return doktorService.getDoktorById(id)
                .orElseThrow(() -> new com.example.recepti.exception.ResourceNotFoundException("Doktor nije pronađen"));
    }

    @PostMapping
    public Doktor createDoktor(@RequestBody Doktor doktor) {
        return doktorService.saveDoktor(doktor);
    }

    @PutMapping("/{id}")
    public Doktor updateDoktor(@PathVariable Long id, @RequestBody Doktor doktor) {
        return doktorService.updateDoktor(id, doktor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoktor(@PathVariable Long id) {
        doktorService.deleteDoktor(id);
    }

    @PostMapping("/registracija")
    public Doktor registrujDoktora(@RequestBody Doktor doktor) {
        return doktorService.registrujDoktora(doktor);
    }

    @PostMapping("/login")
    public LoginDoktorResponse loginDoktor(@RequestBody LoginDoktorRequest request) {
        return doktorService.loginDoktor(request);
    }
}