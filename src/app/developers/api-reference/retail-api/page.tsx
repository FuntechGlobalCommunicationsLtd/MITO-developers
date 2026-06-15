"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs, CodeBlock } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Badge } from "@/components/ui/badge";
import { Info, ShieldAlert, Key, Landmark } from "lucide-react";

export default function RetailApiReference() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                {/* Page Title */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Retail Submission API</h1>
                    <p className="text-xl text-muted-foreground">
                        Integrate MITO&apos;s White-labelled payment and money transfer engine. This API powers customer onboarding, FX validations, and checkout session management.
                    </p>
                </div>

                {/* Authentication Info */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Key className="w-6 h-6 text-primary" /> API Authentication
                    </h2>
                    <p className="text-muted-foreground">
                        All requests to the Retail API must be authenticated using a JWT token in the <code>Authorization</code> header and your private key in the <code>Mito-Secret-Key</code> header.
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-foreground m-0">Required Headers</h4>
                        <SchemaTable
                            fields={[
                                { name: "Authorization", type: "string", required: true, description: "Bearer token returned by the /auth/login endpoint.", example: "Bearer eyJhbGciOi..." },
                                { name: "Mito-Secret-Key", type: "string", required: true, description: "Your private API secret key generated in your dashboard.", example: "sk_live_xyz789" },
                                { name: "Content-Type", type: "string", required: true, description: "Must be set to application/json.", example: "application/json" }
                            ]}
                        />
                    </div>

                    {/* Pre-Live Testing Accounts */}
                    <div className="pt-8 border-t mt-8 space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 m-0">
                            <Landmark className="w-5 h-5 text-primary shrink-0" /> Pre-Live Testing Beneficiary Accounts
                        </h3>
                        <p className="text-sm text-muted-foreground m-0">
                            Before going LIVE to your customers, please use the following verified beneficiary accounts to perform real-world end-to-end tests for the corresponding corridors:
                        </p>
                        <div className="w-full overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground border-b uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Currency</th>
                                        <th className="px-4 py-3 font-medium">Country</th>
                                        <th className="px-4 py-3 font-medium">Type</th>
                                        <th className="px-4 py-3 font-medium">Bank/Network</th>
                                        <th className="px-4 py-3 font-medium">Account/Wallet No.</th>
                                        <th className="px-4 py-3 font-medium">Beneficiary Name</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y relative">
                                    {[
                                        { currency: "NGN", country: "Nigeria", type: "Bank Account", provider: "United Bank of Africa", number: "101 831 6888", name: "Topupnigeria.com nig Ltd" },
                                        { currency: "XOF", country: "Mali", type: "Mobile Money", provider: "Orange", number: "+22394023155", name: "-" },
                                        { currency: "XOF", country: "Guinea Conakry", type: "Mobile Money", provider: "Orange Guinea", number: "+224621499214", name: "-" },
                                        { currency: "XAF", country: "Cameroon", type: "Mobile Money", provider: "MTN", number: "+237655737037", name: "Boubacar Diallo" },
                                        { currency: "XOF", country: "Senegal", type: "Mobile Money", provider: "Orange Senegal", number: "+221775913063", name: "-" },
                                        { currency: "GHS", country: "Ghana", type: "Mobile Money", provider: "MTN", number: "0244582582", name: "Emmanuel Kofi" },
                                        { currency: "KES", country: "Kenya", type: "Bank Account", provider: "Equity Bank", number: "1710185926608", name: "ASHLEY KASISI" },
                                        { currency: "KES", country: "Kenya", type: "Mobile Money", provider: "Mpesa", number: "254728893174", name: "WAITERE MUTAH" },
                                        { currency: "TZS", country: "Tanzania", type: "Mobile Money", provider: "Tigopesa", number: "255765412309", name: "SALUMU SHUKIA" }
                                    ].map((acc, index) => (
                                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-3 font-mono font-semibold">{acc.currency}</td>
                                            <td className="px-4 py-3">{acc.country}</td>
                                            <td className="px-4 py-3 text-xs">{acc.type}</td>
                                            <td className="px-4 py-3">{acc.provider}</td>
                                            <td className="px-4 py-3 font-mono text-xs">{acc.number}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{acc.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* API Sections */}
                <div className="space-y-0">
                    
                    {/* SECTION: AUTHENTICATION */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Authentication</Badge>
                    </div>

                    <section id="auth-login">
                        <EndpointBlock
                            method="POST"
                            path="/auth/login"
                            title="Generate Access Token"
                            description="Authenticate your server credentials and receive a temporary JWT bearer token valid for 1 hour."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "email": "developer@partner.com",\n  "password": "SecurePassword123!"\n}`
                                        }
                                    ]}
                                />
                            }
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "expiresIn": 3600,\n  "tokenType": "Bearer"\n}`
                                        },
                                        {
                                            label: "401 Unauthorized",
                                            language: "json",
                                            code: `{\n  "responseCode": "20001",\n  "responseMessage": "Incorrect login credentials provided."\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "email", type: "string", required: true, description: "Your partner registration email address." },
                                        { name: "password", type: "string", required: true, description: "Your partner account password." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: USER MANAGEMENT */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">User Onboarding & KYC</Badge>
                    </div>

                    <section id="create-user">
                        <EndpointBlock
                            method="POST"
                            path="/users"
                            title="Create User (Onboard)"
                            description="Register a new retail customer. MITO will automatically verify their identity and initiate compliance screening."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "firstName": "John",\n  "lastName": "Doe",\n  "email": "john.doe@example.com",\n  "mobileNumber": "+447700900077",\n  "dateOfBirth": "1990-05-15",\n  "nationality": "GBR",\n  "gender": "Male"\n}`
                                        }
                                    ]}
                                />
                            }
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "201 Created",
                                            language: "json",
                                            code: `{\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "status": "PENDING_VERIFICATION",\n  "kycTier": "TIER_1"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "firstName", type: "string", required: true, description: "Legal first name." },
                                        { name: "lastName", type: "string", required: true, description: "Legal last name." },
                                        { name: "email", type: "string", required: true, description: "Customer email address." },
                                        { name: "mobileNumber", type: "string", required: true, description: "E.164 format mobile number." },
                                        { name: "dateOfBirth", type: "string", required: true, description: "ISO date format (yyyy-MM-dd)." },
                                        { name: "nationality", type: "string", required: true, description: "3-letter ISO-3166 country code." },
                                        { name: "gender", type: "string", required: true, description: "Male or Female." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-user">
                        <EndpointBlock
                            method="GET"
                            path="/users/{userId}"
                            title="Get User Profile"
                            description="Retrieve user profile, current KYC approval status, and limit level."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "firstName": "John",\n  "lastName": "Doe",\n  "email": "john.doe@example.com",\n  "kycStatus": "APPROVED",\n  "limits": {\n    "dailyRemaining": 5000.00,\n    "currency": "GBP"\n  }\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Path Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "userId", type: "string", required: true, description: "The unique identifier of the user." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-balances">
                        <EndpointBlock
                            method="GET"
                            path="/users/{userId}/balances"
                            title="Get User Balances"
                            description="Check current funds and currency wallet allocations for a specific retail user."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "currency": "GBP",\n    "balance": 1500.50,\n    "hold": 0.00\n  },\n  {\n    "currency": "EUR",\n    "balance": 250.00,\n    "hold": 50.00\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Path Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "userId", type: "string", required: true, description: "The ID of the user." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: RATES & ROUTING */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Rates & Routing</Badge>
                    </div>

                    <section id="get-corridors">
                        <EndpointBlock
                            method="GET"
                            path="/exchange/Corridors"
                            title="Get Active Corridors"
                            description="Retrieve a listing of active corridors, specifying destination countries and supported payout currencies."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "sourceCountry": "GBR",\n    "destinationCountry": "NGA",\n    "supportedCurrencies": ["NGN", "USD"],\n    "status": "ACTIVE"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        />
                    </section>

                    <hr className="border-border" />

                    <section id="get-lookup-provider">
                        <EndpointBlock
                            method="GET"
                            path="/lookups/provider"
                            title="Lookup Service Providers"
                            description="Lookup bank networks, mobile wallets, or cash locations supported in the target payout corridor."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "providerId": "prov_ng_gtb",\n    "name": "Guaranty Trust Bank",\n    "serviceType": "MONEYTRANSFER",\n    "collectionMode": "BANKACCOUNT",\n    "status": "ACTIVE"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "countryiso3", type: "string", required: true, description: "3-letter destination country ISO." },
                                        { name: "CurrencyCode", type: "string", required: true, description: "Payout currency ISO code." },
                                        { name: "ServiceCode", type: "string", required: true, description: "E.g. MONEYTRANSFER, MOBILETOPUP" },
                                        { name: "CollectionMode", type: "string", required: false, description: "BANKACCOUNT, CASH, MOBILEMONEY" }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="post-rates">
                        <EndpointBlock
                            method="POST"
                            path="/exchange/rates"
                            title="Calculate FX Rate Quote"
                            description="Generates and locks an FX conversion rate and breakdown fees for the user."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "fromCountry": "GBR",\n  "toCountry": "NGA",\n  "fromCurrency": "GBP",\n  "toCurrency": "NGN",\n  "amount": 100.00,\n  "direction": "SEND"\n}`
                                        }
                                    ]}
                                />
                            }
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "rateId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",\n  "exchangeRate": 1950.00,\n  "sendAmount": 100.00,\n  "receiveAmount": 195000.00,\n  "transferFee": 2.50,\n  "totalAmountToPay": 102.50,\n  "expiresAt": "2026-06-15T12:15:00Z"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "userId", type: "string", required: true, description: "ID of the verified user." },
                                        { name: "serviceCode", type: "string", required: true, description: "MONEYTRANSFER, etc." },
                                        { name: "collectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH." },
                                        { name: "fromCountry", type: "string", required: true, description: "3-letter sender country." },
                                        { name: "toCountry", type: "string", required: true, description: "3-letter payout country." },
                                        { name: "fromCurrency", type: "string", required: true, description: "3-letter source currency." },
                                        { name: "toCurrency", type: "string", required: true, description: "3-letter destination currency." },
                                        { name: "amount", type: "number", required: true, description: "Amount value." },
                                        { name: "direction", type: "string", required: true, description: "SEND (amount is source) or RECEIVE (amount is payout)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: TRANSACTIONS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Checkout & Transactions</Badge>
                    </div>

                    <section id="create-transaction">
                        <EndpointBlock
                            method="POST"
                            path="/transactions"
                            title="Initiate Transaction Session"
                            description="Locks in transfer parameters and returns a paymentUrl and linkToken. The linkToken is used to initialize the frontend SDK checkout modal."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "PartnerReferenceNumber": "ORD-12345",\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "beneficiaryId": "benef-789-xyz",\n  "sendCountryIso3": "GBR",\n  "receiveCountryIso3": "NGA",\n  "sendCurrency": "GBP",\n  "receiveCurrency": "NGN",\n  "sendAmount": 100.00,\n  "rateId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",\n  "redirectUrl": "https://yourwebsite.com/success",\n  "webhookUrl": "https://yourwebsite.com/api/webhooks"\n}`
                                        }
                                    ]}
                                />
                            }
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "retailTransactionId": "tx_abc123xyz789",\n    "reference": "MITO-889900",\n    "partnerReferenceNumber": "ORD-12345",\n    "status": "NEW",\n    "paymentUrl": "https://link.mito.money/retail-payment?journeyCode=abc123token...",\n    "linkToken": "abc123encryptedtoken..."\n  }\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "serviceCode", type: "string", required: true, description: "E.g. MONEYTRANSFER." },
                                        { name: "collectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH, MOBILEMONEY." },
                                        { name: "PartnerReferenceNumber", type: "string", required: true, description: "Your internal tracking order reference." },
                                        { name: "userId", type: "string", required: true, description: "The customer's ID." },
                                        { name: "beneficiaryId", type: "string", required: true, description: "The payout beneficiary's ID." },
                                        { name: "sendAmount", type: "number", required: true, description: "Amount to send (excluding fees)." },
                                        { name: "rateId", type: "string", required: true, description: "The active FX quote ID from POST /exchange/rates." },
                                        { name: "redirectUrl", type: "string", required: true, description: "The landing URL redirect for when the payment finishes on Hosted flow." },
                                        { name: "webhookUrl", type: "string", required: true, description: "Destination endpoint for transaction status webhooks." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-transaction-ref">
                        <EndpointBlock
                            method="GET"
                            path="/transactions/by-reference"
                            title="Get Transaction Status"
                            description="Query transaction status by reference or partner internal reference ID."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "retailTransactionId": "tx_abc123xyz789",\n  "reference": "MITO-889900",\n  "partnerReferenceNumber": "ORD-12345",\n  "status": "COMPLETED",\n  "amount": 100.00,\n  "currency": "GBP"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "reference", type: "string", required: false, description: "MITO reference number." },
                                        { name: "partnerReferenceNumber", type: "string", required: false, description: "Your internal reference number." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>
                </div>
            </div>
        </ApiReferenceLayout>
    );
}
