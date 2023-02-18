import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Word {
  constructor(
    public id: number,
    public pl: string,
    public eng: string,
    public engUsage: string,
    public type: string,
    public difficulty: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class WordsDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllWords() {
    return this.http.get<Array<Word>>('http://localhost:8080/words/shuffled')
  }

  getWords(rounds: number, part: String, difficulty: String) {
    console.log(`http://localhost:8080/words/${rounds}/${part.toLowerCase()}/${difficulty.toLowerCase()}`)
    return this.http.get<Array<Word>>(`http://localhost:8080/words/${rounds}/${part.toLowerCase()}/${difficulty.toLowerCase()}`)
  }

  getDictionary() {
    return this.http.get<Array<Word>>('http://localhost:8080/dictionary')
  }

}
