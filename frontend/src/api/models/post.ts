import { api } from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createpost = async ({ title, content }:{ title: string, content: string }, token: string) => {
    return await api.post(API_ENDPOINTS.POSTS, { title, content }, { Authorization: `Bearer ${token}` });
};

export const getPosts = async ({ query, token }:{query?: Record<string, string>, token?: string}) => api.get(API_ENDPOINTS.POSTS, query, token ? { Authorization: `Bearer ${token}` } : undefined);

export const getPostComments = async (postId: string, token?: string) => api.get(`${API_ENDPOINTS.POSTS}/${postId}/comments`, undefined, { Authorization: `Bearer ${token}` });
