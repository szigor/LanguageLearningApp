package me.igor.LanguageLearningApp.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.igor.LanguageLearningApp.model.Word;
import me.igor.LanguageLearningApp.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class WordService {

    @Autowired
    private WordRepository wordRepository;

    public void saveWord(Word word) {
        wordRepository.save(word);
        log.info("Successfully saved " + word);
    }

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

}
