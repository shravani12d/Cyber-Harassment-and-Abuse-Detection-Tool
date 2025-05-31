package com.example.demo.service;
import com.example.demo.model.AbusiveText;
import com.example.demo.repository.AbusiveTextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class AbusiveTextService {
    @Autowired
    private AbusiveTextRepository repository;
    public AbusiveText 
    saveText(AbusiveText text){
       return repository.save(text);
    }
    public List<AbusiveText>
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
