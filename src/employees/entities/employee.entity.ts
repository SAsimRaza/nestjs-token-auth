import { ApiProperty } from '@nestjs/swagger';

export class Employee {
  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  salary: string;

  @ApiProperty({ type: String })
  department: string;

  @ApiProperty({ type: String })
  experience: string;
}
