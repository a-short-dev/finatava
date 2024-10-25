import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ErrorResponse } from "./types/error";
import { handleAxiosError } from "./utils/util";

export default class ApiClient {
    private readonly apiKey: string;
    private readonly client: AxiosInstance;

    constructor(
        apiKey: string,
        private readonly env: "prod" | "test",
        private readonly options: AxiosRequestConfig = {},
    ) {
        this.apiKey = apiKey;
        const baseUrl =
            this.env === "prod"
                ? "https://live.fintavapay.com/api/dev"
                : "https://dev.fintavapay.com/api/dev";

        const defaultConfig: AxiosRequestConfig = {
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
        };

        const config = {
            ...defaultConfig,
            ...this.options,
            headers: {
                ...defaultConfig.headers,
                ...(this.options.headers || {}),
            },
        };

        this.client = axios.create(config);
    }

    // Generic GET method
    public async get<T>(
        endpoint: string,
        data = {},
    ): Promise<T | ErrorResponse> {
        try {
            return await this.client.get(endpoint, data);
        } catch (error) {
            if (error instanceof AxiosError) return handleAxiosError(error);
            throw error;
        }
    }

    // Generic POST method
    public async post<T>(
        endpoint: string,
        data = {},
    ): Promise<T | ErrorResponse> {
        try {
            return await this.client.post(endpoint, data);
        } catch (error) {
            if (error instanceof AxiosError) return handleAxiosError(error);
            throw error;
        }
    }

    // Generic PATCH method
    public async patch<T>(
        endpoint: string,
        data = {},
    ): Promise<T | ErrorResponse> {
        try {
            return await this.client.patch(endpoint, data);
        } catch (error) {
            if (error instanceof AxiosError) return handleAxiosError(error);
            throw error;
        }
    }

    // Generic PUT method
    public async put<T>(
        endpoint: string,
        data = {},
    ): Promise<T | ErrorResponse> {
        try {
            return await this.client.put(endpoint, data);
        } catch (error) {
            if (error instanceof AxiosError) return handleAxiosError(error);
            throw error;
        }
    }

    // Generic DELETE method
    public async _delete<T>(
        endpoint: string,
        data = {},
    ): Promise<T | ErrorResponse> {
        try {
            return await this.client.delete(endpoint, data);
        } catch (error) {
            if (error instanceof AxiosError) return handleAxiosError(error);
            throw error;
        }
    }
}
