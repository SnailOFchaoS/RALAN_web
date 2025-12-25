import firstImage from "../../../assets/png/Yan.png"
import secondImage from "../../../assets/png/Daria.png"

import { personDataInterface } from "@/components/Common/types"

export const representatives: personDataInterface[] = [
  {
    surname: 'ПЛЮТИНСКИЙ',
    name: 'Ян',
    patronymic: 'Витальевич',
    descriptionTop: 'Начинай  с тем что есть.',
    descriptionBottom: 'Окончил школу олимпийского резерва,\n12 лет в профессиональном велоспорте,\n8 лет тренерского стажа, основатель и идейный вдохновитель команды RALAN',
    achievements: [
      {
        text: 'Мастер спорта'
      },{
        text: 'Победитель первенства РФ'
      },
    ],
    image:{
      src: firstImage,
      closed:{
        positionX: -80,
        positionY: -100,
        scale: 1.2,
      },
      opened:{
        positionX: -110,
        positionY: -158,
      }
    }
  },{
    surname: 'Спирина',
    name: 'Дарья',
    patronymic: 'Васильевна',
    descriptionTop: 'Талант ускоряет старт. Система даёт результат. Грамотная работа с тренером помогает пройти этот путь быстрее и безопаснее',
    descriptionBottom: 'Мастер спорта, профессиональный гонщик МГСФО, член сборной России, тренер в команде RALAN',
    achievements: [
      {
        text: 'Победительница первенства Европы'
      },{
        text: '7-кратная чемпионка РФ'
      },{
        text: '5-кратная призерка мировых первенств'
      }
    ],
    image:{
      src: secondImage,
      closed:{
        positionX: -300,
        positionY: -220,
        scale: 1.3,
      },
      opened:{
        positionX: -395,
        positionY: -371,
      }
    }
  },
]
