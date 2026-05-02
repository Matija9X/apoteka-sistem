package com.example.recepti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "lek")
@Getter
@Setter
@NoArgsConstructor
public class Lek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLek;

    @Column(nullable = false)
    private String naziv;

    @Column(nullable = false, unique = true)
    private String jkl;

    private String inn;

    private String farmaceutskiOblik;

    private String doza;

    private LocalDate datumIsteka;

    private String proizvodjac;

    private Double cena;

    private String sporednaDejstva;

    private String kontraindikacije;

    private Integer minDoza;

    private Integer maxDoza;

    private Boolean potrebanRecept;
}