# sutom-solve-cli

a command line solver helper for french SUTOM game

## usage

npm install sutom-solve-cli

npx sutom_sove_cli ./src/index.js m . /lt /i . . . . . . . + lx - a

=> [ 'merveilleux' ]

 means word must match regexp ^m.[^lt][^i].......$ and include letters 'l' and 'x' anywhere where letter in not specified (negation groups or any char) and not letter 'a'
 

## license

sutom-solve-cli is licensed under the AGPL-3.0-only license