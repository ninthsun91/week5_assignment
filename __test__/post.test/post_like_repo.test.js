import PostRepository from "../../database/repositories/post";
import {
  findPostLikeInsertSchema,
  findPostAllLikeInsertSchema,
  countPostLikeinsertSchema,
  addPostLikeInsertSchema,
  deletePostLikeInsertSchema
} from "../../__test__/fixtures/post.fixtures";

const mockPostModel = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn(),
  count: jest.fn(),
  increment: jest.fn(),
});

describe("Post Like Repository layer Test", () => {
  let postRepository = new PostRepository();
  postRepository.Likes = mockPostModel();

  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("findLikes Method toHaveBeenCalled", async () => {
    const likefind = await postRepository.findLike(findPostLikeInsertSchema);
    expect(postRepository.Likes.findOne).toHaveBeenCalledTimes(1);
  });

  test("findAllLikes Method toHaveBeenCalled", async () => {
    const findAllLike = await postRepository.findLikes(
      findPostAllLikeInsertSchema
    );
    expect(postRepository.Likes.findAll).toHaveBeenCalledTimes(1);
  });

  test("countLikes Method toHaveBeenCalled", async () => {
    const countLikes = await postRepository.countLikes(
      countPostLikeinsertSchema
    );
    expect(postRepository.Likes.count).toHaveBeenCalledTimes(1);
  });

  //   test.only("countLikes Method toHaveBeenCalled", async () => {
  //     const postId = countPostLikeinsertSchema.postId;
  //     const countLikes = await postRepository.countLikes(postId);
  //     expect(postRepository.Likes.count).toHaveBeenCalledWith({
  //       where: { postId: postId },
  //     });
  //   });

  test("addLike Method toHaveBeenCalled", async () => {
    const postId = addPostLikeInsertSchema.postId;
    const userId = addPostLikeInsertSchema.userId;
    const add = await postRepository.addLike({postId, userId});

    expect(postRepository.Likes.create).toHaveBeenCalledTimes(1);

    expect(postRepository.Likes.increment).toHaveBeenCalledWith(
      { likes: 1 },
      { where: { postId: postId } }
    );
  });

  test("deleteLike Method toHaveBeenCalled", async () => {
    const postId = deletePostLikeInsertSchema.postId;
    const userId = deletePostLikeInsertSchema.userId;
    const deleteLike = await postRepository.deleteLike({postId, userId});

    expect(postRepository.Likes.destroy).toHaveBeenCalledTimes(1);

    expect(postRepository.Likes.increment).toHaveBeenCalledWith(
      { likes: -1 },
      { where: { postId: postId } }
    );
  });
});
