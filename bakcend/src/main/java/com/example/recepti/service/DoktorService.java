package com.example.recepti.service;

import com.example.recepti.entity.Doktor;
import com.example.recepti.exception.ResourceNotFoundException;
import com.example.recepti.repository.DoktorRepository;
import org.springframework.stereotype.Service;
import com.example.recepti.dto.LoginDoktorRequest;
import com.example.recepti.dto.LoginDoktorResponse;
import com.example.recepti.exception.BadRequestException;

import java.util.List;
import java.util.Optional;

@Service
public class DoktorService {

    private final DoktorRepository doktorRepository;

    public DoktorService(DoktorRepository doktorRepository) {
        this.doktorRepository = doktorRepository;
    }

    public List<Doktor> getAllDoktori() {
        return doktorRepository.findAll();
    }

    public Optional<Doktor> getDoktorById(Long id) {
        return doktorRepository.findById(id);
    }

    public Doktor saveDoktor(Doktor doktor) {
        return doktorRepository.save(doktor);
    }

    public Doktor updateDoktor(Long id, Doktor noviDoktor) {
        Doktor postojeciDoktor = doktorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doktor nije pronađen"));

        postojeciDoktor.setIme(noviDoktor.getIme());
        postojeciDoktor.setPrezime(noviDoktor.getPrezime());
        postojeciDoktor.setDatumZaposlenja(noviDoktor.getDatumZaposlenja());
        postojeciDoktor.setBrojTelefona(noviDoktor.getBrojTelefona());
        postojeciDoktor.setEmail(noviDoktor.getEmail());
        postojeciDoktor.setAdresa(noviDoktor.getAdresa());
        postojeciDoktor.setPlata(noviDoktor.getPlata());
        postojeciDoktor.setGodineIskustva(noviDoktor.getGodineIskustva());
        postojeciDoktor.setSluzbeniBroj(noviDoktor.getSluzbeniBroj());
        postojeciDoktor.setBrojLicence(noviDoktor.getBrojLicence());
        postojeciDoktor.setSpecijalizacija(noviDoktor.getSpecijalizacija());
        if (noviDoktor.getLozinka() != null && !noviDoktor.getLozinka().isBlank()) {
            postojeciDoktor.setLozinka(noviDoktor.getLozinka());
        }

        return doktorRepository.save(postojeciDoktor);
    }

    public void deleteDoktor(Long id) {
        doktorRepository.deleteById(id);
    }

    public Doktor registrujDoktora(Doktor doktor) {
        if (doktorRepository.findByEmail(doktor.getEmail()).isPresent()) {
            throw new com.example.recepti.exception.ResourceNotFoundException("Doktor sa ovim email-om već postoji");
        }

        return doktorRepository.save(doktor);
    }

    public LoginDoktorResponse loginDoktor(LoginDoktorRequest request) {
        Doktor doktor = doktorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Pogrešan email ili lozinka."));

        if (!doktor.getLozinka().equals(request.getLozinka())) {
            throw new BadRequestException("Pogrešan email ili lozinka.");
        }

        return new LoginDoktorResponse(
                "Uspešna prijava",
                doktor.getIdDoktor(),
                doktor.getIme(),
                doktor.getPrezime(),
                doktor.getEmail()
        );
    }
}