import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises'
import path from 'path';
const ProjectPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
export const readProjectFile = async (name, encoding) => readFile(path.join(ProjectPath, name), encoding)
