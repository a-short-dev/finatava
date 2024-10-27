import { AxiosRequestConfig } from "axios";
import ApiClient from "./core/apiClient";
import {
    Accounts,
    Customers,
    Transactions,
    VirtualWallet,
    Wallet,
} from "./services";

export default class Finatava {
    private readonly accounts: Accounts;
    private readonly customers: Customers;
    private readonly transactions: Transactions;
    private readonly virtualWallet: VirtualWallet;
    private readonly wallet: Wallet;

    constructor(
        private readonly apiKey: string,
        private readonly env: "prod" | "test",
        private readonly options: AxiosRequestConfig = {},
    ) {
        try {
            const client = new ApiClient(this.apiKey, this.env, this.options);
            this.accounts = new Accounts(client);
            this.customers = new Customers(client);
            this.transactions = new Transactions(client);
            this.virtualWallet = new VirtualWallet(client);
            this.wallet = new Wallet(client);
        } catch (error) {
            console.error("Error initializing API client:", error);
            throw new Error("Failed to initialize Finatava API client");
        }
    }

    public accountServices(): Accounts {
        return this.accounts;
    }

    public customerServices(): Customers {
        return this.customers;
    }

    public transactionsServices(): Transactions {
        return this.transactions;
    }

    public walletService(): Wallet {
        return this.wallet;
    }

    public virtualWalletService(): VirtualWallet {
        return this.virtualWallet;
    }
}
