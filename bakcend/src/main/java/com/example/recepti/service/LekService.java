package com.example.recepti.service;

import com.example.recepti.entity.Lek;
import com.example.recepti.exception.ResourceNotFoundException;
import com.example.recepti.repository.LekRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LekService {

    private final LekRepository lekRepository;

    public LekService(LekRepository lekRepository) {
        this.lekRepository = lekRepository;
    }

    public List<Lek> getAllLekovi() {
        return lekRepository.findAll();
    }

    public Optional<Lek> getLekById(Long id) {
        return lekRepository.findById(id);
    }

    public Lek saveLek(Lek lek) {
        return lekRepository.save(lek);
    }

    public Lek updateLek(Long id, Lek noviLek) {
        Lek postojeciLek = lekRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lek nije pronađen"));

        postojeciLek.setNaziv(noviLek.getNaziv());
        postojeciLek.setJkl(noviLek.getJkl());
        postojeciLek.setInn(noviLek.getInn());
        postojeciLek.setFarmaceutskiOblik(noviLek.getFarmaceutskiOblik());
        postojeciLek.setDoza(noviLek.getDoza());
        postojeciLek.setDatumIsteka(noviLek.getDatumIsteka());
        postojeciLek.setProizvodjac(noviLek.getProizvodjac());
        postojeciLek.setCena(noviLek.getCena());
        postojeciLek.setSporednaDejstva(noviLek.getSporednaDejstva());
        postojeciLek.setKontraindikacije(noviLek.getKontraindikacije());
        postojeciLek.setMinDoza(noviLek.getMinDoza());
        postojeciLek.setMaxDoza(noviLek.getMaxDoza());
        postojeciLek.setPotrebanRecept(noviLek.getPotrebanRecept());

        return lekRepository.save(postojeciLek);
    }

    public void deleteLek(Long id) {
        lekRepository.deleteById(id);
    }
}