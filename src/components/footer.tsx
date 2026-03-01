import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-center text-xs text-muted-foreground">
          {t('data_source')}
        </p>
        <p className="mt-1 text-center text-xs text-muted-foreground/60">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
