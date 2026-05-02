package com.example.recepti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "stavka_recepta")
@Getter
@Setter
@NoArgsConstructor
public class StavkaRecepta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rb;

    private Integer kolicinaPakovanja;

    private String doziranje;

    private String napomena;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "recept_id")
    private Recept recept;

    @ManyToOne
    @JoinColumn(name = "lek_id")
    private Lek lek;
}