import { Swatch } from '@vibrant/color/lib/index';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';

export interface ColorPalette {
  vibrant: Swatch;
  lightVibrant: Swatch;
  darkVibrant: Swatch;
}

export const useColorPalette = () => {
  const getHighestPopulationWithBestContrast = (palette: ColorPalette, colorToMatchAgainst: string): string => {
    extend([a11yPlugin, labPlugin]);
    const paletteArray = [palette.vibrant, palette.lightVibrant, palette.darkVibrant];

    const sortedByPopulation = paletteArray.toSorted((a, b) => b.population - a.population);

    // Check if the most populated color fulfills contrast standards. If not check for the color with the second most
    // population and so on...
    for (const current of sortedByPopulation) {
      const color = colord(current);

      if (color.isReadable(colorToMatchAgainst, { level: 'AA', size: 'normal' })) {
        console.log(color.toHex(), 'is readable against', colorToMatchAgainst, '-> returning');
        return current.hex;
      }
    }

    // Apparently, not even the darkest variant fulfills contrast standards,
    // so we darken the most populated color until it does.
    let darkenedColor = colord(sortedByPopulation[0]);
    do {
      darkenedColor = darkenedColor.darken(0.1);
    } while (darkenedColor.contrast(colorToMatchAgainst) < 4.5);

    let indexOfSmallestDelta = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < sortedByPopulation.length; i++) {
      if (colord(sortedByPopulation[i]).delta(darkenedColor) < indexOfSmallestDelta) {
        indexOfSmallestDelta = i;
      }
    }
    return darkenedColor.toHex();
  };

  return { getHighestPopulationWithBestContrast };
};
