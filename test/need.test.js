import { transform } from '@babel/core';
import plugin from '../src';

const options = {
  directive: 'use parser',
  parser: {
    parseNumber: 'parseNumber',
    parseString: 'parseString',
    parseNormal: 'parseNormal',
    parseBoolean: 'parseBoolean',
    parseObject: 'parseObject',
    parseArray: 'parseArray',
    parseList: 'parseList',
  },
  module: 'utils/parser',
};

describe('module-resolver', () => {
  // const testWithImport = (source, output, transformerOpts) => {
  //   const result = transform(source, transformerOpts);
  //   expect(result.code).toBe(output);
  // }
  const testWithImport = (transformerOpts)=> (source) => () => {
    const result = transform(source, transformerOpts);
    return result;
  }

  describe('error case', () => {
    const rootTransformerOpts = {
      babelrc: false,
      plugins: [
        [plugin, options],
        '@babel/plugin-transform-typescript',
      ],
    };
    const testCode = testWithImport(rootTransformerOpts);

    it('need constructor', () => {
      const runner = testCode(
        `
        'use parser'
        class A{
        }`,
      );
      expect(runner).toThrow(/need constructor/);
    });

    it('need constructor arguments', () => {
      const runner = testCode(
        `
        'use parser'
        class A{
          constructor(){}
        }`,
      );
      expect(runner).toThrow(/need one argument for constructor/);
    });

    it('need define type', () => {
      const runner = testCode(
        `
        'use parser'
        class A{
          hello
          constructor(data){}
        }`,
      );
      expect(runner).toThrow(/need define type for property/);
    });

  });

});
