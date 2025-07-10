package com.example.demo.service;
import com.example.demo.model.AbusiveMessage;
import com.example.demo.repository.AbusiveTextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class AbusiveService {
    @Autowired
    private AbusiveTextRepository repository;
    public AbusiveMessage 
    saveText(AbusiveMessage text){
       return repository.save(text);
    }
    public List<AbusiveMessage>
    getAllTexts(){
        return repository.findAll();
    }
    public boolean isAbusive(String content){
        String[] abusiveWords = {"abuse","idiot","stupid","hate","die"};
        for(String word : abusiveWords){
            if(content.toLowerCase().contains(word)){
                return true;
            }
        }
        return false;
    }
}
