import { useId, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import NavDropdown from '@/components/shared/Nav/NavDropdown/NavDropdown';
import styles from './NavItem.module.scss';

export default function NavItem({
  item,
  currentPath,
  isMobile = false,
  onActivate,
  onNavigate,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownId = useId();
  const hasDropdown = Boolean(item.dropdown);
  const hasColumns = Boolean(item.dropdown?.columns);
  const isActive =
    currentPath === item.path ||
    (!isMobile &&
      Boolean(item.dropdown?.links?.some(link => link.path === currentPath)));

  const closeDropdown = () => setIsDropdownOpen(false);

  const activateItem = () => {
    onActivate?.(hasDropdown ? closeDropdown : null);
    if (hasDropdown) setIsDropdownOpen(true);
  };

  const handleNavigate = () => {
    closeDropdown();
    onNavigate?.();
  };

  const chevron = hasDropdown && (
    <Image
      src='/nav/chevron.svg'
      alt=''
      className={clsx(styles.chevron, isDropdownOpen && styles.chevronOpen)}
      width={15}
      height={8}
    />
  );

  const triggerClassNames = clsx(
    styles.link,
    isMobile && styles.mobileLink,
    !item.path && styles.toggle,
    !item.path && isMobile && styles.mobileDropdownToggle,
    (isActive || (!isMobile && isDropdownOpen)) && styles.activeLink,
  );

  return (
    <li
      className={clsx(!hasColumns && styles.item, isMobile && styles.mobileItem)}
      onMouseEnter={isMobile ? undefined : activateItem}
      onMouseLeave={!isMobile && !hasColumns ? closeDropdown : undefined}
      onBlur={
        isMobile
          ? undefined
          : event => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                closeDropdown();
              }
            }
      }
      onKeyDown={event => {
        if (event.key === 'Escape') closeDropdown();
      }}
    >
      <div className={clsx(isMobile && styles.mobileRow)}>
        {item.path ? (
          <Link
            href={item.path}
            className={triggerClassNames}
            onFocus={isMobile ? undefined : activateItem}
            onClick={handleNavigate}
            aria-expanded={!isMobile && hasDropdown ? isDropdownOpen : undefined}
            aria-controls={!isMobile && hasDropdown ? dropdownId : undefined}
          >
            {item.label}
            {!isMobile && chevron}
          </Link>
        ) : (
          <button
            type='button'
            className={triggerClassNames}
            aria-expanded={isDropdownOpen}
            aria-controls={dropdownId}
            onFocus={isMobile ? undefined : activateItem}
            onClick={() =>
              isMobile ? setIsDropdownOpen(isOpen => !isOpen) : activateItem()
            }
          >
            {item.label}
            {chevron}
          </button>
        )}
        {isMobile && item.path && hasDropdown && (
          <button
            type='button'
            className={styles.mobileToggle}
            onClick={() => setIsDropdownOpen(isOpen => !isOpen)}
            aria-expanded={isDropdownOpen}
            aria-controls={dropdownId}
            aria-label={`${isDropdownOpen ? 'Hide' : 'Show'} ${item.label} categories`}
          >
            {chevron}
          </button>
        )}
      </div>
      {hasDropdown && isDropdownOpen && (
        <NavDropdown
          id={dropdownId}
          {...item.dropdown}
          isMobile={isMobile}
          onNavigate={handleNavigate}
        />
      )}
    </li>
  );
}
