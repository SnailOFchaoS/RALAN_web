import React from 'react';
import { Offer } from '@/store/slices/Offers/types';
import styles from './SeoOffersList.module.scss';

export interface SeoOffersListProps {
  offers: Offer[];
}

const SeoOffersList: React.FC<SeoOffersListProps> = ({ offers }) => {
  if (offers.length === 0) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <h3>Предложения и услуги</h3>
      <ul>
        {offers.map((item) => (
          <li key={item.id}>
            <strong>{item.offerName}</strong>
            {item.discipline?.length ? ` — ${item.discipline.join(', ')}` : ''}
            {item.date ? `, ${item.date}` : ''}
            {item.time ? `, ${item.time}` : ''}
            {item.level?.length ? `, уровень: ${item.level.join(', ')}` : ''}
            {` — ${item.price.toLocaleString('ru-RU')} р`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeoOffersList;
