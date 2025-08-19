import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseStatus } from './course-status.enum';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async create(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
        const course = this.courseRepository.create({
            ...createCourseDto,
            instructorId,
            status: createCourseDto.status || CourseStatus.DRAFT,
        });

        return await this.courseRepository.save(course);
    }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async findAllByInstructor(instructorId: string): Promise<Course[]> {
        return await this.courseRepository.find({
            where: { instructorId },
        });
    }

    async findOne(id: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['instructor', 'enrollments', 'enrollments.learner'],
        });

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }

        return course;
    }

    async update(id: string, updateCourseDto: UpdateCourseDto, instructorId: string): Promise<Course> {
        const course = await this.findOne(id);

        if (course.instructorId !== instructorId) {
            throw new ForbiddenException('You can only update your own courses');
        }

        await this.courseRepository.update(id, updateCourseDto);
        return await this.findOne(id);
    }

    async remove(id: string, instructorId: string): Promise<void> {
        const course = await this.findOne(id);

        if (course.instructorId !== instructorId) {
            throw new ForbiddenException('You can only delete your own courses');
        }

        await this.courseRepository.delete(id);
    }

    async findApprovedCourses(): Promise<Course[]> {
        return await this.courseRepository.find({
            where: { status: CourseStatus.APPROVED },
        });
    }

    async findAllWithInstructor(): Promise<Course[]> {
        return await this.courseRepository.find({
            relations: ['instructor'],
        });
    }

    async updateStatus(id: string, status: CourseStatus): Promise<Course> {
        await this.findOne(id);
        await this.courseRepository.update(id, { status });
        return await this.findOne(id);
    }
}
