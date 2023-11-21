import i18next from 'i18next';
import englishTranslation from '../../translations/english/translation.json';
import spanishTranslation from '../../translations/spanish/translation.json';
import { initReactI18next } from 'react-i18next';
import { initializeI18n } from '../i18n';

describe('i18next configuration', () => {
  let resources: any;

  jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
  }));

  beforeEach(() => {
    resources = {
      en: {
        translation: englishTranslation,
      },
      es: {
        translation: spanishTranslation,
      },
    };

    i18next.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

    initializeI18n();
  });

  it('should initialize i18next with the provided resources', () => {
    expect(i18next.options.resources).toEqual(resources);
  });

  it('should set the initial language to "en"', () => {
    expect(i18next.options.lng).toBe('en');
  });

  it('should set the fallback language to "en"', () => {
    const fallbackLng = i18next.options.fallbackLng;
    if (Array.isArray(fallbackLng)) {
      expect(fallbackLng[0]).toBe('en');
    } else {
      expect(fallbackLng).toBe('en');
    }
  });

  it('should configure interpolation with escapeValue set to false', () => {
    expect(i18next?.options?.interpolation?.escapeValue).toBe(false);
  });

  it('tests translations', () => {
    const englishTranslation = i18next.t('translation:hello');
    expect(englishTranslation).toBe('hello');
  });

  it('tests fallback language', () => {
    i18next.changeLanguage('fr');
    const fallbackTranslation = i18next.t('translation:hello');
    expect(fallbackTranslation).toBe('hello');
  });

  it('verifies interpolation configuration', () => {
    i18next.changeLanguage('en');
    const interpolatedTranslation = i18next.t('translation:greeting', {
      name: 'John',
    });
    expect(interpolatedTranslation).toBe('greeting');
  });
});
