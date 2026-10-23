import AboutHero from './AboutHero/AboutHero';
import ContactForm from './ContactForm/ContactForm';
import StaffMembers from './StaffMembers/StaffMembers';
import image from 'public/about-banner.jpg';
import Image from 'next/image';
import styles from './About.module.scss';

export default function About({ about, staffMembers }) {
  return (
    <>
      <AboutHero description={about?.description} image={about?.image} />
      <StaffMembers staffMembers={staffMembers} />
      <ContactForm />
      <div className={styles.imageContainer}>
        <Image
          src={image.src}
          className={styles.image}
          width={image.width}
          height={image.height}
          quality={100}
        />
      </div>
    </>
  );
}
