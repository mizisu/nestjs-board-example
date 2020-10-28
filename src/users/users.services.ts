import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt-nodejs';
import { FindConditions, FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService implements OnModuleInit {
    async onModuleInit() {
        const user = await User.findOne({ email: 'admin@admin.com' });
        if (!user) {
            const r = User.create({
                email: 'admin@admin.com',
                username: 'admin',
                encryptedPassword: bcrypt.hashSync('admin'),
                isSuperUser: true,
            });
            r.save();
            console.log('Create', r);
        }
    }

    async findOne(options?: FindConditions<User>): Promise<User> {
        return await User.findOne(options);
    }
}
