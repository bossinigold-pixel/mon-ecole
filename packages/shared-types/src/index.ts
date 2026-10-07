// Types partagés entre web, mobile et backend

export enum Role {
  STUDENT = "STUDENT",
  PARENT = "PARENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export enum ContentType {
  VIDEO = "VIDEO",
  PDF = "PDF",
  TEXT = "TEXT",
}

export enum ExerciseType {
  QCM = "QCM",
  OPEN_QUESTION = "OPEN_QUESTION",
  UPLOAD = "UPLOAD",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum ProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PaymentMethod {
  ORANGE_MONEY = "ORANGE_MONEY",
  MTN_MONEY = "MTN_MONEY",
  MOOV_MONEY = "MOOV_MONEY",
  CARD = "CARD",
}

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
}

export interface EducationCycle {
  id: string;
  name: string;
  order: number;
}

export interface Level {
  id: string;
  cycleId: string;
  name: string;
  order: number;
}

export interface Subject {
  id: string;
  levelId: string;
  name: string;
  iconUrl?: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  order: number;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description?: string;
  contentType: ContentType;
  contentUrl?: string;
  textContent?: string;
  order: number;
  isFree: boolean;
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  type: ExerciseType;
  difficulty: Difficulty;
  isFree: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
