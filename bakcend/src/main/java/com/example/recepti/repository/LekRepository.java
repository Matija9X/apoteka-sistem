package com.example.recepti.repository;

import com.example.recepti.entity.Lek;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LekRepository extends JpaRepository<Lek, Long> {
}