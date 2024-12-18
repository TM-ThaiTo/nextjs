'use client';

import { getLanguage } from '@/helper/mapTypesLanguage';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { locales } from '@/language/constant'

export default function importThemeAndLanguge() {
    const lang = getLanguage();
    return { lang, locales, useThemeColors };
}
