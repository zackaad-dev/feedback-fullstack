const baseUrl = process.env.REACT_APP_API_URL;

if (!baseUrl) {
  throw new Error('REACT_APP_API_URL is not defined in .env');
}

class ApiClient {
    baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    private async request({endpoint, method, data, additionalHeaders}: {endpoint: string, method: "POST" | "GET", data?: Record<string, string>, additionalHeaders?: Record<string, string>} ){
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method,
                headers: {
                  "Content-Type": "application/json",
                  ...additionalHeaders,
                },
                ...(method !== "GET" && data ? { body: JSON.stringify(data) } : {}),
              });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
            }

            return response.json();


        } catch (e) {
            console.error("API request failed", e);
            return null;
        }
    }

    public async get(endpoint: string, data?: Record<string, string>, additionalHeaders?: Record<string, string>) {
        return this.request({endpoint, method: "GET", data, additionalHeaders});
    }

    public async post(endpoint: string, data: Record<string, string>, additionalHeaders?: Record<string, string>) {
        return this.request({endpoint, method: "POST", data, additionalHeaders});
    }
    
}

export const api = new ApiClient(`${baseUrl}/api`);