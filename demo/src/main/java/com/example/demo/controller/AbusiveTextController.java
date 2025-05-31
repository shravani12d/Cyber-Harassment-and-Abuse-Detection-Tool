package com.example.demo.controller;

import com.example.demo.cyber.AbuseRequest;
import com.example.demo.cyber.AbusiveWord;

import jakarta.annotation.PostConstruct;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/abuse")
public class AbusiveTextController {

    private List<AbusiveWord> abusiveWords = new ArrayList<>(List.of(
    new AbusiveWord("stupid","slang",2),
    new AbusiveWord("idiot", "slang", 2),
    new AbusiveWord("dumb", "slang", 3),
    new AbusiveWord("fool", "slang", 1),
    new AbusiveWord("abuse","general", 3),
    new AbusiveWord("bad","general",1),
    new AbusiveWord("dummy","slang",1)));

    @GetMapping("/")
    public String home() {
        return "Welcome to the Cyber Harassment Detection Tool";
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from AbusiveTextController!";
    }

    @PostMapping("/check")
    public ResponseEntity<Object> detectAbuse(@RequestBody AbuseRequest request) {
        System.out.println("POST /check method called");

        if (request == null || request.getText() == null) {
            System.out.println("Request or text is null!");
            return ResponseEntity.badRequest().body("Text input is missing!");
        }

        String text = request.getText().toLowerCase();
        List<AbusiveWord> detected = new ArrayList<>();
        int severity=0;
        int totalSeverity=0;
        System.out.println("Text received: " + text);
        StringBuilder result = new StringBuilder();
        

        for (AbusiveWord word: abusiveWords) {
            if (text.contains(word.getWord())) {
                detected.add(word);
                totalSeverity += word.getSeverity();}}
                if(detected.isEmpty()){
                   Map<String, Object> response = new HashMap<>();
                   response.put("abuseDetected", false);
                   response.put("message", "No abusive words found.");
                   return ResponseEntity.ok(response);}
                   Map<String, Object> response =  new HashMap<>();
                   response.put("abuseDetected", true);
                   response.put("matches", detected);
                   return ResponseEntity.ok(response);
                }
                
@PostConstruct
 public void loadAbusiveWords() throws IOException{
   try{ ClassPathResource resource = new ClassPathResource("abusive-words.txt");
    List<String> lines = new BufferedReader(new InputStreamReader(resource.getInputStream())).lines().map(String::toLowerCase).collect(Collectors.toList());
   for(String line: lines){
    String[] parts = line.split(",");
    if(parts.length==3){
        String word= parts[0].trim();
        String category=parts[1].trim();
        int severity= Integer.parseInt(parts[2].trim());
        abusiveWords.add(new AbusiveWord(word, category, severity));
    }
   }
    System.out.println("Loaded abusive words:"+ abusiveWords);
 } catch(Exception e){
    System.err.println("failed to load abusive words:"+ e.getMessage());
    e.printStackTrace();
 }}
 @GetMapping("/updateWords")
 public String updateWords() throws IOException{
    loadAbusiveWords();
    return "Abusive words list updated.";
 }
 @PostMapping("/admin/add-word")
 public ResponseEntity<String> addAbusiveWord(@RequestBody AbusiveWord newWord) {
     abusiveWords.add(newWord);
     return ResponseEntity.ok("Word added successfully.");

 }
 @DeleteMapping("/admin/delete-word")
 public ResponseEntity<String> deleteAbusiveWord(@RequestParam String word){
    abusiveWords.removeIf(w -> w.getWord().equalsIgnoreCase(word));
    return ResponseEntity.ok("Word deleted successfully.");
 }
 @GetMapping("/admin/list-words")
 public ResponseEntity<List<AbusiveWord>>listAbusiveWords(){
    return ResponseEntity.ok(abusiveWords);
 }
     
 }
 
 
