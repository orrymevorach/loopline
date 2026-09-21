'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './MenuLinks.module.scss';
import FoodMenu from '../FoodMenu/FoodMenu';

const menus = [
  { label: 'Food Menu', href: '#' },
  { label: 'Wine Menu', href: '#' },
  { label: 'Feature Menu', href: '#' },
];

export default function MenuLinks() {
  const [showFoodMenu, setShowFoodMenu] = useState(false);

  return (
    <>
      <ul className={styles.list}>
        {menus.map(({ label, href }, index) => {
          if (label === 'Food Menu') {
            return (
              <li key={label}>
                <button
                  type='button'
                  className={styles.link}
                  onClick={() => setShowFoodMenu(true)}
                >
                  {label}
                </button>
              </li>
            );
          }

          return (
            <li key={label}>
              <Link href={`menu-link-${href}-${index}`} className={styles.link}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      {showFoodMenu && <FoodMenu handleClose={() => setShowFoodMenu(false)} />}
    </>
  );
}
