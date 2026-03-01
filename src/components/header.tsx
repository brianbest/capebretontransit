'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from '@/components/language-switcher';
import {Bus} from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <Bus className="size-5 text-primary" />
          <span>{t('appName')}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('routes')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
