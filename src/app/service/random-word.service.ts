import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";

const URL = 'https://random-word-api.herokuapp.com'
const words: Array<string> = ["the", "walrus", "and", "carpenter", "were", "walking", "close", "at", "hand"];


@Injectable({
  providedIn: 'root'
})
export class RandomWordService {

  constructor(private httpClient: HttpClient) { }

  getWordFromInternet() : Observable<string>{
    const url = `${URL}/word?number=1`
    return this.httpClient.get<Array<string>>(url).pipe(map(words => words[0]));
  }

  nextRandomWordFromList(): string {
    const random = Math.floor(Math.random() * words.length);
    return words[random];
  }

}
