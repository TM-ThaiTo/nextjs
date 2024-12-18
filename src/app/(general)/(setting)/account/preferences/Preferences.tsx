'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import { updateLanguge } from '@/actions/user/actions';

const LanguagePreferences = () => {
    const { textColorPrimary } = useThemeColors();
    const lang = getLanguage();
    const langString = lang?.toString().trim();

    const languages = [
        { label: 'English (UK)', key: 'en' },
        // { label: 'Afrikaans', key: 'af' },
        // { label: 'العربية', key: 'ar' },
        // { label: 'Čeština', key: 'cs' },
        // { label: 'Dansk', key: 'da' },
        // { label: 'Deutsch', key: 'de' },
        // { label: 'Ελληνικά', key: 'el' },
        // { label: 'Español (España)', key: 'es-ES' },
        // { label: 'Español', key: 'es' },
        { label: 'Tiếng Việt', key: 'vi' },
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(langString);
    const [searchKeyword, setSearchKeyword] = useState('');

    const filteredLanguages = languages.filter((language) =>
        language.label.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const sortedLanguages = filteredLanguages.sort((a, b) => {
        if (a.key === selectedLanguage) return -1;
        if (b.key === selectedLanguage) return 1;
        return 0;
    });
    const handleLanguageChange = async (languageKey: string) => {
        if (languageKey === selectedLanguage) return;
        const { data, error } = await updateLanguge(languageKey);
        if (error) return;
        if (data) window.location.reload();
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: textColorPrimary }}>
                {locales[lang]?.languagePreferences}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: textColorPrimary }}>
                {locales[lang]?.seeButtonsTitlesAndOtherTextsInYourPreferredLanguage}
            </Typography>
            <TextField
                fullWidth
                placeholder={locales[lang]?.searchPage.search}
                variant="outlined"
                size="small"
                sx={{ mb: 2, color: textColorPrimary }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <List>
                {sortedLanguages.length > 0 ? (
                    sortedLanguages.map((language) => (
                        <React.Fragment key={language.key}>
                            <ListItem button onClick={() => handleLanguageChange(language.key)} sx={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary={language.label} sx={{ color: textColorPrimary }} />
                                <Radio
                                    checked={selectedLanguage === language.key}
                                    onChange={() => handleLanguageChange(language.key)}
                                    value={language.key}
                                    name="language-radio"
                                    color="primary"
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ color: textColorPrimary }}>
                        {locales[lang]?.noLanguagesFound}
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default LanguagePreferences;
