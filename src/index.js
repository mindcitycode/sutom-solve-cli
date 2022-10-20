import { readFile } from 'node:fs/promises'

const verbose = false
const log = (...p) => {
    if (verbose) console.log(...p)
}

// dictionaries
const Dictionaries = {
    french: {
        path: 'dict/french',
        replacements: [
            ['àâ', 'a'],
            ['éèêë', 'e'],
            ['îï', 'e'],
            ['ôö', 'o'],
            ['úùûü', 'u'],
            ['ç', 'c']
        ]
    }
}
const removeDiacritic = (equivalences, text) => equivalences.reduce((text, [from, to]) => text.replace(new RegExp(`[${from}]`, 'g'), to), text)
const getWordList = async ({ path, replacements }, encoding = 'utf8') => {
    const data = (await readFile(path, encoding)).trim().toLowerCase()
    const words = removeDiacritic(replacements, data).split("\n")
    return Array.from(new Set(words)) // unique
}

// solver
const main = async () => {
    
    const words = await getWordList(Dictionaries.french)

    const [_pattern, _extra] = process.argv.slice(2).join(' ').toLowerCase().split('+').map(p => p.trim())
    const pattern = _pattern.split(' ')
    const extra = (_extra || '').split(' ').join('').trim().split('')

    log({ pattern, extra })

    const freePositions = pattern.map((g, i) => ({ g, i })).filter(({ g, i }) => {
        return ((g === '.') || (g.startsWith('/')))
    }).map(({ i }) => i)

    const regexpString = pattern.map(g => (g.startsWith('/')) ? (`[^${g.slice(1)}]`) : g).join('')
    const regexp = new RegExp(`^${regexpString}$`)
    log({ regexpString })

    const possible = words.filter(word => word.match(regexp)).filter(mp => {
        const mpExtraLetters = freePositions.map(freePosition => mp.charAt(freePosition))
        let ok = true
        for (let i = 0; i < extra.length; i++) {
            const extraLetter = extra[i]
            const index = mpExtraLetters.indexOf(extraLetter)
            if (index >= 0) {
                mpExtraLetters.splice(index, 1)
            } else {
                ok = false
                break;
            }
        }
        return ok
    })
    console.log(possible)
}

main()
