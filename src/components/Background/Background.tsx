import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Background.module.scss';

const NOISE_CONFIG = {
    patternSize: 250,
    maxAlpha: 0.1,
    density: 0.3,
    noiseColor: 'rgb(69, 123, 157)',
    radius: 1,
    animationSpeed: 50,
};

interface BackgroundProps {
  backgroundColor?: string;
  isAnimated?: boolean;
}

const Background = ({ backgroundColor, isAnimated = false }: BackgroundProps) => {
  const [noiseSvgUrl, setNoiseSvgUrl] = useState('');
  const animationTimeoutRef = useRef<NodeJS.Timeout | number | null>(null); // useRef для ID таймера

  const generateNoiseSvg = useCallback(() => {
    const { patternSize, maxAlpha, density, noiseColor } = NOISE_CONFIG;
    let svgContent = '';

    for (let i = 0; i < patternSize * patternSize * density; i++) {
      const x = Math.random() * patternSize;
      const y = Math.random() * patternSize;
      const alpha = Math.random() * maxAlpha;
      svgContent += `<circle cx="${x}" cy="${y}" r="0.75" fill="${noiseColor}" fill-opacity="${alpha}" />`;
    }

    const svg = `<svg width="${patternSize}" height="${patternSize}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
    const base64Svg = `data:image/svg+xml;base64,${btoa(svg)}`;
    return base64Svg;
  }, []);

  useEffect(() => {
    const animate = () => {
      const newSvg = generateNoiseSvg();
      setNoiseSvgUrl(newSvg);
    };

    if (isAnimated) {
        animationTimeoutRef.current = setInterval(animate, NOISE_CONFIG.animationSpeed);
    } else {
        if (!noiseSvgUrl) {
             setNoiseSvgUrl(generateNoiseSvg());
        }
    }
    return () => {
      if (animationTimeoutRef.current) {
        clearInterval(animationTimeoutRef.current);
      }
    };
  }, [generateNoiseSvg, isAnimated, noiseSvgUrl]);

  const noiseBgStyle = {
    backgroundImage: noiseSvgUrl ? `url(${noiseSvgUrl})` : 'none',
    backgroundRepeat: 'repeat',
    backgroundSize: `${NOISE_CONFIG.patternSize}px ${NOISE_CONFIG.patternSize}px`,
  };

  return (
    <div className={styles.fixedBackground} style={{ backgroundColor: backgroundColor }}>
      <div className={styles.noizeBackground} style={noiseBgStyle}>
      </div>
    </div>
  );
};

export default Background;