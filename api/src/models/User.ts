import {Model, Column, Table, HasMany, DataType, BelongsToMany, HasOne, ForeignKey, Default} from 'sequelize-typescript';
import {Ticket} from './Ticket';
import { Comment } from './Comment';
import { Event } from './Event';
import { Favorites } from './Favorites';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { iUser } from '../types/user';
import { Organization } from './Organization';
import { Request } from "./Request"

@Table
export class User extends Model<iUser>{
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string

  @Column(DataType.STRING(500))
  refreshToken!: string;

  @Default("active")
  @Column(DataType.ENUM("active","banned"))
  status!: string

  @ForeignKey(() => Organization)
  @Column
  organizationId!: number;
  
  @HasOne(() => Organization)
  organization!: Organization;

  @HasMany(() => Comment)
  comments!: Comment[];
  
  @HasMany(()=> Ticket)
  tickets!: Ticket[]

  @BelongsToMany(() => Event, () => Favorites)
  favorites!: Event[];

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

  @HasMany(() => Request)
  requests!: Request[];
}

