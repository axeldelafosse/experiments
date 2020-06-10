import { useContext, useEffect } from 'react';

import { ExperimentAllocation } from './types';
import { CustomerIdContext } from '../../components/customer-id-context';
import { useSetExperimentAllocationMutation } from '../../graphql';
import { setExpGoogleAnalytics } from '../../utils/analytics';

export default function useVariantId(experiment: ExperimentAllocation) {
  const customerId = useContext(CustomerIdContext) || 0;
  const [setExperimentAllocation] = useSetExperimentAllocationMutation({
    variables: {
      customerId,
      experimentId: experiment.experimentId,
      variantId: experiment.variantId,
    },
  });

  // Activate the experiment
  useEffect(() => {
    if (
      customerId &&
      customerId !== 0 &&
      experiment.id === 0 &&
      experiment.experimentId !== '0'
    ) {
      // Save the experiment allocation in database
      setExperimentAllocation();
    }
    // Set the experiment allocation in Google Analytics in order to tell
    // Google Optimize which variant the visitor has seen
    setExpGoogleAnalytics(`${experiment.experimentId}.${experiment.variantId}`);
  }, [customerId]);

  return experiment.variantId;
}
