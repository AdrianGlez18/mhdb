import {atom, selector} from 'recoil';

declare type langType = "es" | "en" | "fr";

export const localeState = atom({
    key: 'localeState',
    default: 'en' as langType
})