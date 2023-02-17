import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Word, WordsDataService } from '../service/data/words-data.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef

  @ViewChild('roundSelect') roundSelect!: ElementRef;
  @ViewChild('partSelect') partSelect!: ElementRef;
  @ViewChild('difficultySelect') difficultySelect!: ElementRef;

  words: Array<Word> = []
  wordToGuess: Word = new Word(-1, 'test', 'test', 'test', 'test', 'test')
  enteredWord!: string
  counter: number = 0
  correctCounter: number = 0
  answersCounter: number = 0
  percentage: string = '0'
  isPlaying: boolean = true
  hintLetter = ''
  hintLetterPlace!: number
  wordHidden = ''
  possibleNumbers: Array<number> = []
  hintCounter = 0
  wrong = false

  rounds = [10, 25, 50]
  partsOfSpeech = ['Noun', 'Verb', 'Adjective']
  difficulties = ['Hard', 'Medium', 'Easy']

  start = false;


  constructor(
    private service: WordsDataService
  ) { }


  ngOnInit(): void {
    console.log('-----OnInit-----')
  }

  // async ngOnInit(): Promise<void> {
  //   await this.getAllWords();
  //   let firstWord = this.words[0]
  //   this.wordToGuess = firstWord
  //   this.fillWordWithUnderscore(firstWord.eng.length)
  //   this.fillPossibleNumbers(firstWord.eng)
  // }

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

  getWords(rounds: number, part: String, difficulty: String): Promise<void> {
    return new Promise((resolve) => {
      this.service.getWords(rounds, part, difficulty).subscribe(
        response => {
          this.words = response
          resolve()
        }
      )
    })
  }

  async startGame(): Promise<void> {

    await this.getWords(
      this.roundSelect.nativeElement.value,
      this.partSelect.nativeElement.value,
      this.difficultySelect.nativeElement.value
    );

    let firstWord = this.words[0]
    this.wordToGuess = firstWord
    this.fillWordWithUnderscore(firstWord.eng.length)
    this.fillPossibleNumbers(firstWord.eng)

    this.start = true

  }

  checkWord() {
    if (this.enteredWord === this.wordToGuess.eng) {
      // CORRECT
      this.wrong = true
      this.inputField.nativeElement.classList.add('correct')
      setTimeout(() => {
        this.inputField.nativeElement.classList.remove('correct')
        this.wrong = false
        ++this.correctCounter
        ++this.answersCounter
        this.percentage = ((this.correctCounter / this.answersCounter) * 100).toFixed(1)
        if(this.answersCounter === this.words.length) {
          this.endGame()
          return
        }
        this.wordToGuess = this.words[++this.counter]
        this.fillWordWithUnderscore(this.wordToGuess.eng.length)
        this.fillPossibleNumbers(this.wordToGuess.eng)
      }, 500)
      
    } else {
      // WRONG
      this.wrong = true
      this.inputField.nativeElement.classList.add('incorrect')
      setTimeout(() => {
        this.inputField.nativeElement.classList.remove('incorrect')
        this.wrong = false
        ++this.answersCounter
        this.percentage = ((this.correctCounter / this.answersCounter) * 100).toFixed(1)
        if(this.answersCounter === this.words.length) {
          this.endGame()
          return
        }
        this.wordToGuess = this.words[++this.counter]
        this.fillWordWithUnderscore(this.wordToGuess.eng.length)
        this.fillPossibleNumbers(this.wordToGuess.eng)
      }, 500)
      
    }

    this.hintCounter = 0
    this.enteredWord = ''

  }

  endGame() {
    this.isPlaying = false
  }

  giveHint() {
    let wordPom = this.wordToGuess.eng
    if (this.possibleNumbers.length > 0 && this.hintCounter < 4) {
      let randomNum = this.randomNumberFromArray(this.possibleNumbers)
      this.hintLetter = wordPom[randomNum]
      this.hintLetterPlace = randomNum
      this.wordHidden = this.changeLetterInString(this.wordHidden, this.hintLetterPlace, this.hintLetter)
      ++this.hintCounter
    }
    console.log(this.wordHidden)
  }

  showWordWithSpaces(word: string) {
    let letters = word.split('')
    return letters.join(' ')
  }

  private randomNumberFromZeroGenerator(max: number) {
    return Math.floor(Math.random() * (max - 0 + 1) + 0)
  }

  private randomNumberFromArray(arr: Array<number>) {
    let random = Math.floor(Math.random() * arr.length)
    return arr.splice(random, 1)[0]
  }

  private fillWordWithUnderscore(num: number) {
    this.wordHidden = ''
    for (let i = 0; i < num; i++) {
      this.wordHidden += '_'
    }
  }

  private fillPossibleNumbers(word: string) {
    this.possibleNumbers = []
    for (let i = 0; i < word.length; i++) {
      this.possibleNumbers.push(i)
    }
  }

  private changeLetterInString(word: string, index: number, newLetter: string) {
    return word.substring(0, index) + newLetter + word.substring(index + 1)
  }

  // get100Nouns(): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.service.get100Nouns().subscribe(
  //       response => {
  //         this.words = response
  //         resolve()
  //       }
  //     )
  //   })
  // }

  // get100Verbs(): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.service.get100Verbs().subscribe(
  //       response => {
  //         this.words = response
  //         resolve()
  //       }
  //     )
  //   })
  // }

  // get100Adjectives(): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.service.get100Adjectives().subscribe(
  //       response => {
  //         this.words = response
  //         resolve()
  //       }
  //     )
  //   })
  // }

}
