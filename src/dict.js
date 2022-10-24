export const Dictionaries = {
    french: {
        path: 'dict/french',
        replacements: [
            ['àâ', 'a'],
            ['éèêë', 'e'],
            ['îï', 'e'],
            ['ôö', 'o'],
            ['úùûü', 'u'],
            ['ç', 'c']
        ],
        encoding: 'utf8'
    },
    sutom: {
        path: 'dict/french-sutom',
        replacements: [],
        encoding: 'utf8'
    }
}
const removeDiacritic = (equivalences, text) => equivalences.reduce((text, [from, to]) => text.replace(new RegExp(`[${from}]`, 'g'), to), text)
const unique = a => Array.from(new Set(a))
export const getWordList = async ({ path: dictPath, replacements, encoding }, readProjectFile) => {
    const text0 = await readProjectFile(dictPath, encoding)
    const text1 = text0.trim().toLowerCase()
    const text2 = removeDiacritic(replacements, text1)
    return unique(text2.split("\n"))
}