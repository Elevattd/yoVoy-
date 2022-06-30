import { Model, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { UserRole } from "./UserRole"


@Table
export class Role extends Model<Role> {
    @Column
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users!: User[];
} 