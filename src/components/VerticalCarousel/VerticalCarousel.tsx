import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './VerticalCarousel.module.scss';
import { CurrencyType } from '@shared/СurrencyPrefix';

interface IProps {
  data: CurrencyType;
  leadingText: string;
}

export const VerticalCarousel: FC<IProps> = ({ data, leadingText }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev > data.length ? 1 : prev + 1));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const halfwayIndex = Math.ceil(data.length / 2);
  const itemHeight = 20;

  const determinePlacement = (itemIndex: number): number => {
    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(data.length + activeIndex - itemIndex) * itemHeight;
      }
    }
    if (activeIndex === itemIndex) {
      return 0;
    } else if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    } else if (activeIndex - itemIndex >= halfwayIndex) {
      return (data.length - (activeIndex - itemIndex)) * itemHeight;
    }
    return -(activeIndex - itemIndex) * itemHeight;
  };

  return (
    <div className={styles.carousel}>
      <p className={styles.heading}>{leadingText}</p>
      <div className={styles.items}>
        {data.map(([key, value], i: number) => (
          <p
            className={cn(`${styles.item} ${Math.abs(determinePlacement(i)) <= 10 && styles.visible}`)}
            key={key}
            style={{
              transform: `translateY(${determinePlacement(i)}px)`,
            }}
          >
            {value} {key}
          </p>
        ))}
      </div>
    </div>
  );
};
