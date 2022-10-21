#!/usr/bin/env node

import { solver } from './solver.js'
import { readProjectFile } from './read.js'
import { getWordList, Dictionaries } from './dict.js'

const main = async () => {

    const words = await getWordList(Dictionaries.french, readProjectFile)

    const solve = solver(words)

    const [_pattern, _extra] = process.argv.slice(2).join(' ').toLowerCase().split('+').map(p => p.trim())
    const pattern = _pattern.split(' ')
    const extra = (_extra || '').split(' ').join('').trim().split('')

    const solutions = solve(pattern, extra)

    console.log(solutions)
}

main()
