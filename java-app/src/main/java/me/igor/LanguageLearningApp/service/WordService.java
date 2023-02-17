package me.igor.LanguageLearningApp.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.igor.LanguageLearningApp.model.Difficulty;
import me.igor.LanguageLearningApp.model.Type;
import me.igor.LanguageLearningApp.model.Word;
import me.igor.LanguageLearningApp.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public List<Word> getDictionary() {
        return wordRepository.findAll().stream()
                .sorted(Comparator.comparing(Word::getEng)).toList();
    }

    public List<Word> getAllWordsShuffled() {
        List<Word> all = wordRepository.findAll();
        Collections.shuffle(all);
        return all;
    }

    public Word getRandomWord() {
        return wordRepository.findAll().get(new Random().nextInt(wordRepository.findAll().size()));
    }

    public List<Word> getByType(Type type) {
        List<Word> filteredWords = wordRepository.findAll().stream()
                .filter(w -> w.getType() == type)
                .collect(Collectors.toList());
        Collections.shuffle(filteredWords);
        return  filteredWords;
    }

    public List<Word> getByDifficulty(Difficulty difficulty) {
        List<Word> filteredWords = wordRepository.findAll().stream()
                .filter(w -> w.getDifficulty() == difficulty)
                .collect(Collectors.toList());
        Collections.shuffle(filteredWords);
        return  filteredWords;
    }

    public List<Word> getBy(Integer round, String part, String diff) {

        List<Word> result;

        if (!part.equals("all")) {
            result = getAllWordsShuffled().stream()
                    .filter(w -> w.getDifficulty().name().equals(diff.toUpperCase()) && w.getType().name().equals(part.toUpperCase()))
                    .limit(round)
                    .collect(Collectors.toList());
        } else {
            result = getAllWordsShuffled().stream()
                    .filter(w -> w.getDifficulty().name().equals(diff.toUpperCase()))
                    .limit(round)
                    .collect(Collectors.toList());
        }
        return result;
    }

}
