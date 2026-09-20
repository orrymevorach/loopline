import { ROUTES } from '@/utils/constants';
import Wrapper from '../../Wrapper/Wrapper';
import styles from '../Legal.module.scss';

export default function TermsOfUse() {
  // &ldquo;us&rdquo;
  return (
    <Wrapper classNames={styles.wrapper} isSmall>
      <h1>Terms of Use</h1>

      <p className={styles.margin}>
        Effective Date: <span className={styles.bold}>February 11, 2025</span>
      </p>

      <p>
        Welcome to Loopline (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;). These Terms of Use (&ldquo;Terms&rdquo;) govern your
        access to and use of our website, services, and any related content
        (collectively, the &ldquo;Services&rdquo;). By using our Services, you
        agree to comply with and be bound by these Terms. If you do not agree,
        please do not use our Services.
      </p>

      <div className={styles.border}></div>

      <p className={styles.heading}>1. Acceptance of Terms</p>
      <p>
        By accessing or using our Services, you agree to be bound by these Terms
        and our Privacy Policy. If you do not agree, you must stop using our
        Services immediately.
      </p>

      <p className={styles.heading}>2. Changes to Terms</p>
      <p>
        We reserve the right to modify these Terms at any time. We will notify
        users of significant changes by posting an updated version on our
        website or through other communication channels. Continued use of our
        Services after changes take effect constitutes acceptance of the revised
        Terms.
      </p>
      <p className={styles.heading}>3. Eligibility</p>

      <p>
        You must be at least 18 years old (or the legal age in your
        jurisdiction) to use our Services. By using our Services, you confirm
        that you meet this requirement.
      </p>

      <p className={styles.heading}>4. User Accounts</p>

      <ul>
        <li>You may need to create an account to access certain features.</li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </li>
        <li>
          You agree to provide accurate and complete information when
          registering.
        </li>
        <li>
          We reserve the right to suspend or terminate accounts that violate
          these Terms.
        </li>
      </ul>

      <p className={styles.heading}>5. Acceptable Use</p>

      <p>You agree not to:</p>

      <ul>
        <li>Use the Services for any unlawful purpose.</li>
        <li>Attempt to gain unauthorized access to our systems.</li>
        <li>Transmit harmful code or engage in disruptive behavior.</li>
        <li>
          Copy, modify, or distribute content from our Services without
          permission.
        </li>
      </ul>

      <p className={styles.heading}>6. Intellectual Property</p>

      <p>
        All content, trademarks, and intellectual property on our Services
        belong to us or our licensors. You may not use them without prior
        written permission.
      </p>

      <p className={styles.heading}>7. Third-Party Links & Services</p>
      <p>
        Our Services may contain links to third-party websites. We are not
        responsible for their content, policies, or practices.
      </p>

      <p className={styles.heading}>8. Disclaimers & Limitation of Liability</p>

      <ul>
        <li>
          Our Services are provided &ldquo;as is&rdquo; without warranties of
          any kind.
        </li>
        <li>
          We are not liable for indirect, incidental, or consequential damages
          arising from your use of the Services.
        </li>
        <li>
          In no event shall our total liability exceed the amount you paid us
          (if any) for the Services in the past 12 months.
        </li>
      </ul>

      <p className={styles.heading}>9. Termination</p>
      <p>
        We may terminate or suspend your access to the Services at any time for
        violating these Terms or for any other reason.
      </p>

      <p className={styles.heading}>10. Governing Law</p>

      <p>
        These Terms are governed by the laws of Ontario and the applicable laws
        of Canada. Any disputes shall be resolved by the courts of competent
        jurisdiction located in Ontario.
      </p>

      <p className={styles.heading}>11. Contact Information</p>

      <p>
        If you have questions about these Terms, please{' '}
        <a href={ROUTES.CONTACT}>contact us.</a>
      </p>
    </Wrapper>
  );
}
