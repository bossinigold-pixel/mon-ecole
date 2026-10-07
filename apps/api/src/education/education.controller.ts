import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EducationService } from "./education.service";
import { PrismaService } from "../common/prisma.service";

@Controller("education")
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
    private readonly prisma: PrismaService
  ) {}

  @Get("cycles")
  getCycles() {
    return this.educationService.getCycles();
  }

  @Get("levels/:levelId/subjects")
  getSubjects(@Param("levelId") levelId: string) {
    return this.educationService.getSubjectsByLevel(levelId);
  }

  @Get("chapters/:chapterId/lessons")
  getLessons(@Param("chapterId") chapterId: string) {
    return this.educationService.getLessonsByChapter(chapterId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("lessons/:lessonId")
  async getLesson(@Param("lessonId") lessonId: string, @Req() req: any) {
    const activeSubscription = await this.prisma.subscription.findFirst({
      where: { userId: req.user.userId, status: "ACTIVE", endDate: { gte: new Date() } },
    });

    return this.educationService.getLesson(lessonId, Boolean(activeSubscription));
  }
}
