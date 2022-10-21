const verbose = false
const log = (...p) => {
    if (verbose) console.log(...p)
}

export const solver = words => (pattern, extra, forbidden) => {

    log({ pattern, extra })

    const freePositions = pattern.map((g, i) => ({ g, i })).filter(({ g, i }) => {
        return ((g === '.') || (g.startsWith('/')))
    }).map(({ i }) => i)

    const regexpString = pattern.map(g => (g.startsWith('/')) ? (`[^${g.slice(1)}]`) : g).join('')
    const regexp = new RegExp(`^${regexpString}$`)

    log({ regexpString })

    return words.filter(word => word.match(regexp)).filter(mp => {

        for (let i = 0; i < mp.length; i++) {
            if (forbidden.includes(mp.charAt(i)))
                return false
        }

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
}