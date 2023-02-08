import { Component, OnInit } from '@angular/core';
import { Word, WordsDataService } from '../service/data/words-data.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit{

  words: Array<Word> = []

  constructor(
    private service: WordsDataService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getWords()
  }

  getWords(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getDictionary().subscribe(
        response => {
          this.words = response
          resolve()
        }
      )
    })
  }

}
