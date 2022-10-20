import { readFile } from 'node:fs/promises'

const getWordList = async (file, encoding = 'utf8') => {
    const data = await readFile(file, encoding)
    const words = data.trim().split("\n").map(w => w.toLowerCase())
    return words
}

const main = async () => {
    const words = await getWordList("./wordlist.txt")
    const [_pattern, _extra] = process.argv.slice(2).join(' ').toLowerCase().split('+').map(p => p.trim())
    const pattern = _pattern.split(' ')
    const extra = (_extra || '').split(' ').join('').trim()

    console.log({ pattern, extra })

    const freePositions = pattern.map((g, i) => ({ g, i })).filter(({ g, i }) => {
        return ((g === '.') || (g.startsWith('/')))
    }).map(({ i }) => i)

    const regexpString = pattern.map(g => (g.startsWith('/')) ? (`[^${g.slice(1)}]`) : g).join('')
    const regexp = new RegExp(`^${regexpString}$`)
    console.log({ regexpString })

    const possible = words.filter(word => word.match(regexp)).filter(mp => {
        const mpExtraLetters = freePositions.map(freePosition => mp.charAt(freePosition))
        let ok = true
        for (let i = 0; i < extra.length; i++) {
            const extraLetter = extra.charAt(i)
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
