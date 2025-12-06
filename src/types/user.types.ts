import type { User as UserEntity } from '../entities/user/model';

export type User = Omit<UserEntity, 'password'>;
