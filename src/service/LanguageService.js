import vi from '../lang/vi'
import en from '../lang/en'
let LanguageService = {
  vi: vi,
  en: en,
  setLanguage: (name) => {
    window.MyConfig.language = name
    window.localStorage.language = name
    if (window.MyConfig.language == 'vi') {
      LanguageService.lang = LanguageService.vi
    } else if (window.MyConfig.language == 'en') {
      LanguageService.lang = LanguageService.en
    }
  },
  getLanguage: () => window.localStorage.language,
}

let lang = LanguageService.getLanguage() || 'vi'

if (!(lang in LanguageService && typeof LanguageService[lang] === 'object')) {
  if (lang) {
    LanguageService.lang = LanguageService[lang]
  } else {
    LanguageService.lang = vi
  }
} else {
  LanguageService.lang = vi
}

export default LanguageService
