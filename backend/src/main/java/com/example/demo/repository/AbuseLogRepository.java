package com.example.demo.repository;

import com.example.demo.model.AbuseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbuseLogRepository extends JpaRepository<AbuseLog, Long> {
}
