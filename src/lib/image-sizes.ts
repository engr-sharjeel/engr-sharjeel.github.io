// Mirrors the 1248px container, 640/800/1100px gutters and each media layout.
// sizes describes the image slot after borders/mattes, rather than the whole card.
export type ImageContext = 'card' | 'selected-wide' | 'flagship' | 'cover' | 'gallery' | 'experience' | 'certificate' | 'portrait';

export function imageWidths(sourceWidth: number): number[] {
  return [...new Set([320, 480, 640, 720, 800, 1000, 1248, 1600, 2200, Math.min(sourceWidth, 2200)].filter(width => width <= sourceWidth))].sort((a, b) => a - b);
}

export function imageSizes(context: ImageContext, kind = 'photo', aspectRatio?: number): string {
  const cardInset = kind === 'photo' ? 2 : 30;
  const slot = (container: number, viewport: boolean, breakpoint: number): string => {
    const width = viewport ? `100vw - ${container}px` : `${container}px`;
    const calc = (fraction: number, gap: number, inset: number) => viewport
      ? `calc((${width} - ${gap}px) * ${fraction} - ${inset}px)`
      : `${Math.round((container - gap) * fraction - inset)}px`;
    switch (context) {
      case 'card': case 'selected-wide':
        return breakpoint <= 640 ? calc(1, 0, cardInset)
          : breakpoint <= 800 ? calc(.5, context === 'selected-wide' ? 2 : 18, context === 'selected-wide' ? cardInset - 2 : cardInset)
          : calc(1 / 3, breakpoint <= 1100 ? 36 : 48, cardInset);
      case 'flagship':
        return calc(breakpoint <= 640 ? 1 : breakpoint <= 800 ? .5 : 1.15 / 2.15, 2, 36);
      case 'certificate':
        return calc(breakpoint <= 640 ? 1 : .5, breakpoint <= 640 ? 0 : 24, breakpoint <= 640 ? 26 : 38);
      case 'experience':
        return calc(breakpoint <= 640 ? 1 : .5, breakpoint <= 640 ? 0 : 24, breakpoint <= 640 ? 20 : 36);
      case 'portrait':
        return calc(breakpoint <= 640 ? 1 : breakpoint <= 800 ? .5 : 1 / 2.2, breakpoint <= 640 ? 0 : breakpoint <= 800 ? 28 : breakpoint <= 1100 ? 40 : breakpoint <= 1450 ? 70 : 100, 2);
      default: return calc(1, 0, breakpoint <= 640 ? 20 : 36);
    }
  };
  // The container stops growing at 1344px; the hero gap changes again at 1450px.
  const ranges = [[640, 40], [800, 48], [1100, 64], [1344, 96]];
  // Document previews have a 390px height cap; portrait images use a narrower slot.
  const framed = (value: string) => context === 'certificate' && aspectRatio
    ? `min(${value}, ${Math.round(390 * aspectRatio)}px)` : context === 'portrait' ? `min(${value}, 418px)` : value;
  const responsive = ranges.map(([breakpoint, gutter]) => `(max-width: ${breakpoint}px) ${framed(slot(gutter, true, breakpoint))}`);
  if (context === 'portrait') responsive.push(`(max-width: 1450px) ${framed(slot(1248, false, 1450))}`);
  return [...responsive, framed(slot(1248, false, 2000))].join(', ');
}
