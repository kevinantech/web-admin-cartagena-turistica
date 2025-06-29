import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fakeLoading(ms: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

// ----------------------------------------------------------------------------
// VALIDACIONES
// ----------------------------------------------------------------------------

export type Range = {
  from: number;
  to: number;
};

/**
 * Valida que los rangos sean válidos y consecutivos
 *
 * Un rango es válido si:
 * - Empieza desde globalMin
 * - Termina en globalMax
 * - No hay números repetidos
 * - Es consecutivo con el rango anterior
 *
 * Ejemplo de rangos válidos:
 * ```ts
 * const ranges = [
 *   { from: 1, to: 3 },
 *   { from: 4, to: 6 },
 *   { from: 7, to: 10 }
 * ];
 * isValidRanges(ranges, 1, 10) // devuelve true
 * ```
 *
 * Ejemplo de rangos inválidos:
 * ```ts
 * const ranges = [
 *   { from: 2, to: 5 },  // No empieza desde globalMin (1)
 *   { from: 7, to: 10 }  // No es consecutivo con el rango anterior
 * ];
 * isValidRanges(ranges, 1, 10) // devuelve false
 * ```
 * @param ranges Rango de números enteros
 * @param globalMin Límite inferior
 * @param globalMax Límite superior
 * @returns
 */
export function isValidRanges(
  ranges: Range[],
  globalMin: number,
  globalMax: number
): boolean {
  if (!ranges.length) return false;

  // Ordenar por rango inicial
  const sorted = [...ranges].sort((a, b) => a.from - b.from);

  // El primer rango debe empezar desde globalMin
  if (sorted[0].from !== globalMin) return false;

  for (let i = 0; i < sorted.length; i++) {
    const { from, to } = sorted[i];

    // Cada rango debe estar dentro de los límites
    if (from < globalMin || to > globalMax || from > to) return false;

    // Validar que los rangos sean consecutivos
    if (i > 0) {
      const prev = sorted[i - 1];
      if (from !== prev.to + 1) return false;
    }
  }

  // El último rango debe terminar en globalMax
  const last = sorted[sorted.length - 1];
  return last.to === globalMax;
}

export type ExtractArrayPayload<T> = T extends (infer U)[] ? U : T;
