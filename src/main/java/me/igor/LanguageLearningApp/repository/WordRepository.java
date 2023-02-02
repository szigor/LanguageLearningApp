package me.igor.LanguageLearningApp.repository;

import me.igor.LanguageLearningApp.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
}
