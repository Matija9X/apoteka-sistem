package com.example.recepti.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginDoktorRequest {
    private String email;
    private String lozinka;
}