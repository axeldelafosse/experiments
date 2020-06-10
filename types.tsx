export interface DatabaseAllocation {
  id: number;
  experiment_id: string;
  variant_id: string;
}

export interface ExperimentAllocation {
  id: number;
  experimentId: string;
  variantId: string;
}

export interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  weight: number;
}

export interface Experiments {
  dev: Experiment[];
  staging: Experiment[];
  prod: Experiment[];
}
