import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _welcomeTitle: string = 'Bem-vindo ao 1998';
  private readonly _welcomeSubtitle: string =
    'Descubra jogos incríveis para jogar com amigos!';
  private readonly _cardText: string =
    'Aqui você encontrará uma coleção de jogos interessantes, começando com os clássicos de baralho. Prepare-se para a diversão!';
  private readonly _exploreButtonLabel: string = 'Explorar Jogos';

  public get welcomeTitle(): string {
    return this._welcomeTitle;
  }

  public get welcomeSubtitle(): string {
    return this._welcomeSubtitle;
  }

  public get cardText(): string {
    return this._cardText;
  }

  public get exploreButtonLabel(): string {
    return this._exploreButtonLabel;
  }
}
