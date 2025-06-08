'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/id';

import dayjs from 'dayjs';

import { useTranslate } from './use-locales';

// ----------------------------------------------------------------------

export function LocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentLang } = useTranslate();

  dayjs.locale(currentLang.adapterLocale);

  return <>{children}</>;
}
