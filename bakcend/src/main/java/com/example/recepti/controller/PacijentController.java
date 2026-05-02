package com.example.recepti.controller;

import com.example.recepti.entity.Pacijent;
import com.example.recepti.service.PacijentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pacijenti")
@CrossOrigin(origins = "http://localhost:5173")

public class PacijentController {

    private final PacijentService pacijentService;

    public PacijentController(PacijentService pacijentService) {
        this.pacijentService = pacijentService;
    }

    @GetMapping
    public List<Pacijent> getAllPacijenti() {
        return pacijentService.getAllPacijenti();
    }

    @GetMapping("/{id}")
    public Pacijent getPacijentById(@PathVariable Long id) {
        return pacijentService.getPacijentById(id)
                .orElseThrow(() -> new com.example.recepti.exception.ResourceNotFoundException("Pacijent nije pronađen"));
    }

    @PostMapping
    public Pacijent createPacijent(@RequestBody Pacijent pacijent) {
        return pacijentService.savePacijent(pacijent);
    }

    @PutMapping("/{id}")
    public Pacijent updatePacijent(@PathVariable Long id, @RequestBody Pacijent pacijent) {
        return pacijentService.updatePacijent(id, pacijent);
    }

    @DeleteMapping("/{id}")
    public void deletePacijent(@PathVariable Long id) {
        pacijentService.deletePacijent(id);
    }
}