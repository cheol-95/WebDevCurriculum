// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?

const { CjsUtilClass, cjsUtilFunction } = require('../cjs-package');
console.log('CommonJS 호출');
console.log('CjsUtilClass: ', CjsUtilClass);
console.log('cjsUtilFunction: ', cjsUtilFunction);

(async () => {
  const { EsmUtilClass, esmUtilFunction } = await import('../esm-package/index.mjs');
  console.log('\nES Modules 호출');
  console.log('EsmUtilClass: ', EsmUtilClass);
  console.log('esmUtilFunction: ', esmUtilFunction);
})();
