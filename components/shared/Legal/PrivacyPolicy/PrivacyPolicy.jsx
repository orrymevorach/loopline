import { ROUTES } from '@/utils/constants';
import Wrapper from '../../Wrapper/Wrapper';
import styles from '../Legal.module.scss';

export default function PrivacyPolicy() {
  return (
    <Wrapper classNames={styles.wrapper} isSmall>
      <h1>Privacy Policy</h1>
      <p className={styles.margin}>
        Effective Date: <span className={styles.bold}>February 11, 2025</span>
      </p>
      <p>
        Welcome to Loopline ( &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;). This Privacy Policy describes how we collect, use,
        and share your personal information when you visit or interact with our
        Site.
      </p>

      <p className={styles.heading}>Information We Collect</p>

      <p>We may collect the following types of information:</p>
      <ul>
        <li>Personal Information: Name, email address, phone number</li>
        <li>
          Usage Data: IP address, browser type, pages visited, and interactions
          with the Site
        </li>
        <li>
          Cookies and Tracking Technologies: To enhance user experience and for
          analytics.
        </li>
      </ul>

      <p className={styles.heading}>How We Use Your Information</p>
      <p>We use your information for purposes such as:</p>
      <ul>
        <li>Providing and improving our services</li>
        <li>
          Marketing and promotional communications (you can opt out at any time)
        </li>
        <li>Compliance with legal obligations</li>
      </ul>

      <p className={styles.heading}>Sharing Your Information</p>
      <p>
        We do not sell your personal information. However, we may share data
        with:
      </p>
      <ul>
        <li>Service providers (hosting services)</li>
        <li>Legal authorities, if required by law</li>
        <li>Business partners (if explicitly agreed upon)</li>
      </ul>

      <p className={styles.heading}>Third-Party Websites</p>
      <p>
        This website may contain links to third-party websites. We are not
        responsible for the privacy practices or the content of third-party
        sites. Please read the privacy policy of any website you visit.
      </p>

      <p className={styles.heading}>Your Rights Under Canadian Privacy Law</p>
      <p>
        Under the Personal Information Protection and Electronic Documents Act
        (PIPEDA), Ontario privacy laws, and other applicable Canadian privacy
        legislation, you may have the right to:
      </p>
      <ul>
        <li>Request access to the personal information we hold about you</li>
        <li>Request correction of inaccurate or incomplete information</li>
        <li>
          Withdraw consent to the collection, use, or disclosure of your
          information, subject to legal or contractual restrictions
        </li>
        <li>
          Make a complaint to the Office of the Privacy Commissioner of Canada
          or the applicable Ontario privacy authority
        </li>
      </ul>

      <p className={styles.heading}>Data Security</p>
      <p>
        We implement reasonable security measures to protect your personal
        information. However, no method of transmission is 100% secure.
      </p>

      <p className={styles.heading}>Changes to This Policy</p>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted with the &ldquo;Effective Date&rdquo; updated.
      </p>

      <p className={styles.heading}>Contact Us</p>
      <p>
        If you have any questions, <a href={ROUTES.CONTACT}>email us.</a>
      </p>
    </Wrapper>
  );
}
