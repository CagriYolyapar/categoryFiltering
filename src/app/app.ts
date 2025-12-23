import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('categoryFiltering');

  categories = signal<string[]>([
    'Bilgisayarlar',
    'Tabletler',
    'Telefonlar',
    'Oyuncaklar',
    'Süs Esyaları',
    'Kitaplar',
  ]);

  /* 
  Arama metni (input'tan gelen metin)
  */

  searchText = signal<string>('');

  filteredCategories = computed(() => {
    const query = this.searchText().trim().toLowerCase();
    const list = this.categories();

    if (query.length === 0) return list;

    return list.filter((x) => x.toLowerCase().includes(query));
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
  }
}
