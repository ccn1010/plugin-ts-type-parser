import path from 'path'
// import { create } from 'babel-test'
import { toMatchFile } from 'jest-file-snapshot'
import { create } from './babelTest'

expect.extend({ toMatchFile })

const { fixtures } = create({ babelrc: true })

// console.log('path.join(__dirname, ', path.join(__dirname, 'fixtures'))
fixtures('babel-plugin-styled-components', path.join(__dirname, 'fixtures'))
