import { z } from 'zod';

export const CreateDeviceInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  model: z.string().min(1, 'Model is required').max(50),
  serialNumber: z.string().min(1, 'Serial number is required').max(100),
  releaseDate: z.string().nullable(),
  grsiNumber: z.string().min(1, 'Grsi number is required').max(100),
  measurementRange: z.string().min(1, 'Measurement range is required').max(100),
  accuracy: z.string().min(1, 'Accuracy is required').max(100),
  inventoryNumber: z.string().min(1, 'Inventory number is required').max(100),
  receiptDate: z.string().nullable(),
  manufacturer: z.string().nullable(),
  verificationInterval: z.int().optional().nullable(),
  archived: z.boolean(),
  nomenclature: z.string().max(50).nullable(),
  statusId: z.string().min(1, 'Status is required'),
  productionSiteId: z.string().min(1, 'Production site is required'),
  equipmentTypeId: z.string().min(1, 'Equipment type is required'),
  measurementTypeId: z.string().min(1, 'Measurement type is required'),
});

export type CreateDeviceInput = z.infer<typeof CreateDeviceInputSchema>;
