'use client';

import Image from 'next/image';
import Takeover from '@/components/shared/Takeover/Takeover';
import Button from '@/components/shared/Button/Button';
import styles from './FoodMenu.module.scss';

const hours = [
  {
    label: 'Wine Bar',
    schedule: 'Wednesday through Saturday · 5pm to 10pm',
  },
  {
    label: 'Snack Bar (All Day)',
    schedule:
      'Wednesday through Saturday · 12pm to 5pm  |  Sunday through Tuesday · 12pm to 8pm',
  },
];

const snacks = [
  {
    name: 'Bread of the Day',
    description: 'blackbird sour dough, garlic herb butter',
  },
  {
    name: 'Citrus Marinated Olives',
    description: 'castelvetrano, citrus, spices',
  },
  {
    name: 'Green Olive Tapenade',
    description:
      'castelvetrano, pine nut, almond, confit garlic, green & aleppo chili, served with warmed blackbird sourdough bread',
  },
  {
    name: 'Duck Liver Mousse',
    description:
      'by chef ryan crawford; served with crostini & house blueberry apricot sauce',
  },
  {
    name: 'Charcuterie Board',
    description: '2 cheeses, 2 cured meats, crostini, chips & accompaniments',
    image: '/menu/charcuterie.jpg',
  },
  {
    name: 'Tinned Seafood Board',
    description:
      'served with bread, butter, chips & pickles; your choice of brisling sardines with lemon, sardines in tomato & peppers or octopus in olive oil (+6)',
  },
];

const plates = [
  {
    name: 'Classic Gilda',
    description: 'anchovy, guindilla pepper & olive',
  },
  {
    name: 'House Pintxos',
    description: 'tuna belly, quail egg, roasted red pepper & aioli',
  },
  {
    name: 'Idurain',
    description: 'tuna belly, anchovy, pepper, olive & pickled onion',
  },
  {
    name: 'Steak Tartare',
    description:
      'flank steak, shallots, cornichons, chives, truffle aioli, quail egg, shaved pressed caviar',
    image: '/menu/steak tartare.jpg',
  },
  {
    name: 'Swordfish Crudo',
    description:
      "jalapeño tomatillo sauce, nikkei tiger's milk, crème fraîche, pearl onion & chile crisp",
  },
  {
    name: 'Seared Leeks & Romesco',
    description:
      'braised leeks, red peppers, tomatoes, almonds garlic & smoked paprika',
  },
  {
    name: 'New Potatoes',
    description:
      'red mini potatoes, mascarpone, pecorino, guanciale, calabrian chilli crisp, cured egg yolk, black pepper, chive',
  },
  {
    name: 'Duck Tartine',
    description:
      'confit duck, granny smith apple, pickled shallot, fermented ramp, maple brown butter dijon, chive',
    image: '/menu/duck tartine.jpg',
  },
];

const cheesesAndCuredMeats = [
  'Mimolette',
  'Chaumes',
  'Blue Moo',
  "Sir Laurier D'Arthabaska",
  'Grand Cru',
  'Rostte de Lyon',
  'Jesus de Lyon',
  'Bresaola',
  'Jambon Truffe',
  'Ovaly',
];

export default function FoodMenu({ handleClose }) {
  return (
    <Takeover
      handleClose={handleClose}
      modalClassNames={styles.modal}
      closeButtonClassNames={styles.closeButton}
    >
      <div className={styles.menu}>
        <div className={styles.header}>
          <h1 className={styles.title}>Food Menu</h1>
          <Button
            handleClick={() => window.print()}
            classNames={styles.downloadButton}
          >
            Download PDF
          </Button>
        </div>

        <div className={styles.hours}>
          {hours.map(({ label, schedule }) => (
            <p key={label} className={styles.hoursItem}>
              <span className={styles.hoursLabel}>{label}:</span> {schedule}
            </p>
          ))}
        </div>

        <h2 className={styles.rhythmsTitle}>The food follows two rhythms.</h2>
        <p className={styles.description}>
          The Snack Bar runs all day and into the evening: bread and butter,
          citrus olives, tapenade, tinned fish, cheese and charcuterie. At
          night, the Wine Bar builds on that foundation, with the full snack
          menu plus larger plates like steak tartare, duck tartine, crudo, and
          seasonal dishes built to sit alongside a great bottle.
        </p>

        <div className={styles.introImageRow}>
          <Image
            src='/menu/MG_4979_480x480.webp'
            alt='A dish from the Loopline food menu'
            width={480}
            height={480}
            className={styles.introImage}
          />
          <p className={styles.disclaimer}>
            *All menu items are subject to change
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Snacks</h2>
          <Image
            src='/menu/snacks.jpg'
            alt='Snacks from the Loopline food menu'
            width={640}
            height={427}
            className={styles.sectionImage}
          />
          <ul className={styles.itemList}>
            {snacks.map(({ name, description, image }) => (
              <li key={name} className={styles.item}>
                {image && (
                  <Image
                    src={image}
                    alt={name}
                    width={640}
                    height={427}
                    className={styles.itemImage}
                  />
                )}
                <p className={styles.itemName}>{name}</p>
                <p className={styles.itemDescription}>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Plates</h2>
          <Image
            src='/menu/plates.jpg'
            alt='Plates from the Loopline food menu'
            width={640}
            height={427}
            className={styles.sectionImage}
          />
          <ul className={styles.itemList}>
            {plates.map(({ name, description, image }) => (
              <li key={name} className={styles.item}>
                {image && (
                  <Image
                    src={image}
                    alt={name}
                    width={640}
                    height={427}
                    className={styles.itemImage}
                  />
                )}
                <p className={styles.itemName}>{name}</p>
                <p className={styles.itemDescription}>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cheeses &amp; Cured Meats</h2>
          <Image
            src='/menu/lemongrass.jpg'
            alt='Cheeses and cured meats from the Loopline food menu'
            width={640}
            height={427}
            className={styles.sectionImage}
          />
          <ul className={styles.cheeseList}>
            {cheesesAndCuredMeats.map(item => (
              <li key={item} className={styles.cheeseItem}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Takeover>
  );
}
