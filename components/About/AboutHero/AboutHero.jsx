import SplitSection from '@/components/shared/SplitSection/SplitSection';
import image from 'public/about-hero.png';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  return (
    <SplitSection imageWidth={615} image={image} priority>
      <div className={styles.content}>
        <h1 className={styles.title}>About</h1>
        <div className={styles.text}>
          <p>
            Loop Line Wine &amp; Food is a haven for fine wine lovers. A store
            by day and engaging wine bar at night, we are a fun and immersive
            place to taste, savour and purchase a collection of wines from some
            of the most revered and undiscovered vineyards around the globe.
            With a debut list of over 150 selections &amp; focusing on
            sustainable, estate-grown, and classic but trending styles, we
            intend to become a community hub for wine enthusiasts and wine
            colleagues.
          </p>
          <p>
            Like many wines, our namesake was born out of a salute to community,
            place and time. Cornered on Loop Line Lane, the history of the
            Church St. streetcar which ran east via Dupont, Avenue Road and
            Bloor to Church, then south to loop via Front, Yonge and Wellington,
            is commemorated. The Christie Loop continued until 1963 when the
            University subway opened.
          </p>
          <p>
            Its contemporary but cozy feel is created by the inherent warmth of
            floor to ceiling wine bottles housed in Bene Boxes. The space is
            rounded out with a show-stopping bar and pieces from the collections
            of artists Alex McLeod &amp; Graham Girard.
          </p>
        </div>
      </div>
    </SplitSection>
  );
}
