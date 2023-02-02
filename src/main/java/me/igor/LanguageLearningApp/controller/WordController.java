package me.igor.LanguageLearningApp.controller;

import me.igor.LanguageLearningApp.model.Word;
import me.igor.LanguageLearningApp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping(path = "/words")
    public List<Word> getAllWords() {
        return wordService.getAllWords();
    }

    @PostMapping(path = "/word/save")
    public ResponseEntity<Word> saveWord(@RequestBody Word word) {
        wordService.saveWord(word);
        return ResponseEntity.ok(word);
    }

}
