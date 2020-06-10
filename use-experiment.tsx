import { useContext, useMemo } from 'react';

import { ExperimentAllocation } from './types';
import { ExperimentsContext } from './experiments-context';
import experiments from './experiments';

// Retrieve experiment id from the config file
function getExperimentId(experimentName: string) {
  if (!experiments) {
    console.error(
      `Experiments haven't been provided. Please review the config file`
    );
    return '0';
  }

  const experiment = experiments.find(exp => exp.name === experimentName);

  if (!experiment) {
    console.error(
      `Unknown experiment with name '${experimentName}'. Please review the config file`
    );
    return '0';
  }

  return experiment.id;
}

// Retrieve experiment allocation
export default function useExperiment(
  experimentKey: string
): ExperimentAllocation {
  const experimentId = getExperimentId(experimentKey);
  const experimentsAllocations = useContext(ExperimentsContext);

  // Find the experiment allocation and memoize it. Recompute only when the
  // experiments allocations and experiment id change
  const experimentAllocation = useMemo(
    () => experimentsAllocations.find(exp => exp.experimentId === experimentId),
    [experimentsAllocations, experimentId]
  );

  if (!experimentAllocation) {
    console.error(
      `Unknown experiment with id '${experimentId}'. Please review the config file`
    );
    return { id: 0, experimentId: '0', variantId: '0' };
  }

  return experimentAllocation;
}
