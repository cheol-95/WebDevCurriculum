import jest from 'jest';

import * as serverApp from '../../server/dist/app.js';
import * as clientApp from '../app.js';

await new Promise((resolve) => setTimeout(resolve, 1000));

await jest.run();
