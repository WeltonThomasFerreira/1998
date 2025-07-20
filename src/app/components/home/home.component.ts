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
  public readonly welcomeTitle: string = 'Bem-vindo ao 1998';
  public readonly welcomeSubtitle: string =
    'Descubra jogos incríveis para jogar com amigos!';
  public readonly cardText: string =
    'Aqui você encontrará uma coleção de jogos interessantes, começando com os clássicos de baralho. Prepare-se para a diversão!';
  public readonly exploreButtonLabel: string = 'Explorar Jogos';
}
