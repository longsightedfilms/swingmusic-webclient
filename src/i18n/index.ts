import { WritableComputedRef } from "vue";
import { I18n, createI18n } from "vue-i18n";
import useSettings from "@/stores/settings";

import enUS from "@/i18n/locales/en.json"
import ruRU from "@/i18n/locales/ru.json"

let i18n: I18n;

const SUPPORTED_LOCALES = {
    "en": "English",
    "ru": "Русский"
}

function setI18nLanguage(locale: string) {
    if (i18n.mode === "legacy") {
        i18n.global.locale = locale;
    } else {
        (i18n.global.locale as WritableComputedRef<string>).value = locale;
    }

    (document.querySelector('html') as HTMLHtmlElement).setAttribute('lang', locale);
}

function cyrillicPluralizationRule(choice: number, choicesLength: number) {
    if (choice === 0) {
        return 0
    }

    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1
    if (!teen && endsWithOne) {
        return 1
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
    }

    return choicesLength < 4 ? 2 : 3
}

function setupI18n() {
    if (!i18n) {
        const settings = useSettings();
        let locale = "ru";
        // let locale = settings.language || "en-US";

        i18n = createI18n({
            globalInjection: true,
            legacy: false,
            locale,
            fallbackLocale: "en",
            missingWarn: false,
            fallbackWarn: false,
            formatFallbackMessages: true,
            messages: {
                en: enUS,
                ru: ruRU
            },
            pluralRules: {
                ru: cyrillicPluralizationRule
            }
        });

        setI18nLanguage(locale);
    }

    return i18n;
}

export { setupI18n, setI18nLanguage, SUPPORTED_LOCALES }