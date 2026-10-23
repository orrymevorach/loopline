import styles from './MenuLinks.module.scss';

export default function MenuLinks({ menus = [] }) {
  return (
    <ul className={styles.list}>
      {menus.map(({ id, label, pdf, link }) => {
        const menuHref = pdf || link;

        return (
          <li key={id}>
            {menuHref ? (
              <a
                href={menuHref}
                className={styles.link}
                target={pdf ? '_blank' : undefined}
                rel={pdf ? 'noopener noreferrer' : undefined}
              >
                {label}
              </a>
            ) : (
              <span className={styles.label}>{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
