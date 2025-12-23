import { useEffect, useRef, useState } from 'react';
import { UseAutoFontSizeOptions } from './types';

export const useAutoFontSize = ({
  maxLines,
  initialFontSize,
  minFontSize = 12,
  step = 1,
  text,
}: UseAutoFontSizeOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let currentSize = initialFontSize;
    element.style.fontSize = `${currentSize}px`;

    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight) || currentSize * 1.2;
    const maxHeight = lineHeight * maxLines;

    while (element.scrollHeight > maxHeight && currentSize > minFontSize) {
      currentSize -= step;
      element.style.fontSize = `${currentSize}px`;
    }

    setFontSize(currentSize);
  }, [initialFontSize, maxLines, minFontSize, step, text]);

  return { ref, fontSize };
};
