import useSWR from 'swr';
import { api } from './api'; // Đường dẫn tới hàm api mà bạn đã phát triển
import { TResponse } from './lib.types';

export const useApi = <T>(endpoint: string, init?: RequestInit) => {
    // Sử dụng SWR với fetcher là hàm api của bạn
    const { data, error, isLoading, mutate } = useSWR<TResponse<T>>(
        endpoint,
        () => api<T>(endpoint, init),
    );

    return {
        data: data?.data, // Trả về dữ liệu từ TResponse
        error: data?.error || error, // Trả về lỗi từ response hoặc từ SWR
        isLoading,
        mutate, // Mutate để có thể cập nhật cache khi cần
    };
};
