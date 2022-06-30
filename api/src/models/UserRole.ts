import { Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import { Role } from "./Role"


@Table
export class UserRole extends Model<UserRole> {

    @ForeignKey(() => User)
    @Column
    userId!: number

    @ForeignKey(() => Role)
    @Column
    roleId!: number
} 