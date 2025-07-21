import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown'; // Assuming ngx-markdown is used for rendering
import { MatChipsModule } from '@angular/material/chips';
import { Game } from '../data/games.data';
import { GameService } from '../services/game.service';
import { MarkdownService } from '../services/markdown.service';

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
  private readonly gameService: GameService = inject(GameService);
  private readonly markdownService: MarkdownService = inject(MarkdownService);

  public game = signal<Game | undefined>(undefined);
  public rulesMarkdown = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('id');
      if (gameId) {
        const foundGame = this.gameService.getGameById(gameId);
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
    this.markdownService.loadMarkdown(path).subscribe({
      next: (data) => {
        this.rulesMarkdown.set(data);
      },
    });
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
