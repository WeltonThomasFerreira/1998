import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { IconService } from './core/services/icon.service';
import { ResponsiveService } from './core/services/responsive.service';
import { ThemeService } from './core/services/theme.service';
import { GameService } from './features/game/services/game.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(MarkdownModule.forRoot()),
    IconService,
    ThemeService,
    ResponsiveService,
    GameService,
    MarkdownService,
  ],
};
