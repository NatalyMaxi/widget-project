/**
 * Возвращает значение паддинга страницы в зависимости от ширины окна
 * @param windowWidth - текущая ширина окна
 */

export const getPagePadding = (windowWidth: number): number => {
  if (windowWidth >= 1920) return 460;
  if (windowWidth >= 1280) return 240;
  if (windowWidth >= 900) return 120;
  if (windowWidth >= 768) return 80;
  return 32;
};
