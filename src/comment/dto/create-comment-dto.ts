export class CreateCommentDto {
  readonly content: string;
  readonly userId: number;
  readonly postId: number;
  readonly parentCommentId?: number;
}
