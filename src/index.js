#!/usr/bin/env node

import { solver } from './solver.js'
import { readProjectFile } from './read.js'
import { getWordList, Dictionaries } from './dict.js'

const main = async () => {

    const words = await getWordList(Dictionaries.sutom, readProjectFile)

    const solve = solver(words)

    const regex = /(?<_pattern>[^+-]+)?(\+(?<_extra>[^+-]+))?(\-(?<_forbidden>[^+-]+))?/
    const parameters = process.argv.slice(2).join(' ').toLowerCase()
    const { groups: { _pattern, _extra, _forbidden } } = regex.exec(parameters)

    const pattern = (_pattern || '').trim().split(' ')
    const extra = (_extra || '').trim().split(' ').join('').trim().split('')
    const forbidden = (_forbidden || '').trim().split(' ').join('').trim().split('')

    const solutions = solve(pattern, extra, forbidden)

    console.log(solutions)
}

main()
