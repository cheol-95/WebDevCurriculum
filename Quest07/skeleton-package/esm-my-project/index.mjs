// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?

// npm i -s [패키지 명] 사용
import { EsmUtilClass, esmUtilFunction } from 'esm-package';
console.log('ES Modules 호출');
console.log('EsmUtilClass: ', EsmUtilClass);
console.log('esmUtilFunction: ', esmUtilFunction);

import { CjsUtilClass, cjsUtilFunction } from 'cjs-package';
console.log('\nCommonJS 호출');
console.log('CjsUtilClass: ', CjsUtilClass);
console.log('cjsUtilFunction: ', cjsUtilFunction);
