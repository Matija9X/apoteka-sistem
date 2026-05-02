package com.example.recepti.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class KreirajReceptRequest {

    private LocalDate datumIzdavanja;
    private String napomena;
    private Boolean istekao;
    private Long doktorId;
    private Long pacijentId;
    private List<StavkaReceptaDTO> stavke;
}