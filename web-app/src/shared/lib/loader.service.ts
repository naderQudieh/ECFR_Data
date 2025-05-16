
 
/*
import { Subject } from "rxjs";
// loader.service.ts
interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface ApiError {
    message: string;
    status?: number;
    data?: unknown;
}

class HttpService {
    private baseURL: string;
    private timeout: number = 5000;
    private loadingSubject = new Subject<boolean>();
    private errorSubject = new Subject<ApiError | null>();

    // Public observables for external subscriptions
    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();

    constructor(baseURL: string, timeout?: number) {
        this.baseURL = baseURL;
        this.timeout = timeout;
    }

    private async request<T>(endpoint: string, config: RequestInit): Promise<ApiResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            this.loadingSubject.next(true);
            this.errorSubject.next(null);

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    message: `HTTP error ${response.status}`,
                    status: response.status,
                    data: errorData
                } as ApiError;
            }

            const data: T = await response.json();
            return {
                data,
                status: response.status,
                statusText: response.statusText
            };
        } catch (err) {
            clearTimeout(timeoutId);
            const error = this.normalizeError(err);
            this.errorSubject.next(error);
            throw error;
        } finally {
            this.loadingSubject.next(false);
        }
    }

    private normalizeError(error: unknown): ApiError {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return { message: `Request timed out after ${this.timeout}ms` };
        }
        return error as ApiError;
    }

    public get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    public delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    public post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }
}

    interface Todo {
        id: number;
        title: string;
        completed: boolean;
    }

  */ 
// Initialize and cleanup
document.addEventListener('DOMContentLoaded', () => {
   
});