import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user?: any;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(options.headers as HeadersInit || {}),
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          redirect('/login');
        }
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // Auth
  register = (data: any) => this.request<RegisterResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) });
  login = (data: any) => this.request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) });
  me = () => this.request<any>('/auth/me');

  // Jobs
  jobs = {
    list: (params?: Record<string, any>) => {
      const query = new URLSearchParams(params).toString();
      return this.request<any>(`/jobs${query ? `?${query}` : ''}`);
    },
    create: (data: any) => this.request<any>('/jobs', { method: 'POST', body: JSON.stringify(data) }),
    get: (id: string) => this.request<any>(`/jobs/${id}`),
    update: (id: string, data: any) => this.request<any>(`/jobs/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.request<void>(`/jobs/${id}`, { method: 'DELETE' }),
  };

  // Applications
  applications = {
    list: (params?: Record<string, any>) => {
      const query = new URLSearchParams(params).toString();
      return this.request<any>(`/applications${query ? `?${query}` : ''}`);
    },
    create: (data: any) => this.request<any>('/applications', { method: 'POST', body: JSON.stringify(data) }),
    get: (id: string) => this.request<any>(`/applications/${id}`),
    update: (id: string, data: any) => this.request<any>(`/applications/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.request<void>(`/applications/${id}`, { method: 'DELETE' }),
    updateStatus: (id: string, status: string) => this.request<any>(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  };

  // Notes
  notes = {
    list: (applicationId: string) => this.request<any>(`/applications/${applicationId}/notes`),
    create: (applicationId: string, data: any) => this.request<any>(`/applications/${applicationId}/notes`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => this.request<any>(`/notes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.request<void>(`/notes/${id}`, { method: 'DELETE' }),
  };

  // Interviews
  interviews = {
    list: (params?: Record<string, any>) => {
      const query = new URLSearchParams(params).toString();
      return this.request<any>(`/interviews${query ? `?${query}` : ''}`);
    },
    create: (applicationId: string, data: any) => this.request<any>(`/applications/${applicationId}/interviews`, { method: 'POST', body: JSON.stringify(data) }),
    get: (id: string) => this.request<any>(`/interviews/${id}`),
    update: (id: string, data: any) => this.request<any>(`/interviews/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.request<void>(`/interviews/${id}`, { method: 'DELETE' }),
  };

  // Attachments
  attachments = {
    list: (applicationId: string) => this.request<any>(`/applications/${applicationId}/attachments`),
    upload: (applicationId: string, formData: FormData) => {
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return fetch(`${API_URL}/applications/${applicationId}/attachments`, {
        method: 'POST',
        headers,
        body: formData,
      }).then(res => {
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
      });
    },
    delete: (id: string) => this.request<void>(`/attachments/${id}`, { method: 'DELETE' }),
  };

  // Dashboard
  dashboard = {
    get: () => this.request<any>('/dashboard'),
  };

  // Admin
  admin = {
    users: (params?: Record<string, any>) => {
      const query = new URLSearchParams(params).toString();
      return this.request<any>(`/admin/users${query ? `?${query}` : ''}`);
    },
    stats: () => this.request<any>('/admin/stats'),
  };
}

export const api = new ApiClient();
