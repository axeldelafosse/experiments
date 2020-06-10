import { STAGE } from '../../config';
import { Experiments } from './types';

// Experiments config file:
// 1. To setup a new experiment, add a new object with the id of the experiment from Google Optimize
// 2. Keep track of the experiments by using the same name as defined in Google Optimize
// 3. Add all the variants and the variant weights
// 4. Don't forget to create a new experiment for each environment and to use the correct experiment id

// Example:
// {
//   name: 'exp',
//   id: 'xoo8Mc2ITTCSiXLjuOqrng',
//   variants: [{ id: '0', weight: 0.5 }, { id: '1', weight: 0.5 }],
// }
const experiments: Experiments = {
  dev: [
    {
      name: 'exp',
      id: 'xoo8Mc2ITTCSiXLjuOqrng',
      variants: [
        { id: '0', weight: 0.5 },
        { id: '1', weight: 0.5 },
      ],
    },
  ],
  staging: [
    {
      name: 'exp',
      id: 'xoo8Mc2ITTCSiXLjuOqrng',
      variants: [
        { id: '0', weight: 0.5 },
        { id: '1', weight: 0.5 },
      ],
    },
  ],
  prod: [
    {
      name: 'exp',
      id: 'fs9HZij4RQyrPaONn_a2FQ',
      variants: [
        { id: '0', weight: 0.5 },
        { id: '1', weight: 0.5 },
      ],
    },
  ],
};

export default experiments[STAGE];
