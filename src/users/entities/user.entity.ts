import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  refreshToken: string;

  @ApiProperty({ type: String })
  userType: string;
}
