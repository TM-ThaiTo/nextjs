'use client';

import { locales } from "@/language/constant";

export const mapLanguage = (lang: string): keyof typeof locales => lang as keyof typeof locales;

export const getLanguage = (): keyof typeof locales => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('lang') || 'en';
        return mapLanguage(storedLang);
    }
    return 'en';
}
