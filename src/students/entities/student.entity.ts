import { ApiProperty } from "@nestjs/swagger";

export class Student {
  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  fees: string;

  @ApiProperty({ type: String })
  program: string;

  @ApiProperty({ type: String })
  specialization: string;
}
