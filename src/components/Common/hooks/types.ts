export interface ElementViewportStatus {
  isVisible: boolean;
  isAboveViewport: boolean;
  isBelowViewport: boolean;
}

export interface UseAutoFontSizeOptions {
  maxLines: number;
  initialFontSize: number;
  minFontSize?: number;
  step?: number;
  text: string;
}
