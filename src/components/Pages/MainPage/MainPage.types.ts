import { RefObject } from 'react';

export interface NavigationElement {
  text: string;
  ref: RefObject<HTMLDivElement | null>;
}

export interface TopContentEndPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MainPageContextType {
  laptopScale: number;
  mainPageRef: RefObject<HTMLDivElement | null>;
  mainLogoImageRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoImageRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  mainLogoTextRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoTextRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  mainLogoArrowRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoArrowRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  isMenuVisible?: boolean;
  setIsMenuVisible?: (isMenuVisible: boolean) => void;
  topContentEndPosition?: TopContentEndPosition | null;
  setTopContentEndPosition?: (position: TopContentEndPosition | null) => void;
  isAtDefaultPosition?: boolean;
  setIsAtDefaultPosition?: (isAtDefault: boolean) => void;
  isTopContentHidden?: boolean;
  setIsTopContentHidden?: (isHidden: boolean) => void;
}
