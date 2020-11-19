'use parser'

class Hello {
  num: number;

  bool: boolean;

  str: string;

  normal: any;

  constructor(data){

  }
}

export class A {
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

export default A;
