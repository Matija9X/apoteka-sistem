package com.example.recepti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "doktor")
@Getter
@Setter
@NoArgsConstructor
public class Doktor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDoktor;

    @Column(nullable = false)
    private String ime;

    @Column(nullable = false)
    private String prezime;

    private LocalDate datumZaposlenja;

    private String brojTelefona;

    @Column(unique = true)
    private String email;

    private String adresa;

    private Double plata;

    private Integer godineIskustva;

    @Column(unique = true)
    private String sluzbeniBroj;

    @Column(unique = true)
    private String brojLicence;

    private String specijalizacija;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String lozinka;
}