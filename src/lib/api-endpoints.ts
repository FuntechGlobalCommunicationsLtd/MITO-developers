export type ApiPhase = "collect" | "processForex" | "disburse" | "manage";
export type ApiPartner = "retail" | "biller" | "mto" | "all";

export interface ApiEndpointDef {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    title: string;
    description: string;
    phase: ApiPhase;
    partners: ApiPartner[];
    href: string;
    externalDoc?: string;
}

/** Canonical endpoint index — sourced from FURP/MITO Redoc specs */
export const API_ENDPOINTS: ApiEndpointDef[] = [
    // ─── Retail (mito.html) ───
    {
        method: "POST",
        path: "/api/v1/mito/Auth/login",
        title: "Authenticate (Retail)",
        description: "JWT bearer token with AccessAffiliateNumber and AccessServiceNumber.",
        phase: "manage",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#auth-login",
        externalDoc: "https://furp02-staging.funtechcom.com/mito.html",
    },
    {
        method: "POST",
        path: "/api/v1/mito/Users",
        title: "Create user (sender)",
        description: "Register retail customer / sender for KYC and transactions.",
        phase: "collect",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#create-user",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Exchange/corridors",
        title: "Get corridors (Retail)",
        description: "Available send/receive corridor pairs.",
        phase: "processForex",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#get-corridors",
    },
    {
        method: "POST",
        path: "/api/v1/mito/Exchange/rates",
        title: "Validate exchange rate (Retail)",
        description: "Get rateId required before POST /api/v1/mito/Transactions.",
        phase: "processForex",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#post-rates",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Lookups/provider",
        title: "Get payout providers (Retail)",
        description: "Providers by country, currency, service, and collection mode.",
        phase: "processForex",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#get-lookup-provider",
    },
    {
        method: "POST",
        path: "/api/v1/mito/Beneficiaries",
        title: "Create beneficiary (Retail)",
        description: "Register payout destination before or during hosted flow.",
        phase: "disburse",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#create-beneficiary",
    },
    {
        method: "POST",
        path: "/api/v1/mito/Transactions",
        title: "Initiate transaction (Retail)",
        description: "Primary entry point. Returns PaymentUrl for HOSTEDPAGE/SDK channel.",
        phase: "collect",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#create-transaction",
        externalDoc: "https://furp02-staging.funtechcom.com/mito/mito.html#tag/SDK-Integration",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Transactions/by-reference",
        title: "Get transaction (Retail)",
        description: "Poll status by MITO reference or partnerReferenceNumber.",
        phase: "manage",
        partners: ["retail"],
        href: "/developers/api-reference/retail-api#get-transaction",
    },

    // ─── Biller (affiliate-payment-collection) ───
    {
        method: "POST",
        path: "/api/v2/Business/InitiateTransactions",
        title: "Initiate collection (Biller)",
        description: "Start collection with billerId. Returns redirectUrl for hosted/card/bank pay.",
        phase: "collect",
        partners: ["biller"],
        href: "/developers/api-reference/biller-api#initiate-transaction",
        externalDoc: "https://furp02-pre-pord.funtechcom.com/affiliate-payment-collection.html",
    },
    {
        method: "GET",
        path: "/api/v2/Business/GetTransactionStatus",
        title: "Collection status (Biller)",
        description: "Poll by referenceNo or partnerRefernceNumber.",
        phase: "manage",
        partners: ["biller"],
        href: "/developers/api-reference/biller-api#get-status",
    },
    {
        method: "GET",
        path: "/api/v2/Business/balances",
        title: "Biller wallet balances",
        description: "Available balance after collections.",
        phase: "manage",
        partners: ["biller"],
        href: "/developers/api-reference/biller-api#get-balances",
    },
    {
        method: "POST",
        path: "/api/v2/payout/CreatePayout",
        title: "Create payout (Biller)",
        description: "Withdraw wallet to approved corporate bank account.",
        phase: "disburse",
        partners: ["biller"],
        href: "/developers/api-reference/biller-api#create-payout",
    },
    {
        method: "POST",
        path: "/api/v2/Payout/AddPayoutAccount",
        title: "Add payout account (Biller)",
        description: "Register settlement bank account.",
        phase: "disburse",
        partners: ["biller"],
        href: "/developers/api-reference/biller-api#add-payout-account",
    },

    // ─── MTO (mtoforex.html) ───
    {
        method: "POST",
        path: "/api/v1/Auth/Login",
        title: "Authenticate (MTO)",
        description: "Bearer token via affiliateNumber, username, password.",
        phase: "manage",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#auth-login",
        externalDoc: "https://furp02-staging.funtechcom.com/mtoforex.html",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Exchange/corridors",
        title: "Get corridors (MTO)",
        description: "Available FX corridors with optional send/receive filters.",
        phase: "processForex",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#exchange-corridors",
    },
    {
        method: "POST",
        path: "/api/v1/mito/Exchange/rates",
        title: "Get exchange rate (MTO)",
        description: "Rate and payout calculation for corridor, provider, amount.",
        phase: "processForex",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#exchange-rates",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Lookups/provider",
        title: "Get providers (MTO)",
        description: "Payout providers by country, currency, service code.",
        phase: "processForex",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#lookups-provider",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Users/{userId}/balances",
        title: "Partner balances (MTO)",
        description: "availableBalance and paidOutBalance per currency.",
        phase: "manage",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#user-balances",
    },
    {
        method: "POST",
        path: "/api/v2/MTO/CreateMerchantProfile",
        title: "Create merchant profile (MTO)",
        description: "Register sub-merchant with billerRef and affiliateId.",
        phase: "collect",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#create-merchant",
        externalDoc: "https://furp02-staging.funtechcom.com/mtoforex.html#tag/MTO/operation/createMerchantProfile",
    },
    {
        method: "POST",
        path: "/api/v1/MTO/AddSettlementAccount",
        title: "Add settlement account (MTO)",
        description: "Register bank account for MTO payouts.",
        phase: "disburse",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#add-settlement-account",
    },
    {
        method: "GET",
        path: "/api/v1/mito/Mto/Payouts",
        title: "Get payout history (MTO)",
        description: "Paginated payout transaction history.",
        phase: "disburse",
        partners: ["mto"],
        href: "/developers/api-reference/mto-api#mto-payouts",
    },
];

export function endpointsByPhase(phase: ApiPhase): ApiEndpointDef[] {
    return API_ENDPOINTS.filter((e) => e.phase === phase);
}

export function endpointsByPartner(partner: ApiPartner): ApiEndpointDef[] {
    return API_ENDPOINTS.filter((e) => e.partners.includes(partner));
}

export const PARTNER_API_PAGES = {
    retail: {
        title: "Retail API (full reference)",
        href: "/developers/api-reference/retail-api",
        external: "https://furp02-staging.funtechcom.com/mito.html",
    },
    biller: {
        title: "Biller API (full reference)",
        href: "/developers/api-reference/biller-api",
        external: "https://furp02-pre-pord.funtechcom.com/affiliate-payment-collection.html",
    },
    mto: {
        title: "MTO API (full reference)",
        href: "/developers/api-reference/mto-api",
        external: "https://furp02-staging.funtechcom.com/mtoforex.html",
    },
} as const;
