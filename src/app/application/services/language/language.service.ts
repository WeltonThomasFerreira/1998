// src/app/application/services/language/language.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TRANSLATIONS, Translations } from '@shared/constants/app.constants'; // Importa a interface Translations

/**
 * Serviço de aplicação para gerenciar o idioma da aplicação.
 * Ele persiste a preferência do usuário no localStorage e fornece as traduções
 * para os componentes.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLanguage: BehaviorSubject<string>;

  constructor() {
    const initialLanguage = localStorage.getItem('language') || 'pt';
    this._currentLanguage = new BehaviorSubject<string>(initialLanguage);
  }

  get currentLanguage$(): Observable<string> {
    return this._currentLanguage.asObservable();
  }

  get currentLanguage(): string {
    return this._currentLanguage.value;
  }

  /**
   * Retorna o objeto de traduções para o idioma atual.
   * Usa um index signature para acessar TRANSLATIONS com uma string.
   * @returns Objeto de traduções.
   */
  get translations(): Translations['pt'] {
    // Tipagem corrigida para retornar TranslationContent
    // O 'as Translations' é uma asserção de tipo para garantir que TypeScript
    // entenda que TRANSLATIONS é indexável por string, mesmo que o tipo literal
    // de TRANSLATIONS não tenha um index signature direto.
    // No entanto, com a interface `Translations` aplicada diretamente ao `TRANSLATIONS` constante,
    // essa asserção pode ser simplificada.
    return (TRANSLATIONS as Translations)[this._currentLanguage.value];
  }

  toggleLanguage(): void {
    const newLanguage = this._currentLanguage.value === 'pt' ? 'en' : 'pt';
    this._currentLanguage.next(newLanguage);
    localStorage.setItem('language', newLanguage);
  }
}
