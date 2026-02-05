export const progressPresets = [
  'Order accepted',
  'Measurements confirmed',
  'Fabric sourced',
  'Cutting started',
  'Stitching in progress',
  'First fitting ready',
  'Adjustments ongoing',
  'Final stitching',
  'Ready for delivery',
  'Delivered and completed',
] as const;

export type ProgressPreset = (typeof progressPresets)[number];
