import { Board } from '../../boards/entities/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    encryptedPassword: string;

    @Column({
        default: false,
    })
    isSuperUser: boolean;

    @OneToMany(
        (type) => Board,
        (board) => board.user,
      )
      boards!: Board[];
}
