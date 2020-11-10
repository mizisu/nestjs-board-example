import { User } from '../../users/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';
import { Kind } from './kind.entity';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        user => user.boards,
    )
    user: User;

    @ManyToOne(
        () => Kind,
        kind => kind.boards,
    )
    @JoinColumn({ name: 'Kind_id' })
    kind: Kind;

    @RelationId((board: Board) => board.kind)
    kindId: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: false })
    revisit: boolean;

    @CreateDateColumn()
    timestampCreated: Date;

    @UpdateDateColumn()
    timestampUpdated!: Date;
}
