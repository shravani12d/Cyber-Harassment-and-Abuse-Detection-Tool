package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "abuse_messages")
public class AbusiveMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private boolean abuseDetected;
    private String labels;
    private String severity;
    private String confidence;
    private String recommendation;

    // Constructors
    public AbusiveMessage() {}

    public AbusiveMessage(String text, boolean abuseDetected, String labels, String severity, String confidence, String recommendation) {
        this.text = text;
        this.abuseDetected = abuseDetected;
        this.labels = labels;
        this.severity = severity;
        this.confidence = confidence;
        this.recommendation = recommendation;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public boolean isAbuseDetected() { return abuseDetected; }
    public void setAbuseDetected(boolean abuseDetected) { this.abuseDetected = abuseDetected; }

    public String getLabels() { return labels; }
    public void setLabels(String labels) { this.labels = labels; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation;}
}