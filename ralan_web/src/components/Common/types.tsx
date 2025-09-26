import { StaticImageData } from 'next/image';

export interface InfoBlockProps{
  data?:{
    color?: string,
    text: string,
    fontSize?: number,
    blockWidth?: number,
  },
  title?:{
    color?: string,
    text: string,
    fontSize?: number,
    blockWidth?: number,
  }
  block?: {
    styles: React.CSSProperties,
  }
}

export interface YouWillFindInfoBlockProps{
  id: number,
  title: string,
  openedColor?: string,
  textInfo:{
    title?: string,
    text?: string
  }[]
  image:{
    src: StaticImageData,
    positionX: number,
    positionY: number,
  }
}

export interface personDataInterface{
  surname: string,
  name: string,
  patronymic: string,
  descriptionTop: string,
  descriptionBottom: string,
  achievements: {
    text: string,
  }[],
  image:{
    src: StaticImageData,
    closed:{
      positionX: number,
      positionY: number,
      scale: number,
    },
    opened:{
      positionX: number,
      positionY: number,
    }
  }
}