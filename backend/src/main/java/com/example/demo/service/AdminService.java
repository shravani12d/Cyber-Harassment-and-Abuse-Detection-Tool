package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.model.AbuseLog;
import com.example.demo.model.BlockedUser;
import com.example.demo.repository.AbuseLogRepository;
import com.example.demo.repository.BlockedUserRepository;

@Service
public class AdminService {

    private final AbuseLogRepository abuseLogRepository;
    private final BlockedUserRepository blockedUserRepository;

    public AdminService(AbuseLogRepository abuseLogRepository,
                        BlockedUserRepository blockedUserRepository) {
        this.abuseLogRepository = abuseLogRepository;
        this.blockedUserRepository = blockedUserRepository;
    }

    public List<AbuseLog> getAllLogs() {
        return abuseLogRepository.findAll();
    }

    public List<BlockedUser> getBlockedUsers() {
        return blockedUserRepository.findAll();
    }

    public Map<String, Object> generateReport() {
        Map<String, Object> report = new HashMap<>();

        long totalAbuseMessages = abuseLogRepository.count();
        long blockedUsers = blockedUserRepository.count();

        report.put("totalAbuseMessages", totalAbuseMessages);
        report.put("blockedUsers", blockedUsers);
        report.put("generatedAt", LocalDateTime.now());

        return report;
    }
}
