package com.example.recepti.controller;

import com.example.recepti.entity.Lek;
import com.example.recepti.service.LekService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lekovi")
@CrossOrigin(origins = "http://localhost:5173")
public class LekController {

    private final LekService lekService;

    public LekController(LekService lekService) {
        this.lekService = lekService;
    }

    @GetMapping
    public List<Lek> getAllLekovi() {
        return lekService.getAllLekovi();
    }

    @GetMapping("/{id}")
    public Lek getLekById(@PathVariable Long id) {
        return lekService.getLekById(id)
                .orElseThrow(() -> new com.example.recepti.exception.ResourceNotFoundException("Lek nije pronađen"));
    }

    @PostMapping
    public Lek createLek(@RequestBody Lek lek) {
        return lekService.saveLek(lek);
    }

    @PutMapping("/{id}")
    public Lek updateLek(@PathVariable Long id, @RequestBody Lek lek) {
        return lekService.updateLek(id, lek);
    }

    @DeleteMapping("/{id}")
    public void deleteLek(@PathVariable Long id) {
        lekService.deleteLek(id);
    }
}