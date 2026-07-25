import { api } from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createComment = async (
  { postId, content }: { postId: string; content: string },
  token: string
) => {
  return await api.post(
    API_ENDPOINTS.COMMENTS,
    { postId, content },
    { Authorization: `Bearer ${token}` }
  );
};

export const deleteComment = async (commentId: string, token: string) => {
  return await api.delete(`${API_ENDPOINTS.COMMENTS}/${commentId}`, {
    Authorization: `Bearer ${token}`,
  });
};