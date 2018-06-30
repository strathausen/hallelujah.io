module.exports = {
  pg_languages: {
    de: 'german',
    en: 'english',
    es: 'spanish',
    fi: 'finnish',
    fr: 'french',
    pt: 'portuguese',
    ro: 'romanian',
    ru: 'russian',
    default: 'simple',
  },
  // Still having encoding issues, search doesn't work on these 😭
  unsupported : ['ar', 'ko', 'zh']
}

// Languages without postgres stemming confiuguration:
// ar, zh, el, eo, ko, vi

// Languages that are still missing bible editions:
// 'danish',
// 'dutch',
// 'hungarian',
// 'italian',
// 'norwegian',
// 'swedish',
// 'turkish',
// 'hebrew',
