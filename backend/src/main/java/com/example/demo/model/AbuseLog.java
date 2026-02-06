package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "abuse_logs")
public class AbuseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;

    @Column(length=1000)
    private String message;

    private String severity;
    private int abuseCountAtTime;
    private LocalDateTime timestamp;

    // getters & setters
    public Long getId() { return id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public int getAbuseCountAtTime(){
        return abuseCountAtTime;
    }
    public void setAbuseCountAtTime(int abuseCountAtTime){
        this.abuseCountAtTime = abuseCountAtTime;
    }
}
