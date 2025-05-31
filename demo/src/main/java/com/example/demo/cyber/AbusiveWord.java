package com.example.demo.cyber;

public class AbusiveWord {
    private String word;
    private String category;
    private int severity;

    public AbusiveWord(String word, String category,int severity){
        this.word=word;
        this.category=category;
        this.severity=severity;
    }
    public String getWord(){
        return word;
    }
    public void setWord(String word){
        this.word=word;
    }
    public String getCategory(){
        return category;
    }
    public int getSeverity(){
        return severity;
    }
    public void setSeverity(int severity){
        this.severity=severity;
    }
}
