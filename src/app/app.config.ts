// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

// Importa os serviços que precisam ser fornecidos globalmente
import { ThemeService } from '@application/services/theme/theme.service';
import { LanguageService } from '@application/services/language/language.service';
import { GameService } from '@application/services/game/game.service';

import { routes } from './app.routes';

/**
 * Configuração da aplicação Angular.
 * Define os provedores globais para a aplicação.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Provedores para o roteamento, usando HashLocationStrategy para GitHub Pages
    provideRouter(routes, withHashLocation()),
    // Provedores para as animações do navegador
    provideAnimations(),
    // Provedores para o HttpClient (necessário para ngx-markdown e futuras requisições)
    provideHttpClient(),
    // Importa módulos que precisam ser configurados globalmente (ex: MarkdownModule.forRoot())
    importProvidersFrom(MarkdownModule.forRoot()),
    // Explicitamente fornece os serviços para garantir que sejam injetáveis no root injector
    ThemeService,
    LanguageService,
    GameService,
  ],
};
