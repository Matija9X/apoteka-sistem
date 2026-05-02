package com.example.recepti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "pacijent")
@Getter
@Setter
@NoArgsConstructor
public class Pacijent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPacijent;

    @Column(nullable = false)
    private String ime;

    @Column(nullable = false)
    private String prezime;

    private LocalDate datumRodjenja;

    private String brojTelefona;

    private String adresa;

    @Column(unique = true)
    private String email;

    private String pol;

    private String krvnaGrupa;

    private String stanjeZdravlja;

    @Column(nullable = false, unique = true)
    private String lbo;
}