/* eslint-disable no-restricted-globals */
import { LanguageList } from "@platformx/utilities";
import { DefaultLocale } from "./constants";

export const getCurrentLang = () => {
    let lang = '';
    const split = location.pathname.split('/');

    if (LanguageList().find((x) => x.id === split[2])) {
        lang = split[2];
    } else {
        lang = DefaultLocale;
    }
    return lang;
};

export const getSelectedSite = () => {
    let site = '';
    const split = location.pathname.split('/');
    site = split[1];
    if (site === 'en' || site === 'fr' || site === 'de') {
        return localStorage.getItem('selectedSite');
    } else {
        return site;
    }
};
