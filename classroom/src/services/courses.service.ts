import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  async findCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const course = await this.prisma.course.findUnique({ where: { slug } });

    if (course) throw new Error('Course already exists');

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
