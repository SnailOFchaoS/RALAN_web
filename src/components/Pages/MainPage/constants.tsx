import {InfoBlockProps, YouWillFindInfoBlockProps, ElseOfferInterface} from "@/components/Common/types"

import preparationImage from '../../../../assets/png/preparation.png';
import strategyImage from '../../../../assets/png/strategy.png';
import winningImage from '../../../../assets/png/winning.png';
import serviceImage from '../../../../assets/png/service.png';
import uniformImage from '../../../../assets/png/uniform.png';

export const YOU_WILL_FIND_ANIMATION_VALUES = {
  INFO_BLOCK_WIDTH: 1247,
  SUB_ARROW_X_START: 10,
  SUB_ARROW_X_END: 1257,
  NEW_ARROW_Y_START: -300,
  HOVER_Y: 275,
  ARROW_TOP_OFFSET: -262,
  ARROW_BOTTOM_OFFSET: 13,
} as const;

export const ELSE_OFFERS_ANIMATION_VALUES = {
  HOVER_Y: 246,
  ARROW_TOP_OFFSET: -200,
  ARROW_BOTTOM_OFFSET: 46,
} as const;

export const YOU_WILL_FIND_SUBTITLES = [
  { id: 1, title: "подготовка" },
  { id: 2, title: "стратегия" },
  { id: 3, title: "победа" },
] as const;

export const aboutUsInfo: InfoBlockProps[] = [
  {
    title:{
      text: 'МАСТЕРСТВО'
    },
    data:{
      text: 'Наши тренеры – настоящие профессионалы, чьи знания и опыт подтверждены личными победами.'
    }
  },{
    title:{
      text: 'ИНДИВИДУАЛИЗАЦИЮ',
      blockWidth: 590,
    },
    data:{
      text: 'Каждый спортсмен уникален. Мы создаем программы, учитывающие ваши цели, уровень подготовки и особенности.'
    }
  },{
    title:{
      text: 'ПОДДЕРЖКУ'
    },
    data:{
      text: 'Вы становитесь частью сообщества, где вас понимают и мотивируют на каждом этапе.'
    }
  },
]

export const YouWillFindTextData: YouWillFindInfoBlockProps[] = [
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
        text: 'Интервальние тренировки и тренировки в зоне аэробного порога'
      },
      {
        title: 'Увеличение общей выносливости',
        text: 'Длительные поездки по живописным местам в комфортном темпе'
      },
      {
        title: 'Прокачка техники',
        text: 'Техничные тренировки, на которых вы лучше овладеете велосипедом'
      }
    ],
    image: {
      src: preparationImage,
      positionX: -136,
      positionY: -188,
    }
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
        text: 'Тренировки в команде и совместное участине в гонках и заездах'
      },
    ],
    image: {
      src: strategyImage,
      positionX: -291,
      positionY: -297,
    }
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
    image: {
      src: winningImage,
      positionX: -137,
      positionY: -213,
    }
  },
]

export const bycicleService: ElseOfferInterface = {
  title: 'ВЕЛОСЕРВИС',
  textInfo:[{
    title: '一РЕМОНТ',
    data: 'Мы работаем с лучшими мастерами Москвы. Ремонт любой сложности в минимальные сроки. Ремонт карбоновых рам, трансмиссии, электронных переключателей Di2.'
  },{
    title: '一ОБСЛУЖИВАНИЕ',
    data: 'Выполняем мойку, чистку трансмиссии, замену колодок и проводим как базовое, так и полное ТО. Консультации по подбору инвентаря (велосипеды, шлемы, туфли, экипировка).'
  }],
  image: {
    src: serviceImage,
    positionX: -142,
    positionY: -201,
  }
}

export const bikeUniform: ElseOfferInterface = {
  title: 'КОМАНДНАЯ ФОРМА',
  textInfo:[{
    title: '一ЛЕТНЯЯ ФОРМА',
    data: 'Включает: летнюю гоночную джерси, короткие бибы и велоноски. Представьте себя в командной форме Ralan: яркий и выразительный дизайн не оставит вас незамеченным'
  },{
    title: '一ТЕПЛАЯ ФОРМА',
    data: 'Теплая форма состоит из лонгслива, ветрозащитной жилетки и рейтузов. Сдержанный дизайн с узнаваемым логотипом станет отличным дополнением к вашей летней форме.'
  }],
  image:{
    src: uniformImage,
    positionX: -201,
    positionY: -458,
  }
}