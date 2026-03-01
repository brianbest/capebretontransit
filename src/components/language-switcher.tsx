'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {Globe} from 'lucide-react';
import {useState, useRef, useEffect} from 'react';
import {routing} from '@/i18n/routing';

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Francais',
  zh: '\u4E2D\u6587',
  mi: "Mi'kmaw",
};

export function LanguageSwitcher() {
  const t = useTranslations('accessibility');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, {locale: newLocale as typeof routing.locales[number]});
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-label={t('select_language')}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent/20 ${
                l === locale
                  ? 'text-primary font-medium'
                  : 'text-popover-foreground'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
