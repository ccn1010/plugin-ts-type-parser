### plugin-ts-type-parser
用来对 Typescript 类型数据做反序列化的 Babel 插件

将实体类转换的函数补全，例如
```typescript
'use parser'

class A {
  num?: number;
  bool: boolean;
  str: string;
  normal: any;
  hello: Hello;
  helloArray: Array<Hello>;
  numArray: Array<number>;
  boolArray: Array<boolean>;
  strArray: Array<string>;
  helloList: Hello[];
  numberList: number[];
  booleanList: boolean[];
  strList: string[];

  constructor(data) {

  }

  methodA(){
  }
}
```
转换成
```typescript
'use parser'
import { parseNumber, parseBoolean, parseString, parseNormal,
  parseObject, parseList, parseArray } from 'util/parser';

class A {
  num?: number;
  bool: boolean;
  str: string;
  normal: any;
  hello: Hello;
  helloArray: Array<Hello>;
  numArray: Array<number>;
  boolArray: Array<boolean>;
  strArray: Array<string>;
  helloList: Hello[];
  numberList: number[];
  booleanList: boolean[];
  strList: string[];

  constructor(data) {
    this.num = parseNumber(true, data, data.num);
    this.bool = parseBoolean(false, data, data.bool);
    this.str = parseString(false, data, data.str);
    this.normal = parseNormal(false, data, data.normal);
    this.hello = parseObject(false, data, data.hello, Hello);
    this.helloArray = parseList(false, data, data.helloArray, Hello);
    this.numArray = parseArray(false, data, data.numArray, parseNumber);
    this.boolArray = parseArray(false, data, data.boolArray, parseBoolean);
    this.strArray = parseArray(false, data, data.strArray, parseString);
    this.helloList = parseList(false, data, data.helloList, Hello);
    this.numberList = parseArray(false, data, data.numberList, parseNumber);
    this.booleanList = parseArray(false, data, data.booleanList, parseBoolean);
    this.strList = parseArray(false, data, data.strList, parseString);
  }

  methodA(){
  }
}
```
parseXxx 为自定义的转换函数，第一个参数为是否必须

#### 插件配置项
```json
[
  "plugin-ts-type-parser",
  {
    "directive": "use parser",
    "parser": {
      "parseNumber": "parseNumber",
      "parseString": "parseString",
      "parseNormal": "parseNormal",
      "parseBoolean": "parseBoolean",
      "parseObject": "parseObject",
      "parseArray": "parseArray",
      "parseList": "parseList"
    },
    "module": "util/parser"
  }
]
```
