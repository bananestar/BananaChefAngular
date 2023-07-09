import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Jwt } from 'src/app/models/jwt/jwt';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { SearchService } from 'src/app/services/search.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faSearch = faSearch;
  user: Jwt | null = this._storageService.isLoggedIn()
    ? this._jwtService.decodeToken(this._storageService.getUser())
    : null;

  isLogged!: boolean;

  searchQuery: string = '';

  constructor(
    private _storageService: StorageService,
    private _jwtService: JwtService,
    private _searchService: SearchService,
    private _routerService: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this._storageService.isLoggedIn();
  }

  logout(): void {
    this._storageService.clean();
    this.isLogged = this._storageService.isLoggedIn();
    this._routerService.navigateByUrl('/home');
  }

  onSearch(): void {
    this._searchService.searchTerm = this.searchQuery;
  }
}
