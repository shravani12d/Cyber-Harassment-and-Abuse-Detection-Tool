package com.example.demo.model;
import jakarta.persistence.*;
@Entity
@Table(name = "abusive_texts")
public class AbusiveText {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1000, nullable = false)
    private String content;
    private boolean isAbusive;
    public AbusiveText(){}
    public AbusiveText(String content, boolean isAbusive){
        this.content = content;
        this.isAbusive = isAbusive;
    }
    //getters and setters
    public Long getId(){
        return id;
    }
    public String getContent(){
        return content;
    }
    public boolean isAbusive(){
        return isAbusive;
    }
    public void setId(Long id){
        this.id=id;
    }
    public void setContent(String content){
        this.content=content;
    }
    public void setIsAbusive(boolean isAbusive){
        this.isAbusive=isAbusive;
    }
    
}
