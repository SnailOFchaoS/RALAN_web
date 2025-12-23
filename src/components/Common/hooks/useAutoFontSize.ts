import { useLayoutEffect, useRef, useState } from 'react';
import { UseAutoFontSizeOptions } from './types';

export const useAutoFontSize = ({
  maxLines,
  initialFontSize,
  minFontSize = 12,
  step = 1,
  text,
  isVisible = true,
}: UseAutoFontSizeOptions & { isVisible?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [measured, setMeasured] = useState(false);

  useLayoutEffect(() => {
    if (!isVisible || measured) return;

    const element = ref.current;
    if (!element || !text) return;

    if (element.offsetWidth === 0) return;

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
    setMeasured(true);
  }, [initialFontSize, maxLines, minFontSize, step, text, isVisible, measured]);

  useLayoutEffect(() => {
    setMeasured(false);
  }, [text]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element && measured) {
      element.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize, measured]);

  return { ref, fontSize };
};
