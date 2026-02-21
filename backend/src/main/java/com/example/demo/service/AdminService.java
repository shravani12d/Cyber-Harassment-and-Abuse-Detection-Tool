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
import com.example.demo.repository.BlockHistoryRepository;
import com.example.demo.model.BlockHistory;
@Service
public class AdminService {

    private final AbuseLogRepository abuseLogRepository;
    private final BlockedUserRepository blockedUserRepository;
    private final BlockHistoryRepository blockHistoryRepository;

    public AdminService(AbuseLogRepository abuseLogRepository,
                        BlockedUserRepository blockedUserRepository,
                    BlockHistoryRepository blockHistoryRepository) {
        this.abuseLogRepository = abuseLogRepository;
        this.blockedUserRepository = blockedUserRepository;
        this.blockHistoryRepository = blockHistoryRepository;
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
