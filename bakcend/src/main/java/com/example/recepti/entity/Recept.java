package com.example.recepti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "recept")
@Getter
@Setter
@NoArgsConstructor
public class Recept {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRecept;

    private LocalDate datumIzdavanja;

    private String napomena;

    private Boolean istekao;

    @ManyToOne
    @JoinColumn(name = "doktor_id")
    private Doktor doktor;

    @ManyToOne
    @JoinColumn(name = "pacijent_id")
    private Pacijent pacijent;

    @JsonManagedReference
    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StavkaRecepta> stavke = new ArrayList<>();
}