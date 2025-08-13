export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  bio?: string;
  postsCount: number;
  answersCount: number;
  bestAnswersCount: number;
  createdAt: Date;
}

export interface ProfileUpdateData {
  displayName?: string;
  bio?: string;
}