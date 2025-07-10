package com.example.demo.controller;

import com.example.demo.cyber.AbusiveWord;
import com.example.demo.model.AbusiveMessage;
import com.example.demo.service.AbusiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/abuse")
public class AbusiveTextController {
@Autowired
    private AbusiveService abusiveService;
    private final List<AbusiveWord> abusiveWords = new ArrayList<>(List.of(
            new AbusiveWord("stupid", "slang", 2),
            new AbusiveWord("idiot", "slang", 2),
            new AbusiveWord("dumb", "slang", 3),
            new AbusiveWord("fool", "slang", 1),
            new AbusiveWord("abuse", "general", 3),
            new AbusiveWord("bad", "general", 1),
            new AbusiveWord("dummy", "slang", 1)
    ));
    
    @GetMapping("/")
    public String home() {
        return "Welcome to the Cyber Harassment Detection Tool";
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from AbusiveTextController!";
    }

    @PostMapping("/check")
    public ResponseEntity<Object> detectAbuse(@RequestBody Map<String, String> request) {
        String text = request.get("text");

        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Text input is missing!");
        }

        text = text.toLowerCase();
        List<AbusiveWord> detected = new ArrayList<>();
        int totalSeverity = 0;

        for (AbusiveWord word : abusiveWords) {
            if (text.contains(word.getWord())) {
                detected.add(word);
                totalSeverity += word.getSeverity();
            }
        }

        if (detected.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("abuseDetected", false);
            response.put("message", "No abusive words found.");
            return ResponseEntity.ok(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("abuseDetected", true);
        response.put("matches", detected);
        response.put("totalSeverity", totalSeverity);

        return ResponseEntity.ok(response);
    }

    @PostConstruct
    public void loadAbusiveWords() throws IOException {
        try {
            ClassPathResource resource = new ClassPathResource("abusive-words.txt");
            List<String> lines = new BufferedReader(new InputStreamReader(resource.getInputStream()))
                    .lines()
                    .map(String::toLowerCase)
                    .collect(Collectors.toList());

            for (String line : lines) {
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    String word = parts[0].trim();
                    String category = parts[1].trim();
                    int severity = Integer.parseInt(parts[2].trim());
                    abusiveWords.add(new AbusiveWord(word, category, severity));
                }
            }

            System.out.println("Loaded abusive words: " + abusiveWords);
        } catch (Exception e) {
            System.err.println("Failed to load abusive words: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @GetMapping("/updateWords")
    public String updateWords() throws IOException {
        loadAbusiveWords();
        return "Abusive words list updated.";
    }

    @PostMapping("/admin/add-word")
    public ResponseEntity<String> addAbusiveWord(@RequestBody AbusiveWord newWord) {
        abusiveWords.add(newWord);
        return ResponseEntity.ok("Word added successfully.");
    }

    @DeleteMapping("/admin/delete-word")
    public ResponseEntity<String> deleteAbusiveWord(@RequestParam String word) {
        abusiveWords.removeIf(w -> w.getWord().equalsIgnoreCase(word));
        return ResponseEntity.ok("Word deleted successfully.");
    }

    @GetMapping("/admin/list-words")
    public ResponseEntity<List<AbusiveWord>> listAbusiveWords() {
        return ResponseEntity.ok(abusiveWords);
}
    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/analyze")
public ResponseEntity<?> analyzeMessage(@RequestBody Map<String, String> request) {
    String text = request.get("text");

    if (text == null || text.trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Text input is missing!");
    }

    // Call Flask API
    String flaskUrl = "http://localhost:5000/abuse/analyze";

    try {
        Map<String, String> flaskRequest = new HashMap<>();
        flaskRequest.put("text", text);

        // Send to Flask
        ResponseEntity<Map> flaskResponse = restTemplate.postForEntity(flaskUrl, flaskRequest, Map.class);

        Map<String, Object> data = flaskResponse.getBody();
        System.out.println("Flask returned:"+data);

        if (data == null) {
            return ResponseEntity.status(500).body("No response from Flask.");
        }

        // Save to DB
        AbusiveMessage message = new AbusiveMessage();
        message.setText(text);
        message.setAbuseDetected((Boolean) data.get("abuseDetected"));
        Object labelsObj = data.get("labels");
    if (labelsObj instanceof List) {
    List<?> labelList = (List<?>) labelsObj;
    String joinedLabels = labelList.stream()
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    message.setLabels(joinedLabels);
} else {
    message.setLabels(labelsObj != null ? labelsObj.toString():"");
}
        message.setSeverity((String) data.getOrDefault("severity", ""));
        Object confidenceObj = data.get("confidence");
        message.setConfidence(confidenceObj != null? confidenceObj.toString():"");
        message.setRecommendation((String) data.getOrDefault("recommendation", ""));

        abusiveService.saveText(message);

        return ResponseEntity.ok(data);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error calling Flask API: " + e.getMessage());
 }
}
@PostMapping("/simulate")
public ResponseEntity<?> simulateStrangerMessage(@RequestBody Map<String, String> request) {
    String userInput = request.get("text");

    if (userInput == null || userInput.trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Text input is missing!");
    }
    String reply;
    if(userInput.toLowerCase().contains("hi")){
        reply="What do you want?";} else {
        reply="You're such a pain.";
        }

    // Call Flask AI model
    String flaskUrl = "http://localhost:5000/abuse/analyze";
    try {
        Map<String, String> flaskRequest = new HashMap<>();
        flaskRequest.put("text", reply);

        ResponseEntity<Map> flaskResponse = restTemplate.postForEntity(flaskUrl, flaskRequest, Map.class);
        Map<String, Object> flaskData = flaskResponse.getBody();

        if (flaskData == null) {
            return ResponseEntity.status(500).body("No response from Flask.");
        }
        boolean abuseDetected= Boolean.parseBoolean(flaskData.get("abuseDetected").toString());
        List<String> labels=(List<String>) flaskData.get("labels");
        String severity = flaskData.get("severity").toString();
        String recommendation= flaskData.get("recommendation").toString();
        Map<String,Object> response= new HashMap<>();
        response.put("reply",reply);
        response.put("abuseDetected",abuseDetected);
        response.put("labels",labels);
        response.put("severity",severity);
        response.put("recommendation",recommendation);
        return ResponseEntity.ok(response);}
        catch(Exception e){
            return ResponseEntity.status(500).body("Error calling Flask API: "+e.getMessage());
        }}}
       
        