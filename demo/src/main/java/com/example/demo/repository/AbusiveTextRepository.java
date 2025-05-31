package com.example.demo.repository;
import com.example.demo.model.AbusiveText;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AbusiveTextRepository extends JpaRepository<AbusiveText, Long>{}
    

