import { devices } from "../models/device.model";

export type Device = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;