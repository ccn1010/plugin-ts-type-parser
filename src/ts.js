import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);
  const t = api.types;

  return {
    name: "plugin-ts-type-parser",

    visitor: {
      Directive(dpath){
        const { directive, parser, module } = options;
        if(!t.isDirectiveLiteral(dpath.node.value, {value: directive})){
          return;
        }

        const { parseNumber, parseString, parseNormal, parseBoolean,
          parseObject, parseArray, parseList } = parser;
        const programPath = dpath.findParent((path) => path.isProgram());
        const impDecode = t.importDeclaration(
          Object.keys(parser).map(prop=>t.importSpecifier(t.identifier(parser[prop]), t.identifier(parser[prop]))),
          t.stringLiteral(module));
        programPath.node.body.unshift(impDecode);

        const getArrayExp = (param, optional, dataPropName, thisp) => {
          let genericName;
          let parseName = parseArray;
          if (t.isTSBooleanKeyword(param)) {
            genericName = parseBoolean;
          } else if (t.isTSNumberKeyword(param)) {
            genericName = parseNumber;
          } else if (t.isTSStringKeyword(param)) {
            genericName = parseString;
          } else {
            genericName = param.typeName.name;
            parseName = parseList;
          }
          const arrayExp = t.expressionStatement(t.assignmentExpression('=',
            thisp,
            t.callExpression(t.identifier(parseName),
              [optional, dataPropName, t.identifier(genericName)])));

          return arrayExp;
        }

        programPath.traverse({
          ClassDeclaration(path) {
            const clz = path.node;
            let constr;
            const props = [];
            clz.body.body.forEach(item => {
              if (t.isClassMethod(item, { kind: 'constructor' })) {
                constr = item;
              } else if (t.isClassProperty(item)) {
                props.push(item);
              }
            });
            if(!constr) {
              throw path.buildCodeFrameError('need constructor');
            };
            const dataName = constr.params[0] && constr.params[0].name;
            if(!dataName){
              throw path.buildCodeFrameError('need one argument for constructor');
            }
            props.forEach(prop => {
              const optional = t.booleanLiteral(!!prop.optional);
              const dataPropName = t.memberExpression(t.identifier(dataName), t.identifier(prop.key.name));
              if(!prop.typeAnnotation){
                throw path.buildCodeFrameError('need define type for property');
              }
              const anno = prop.typeAnnotation.typeAnnotation;
              const thisp = t.memberExpression(t.thisExpression(), t.identifier(prop.key.name));

              if (t.isTSNumberKeyword(anno)) {
                const numberExp = t.expressionStatement(t.assignmentExpression('=',
                  thisp,
                  t.callExpression(t.identifier(parseNumber),
                    [optional, dataPropName])))
                constr.body.body.push(numberExp)
              } else if (t.isTSBooleanKeyword(anno)) {
                const boolExp = t.expressionStatement(t.assignmentExpression('=',
                  thisp,
                  t.callExpression(t.identifier(parseBoolean),
                    [optional, dataPropName])))
                constr.body.body.push(boolExp)
              } else if (t.isTSStringKeyword(anno)) {
                const boolExp = t.expressionStatement(t.assignmentExpression('=',
                  thisp,
                  t.callExpression(t.identifier(parseString),
                    [optional, dataPropName])))
                constr.body.body.push(boolExp)
              } else if (t.isTSArrayType(anno)) {
                const param = anno.elementType;
                const arrayExp = getArrayExp(param, optional, dataPropName, thisp);
                constr.body.body.push(arrayExp)
              } else if (t.isTSTypeReference(anno)) {
                if (anno.typeName.name === 'Array') {
                  const param = anno.typeParameters.params[0];
                  const arrayExp = getArrayExp(param, optional, dataPropName, thisp);
                  constr.body.body.push(arrayExp)
                } else {
                  const objectExp = t.expressionStatement(t.assignmentExpression('=',
                    thisp,
                    t.callExpression(t.identifier(parseObject),
                      [optional, dataPropName, t.identifier(anno.typeName.name)])))
                  constr.body.body.push(objectExp)
                }
              } else {
                const normalExp = t.expressionStatement(t.assignmentExpression('=',
                    thisp,
                    t.callExpression(t.identifier(parseNormal),
                      [optional, dataPropName])))
                constr.body.body.push(normalExp)
              }
            })
          }
        })
      },
    }
  };
});
