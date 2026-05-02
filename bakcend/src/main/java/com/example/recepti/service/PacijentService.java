package com.example.recepti.service;

import com.example.recepti.entity.Pacijent;
import com.example.recepti.exception.ResourceNotFoundException;
import com.example.recepti.repository.PacijentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacijentService {

    private final PacijentRepository pacijentRepository;

    public PacijentService(PacijentRepository pacijentRepository) {
        this.pacijentRepository = pacijentRepository;
    }

    public List<Pacijent> getAllPacijenti() {
        return pacijentRepository.findAll();
    }

    public Optional<Pacijent> getPacijentById(Long id) {
        return pacijentRepository.findById(id);
    }

    public Pacijent savePacijent(Pacijent pacijent) {
        return pacijentRepository.save(pacijent);
    }

    public Pacijent updatePacijent(Long id, Pacijent noviPacijent) {
        Pacijent postojeciPacijent = pacijentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pacijent nije pronađen"));

        postojeciPacijent.setIme(noviPacijent.getIme());
        postojeciPacijent.setPrezime(noviPacijent.getPrezime());
        postojeciPacijent.setDatumRodjenja(noviPacijent.getDatumRodjenja());
        postojeciPacijent.setBrojTelefona(noviPacijent.getBrojTelefona());
        postojeciPacijent.setAdresa(noviPacijent.getAdresa());
        postojeciPacijent.setEmail(noviPacijent.getEmail());
        postojeciPacijent.setPol(noviPacijent.getPol());
        postojeciPacijent.setKrvnaGrupa(noviPacijent.getKrvnaGrupa());
        postojeciPacijent.setStanjeZdravlja(noviPacijent.getStanjeZdravlja());
        postojeciPacijent.setLbo(noviPacijent.getLbo());

        return pacijentRepository.save(postojeciPacijent);
    }

    public void deletePacijent(Long id) {
        pacijentRepository.deleteById(id);
    }
}