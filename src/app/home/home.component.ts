import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { character } from '../interfaces/character';
import { ApiResponse } from '../interfaces/ApiResponse';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  data: character[] = [];
  Characters: character[] = [];
  nextUrl: string | null = null;
  prevUrl: string | null = null;
  busqueda: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarPersonajes('https://rickandmortyapi.com/api/character');
  }

  cargarPersonajes(url: string): void {
    this.apiService.getCharacters(url).subscribe((response: ApiResponse) => {
      this.data = response.results;
      this.Characters = response.results;
      this.nextUrl = response.info.next;
      this.prevUrl = response.info.prev;
    });
  }

  cargarSiguiente(): void {
    if (this.nextUrl) {
      this.cargarPersonajes(this.nextUrl);
    }
  }
  cargarAnterior(): void {
    if (this.prevUrl) {
      this.cargarPersonajes(this.prevUrl);
    }
  }
  
  buscarPersonaje(): void {
    let url = 'https://rickandmortyapi.com/api/character/?';
    const params = [];
    if (this.busqueda.trim()) {
      params.push(`name=${this.busqueda.trim()}`);
    }
    if (params.length > 0) {
      url += params.join('&');
    }
    this.apiService.getCharacters(url).subscribe((response: ApiResponse) => {
      this.data = response.results;
      this.Characters = [...this.data];
      this.nextUrl = response.info.next;
      this.prevUrl = response.info.prev;
    });
  }
}