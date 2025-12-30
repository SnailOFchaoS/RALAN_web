import { StaticImageData } from 'next/image';
import { personDataInterface } from '@/components/Common/types';

export interface ImageConfig {
  src: StaticImageData;
  width: number;
  height: number;
  top: number;
  left: number;
  openedWidth: number;
  openedHeight: number;
  openedTop: number;
  openedLeft: number;
}

export interface OpenedCardProps {
  person: personDataInterface;
  imageConfig: ImageConfig;
}

