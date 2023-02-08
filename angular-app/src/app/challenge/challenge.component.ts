import { Component, OnInit } from '@angular/core';
import { Word, WordsDataService } from '../service/data/words-data.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit{

  words: Array<Word> = []
  wordToGuess: Word = new Word(-1, 'test', 'test', 'test', 'test', 'test')
  enteredWord!: string
  counter: number = 0
  correctCounter: number = 0
  answersCounter: number = 0
  percentage: string = '0'
  isPlaying: boolean = true
  hint: boolean = false

  constructor(
    private service: WordsDataService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAllWords();
    this.wordToGuess = this.words[0]
  }

  getAllWords(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getAllWords().subscribe(
        response => {
          this.words = response
          resolve()
        }
      )
    })
  }

  checkWord() {
    if (this.enteredWord === this.wordToGuess.eng) {
      // CORRECT
      ++this.correctCounter
      this.wordToGuess = this.words[++this.counter]
    } else {
      // WRONG
      this.wordToGuess = this.words[++this.counter]
    }
    this.enteredWord = ''
    this.hint = false
    ++this.answersCounter
    this.percentage = ((this.correctCounter / this.answersCounter) * 100).toFixed(1)
  }

  endGame() {
    this.isPlaying = false
  }

  giveHint() {
    this.hint = true
  }

}
