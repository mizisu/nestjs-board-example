import { ApiProperty } from '@nestjs/swagger';

export class GetAllKindsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    featured: boolean;
}
