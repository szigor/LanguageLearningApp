package me.igor.LanguageLearningApp.controller;

import me.igor.LanguageLearningApp.model.Difficulty;
import me.igor.LanguageLearningApp.model.Type;
import me.igor.LanguageLearningApp.model.Word;
import me.igor.LanguageLearningApp.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping(path = "/words")
    public List<Word> getAllWords() {
        return wordService.getAllWords();
    }

    @GetMapping(path = "/dictionary")
    public List<Word> getDictionary() {
        return wordService.getDictionary();
    }

    @GetMapping(path = "/words/shuffled")
    public List<Word> getAllWordsShuffled() {
        return wordService.getAllWordsShuffled();
    }

    @GetMapping(path = "/word/random")
    public Word getRandomWord() {
        return wordService.getRandomWord();
    }

    @GetMapping(path = "/word/nouns")
    public List<Word> getNouns() {
        return wordService.getByType(Type.NOUN);
    }

    @GetMapping(path = "/word/verbs")
    public List<Word> getVerbs() {
        return wordService.getByType(Type.VERB);
    }

    @GetMapping(path = "/word/adjectives")
    public List<Word> getAdjectives() {
        return wordService.getByType(Type.ADJECTIVE);
    }

    @GetMapping(path = "/word/adverbs")
    public List<Word> getAdverbs() {
        return wordService.getByType(Type.ADVERB);
    }

    @GetMapping(path = "/word/easy")
    public List<Word> getEasyWords() {
        return wordService.getByDifficulty(Difficulty.EASY);
    }

    @GetMapping(path = "/word/medium")
    public List<Word> getMediumWords() {
        return wordService.getByDifficulty(Difficulty.MEDIUM);
    }

    @GetMapping(path = "/word/hard")
    public List<Word> getHardWords() {
        return wordService.getByDifficulty(Difficulty.HARD);
    }


    @GetMapping(path = "/words/{round}/{part}/{diff}")
    public List<Word> get50(@PathVariable Integer round, @PathVariable String part, @PathVariable String diff) {
        return wordService.getBy(round, part, diff);
    }

    @PostMapping(path = "/word/save")
    public ResponseEntity<Word> saveWord(@RequestBody Word word) {
        wordService.saveWord(word);
        return ResponseEntity.ok(word);
    }

}
