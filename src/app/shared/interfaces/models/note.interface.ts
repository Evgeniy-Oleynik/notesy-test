export interface Note {
  id: number;
  userId: number;
  userName?: string;
  topicId: number;
  topicType?: string;
  title: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}
