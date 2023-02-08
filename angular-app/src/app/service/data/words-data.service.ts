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

  getDictionary() {
    return this.http.get<Array<Word>>('http://localhost:8080/dictionary')
  }

}
