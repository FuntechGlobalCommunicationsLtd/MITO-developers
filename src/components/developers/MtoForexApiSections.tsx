import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Badge } from "@/components/ui/badge";

/** MTO REST endpoints from mtoforex.html Redoc spec */
export function MtoForexApiSections() {
    return (
        <>
            <div className="bg-muted/10 py-6 px-8 border-b">
                <Badge className="bg-primary text-white">MTO Forex API (v1)</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                    Source:{" "}
                    <a href="https://furp02-staging.funtechcom.com/mtoforex.html" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        mtoforex.html
                    </a>
                    {" "}— Auth → Corridors → Rates → Balances → Payouts
                </p>
            </div>

            <section id="auth-login">
                <EndpointBlock
                    method="POST"
                    path="/api/v1/Auth/Login"
                    title="Generate auth token"
                    description="Authenticate with affiliateNumber, affiliateServiceAccountNumber, username, and password. Use Bearer token on all subsequent calls."
                    requestSamples={
                        <CodeTabs tabs={[{ label: "JSON", language: "json", code: `{\n  "affiliateServiceAccountNumber": 0,\n  "affiliateNumber": 0,\n  "username": "string",\n  "password": "string"\n}` }]} />
                    }
                    responseSamples={
                        <CodeTabs tabs={[{ label: "200", language: "json", code: `{\n  "data": {\n    "token": "eyJhbGci...",\n    "expiresIn": "2025-08-30T12:34:56Z",\n    "userId": "12345"\n  },\n  "code": 200,\n  "responseType": "Success"\n}` }]} />
                    }
                >
                    <SchemaTable fields={[
                        { name: "affiliateNumber", type: "integer", required: true, description: "Partner affiliate number." },
                        { name: "username", type: "string", required: true, description: "API username from onboarding email." },
                        { name: "password", type: "string", required: true, description: "API password." },
                    ]} />
                </EndpointBlock>
            </section>

            <section id="exchange-corridors">
                <EndpointBlock
                    method="GET"
                    path="/api/v1/mito/Exchange/corridors"
                    title="Get available corridors"
                    description="Returns rate corridors. Filter with sendCurrency, receiveCurrency, sendCountry, receiveCountry query params."
                    responseSamples={
                        <CodeTabs tabs={[{ label: "200", language: "json", code: `{\n  "data": [{\n    "rateId": "9b1deb4d-...",\n    "sendCurrency": "USD",\n    "receiveCurrency": "INR",\n    "rate": 83.4,\n    "expiryTime": "2025-07-30T17:15:00Z"\n  }],\n  "code": 200\n}` }]} />
                    }
                />
            </section>

            <section id="exchange-rates">
                <EndpointBlock
                    method="POST"
                    path="/api/v1/mito/Exchange/rates"
                    title="Get exchange rate"
                    description="Rate and payout calculation for corridor, provider, serviceCode (MOBILETOPUP | MONEYTRANSFER | BILLPAYMENT), and collectionMode."
                    requestSamples={
                        <CodeTabs tabs={[{ label: "JSON", language: "json", code: `{\n  "userId": "2c4a230c-5085-4924-a3e1-25fb4fc5965b",\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "fromCountry": "USA",\n  "toCountry": "IND",\n  "fromCurrency": "USD",\n  "toCurrency": "INR",\n  "amount": 100,\n  "direction": "S",\n  "providerId": "4834bcdc-4a64-444d-966b-1a6fe381da24"\n}` }]} />
                    }
                />
            </section>

            <section id="lookups-provider">
                <EndpointBlock
                    method="GET"
                    path="/api/v1/mito/Lookups/provider"
                    title="Get provider by country"
                    description="Query: countryiso3, CurrencyCode, ServiceCode, CollectionMode."
                    responseSamples={
                        <CodeTabs tabs={[{ label: "200", language: "json", code: `{\n  "data": [{ "providerCode": "string", "providerName": "string", "providerId": "string" }]\n}` }]} />
                    }
                />
            </section>

            <section id="user-balances">
                <EndpointBlock
                    method="GET"
                    path="/api/v1/mito/Users/{userId}/balances"
                    title="Get partner balances"
                    description="Returns availableBalance, paidOutBalance, and per-currency wallet breakdown."
                    responseSamples={
                        <CodeTabs tabs={[{ label: "200", language: "json", code: `{\n  "data": {\n    "userId": "2c4a230c-...",\n    "currency": "NGN",\n    "totalBalance": 0,\n    "settledBalance": 0,\n    "paidOutBalance": 0\n  }\n}` }]} />
                    }
                />
            </section>

            <section id="create-merchant">
                <EndpointBlock
                    method="POST"
                    path="/api/v2/MTO/CreateMerchantProfile"
                    title="Create merchant profile"
                    description="Register sub-merchant with billerRef, affiliateId, regType (I | C)."
                    requestSamples={
                        <CodeTabs tabs={[{ label: "JSON", language: "json", code: `{\n  "firstName": "John",\n  "lastName": "Doe",\n  "country": "NGA",\n  "regType": "C",\n  "email": "merchant@example.com",\n  "businessName": "Acme Ltd",\n  "affiliateId": "cf46ab20-...",\n  "billerRef": "MXT55555"\n}` }]} />
                    }
                />
            </section>

            <section id="add-settlement-account">
                <EndpointBlock
                    method="POST"
                    path="/api/v1/MTO/AddSettlementAccount"
                    title="Add payout bank account"
                    description="Register bank account for MTO settlement payouts."
                    requestSamples={
                        <CodeTabs tabs={[{ label: "JSON", language: "json", code: `{\n  "providerId": "4834bcdc-...",\n  "userId": "2c4a230c-...",\n  "firstName": "Jane",\n  "lastName": "Doe",\n  "bankName": "Access Bank",\n  "accountNumber": "1234567890",\n  "country": "NGA",\n  "currency": "NGN"\n}` }]} />
                    }
                />
            </section>

            <section id="mto-payouts">
                <EndpointBlock
                    method="GET"
                    path="/api/v1/mito/Mto/Payouts"
                    title="Get payout history"
                    description="Paginated payout records. Query: PageNo, PageSize, SearchingText, StartDate."
                    responseSamples={
                        <CodeTabs tabs={[{ label: "200", language: "json", code: `{\n  "data": [{\n    "payoutId": "c3d65312-...",\n    "payoutAmount": 24000,\n    "status": "Pending",\n    "fromCurrency": "USD",\n    "toCurrency": "NGN"\n  }],\n  "currentPage": 1,\n  "totalPages": 3\n}` }]} />
                    }
                />
            </section>

            <div className="bg-muted/10 py-6 px-8 border-y">
                <Badge variant="outline">Legacy MTO REST</Badge>
                <p className="text-sm text-muted-foreground mt-2">Basic-auth endpoints below — prefer mtoforex v1 API above where available.</p>
            </div>
        </>
    );
}
