import { IsEmail, IsString, IsInt, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreateAdminDto {
   @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: ' Invalid Password' })
  password: string;

  @IsString()
  accessLevel: string;
}

export class CreateUserDto {
   @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: ' Invalid Password' })
  password: string;

  @IsString()
  role: string;
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Matches(/^0[0-9]*$/, { message: 'instructorId must be an integer starting with 0' })
  instructorId: string;
}

export class CreateReportDto {
  @IsInt()
  reportedUserId: number;

  @IsInt()
  @IsOptional()
  reportedCourseId?: number;

  @IsString()
  description: string;
}

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  recipient: string;
}

export class UpdateSettingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class CreateReviewDto {
  @IsInt()
  courseId: number;

  @IsInt()
  userId: number;

  @IsNumber()
  @Min(1)
  rating: number;

  @IsString()
  comment: string;
}