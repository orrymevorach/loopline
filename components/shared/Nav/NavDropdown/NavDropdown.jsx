import clsx from 'clsx';
import NavDropdownLinks from '@/components/shared/Nav/NavDropdown/NavDropdownLinks/NavDropdownLinks';
import styles from './NavDropdown.module.scss';

export default function NavDropdown({
  id,
  links,
  columns,
  isMobile = false,
  onNavigate,
}) {
  const hasColumns = Boolean(columns);

  if (!hasColumns) {
    return (
      <ul
        id={id}
        className={clsx(styles.links, isMobile && styles.mobileLinks)}
      >
        <NavDropdownLinks links={links} onNavigate={onNavigate} />
      </ul>
    );
  }

  return (
    <div
      id={id}
      className={clsx(styles.dropdown, isMobile && styles.mobileDropdown)}
    >
      <div className={styles.columns}>
        {columns.map(column => (
          <div key={column.title} className={styles.column}>
            <p className={styles.columnTitle}>{column.title}</p>
            <ul className={styles.columnLinks}>
              <NavDropdownLinks
                links={column.links}
                isMobile={isMobile}
                onNavigate={onNavigate}
              />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
