export interface Note {
  id: number | null;
  userId: number | null;
  userName?: string | null;
  topicId: number | null;
  topicType?: string | null;
  title: string | null;
  text: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
