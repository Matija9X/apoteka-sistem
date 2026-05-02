package com.example.recepti.repository;

import com.example.recepti.entity.Doktor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DoktorRepository extends JpaRepository<Doktor, Long> {
    Optional<Doktor> findByEmail(String email);
}