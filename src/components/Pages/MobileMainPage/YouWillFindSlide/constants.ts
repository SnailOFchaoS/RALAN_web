import { StaticImageData } from 'next/image';

import preparationMobileImage from '../../../../../assets/png/preparation_mobile.png';

export interface SectionInfo {
  title: string;
  text: string;
}

export interface YouWillFindSection {
  id: number;
  title: string;
  openedColor: string;
  textInfo: SectionInfo[];
  image: StaticImageData;
}

export const YOU_WILL_FIND_SUBTITLES = [
  { id: 1, title: "подготовка" },
  { id: 2, title: "стратегия" },
  { id: 3, title: "победа" },
] as const;

export const YOU_WILL_FIND_SECTIONS: YouWillFindSection[] = [
  {
    id: 1,
    title: "ПОДГОТОВКА",
    openedColor: '#D91722',
    textInfo: [
      {
        title: 'Рост силы',
        text: 'Силовые тренировки на уникальном спортивном объекте'
      },
      {
        title: 'Улучшение МПК',
        text: 'Интервальные тренировки и тренировки в зоне аэробного порога'
      },
      {
        title: 'Увеличение выносливости',
        text: 'Длительные поездки по живописным местам в комфортном темпе'
      },
      {
        title: 'Прокачка техники',
        text: 'Техничные тренировки, на которых вы лучше овладеете велосипедом'
      }
    ],
    image: preparationMobileImage
  },
  {
    id: 2,
    title: "СТРАТЕГИЯ",
    openedColor: '#457B9D',
    textInfo: [
      {
        title: 'Анализ',
        text: 'Анализируем сильные и слабые стороны, разбираем выступления на гонках'
      },
      {
        title: 'Изучение трассы',
        text: 'Подводящие к гонке тренировки и подготовка исходя из специфики трассы'
      },
      {
        title: 'Совместные тренировки',
        text: 'Тренировки в команде и совместное участие в гонках и заездах'
      },
    ],
    image: preparationMobileImage // TODO: заменить на strategy_mobile когда появится
  },
  {
    id: 3,
    title: "ПОБЕДА",
    openedColor: '#FFFFF0',
    textInfo: [
      {
        title: 'Партнеры',
        text: 'Благодаря партнерам мы получаем все необходимое для гонки и восстановления'
      },
      {
        title: 'Место отдыха',
        text: 'Точка отдыха и финальной технической подготовки в предстартовом городке.'
      },
      {
        title: 'Работа в команде',
        text: 'Вместе активно готовимся, вместе смело участвуем, вместе уверенно побеждаем.'
      },
    ],
    image: preparationMobileImage // TODO: заменить на winning_mobile когда появится
  },
];

