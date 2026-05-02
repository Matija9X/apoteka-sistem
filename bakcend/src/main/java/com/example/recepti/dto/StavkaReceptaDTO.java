package com.example.recepti.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StavkaReceptaDTO {

    private Integer rb;
    private Integer kolicinaPakovanja;
    private String doziranje;
    private String napomena;
    private Long lekId;
}