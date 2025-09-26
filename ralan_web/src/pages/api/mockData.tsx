import firstImage from "../../../assets/png/Yan.png"
import secondImage from "../../../assets/png/Daria.png"

import { personDataInterface } from "@/components/Common/types"

export const representatives: personDataInterface[] = [
  {
    surname: 'ПЛЮТИНСКИЙ',
    name: 'Ян',
    patronymic: 'Витальевич',
    descriptionTop: 'осталось место, бахним сюда какую-н будь мотивационную фразу',
    descriptionBottom: '3-и достижения выше - основные. Здесь можно зассказать о себе, перечислить мнее значимые достижения, сказать еще пару красивых слов. Крч, все, на что хватит места',
    achievements: [
      {
        text: 'ПОБЕДИТЕЛЬ ТОГО-ТО'
      },{
        text: 'ЗАНЯЛ N-е МЕСТО ТАМ-ТО'
      },{
        text: 'ОДОЛЕЛ ТОТО-ТО'
      }
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
    descriptionTop: 'осталось место, бахним сюда какую-н будь мотивационную фразу',
    descriptionBottom: '3-и достижения выше - основные. Здесь можно зассказать о себе, перечислить мнее значимые достижения, сказать еще пару красивых слов. Крч, все, на что хватит места',
    achievements: [
      {
        text: 'ПОБЕДИТЕЛЬ ТОГО-ТО'
      },{
        text: 'ЗАНЯЛ N-е МЕСТО ТАМ-ТО'
      },{
        text: 'ОДОЛЕЛ ТОТО-ТО'
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