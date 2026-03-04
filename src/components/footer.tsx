import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-3">
        <p className="text-center text-xs text-muted-foreground">
          {t('data_source')}
        </p>
        <p className="text-center text-xs text-muted-foreground/80">
          {t.rich('about', {
            link: (chunks) => (
              <a
                href="https://bsky.app/profile/brianbest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
        <p className="text-center text-xs text-muted-foreground/80">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
