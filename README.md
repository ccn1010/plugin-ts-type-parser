### plugin-ts-type-parser
用来对typescript类型数据做反序列化的插件

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
    this.num = parseNumber(true, data.num);
    this.bool = parseBoolean(false, data.bool);
    this.str = parseString(false, data.str);
    this.normal = parseNormal(false, data.normal);
    this.hello = parseObject(false, data.hello, Hello);
    this.helloArray = parseList(false, data.helloArray, Hello);
    this.numArray = parseArray(false, data.numArray, parseNumber);
    this.boolArray = parseArray(false, data.boolArray, parseBoolean);
    this.strArray = parseArray(false, data.strArray, parseString);
    this.helloList = parseList(false, data.helloList, Hello);
    this.numberList = parseArray(false, data.numberList, parseNumber);
    this.booleanList = parseArray(false, data.booleanList, parseBoolean);
    this.strList = parseArray(false, data.strList, parseString);
  }

  methodA(){
  }
}
```
parseXxx 为自定义的转换函数，第一个参数为是否必须

### 插件配置项
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
