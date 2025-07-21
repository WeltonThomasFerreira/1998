import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GAMES_DATA, Game } from '../../data/games.data';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { marked } from 'marked';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MarkdownModule,
    MatChipsModule,
  ],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  public game = signal<Game | undefined>(undefined);
  public rulesMarkdown = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('id');
      if (gameId) {
        const foundGame = GAMES_DATA.find((game) => game.id === gameId);
        if (foundGame) {
          this.game.set(foundGame);
          this.loadMarkdownRules(foundGame.rulesPath);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  private loadMarkdownRules(path: string): void {
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (data) => {
        const parsedHtml = marked.parse(data, {
          gfm: true,
          breaks: true,
          async: false,
        });
        this.rulesMarkdown.set(parsedHtml);
      },
      error: (err) => {
        console.error('Falha ao carregar markdown:', err);
        this.rulesMarkdown.set(
          'Não foi possível carregar as regras deste jogo.',
        );
      },
    });
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
