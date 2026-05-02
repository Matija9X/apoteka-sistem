package com.example.recepti.repository;

import com.example.recepti.entity.Recept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptRepository extends JpaRepository<Recept, Long> {
}