import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto, CreateCourseDto, CreateNotificationDto, CreateReportDto, CreateReviewDto, CreateUserDto, UpdateSettingDto } from "./admin.dto";

@Injectable()
export class AdminService
{
    private readonly validAccessLevels = ['super_admin', 'moderator', 'analyst'];
    private readonly validUserRoles = ['learner', 'instructor'];
    private readonly validCourseStatus = ['pending', 'approved', 'rejected'];
    private readonly validReportStatus = ['pending', 'resolved', 'dismissed'];
    signIn(): string
    {
        return 'Sign in';
    }
    signUp(): string
    {
        return 'Sign up';
    }
    getId(name : string): string
    {
        return `The given name is ${name}`;
    }
    createAdmin (createAdminDto : CreateAdminDto): string
    {
        console.log('Name :', createAdminDto.name);
        if (!this.validAccessLevels.includes(createAdminDto.accessLevel))
        {
            throw new BadRequestException (`Invalid access levels`);

        }
        const {name, email} = createAdminDto;
        return `Admin ${name} created with ${email}`;

    }
    getAdmin(adminId: number): string
    {
        return 'Admin id is '+ adminId;

    }
    addAdmin(data : CreateAdminDto): string
    {
        console.log('Name :', data.name);
        console.log('Email :', data.email);
         if (!this.validAccessLevels.includes(data.accessLevel))
        {
            throw new BadRequestException (`Invalid access levels`);

        }
         const {name, email} = data;
        return ` Admin added  ${name} with ${email}`;

    }
     createUser (dto : CreateUserDto): string
    {
        console.log('Name :', dto.name);
        console.log('Email :', dto.email);
        if (!this.validUserRoles.includes(dto.role))
        {
            throw new BadRequestException (`Invalid role`);

        }
        const {name, email} = dto;
        return `New user created with ${name} and ${email}`;

    }
    getUsers(): object
    {
        return [{ id: 1, name: 'Mock User', email: 'mock@example.com', role: 'learner', isActive: true, isVerified: false }];

    }
     getUser(id: number): object
  {
    return { id, name: `User ${id}`, email: `user${id}@domain.com`, role: 'learner', isActive: true, isVerified: false };
  }
  verifyUser(id : number): string
  {
     return `User with id ${id} verified`;
  }
  suspendUser(id : number): string
  {
    return `User with id ${id} suspended`;
  }
  deleteUser(id: number): string
  {
    return `User with id ${id} deleted`;
  }
  createCourse (dto: CreateCourseDto): string
  {
    console.log('Title :', dto.title);
    const {title} = dto;
    return `Course ${title} created`;
  }
  getCourses(): object
  {
    return [{ id: 1, title: 'Mock Course', description: 'Mock Description', instructorId: 1, status: 'pending' }];
  }
  getCourse(id: number): object
  {
    return { id, title: `Course ${id}`, description: `Description ${id}`, instructorId: 1, status: 'pending' };
  }
  approveCourse(id : number): string
  {
    if (!this.validCourseStatus.includes('approved')) {
      throw new BadRequestException('Invalid status');
    }
    return `Course with id ${id} approved`;
  }
  rejectCourse(id: number): string
  {
    if (!this.validCourseStatus.includes('rejected')) {
      throw new BadRequestException('Invalid status');
    }
    return `Course with id ${id} rejected`;
  }
  createReport(dto : CreateReportDto): string
  {
    console.log('Description :', dto.description);
    const {description} = dto;
    return `Report created : ${description}`;

  }
  getReports(): object
  {
    return [{ id: 1, reportedUserId: 1, description: 'Mock Report', status: 'pending' }];
  }
  resolveReport(id: number): string
  {
    if (!this.validReportStatus.includes('resolved')) {
      throw new BadRequestException('Invalid status');
    }
    return `Report ${id} resolved`;
  }
  dismissReport(id: number): string
  {
    if (!this.validReportStatus.includes('dismissed')) {
      throw new BadRequestException('Invalid status');
    }
    return `Report ${id} dismissed`;
  }
  getUserGrowth(): object
  {
    return {totalUsers : 100};
  }
  getCourseEngagement(): object
  {
    return {totalCourses : 50, approvedCourses : 30};
  }
  createBackup(): string
  {
    return 'Backup created successfully';
  }
  restoreBackup(backupId : string): string
  {
    return `Backup ${backupId} restored successfully`;
  }
  updateSetting(dto: UpdateSettingDto): string
  {
    console.log('Key :', dto.key);
    const {key, value} = dto;
    return `Setting ${key} updated to ${value}`;
  }
  getSetting(key: string): string
  {
    return `Mock value for setting ${key}`;
  }
  createReview(dto: CreateReviewDto): string
  {
    console.log('Comment :', dto.comment);
    const {courseId} = dto;
    return `Review created for course ${courseId}`;
  }
  getReviews(): object
  {
    return [{ id: 1, courseId: 1, userId: 1, rating: 4, comment: 'Mock Review' }];
  }
  
  deleteReview(id: number): string
  {
    return `Review ${id} deleted`;
  }
   getLogs(): object
  {
    return [{ id: 1, action: 'Mock action', timestamp: Date() }];
  }
   createNotification(dto: CreateNotificationDto): string
  {
    console.log('Title :', dto.title);
    const {title} = dto;
    return `Notification created: ${title}`;
  }
   getNotifications(): object
  {
    return [{ id: 1, title: 'Mock Notification', message: 'Mock Message', recipient: 'all' }];
  }
  }