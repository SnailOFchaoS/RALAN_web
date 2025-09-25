import {InfoBlockProps, YouWillFindInfoBlockProps} from "@/components/Common/types"

import preparationImage from '../../../../assets/png/preparation.png';
import strategyImage from '../../../../assets/png/strategy.png';
import winningImage from '../../../../assets/png/winning.png';

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