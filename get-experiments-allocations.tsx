import { NextPageContext } from 'next';

import { GetCustomerExperimentsDocument } from '../../graphql';
import { getCookies } from '../../utils/cookies';

import getVariantId from './get-variant-id';
import { ExperimentAllocation, Experiment, DatabaseAllocation } from './types';

// Merge the database and cookies allocations
function syncExperimentsAllocations(
  database: ExperimentAllocation[],
  cookies: ExperimentAllocation[]
) {
  // Save the database allocations first
  return [...database, ...cookies].reduce<ExperimentAllocation[]>(
    (acc, current) =>
      acc.find(exp => exp.experimentId === current.experimentId)
        ? acc
        : [...acc, current],
    []
  );
}

function setNewExperimentsAllocations(
  experiments: Experiment[],
  experimentsAllocations: ExperimentAllocation[]
) {
  for (const experiment of experiments) {
    const hasAllocation = experimentsAllocations.find(
      exp => exp.experimentId === experiment.id
    );
    // If the visitor is not allocated to a variant yet, allocate and save the allocation
    if (!hasAllocation) {
      const variantId = getVariantId(experiment);
      experimentsAllocations.push({
        id: 0,
        experimentId: experiment.id,
        variantId,
      });
    }
  }
}

// Retrieve all the experiments allocations
export async function getExperimentsAllocations(
  ctx: NextPageContext,
  experiments: Experiment[],
  customerId: number | null
) {
  const cookies = getCookies(ctx);
  let experimentsAllocations: ExperimentAllocation[] = [];
  let databaseAllocs: ExperimentAllocation[] = [];
  const cookiesAllocs = cookies && cookies.X;

  // If the customer is logged in, retrieve the experiments allocations from our database
  if (customerId) {
    const { data } = await (ctx as any).apolloClient.query({
      query: GetCustomerExperimentsDocument,
      variables: { customerId },
      fetchPolicy: 'network-only',
    });
    const allocations = data.experiments_allocations;

    if (allocations) {
      databaseAllocs = allocations.map((allocation: DatabaseAllocation) => {
        return {
          id: allocation.id,
          experimentId: allocation.experiment_id,
          variantId: allocation.variant_id,
        };
      });
    }
    experimentsAllocations = databaseAllocs;
  }

  // If the customer is logged in and has some allocations stored in cookies,
  // synchronize the allocations
  if (customerId && cookiesAllocs) {
    experimentsAllocations = syncExperimentsAllocations(
      databaseAllocs,
      cookiesAllocs
    );
  } else if (cookiesAllocs) {
    experimentsAllocations = cookiesAllocs;
  }

  // Allocate the visitor to a variant for every new experiment
  setNewExperimentsAllocations(experiments, experimentsAllocations);

  return experimentsAllocations;
}
