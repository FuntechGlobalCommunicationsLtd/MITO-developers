"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Badge } from "@/components/ui/badge";
import { Key, Landmark, Laptop, Smartphone, Zap, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RetailApiReference() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                {/* Page Title */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Retail Submission API</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        Furp retail API — users, corridors, rates, beneficiaries, transactions. Spec:{" "}
                        <a href="https://furp02-staging.funtechcom.com/mito.html" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">mito.html</a>
                        {" · "}SDK:{" "}
                        <a href="https://furp02-staging.funtechcom.com/mito/mito.html#tag/SDK-Integration" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">SDK Integration</a>
                    </p>
                    <Button asChild className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                        <a href="/retail-api.postman_collection.json" download="retail-api.postman_collection.json">
                            <Download className="w-4 h-4" /> Download Postman Collection
                        </a>
                    </Button>
                </div>

                {/* Authentication Info */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b space-y-6">
                    <h2 id="auth" className="text-2xl font-bold flex items-center gap-2">
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
                        <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                            <span className="text-xs text-muted-foreground">
                                Retrieve your staging secret keys or JWT details from the service profiles tab.
                            </span>
                            <Button asChild size="xs" variant="link" className="text-primary hover:underline font-semibold p-0 h-auto">
                                <Link href="/developers/credentials?service=retail" className="flex items-center gap-1">
                                    View Retail Credentials <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Pre-Live Testing Accounts */}
                    <div className="pt-8 border-t mt-8 space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-primary/5 border-primary/20">
                            <div className="space-y-1">
                                <h4 className="font-bold text-foreground flex items-center gap-2 m-0">
                                    <Landmark className="w-5 h-5 text-primary shrink-0" /> Pre-Live Testing Beneficiary Accounts
                                </h4>
                                <p className="text-xs text-muted-foreground m-0">
                                    Use our verified test beneficiary accounts to perform real-world end-to-end sandbox transactions.
                                </p>
                            </div>
                            <Button asChild size="sm" className="shrink-0">
                                <Link href="/developers/pre-live-testing" className="flex items-center gap-1">
                                    View Test Accounts <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
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
                                            code: `{\n  "username": "Upesi",\n  "password": "your_secure_password",\n  "accessServiceNumber": "21036",\n  "accessAffiliateNumber": "1073"\n}`
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
                                            code: `{\n  "data": {\n    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n    "issuedOn": "2026-06-15T12:00:00Z",\n    "expiresOn": "2026-06-15T13:00:00Z",\n    "refreshToken": "irure Duis..."\n  },\n  "message": "Authenticated",\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "username", type: "string", required: true, description: "Your partner dashboard username." },
                                        { name: "password", type: "string", required: true, description: "Your partner account password." },
                                        { name: "accessServiceNumber", type: "string", required: true, description: "Corridor service identifier." },
                                        { name: "accessAffiliateNumber", type: "string", required: true, description: "Affiliate correspondent identifier." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: USER MANAGEMENT */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">User Onboarding & KYC</Badge>
                    </div>

                    {/* Create User */}
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
                                            code: `{\n  "email": "abc@abc.com",\n  "firstName": "John",\n  "lastName": "Doe",\n  "gender": "M",\n  "legalEntityType": "I",\n  "countryIso3": "GBR",\n  "middleName": "Singh",\n  "phoneNumber": "242424215215"\n}`
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
                                            code: `{\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "email": "abc@abc.com",\n  "firstName": "John",\n  "lastName": "Doe",\n  "countryIso3": "GBR",\n  "middleName": "Singh",\n  "legalEntityType": "Individual",\n  "created_at": "2026-06-15T12:00:00Z"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "email", type: "string", required: true, description: "Customer email address." },
                                        { name: "firstName", type: "string", required: true, description: "Legal first name." },
                                        { name: "lastName", type: "string", required: true, description: "Legal last name." },
                                        { name: "gender", type: "string", required: true, description: "M or F." },
                                        { name: "legalEntityType", type: "string", required: true, description: "I (Individual) or B (Business)." },
                                        { name: "countryIso3", type: "string", required: true, description: "3-letter ISO country code." },
                                        { name: "middleName", type: "string", required: false, description: "Optional middle name." },
                                        { name: "phoneNumber", type: "string", required: true, description: "Customer contact mobile number." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get User Profile */}
                    <section id="get-user">
                        <EndpointBlock
                            method="GET"
                            path="/users/{userId}"
                            title="Get User Profile"
                            description="Retrieve user profile, current KYC status, and creation details."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "email": "abc@abc.com",\n  "firstName": "John",\n  "lastName": "Doe",\n  "countryIso3": "GBR",\n  "middleName": "Singh",\n  "legalEntityType": "Individual",\n  "created_at": "2026-06-15T12:00:00Z"\n}`
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

                    {/* Get User Balances */}
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
                                            code: `{\n  "UserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n  "currency": "GBP",\n  "TotalBalance": "1500.50",\n  "created_at": "2026-06-15T12:00:00Z",\n  "wallet": [\n    {\n      "type": "funding_account",\n      "account_number": "12345678",\n      "account_number_type": "IBAN",\n      "account_holder_name": "John Doe",\n      "bank_name": "Barclays",\n      "bank_address": "London",\n      "bank_country": "GBR",\n      "currency": "GBP",\n      "routing_code": "200000",\n      "routing_code_type": "sortcode",\n      "balance": "1500.50"\n    }\n  ]\n}`
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
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "currency", type: "string", required: true, description: "3-letter currency code (e.g. GBP)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get All Users (NEW) */}
                    <section id="get-users">
                        <EndpointBlock
                            method="GET"
                            path="/users"
                            title="Get All Users"
                            description="List and search onboarding users across your affiliate network."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": [\n    {\n      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\n      "email": "abc@abc.com",\n      "firstName": "John",\n      "lastName": "Doe",\n      "countryIso3": "GBR",\n      "legalEntityType": "Individual"\n    }\n  ],\n  "pageSize": 10,\n  "currentPage": 1,\n  "totalCount": 1,\n  "totalPages": 1,\n  "hasPreviousPage": false,\n  "hasNextPage": false\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "PageNo", type: "integer", required: false, description: "Page number. Default is 1." },
                                        { name: "PageSize", type: "integer", required: false, description: "Number of items per page. Default is 10." },
                                        { name: "email", type: "string", required: false, description: "Filter by email address." },
                                        { name: "countryIso3", type: "string", required: false, description: "Filter by country ISO code." },
                                        { name: "fromDate", type: "string", required: false, description: "Filter users created from date (yyyy-MM-dd)." },
                                        { name: "toDate", type: "string", required: false, description: "Filter users created up to date (yyyy-MM-dd)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: RATES & ROUTING */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Rates & Routing</Badge>
                    </div>

                    {/* Get Active Corridors */}
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
                                            code: `[\n  {\n    "value": "GBR-NGA-MONEYTRANSFER"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "ServiceCode", type: "string", required: true, description: "Service type filter, e.g. MONEYTRANSFER." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Lookup Service Providers */}
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
                                            code: `[\n  {\n    "value": "Guaranty Trust Bank"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "countryiso3", type: "string", required: true, description: "3-letter destination country ISO code." },
                                        { name: "CurrencyCode", type: "string", required: true, description: "Payout currency ISO code." },
                                        { name: "ServiceCode", type: "string", required: true, description: "E.g. MONEYTRANSFER, MOBILETOPUP." },
                                        { name: "CollectionMode", type: "string", required: false, description: "E.g. BANKACCOUNT, CASH, MOBILEMONEY." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Lookup Types (NEW) */}
                    <section id="get-lookup-types">
                        <EndpointBlock
                            method="GET"
                            path="/lookups/types"
                            title="Retrieve Types"
                            description="Retrieve various static configurations and types required for creating transactions (e.g. transfer purposes, source of funds)."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "transactionType": [],\n    "collectionMode": [],\n    "relationships": [],\n    "reason": [],\n    "sourceOfFunds": []\n  },\n  "code": 200,\n  "message": "success",\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "filter", type: "string", required: false, description: "Comma-separated list of types to retrieve, e.g. purposes,source-of-funds." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Calculate FX Rate Quote */}
                    <section id="post-rates">
                        <EndpointBlock
                            method="POST"
                            path="/exchange/rates"
                            title="Calculate FX Rate Quote (Validate)"
                            description="Generates and locks an FX conversion rate and breakdown fees for the user."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "userId": "cb81e791-ee42-4de9-a05e-c3f4c3dcdbfa",\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "fromCountry": "GBR",\n  "toCountry": "NGA",\n  "fromCurrency": "GBP",\n  "toCurrency": "NGN",\n  "amount": 1000,\n  "direction": "S",\n  "providerId": "1831846e-75c6-4606-bc5c-0f092cb5ce0a"\n}`
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
                                            code: `{\n  "data": {\n    "commission": 2.5,\n    "fromCountry": "GBR",\n    "toCountry": "NGA",\n    "sendAmount": 1000.00,\n    "receiveAmount": 1950000.00,\n    "rate": 1950.00,\n    "isKycRequired": false,\n    "fromCurrency": "GBP",\n    "id": "rate_9b1deb4d...",\n    "code": "OK",\n    "paymentMethods": []\n  },\n  "code": 200,\n  "message": "Validated"\n}`
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
                                        { name: "serviceCode", type: "string", required: true, description: "E.g. MONEYTRANSFER." },
                                        { name: "collectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH, MOBILEMONEY." },
                                        { name: "fromCountry", type: "string", required: true, description: "3-letter sender country." },
                                        { name: "toCountry", type: "string", required: true, description: "3-letter payout country." },
                                        { name: "fromCurrency", type: "string", required: true, description: "3-letter source currency." },
                                        { name: "toCurrency", type: "string", required: true, description: "3-letter destination currency." },
                                        { name: "amount", type: "number", required: true, description: "Amount value." },
                                        { name: "direction", type: "string", required: true, description: "S (Send) or R (Receive)." },
                                        { name: "providerId", type: "string", required: true, description: "Service Provider ID." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: BENEFICIARY MANAGEMENT */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Beneficiary Management</Badge>
                    </div>

                    {/* Get Beneficiary Requirements (NEW) */}
                    <section id="get-beneficiary-requirements">
                        <EndpointBlock
                            method="GET"
                            path="/beneficiaries/requirements"
                            title="Get Beneficiary Requirements"
                            description="Fetch the dynamically required fields for adding a beneficiary in a specific payout corridor."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "code": 200,\n  "message": "success",\n  "responseType": "Success",\n  "data": [\n    {\n      "label": "First Name",\n      "name": "firstName",\n      "order": 1,\n      "type": "text",\n      "columnDataType": "string",\n      "isRequired": true,\n      "isDisplayable": true,\n      "format": null,\n      "fieldInformation": "Legal first name"\n    }\n  ]\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "providerId", type: "string", required: true, description: "Target service provider ID." },
                                        { name: "toCountry", type: "string", required: true, description: "3-letter destination country ISO." },
                                        { name: "toCurrencyCode", type: "string", required: true, description: "3-letter payout currency code." },
                                        { name: "entityType", type: "string", required: true, description: "I (Individual) or B (Business)." },
                                        { name: "ServiceCode", type: "string", required: true, description: "E.g. MONEYTRANSFER." },
                                        { name: "collectionMode", type: "string", required: false, description: "E.g. BANKACCOUNT." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Beneficiary by ID (NEW) */}
                    <section id="get-beneficiary">
                        <EndpointBlock
                            method="GET"
                            path="/beneficiaries/{beneficiaryId}"
                            title="Get Beneficiary by ID"
                            description="Retrieve detailed beneficiary information, including banking account details and nickname."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "beneficiaryId": "benef_789_xyz",\n  "firstName": "Jane",\n  "lastName": "Doe",\n  "countryIso3": "NGA",\n  "currencyIso": "NGN"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Path Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "beneficiaryId", type: "string", required: true, description: "The unique ID of the beneficiary." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Create Beneficiary (NEW) */}
                    <section id="create-beneficiary">
                        <EndpointBlock
                            method="POST"
                            path="/beneficiaries"
                            title="Create Beneficiary"
                            description="Create a payout recipient (Beneficiary) profile on the network. Field requirements must be derived dynamically from GetBeneficiaryRequirements."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "legalEntityType": "Individual",\n  "countryIso3": "NGA",\n  "currencyIso": "NGN",\n  "providerId": "prov_gtb",\n  "userId": "9c701982-1b75-c410-2444-69e0fff0b68a",\n  "firstName": "Jane",\n  "lastName": "Doe",\n  "acctNumber": "0123456789",\n  "bankName": "Guaranty Trust Bank"\n}`
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
                                            code: `{\n  "data": {\n    "beneficiaryId": "benef_789_xyz",\n    "status": "active",\n    "message": "Created"\n  },\n  "code": 200,\n  "message": "Beneficiary created successfully"\n}`
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
                                        { name: "collectionMode", type: "string", required: true, description: "E.g. BANKACCOUNT, MOBILEMONEY." },
                                        { name: "legalEntityType", type: "string", required: true, description: "Individual or Business." },
                                        { name: "countryIso3", type: "string", required: true, description: "Payout destination country ISO." },
                                        { name: "currencyIso", type: "string", required: true, description: "Payout currency ISO." },
                                        { name: "providerId", type: "string", required: true, description: "Provider ID code." },
                                        { name: "userId", type: "string", required: true, description: "User ID of the onboarding customer." },
                                        { name: "firstName", type: "string", required: true, description: "Legal first name." },
                                        { name: "lastName", type: "string", required: true, description: "Legal last name." },
                                        { name: "acctNumber", type: "string", required: false, description: "Bank account or wallet number." },
                                        { name: "bankName", type: "string", required: false, description: "Name of the target bank." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Beneficiaries (NEW) */}
                    <section id="get-beneficiaries">
                        <EndpointBlock
                            method="GET"
                            path="/beneficiaries"
                            title="Get Beneficiaries"
                            description="List and filter beneficiaries created under your partner portfolio."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": [\n    {\n      "beneficiaryId": "benef_789_xyz",\n      "firstName": "Jane",\n      "lastName": "Doe",\n      "countryIso3": "NGA",\n      "collectionMode": "BANKACCOUNT"\n    }\n  ],\n  "pageSize": 10,\n  "currentPage": 1,\n  "totalCount": 1,\n  "totalPages": 1,\n  "hasPreviousPage": false,\n  "hasNextPage": false\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "serviceCode", type: "string", required: true, description: "Service type filter." },
                                        { name: "collectionMode", type: "string", required: true, description: "Collection mode filter." },
                                        { name: "legalEntityType", type: "string", required: true, description: "Individual or Business." },
                                        { name: "countryIso3", type: "string", required: true, description: "Destination country." },
                                        { name: "currencyIso", type: "string", required: true, description: "Destination currency." },
                                        { name: "providerId", type: "string", required: true, description: "Provider ID filter." },
                                        { name: "PageNo", type: "integer", required: false, description: "Page number." },
                                        { name: "PageSize", type: "integer", required: false, description: "Page size." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: CHECKOUT & TRANSACTIONS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Checkout & Transactions</Badge>
                    </div>

                    {/* Initiate Transaction Session */}
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
                                            code: `{\n  "serviceCode": "MONEYTRANSFER",\n  "collectionMode": "BANKACCOUNT",\n  "sendCountryIso3": "GBR",\n  "receiveCountryIso3": "NGA",\n  "sendCurrency": "GBP",\n  "receiveCurrency": "NGN",\n  "sendAmount": 1000,\n  "providerId": "eac23c4f-ca01-4cd0-8698-dbb455c9c53c",\n  "rateId": "rate_9b1deb4d...",\n  "userId": "c183e206-aef7-42be-94d0-d3881c198066",\n  "redirecturl": "https://yourwebsite.com/done",\n  "PartnerReferenceNumber": "ORD-12345",\n  "reasonId": "1a082009-...",\n  "sourceOfFundId": "8cf07511-...",\n  "paymentNarration": "Family Support",\n  "webhookUrl": "https://yourwebsite.com/api/webhook"\n}`
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
                                            code: `{\n  "data": {\n    "id": "tx_abc123xyz789",\n    "reference": "MITO-889900",\n    "status": "AWAITINGAFFILIATEUPDATE",\n    "_links": {\n      "redirect": {\n        "href": "https://link.mito.money/retail-payment?journeyCode=abc123token..."\n      }\n    }\n  },\n  "code": 200,\n  "message": "Transaction initiated"\n}`
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
                                        { name: "sendCountryIso3", type: "string", required: true, description: "3-letter sender country." },
                                        { name: "receiveCountryIso3", type: "string", required: true, description: "3-letter payout country." },
                                        { name: "sendCurrency", type: "string", required: true, description: "3-letter source currency." },
                                        { name: "receiveCurrency", type: "string", required: true, description: "3-letter destination currency." },
                                        { name: "sendAmount", type: "number", required: true, description: "Amount to send (excluding fees)." },
                                        { name: "providerId", type: "string", required: true, description: "Provider ID." },
                                        { name: "rateId", type: "string", required: true, description: "The active FX quote ID from POST /exchange/rates." },
                                        { name: "userId", type: "string", required: true, description: "The customer's onboarding ID." },
                                        { name: "redirecturl", type: "string", required: true, description: "Redirect URL for hosted flow completion." },
                                        { name: "PartnerReferenceNumber", type: "string", required: true, description: "Your internal tracking order reference." },
                                        { name: "reasonId", type: "string", required: true, description: "The purpose code ID from static types." },
                                        { name: "sourceOfFundId", type: "string", required: true, description: "The source of fund ID." },
                                        { name: "paymentNarration", type: "string", required: false, description: "Optional description." },
                                        { name: "webhookUrl", type: "string", required: true, description: "Webhook endpoint for transaction status notifications." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Transaction by ID (NEW) */}
                    <section id="get-transaction">
                        <EndpointBlock
                            method="GET"
                            path="/transactions/{transactionId}"
                            title="Get Transaction Details"
                            description="Query current status and metadata of a specific transaction session."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "id": "tx_abc123xyz789",\n    "reference": "MITO-889900",\n    "status": "COMPLETED",\n    "sendAmount": 1000.00,\n    "sendCurrency": "GBP",\n    "receiveCurrency": "NGN",\n    "createdAt": "2026-06-15T12:00:00Z"\n  },\n  "code": 200,\n  "message": "success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Path Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "transactionId", type: "string", required: true, description: "The unique transaction ID." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Transactions (NEW) */}
                    <section id="get-transactions-list">
                        <EndpointBlock
                            method="GET"
                            path="/transactions"
                            title="Get Transaction List"
                            description="List and search transactions under your affiliate account."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": [\n    {\n      "id": "tx_abc123xyz789",\n      "reference": "MITO-889900",\n      "status": "COMPLETED",\n      "sendAmount": 1000.00\n    }\n  ],\n  "pageSize": 10,\n  "currentPage": 1,\n  "totalCount": 1,\n  "totalPages": 1,\n  "hasPreviousPage": false,\n  "hasNextPage": false\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "userId", type: "string", required: false, description: "Filter by onboarding user ID." },
                                        { name: "providerId", type: "string", required: false, description: "Filter by provider ID." },
                                        { name: "beneficiaryId", type: "string", required: false, description: "Filter by beneficiary ID." },
                                        { name: "status", type: "string", required: false, description: "Filter by transaction status (e.g. COMPLETED, CANCELLED, PENDING)." },
                                        { name: "fromDate", type: "string", required: false, description: "Filter transactions created from date (yyyy-MM-dd)." },
                                        { name: "toDate", type: "string", required: false, description: "Filter transactions created up to date (yyyy-MM-dd)." },
                                        { name: "PageNo", type: "integer", required: false, description: "Page number." },
                                        { name: "PageSize", type: "integer", required: false, description: "Number of items per page." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: WEBHOOKS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Webhooks & Notifications</Badge>
                    </div>

                    {/* Webhook Status Notification */}
                    <section id="webhook-notification">
                        <EndpointBlock
                            method="POST"
                            path="/webhooks"
                            title="Transaction Status Update Webhook"
                            description="MITO sends a POST request to this webhook URL to notify partners of transaction status changes."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "transactionId": "tx_abc123xyz789",\n  "status": "PROCESSED",\n  "updatedAt": "2026-06-15T12:30:00Z",\n  "reason": "Payout processed successfully"\n}`
                                        }
                                    ]}
                                />
                            }
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "text",
                                            code: "OK"
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Webhook Payload Schema</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "transactionId", type: "string", required: true, description: "The unique MITO transaction identifier." },
                                        { name: "status", type: "string", required: true, description: "The new transaction status, e.g. PROCESSED, FAILED." },
                                        { name: "updatedAt", type: "string", required: true, description: "Date time of status update (ISO 8601 format)." },
                                        { name: "reason", type: "string", required: false, description: "Additional status description or reason for failure." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>
                </div>

                {/* Frontend SDK */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-t space-y-6">
                    <h2 id="sdks" className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
                        <Zap className="w-8 h-8 text-yellow-500" /> Mito Link SDKs
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Provide your customers a seamless, native-feel checkout flow. The Mito Link SDKs modalise hosted checkout pages inside your application, managing KYC uploads, 3D Secure verification, and redirect handshakes automatically.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="border border-border bg-card rounded-xl p-6 space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-bold">
                                <Laptop className="w-5 h-5 text-primary" /> Web SDK (React)
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Integrate Mito Link in your web application using React hooks or customized pre-built components.
                            </p>
                            <div className="font-mono text-xs bg-muted px-3 py-1.5 rounded-md w-fit text-foreground">
                                @mito-money/mito-link
                            </div>
                        </div>
                        <div className="border border-border bg-card rounded-xl p-6 space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-bold">
                                <Smartphone className="w-5 h-5 text-primary" /> React Native SDK
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Embed Mito Link into your iOS and Android native apps using webview presentation modals.
                            </p>
                            <div className="font-mono text-xs bg-muted px-3 py-1.5 rounded-md w-fit text-foreground">
                                @mito-money/mito-link-react-native
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ApiReferenceLayout>
    );
}
