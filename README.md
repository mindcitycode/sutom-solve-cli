# Usage

 node .\src\index.js f . r . . . . /is /s . +ie

=> [ 'forestiers', 'formalites', 'formidable' ]

 means word must match regexp ^f.r....[^is][^s].$ and include letters i and e anywhere where letter in not specified (negation groups or any char)