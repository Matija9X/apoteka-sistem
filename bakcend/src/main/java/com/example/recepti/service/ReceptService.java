package com.example.recepti.service;

import com.example.recepti.dto.KreirajReceptRequest;
import com.example.recepti.dto.StavkaReceptaDTO;
import com.example.recepti.entity.*;
import com.example.recepti.exception.ResourceNotFoundException;
import com.example.recepti.repository.DoktorRepository;
import com.example.recepti.repository.LekRepository;
import com.example.recepti.repository.PacijentRepository;
import com.example.recepti.repository.ReceptRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class ReceptService {

    private final ReceptRepository receptRepository;
    private final DoktorRepository doktorRepository;
    private final PacijentRepository pacijentRepository;
    private final LekRepository lekRepository;

    public ReceptService(ReceptRepository receptRepository,
                         DoktorRepository doktorRepository,
                         PacijentRepository pacijentRepository,
                         LekRepository lekRepository) {
        this.receptRepository = receptRepository;
        this.doktorRepository = doktorRepository;
        this.pacijentRepository = pacijentRepository;
        this.lekRepository = lekRepository;
    }

    public Recept kreirajRecept(KreirajReceptRequest request) {
        Doktor doktor = doktorRepository.findById(request.getDoktorId())
                .orElseThrow(() -> new RuntimeException("Doktor nije pronađen"));

        Pacijent pacijent = pacijentRepository.findById(request.getPacijentId())
                .orElseThrow(() -> new RuntimeException("Pacijent nije pronađen"));

        Recept recept = new Recept();
        recept.setDatumIzdavanja(request.getDatumIzdavanja());
        recept.setNapomena(request.getNapomena());
        recept.setIstekao(request.getIstekao());
        recept.setDoktor(doktor);
        recept.setPacijent(pacijent);

        if (request.getStavke() != null) {
            for (StavkaReceptaDTO stavkaDTO : request.getStavke()) {
                Lek lek = lekRepository.findById(stavkaDTO.getLekId())
                        .orElseThrow(() -> new RuntimeException("Lek nije pronađen"));

                StavkaRecepta stavka = new StavkaRecepta();
                stavka.setRb(stavkaDTO.getRb());
                stavka.setKolicinaPakovanja(stavkaDTO.getKolicinaPakovanja());
                stavka.setDoziranje(stavkaDTO.getDoziranje());
                stavka.setNapomena(stavkaDTO.getNapomena());
                stavka.setLek(lek);
                stavka.setRecept(recept);

                recept.getStavke().add(stavka);
            }
        }

        return receptRepository.save(recept);
    }

    public List<Recept> getAllRecepti() {
        return receptRepository.findAll();
    }

    public Optional<Recept> getReceptById(Long id) {
        return receptRepository.findById(id);
    }

    public void deleteRecept(Long id) {
        receptRepository.deleteById(id);
    }

    public Recept updateRecept(Long id, KreirajReceptRequest request) {
        Recept postojeciRecept = receptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recept nije pronađen"));

        Doktor doktor = doktorRepository.findById(request.getDoktorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doktor nije pronađen"));

        Pacijent pacijent = pacijentRepository.findById(request.getPacijentId())
                .orElseThrow(() -> new ResourceNotFoundException("Pacijent nije pronađen"));

        postojeciRecept.setDatumIzdavanja(request.getDatumIzdavanja());
        postojeciRecept.setNapomena(request.getNapomena());
        postojeciRecept.setIstekao(request.getIstekao());
        postojeciRecept.setDoktor(doktor);
        postojeciRecept.setPacijent(pacijent);

        postojeciRecept.getStavke().clear();

        if (request.getStavke() != null) {
            for (StavkaReceptaDTO stavkaDTO : request.getStavke()) {
                Lek lek = lekRepository.findById(stavkaDTO.getLekId())
                        .orElseThrow(() -> new ResourceNotFoundException("Lek nije pronađen"));

                StavkaRecepta stavka = new StavkaRecepta();
                stavka.setRb(stavkaDTO.getRb());
                stavka.setKolicinaPakovanja(stavkaDTO.getKolicinaPakovanja());
                stavka.setDoziranje(stavkaDTO.getDoziranje());
                stavka.setNapomena(stavkaDTO.getNapomena());
                stavka.setLek(lek);
                stavka.setRecept(postojeciRecept);

                postojeciRecept.getStavke().add(stavka);
            }
        }

        return receptRepository.save(postojeciRecept);
    }

}