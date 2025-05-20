declare module '@mojs/core' {
  export interface ShapeOptions {
    shape?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | { [key: number]: number };
    radius?: number | { [key: number]: number } | { [key: number]: number[] };
    easing?: string | ((progress: number) => number);
    duration?: number;
    parent?: HTMLElement;
    delay?: number;
    x?:
      | number
      | { [key: number]: number }
      | { to: number; easing?: string | ((progress: number) => number) };
    scale?:
      | {
          [key: number]: number;
          easing?: string | ((progress: number) => number);
        }
      | { to: number; easing?: string | ((progress: number) => number) };
  }

  export interface BurstOptions {
    radius?: number | { [key: number]: number };
    angle?: string | number;
    count?: number;
    timeline?: { delay: number };
    parent?: HTMLElement;
    x?: number;
    children?: {
      radius?: number[];
      fill?: string;
      scale?: {
        [key: number]: number;
        easing?: string | ((progress: number) => number);
      };
      pathScale?: (number | null)[];
      degreeShift?: (string | null)[];
      duration?: number;
      easing?: string | ((progress: number) => number);
    };
  }

  export interface TweenOptions {
    duration?: number;
    onStart?: () => void;
    onComplete?: () => void;
    onUpdate?: (progress: number) => void;
  }

  export interface HtmlOptions {
    el?: HTMLElement;
    x?:
      | { [key: number]: number }
      | { to: number; easing?: string | ((progress: number) => number) };
    duration?: number;
    easing?: string | ((progress: number) => number);
    opacity?: number;
  }

  export class Shape {
    constructor(options: ShapeOptions);
    then(options: ShapeOptions): Shape;
  }

  export class Burst {
    constructor(options: BurstOptions);
  }

  export class Tween {
    constructor(options: TweenOptions);
  }

  export class Html {
    constructor(options: HtmlOptions);
    then(options: HtmlOptions): Html;
  }

  export class Timeline {
    add(animations: any[]): Timeline;
    play(): void;
  }

  export class CustomShape {
    getShape(): string;
    getLength(): number;
  }

  export function addShape(name: string, shape: typeof CustomShape): void;

  export const easing: {
    path(path: string): (progress: number) => number;
  };
}
