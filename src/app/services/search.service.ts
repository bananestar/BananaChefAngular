import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchTerm: Subject<string> = new Subject<string>();

  set searchTerm(value: string) {
    this._searchTerm.next(value);
    console.log(this._searchTerm);
  }

  get searchTerm(): Observable<string> {
    return this._searchTerm.asObservable();
  }
}
