package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.BlockHistory;
import com.example.demo.repository.BlockHistoryRepository;
import com.example.demo.model.AbuseLog;
import com.example.demo.model.BlockHistory;
import com.example.demo.model.BlockedUser;
import com.example.demo.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {


    private final AdminService adminService;
    private final BlockHistoryRepository blockHistoryRepository;
    public AdminController(AdminService adminService,BlockHistoryRepository blockHistoryRepository) {
        this.adminService = adminService;
        this.blockHistoryRepository = blockHistoryRepository;
    }

    @GetMapping("/logs")
    public List<AbuseLog> getAllLogs() {
        return adminService.getAllLogs();
    }

    @GetMapping("/blocked-users")
    public List<BlockedUser> getBlockedUsers() {
        return adminService.getBlockedUsers();
    }

    @GetMapping("/report")
    public Map<String, Object> getReport() {
        return adminService.generateReport();
    }

    @GetMapping("/block-history")
    public List<BlockHistory> getBlockHistory() {
    return blockHistoryRepository.findAll();
}
}
