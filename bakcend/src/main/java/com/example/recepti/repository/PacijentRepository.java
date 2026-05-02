package com.example.recepti.repository;

import com.example.recepti.entity.Pacijent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacijentRepository extends JpaRepository<Pacijent, Long> {
}