/**
 * Возвращает CSS‑классы в зависимости от value:
 * - значения выше positiveThreshold → positiveClass
 * - ниже negativeThreshold → negativeClass
 * - иначе → defaultClass
 * @param value числовое значение виджета
 * @param thresholds пороговые значения { positive: number; negative: number }
 * @param classes CSS-классы { default: string; positive: string; negative: string }
 */
export function getValueColorClass(
  value: number,
  thresholds: { positive: number; negative: number },
  classes: { default: string; positive: string; negative: string },
): string {
  if (value > thresholds.positive) {
    return `${classes.default} ${classes.positive}`;
  }
  if (value < thresholds.negative) {
    return `${classes.default} ${classes.negative}`;
  }
  return classes.default;
}
