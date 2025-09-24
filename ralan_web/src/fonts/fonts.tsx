import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';

const tacticSansBold = localFont({
  src: [
    {
      path: '../../assets/fonts/tactic-sans-extra-extended/TacticSansExtExd-Bld.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/tactic-sans-extra-extended/TacticSansExtExd-Bld.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--tactic-sans-bold',
});

const tacticSansRegular = localFont({
  src: [
    {
      path: '../../assets/fonts/tactic-sans-extra-extended/TacticSansExtExd-Reg.woff2', // Теперь путь начинается с /
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/tactic-sans-extra-extended/TacticSansExtExd-Reg.woff', // Теперь путь начинается с /
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--tactic-sans-regular',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export {
  tacticSansBold, 
  tacticSansRegular,
  montserrat
};
