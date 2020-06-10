import React from 'react';

import { ExperimentAllocation } from './types';

export const ExperimentsContext = React.createContext<ExperimentAllocation[]>(
  []
);
export const ExperimentsProvider = ExperimentsContext.Provider;
