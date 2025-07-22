// src/app/shared/pipes/filter-category-types/filter-category-types.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
// import { GAME_CATEGORIES } from '@domain/models/game.model'; // Removido: 'GAME_CATEGORIES' não é usado diretamente neste pipe

@Pipe({
  name: 'filterCategoryTypes',
  standalone: true, // Importante: Este pipe é standalone
})
export class FilterCategoryTypesPipe implements PipeTransform {
  /**
   * Transforma uma lista de tipos de categoria para incluir apenas aqueles que têm um valor
   * definido para um determinado jogo. Isso é útil para exibir apenas as categorias relevantes
   * como chips em um card de jogo.
   * @param allCategoryTypes Uma lista de todos os tipos de categoria disponíveis (ex: Object.values(GAME_CATEGORIES)).
   * @param gameCategories O objeto de categorias de um jogo específico (ex: game.categories). Pode ser undefined.
   * @returns Um array de strings contendo apenas os tipos de categoria que possuem um valor no jogo.
   */
  transform(
    allCategoryTypes: string[],
    gameCategories: { [key: string]: string } | undefined,
  ): string[] {
    if (!gameCategories) {
      return [];
    }
    // Filtra os tipos de categoria para incluir apenas aqueles que têm um valor não vazio no jogo
    return allCategoryTypes.filter(
      (type: string) =>
        gameCategories[type] !== undefined &&
        gameCategories[type] !== null &&
        gameCategories[type] !== '',
    );
  }
}
