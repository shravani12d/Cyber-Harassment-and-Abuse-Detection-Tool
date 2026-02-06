package com.example.demo.repository;

import com.example.demo.model.BlockedUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedUserRepository extends JpaRepository<BlockedUser, String> {
}
