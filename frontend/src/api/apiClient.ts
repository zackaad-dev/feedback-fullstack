const getBaseUrl = (): string => {
  const envUrl =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_API_BASE_URL
      : undefined;

  if (envUrl && envUrl.trim()) {
    return envUrl.trim();
  }

  return "/api/v1";
};

class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async request({
    endpoint,
    method,
    data,
    additionalHeaders,
  }: {
    endpoint: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
    data?: Record<string, any>;
    additionalHeaders?: Record<string, string>;
  }) {
    try {
      const cleanEndpoint = endpoint.replace(/^\//, "");
      const url = `${this.baseUrl}/${cleanEndpoint}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...additionalHeaders,
        },
        ...(method !== "GET" && data ? { body: JSON.stringify(data) } : {}),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      return await response.json();
    } catch (e) {
      console.error("API request failed", e);
      throw e;
    }
  }

  public async get(
    endpoint: string,
    data?: Record<string, any>,
    additionalHeaders?: Record<string, string>
  ) {
    return this.request({ endpoint, method: "GET", data, additionalHeaders });
  }

  public async post(
    endpoint: string,
    data: Record<string, any>,
    additionalHeaders?: Record<string, string>
  ) {
    return this.request({ endpoint, method: "POST", data, additionalHeaders });
  }

  public async put(
    endpoint: string,
    data: Record<string, any>,
    additionalHeaders?: Record<string, string>
  ) {
    return this.request({ endpoint, method: "PUT", data, additionalHeaders });
  }

  public async delete(
    endpoint: string,
    additionalHeaders?: Record<string, string>
  ) {
    return this.request({ endpoint, method: "DELETE", additionalHeaders });
  }
}

export const api = new ApiClient(getBaseUrl());