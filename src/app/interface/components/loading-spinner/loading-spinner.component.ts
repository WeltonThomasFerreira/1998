// src/app/interface/components/loading-spinner/loading-spinner.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para NgIf, NgFor, etc.
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa o módulo do spinner

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true, // Componente standalone
  imports: [
    CommonModule,
    MatProgressSpinnerModule, // Importa o módulo do spinner do Angular Material
  ],
})
export class LoadingSpinnerComponent {
  constructor() {}
}
