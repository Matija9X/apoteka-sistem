package com.example.recepti.controller;

import com.example.recepti.dto.KreirajReceptRequest;
import com.example.recepti.entity.Recept;
import com.example.recepti.service.ReceptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recepti")
@CrossOrigin(origins = "http://localhost:5173")

public class ReceptController {

    private final ReceptService receptService;

    public ReceptController(ReceptService receptService) {
        this.receptService = receptService;
    }

    @PostMapping
    public Recept kreirajRecept(@RequestBody KreirajReceptRequest request) {
        return receptService.kreirajRecept(request);
    }

    @GetMapping
    public List<Recept> getAllRecepti() {
        return receptService.getAllRecepti();
    }

    @GetMapping("/{id}")
    public Recept getReceptById(@PathVariable Long id) {
        return receptService.getReceptById(id)
                .orElseThrow(() -> new com.example.recepti.exception.ResourceNotFoundException("Recept nije pronađen"));
    }

    @DeleteMapping("/{id}")
    public void deleteRecept(@PathVariable Long id) {
        receptService.deleteRecept(id);
    }

    @PutMapping("/{id}")
    public Recept updateRecept(@PathVariable Long id, @RequestBody KreirajReceptRequest request) {
        return receptService.updateRecept(id, request);
    }
}