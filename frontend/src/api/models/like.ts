import { api } from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const toggleLike = async (targetId: string, targetType: 'post' | 'comment', token: string) => {
    return await api.post(`${API_ENDPOINTS.LIKES}/${targetId}/toggle`, { targetType }, { Authorization: `Bearer ${token}` });
};