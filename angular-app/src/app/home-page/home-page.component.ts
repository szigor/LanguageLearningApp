import { Component, OnInit } from '@angular/core';
import { Word, WordsDataService } from '../service/data/words-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  words: Array<Word> = []
  wordToGuess: Word = new Word(-1, 'test', 'test', 'test', 'test', 'test')
  enteredWord!: string
  counter: number = 0
  correctCounter: number = 0
  answersCounter: number = 0
  percentage: string = '0'

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

  test() {
    console.log(this.words[0].eng)
    this.wordToGuess = this.words[0]
    console.log(this.wordToGuess.eng)
  }

  checkWord() {
    if (this.enteredWord === this.wordToGuess.eng) {
      console.log("CORRECT")
      ++this.correctCounter
      this.wordToGuess = this.words[++this.counter]
    } else {
      console.log("WRONG")
      this.wordToGuess = this.words[++this.counter]
    }
    ++this.answersCounter
    this.percentage = ((this.correctCounter / this.answersCounter) * 100).toFixed(1)
  }

}
