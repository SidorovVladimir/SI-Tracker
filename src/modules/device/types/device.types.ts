import { devices } from '../models/device.model';

export type DeviceEntity = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;
