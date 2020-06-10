import { Experiment, Variant } from './types';

// Validate that the variant weighting is valid
function validateVariants(experiment: Experiment) {
  let weights = 0.0;
  const variants: Variant[] = experiment.variants;

  if (!variants || variants.length < 2) {
    throw new Error(
      `Please review the variants of the experiment '${experiment.name}'. You should at least set two variants`
    );
  }

  for (const variant of variants) {
    weights += variant.weight;
  }

  if (weights !== 1.0) {
    throw new Error(
      `Please review the variant weighting of the experiment '${experiment.name}'. The sum of all your weights is not equal to 1.0`
    );
  }
}

// Return a randomly chosen variant depending on the weight of each variant.
// Create a weighted list and generate a random index to pick a choice in this list.
function chooseVariant(variants: Variant[]) {
  const weightedVariants: Variant[] = [];

  for (const variant of variants) {
    // Repeat variant more or less depending on its weight
    for (let i = 0; i < variant.weight * 100; i++) {
      weightedVariants.push(variant);
    }
  }

  const randomIndex = Math.floor(Math.random() * weightedVariants.length);

  return weightedVariants[randomIndex];
}

// Allocate the visitor to a variant and return this variant id
export default function getVariantId(experiment: Experiment) {
  validateVariants(experiment);

  const variant = chooseVariant(experiment.variants);

  return variant.id;
}
