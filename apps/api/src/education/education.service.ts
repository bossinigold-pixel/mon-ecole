import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  getCycles() {
    return this.prisma.educationCycle.findMany({
      orderBy: { order: "asc" },
      include: { levels: { orderBy: { order: "asc" } } },
    });
  }

  getSubjectsByLevel(levelId: string) {
    return this.prisma.subject.findMany({
      where: { levelId },
      include: { chapters: { orderBy: { order: "asc" } } },
    });
  }

  async getLessonsByChapter(chapterId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { lessons: { orderBy: { order: "asc" } } },
    });

    if (!chapter) {
      throw new NotFoundException("Chapitre introuvable.");
    }

    return chapter.lessons;
  }

  async getLesson(lessonId: string, hasActiveSubscription: boolean) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { exercises: true },
    });

    if (!lesson) {
      throw new NotFoundException("Leçon introuvable.");
    }

    // Logique freemium : contenu masqué si payant et pas d'abonnement actif
    if (!lesson.isFree && !hasActiveSubscription) {
      return { ...lesson, contentUrl: null, textContent: null, locked: true };
    }

    return { ...lesson, locked: false };
  }
}
