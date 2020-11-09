import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Kind extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        default: false,
    })
    featured: boolean;

    @OneToMany(
        () => Board,
        board => board.kind,
    )
    boards: Board[];

    public toString(): string {
        return `${name}`;
    }
}
