package com.example.demo.cyber;

public class AbuseRequest {
    private String text;

    public AbuseRequest() {
        // default constructor for JSON deserialization
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "AbuseRequest{text='" + text + "'}";
 }
}