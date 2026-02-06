package com.example.demo.service;

import com.example.demo.model.AbusiveMessage;
import com.example.demo.model.AbuseLog;
import com.example.demo.model.BlockedUser;
import com.example.demo.repository.AbuseLogRepository;
import com.example.demo.repository.BlockedUserRepository;
import com.example.demo.repository.AbusiveTextRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AbusiveService {

    @Autowired
    private AbusiveTextRepository abusiveTextRepository;

    @Autowired
    private AbuseLogRepository abuseLogRepository;

    @Autowired
    private BlockedUserRepository blockedUserRepository;

    // ✅ 1️⃣ Save analyzed message
    public AbusiveMessage saveText(AbusiveMessage message) {
        return abusiveTextRepository.save(message);
    }

    // ✅ 2️⃣ Log abuse + block logic
    public void logAbuse(String userId, String message, String severity) {

        BlockedUser user =
                blockedUserRepository.findById(userId).orElse(null);

        if (user == null) {
            user = new BlockedUser();
            user.setUserId(userId);
            user.setAbuseCount(1);
            user.setBlocked(false);
        } else {
            user.setAbuseCount(user.getAbuseCount() + 1);
        }
    
        // Save abuse log
        AbuseLog log = new AbuseLog();
        log.setUserId(userId);
        log.setMessage(message);
        log.setSeverity(severity);
        log.setAbuseCountAtTime(user.getAbuseCount());
        log.setTimestamp(LocalDateTime.now());
        abuseLogRepository.save(log);
        

        // Block after 3 abuses
        if (user.getAbuseCount() >= 3) {
            user.setBlocked(true);
            user.setBlockedAt(LocalDateTime.now());
        }

        blockedUserRepository.save(user);
    }
}
