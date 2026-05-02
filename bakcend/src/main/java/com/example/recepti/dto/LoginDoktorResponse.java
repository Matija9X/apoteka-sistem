package com.example.recepti.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginDoktorResponse {
    private String poruka;
    private Long idDoktor;
    private String ime;
    private String prezime;
    private String email;
}