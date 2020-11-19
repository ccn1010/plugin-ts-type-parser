"use strict";
'use parser';

exports.__esModule = true;
exports["default"] = exports.A = void 0;

var _parser = require("util/parser");

var Hello = function Hello(data) {
  this.num = (0, _parser.parseNumber)(false, data.num);
  this.bool = (0, _parser.parseBoolean)(false, data.bool);
  this.str = (0, _parser.parseString)(false, data.str);
  this.normal = (0, _parser.parseNormal)(false, data.normal);
};

var A = /*#__PURE__*/function () {
  function A(data) {
    this.num = (0, _parser.parseNumber)(true, data.num);
    this.bool = (0, _parser.parseBoolean)(false, data.bool);
    this.str = (0, _parser.parseString)(false, data.str);
    this.normal = (0, _parser.parseNormal)(false, data.normal);
    this.hello = (0, _parser.parseObject)(false, data.hello, Hello);
    this.helloArray = (0, _parser.parseList)(false, data.helloArray, Hello);
    this.numArray = (0, _parser.parseArray)(false, data.numArray, _parser.parseNumber);
    this.boolArray = (0, _parser.parseArray)(false, data.boolArray, _parser.parseBoolean);
    this.strArray = (0, _parser.parseArray)(false, data.strArray, _parser.parseString);
    this.helloList = (0, _parser.parseList)(false, data.helloList, Hello);
    this.numberList = (0, _parser.parseArray)(false, data.numberList, _parser.parseNumber);
    this.booleanList = (0, _parser.parseArray)(false, data.booleanList, _parser.parseBoolean);
    this.strList = (0, _parser.parseArray)(false, data.strList, _parser.parseString);
  }

  var _proto = A.prototype;

  _proto.methodA = function methodA() {};

  return A;
}();

exports.A = A;
var _default = A;
exports["default"] = _default;
