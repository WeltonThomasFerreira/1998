// src/app/application/services/language/language.service.ts

import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  TRANSLATIONS,
  TranslationContent,
} from '@shared/constants/app.constants';

/**
 * Serviço de aplicação para gerenciar o idioma da aplicação e fornecer traduções.
 * Usa BehaviorSubject para o idioma atual e um sinal para as traduções.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLanguage = new BehaviorSubject<string>(
    localStorage.getItem('language') || 'pt',
  );
  public readonly currentLanguage$: Observable<string> =
    this._currentLanguage.asObservable();

  // Sinal para as traduções, atualizado sempre que o idioma muda
  public translations = signal<TranslationContent>(
    TRANSLATIONS[this._currentLanguage.getValue()],
  );

  constructor() {
    // Atualiza o sinal de traduções sempre que o idioma muda
    this.currentLanguage$.subscribe((lang) => {
      this.translations.set(TRANSLATIONS[lang]);
    });
  }

  /**
   * Retorna o idioma atual (valor direto).
   */
  get currentLanguage(): string {
    return this._currentLanguage.getValue();
  }

  /**
   * Alterna o idioma da aplicação entre português e inglês.
   */
  toggleLanguage(): void {
    const newLanguage = this._currentLanguage.getValue() === 'pt' ? 'en' : 'pt';
    this._currentLanguage.next(newLanguage);
    localStorage.setItem('language', newLanguage);
  }
}
