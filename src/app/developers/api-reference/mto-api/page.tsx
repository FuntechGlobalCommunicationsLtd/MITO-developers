"use client";

import { useState } from "react";
import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs, CodeBlock } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, FolderSync, Info, ShieldCheck, Landmark, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MtoForexApiSections } from "@/components/developers/MtoForexApiSections";
import Link from "next/link";

export default function MtoApiReference() {
    const [activeSchema, setActiveSchema] = useState<"corridor" | "global">("corridor");

    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">MTO API Reference</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        Forex, collections, and payouts for MTO partners. Primary spec:{" "}
                        <a href="https://furp02-staging.funtechcom.com/mtoforex.html" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                            mtoforex.html
                        </a>
                    </p>
                    <Button asChild className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                        <a href="/mto-api.postman_collection.json" download="mto-api.postman_collection.json">
                            <Download className="w-4 h-4" /> Download Postman Collection
                        </a>
                    </Button>
                </div>

                {/* Authentication & Setup Overview */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h2 id="setup" className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-primary" /> Setup & Authorization
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4">
                            <h4 className="text-base font-bold text-foreground flex items-center gap-2 m-0">
                                <Info className="w-5 h-5 text-primary shrink-0" /> REST API Auth Headers
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Combine your API username and password (<code>username:password</code>) into a Base64 string and send it in the standard Authorization header.
                            </p>
                            <div className="font-mono text-xs bg-slate-950 text-slate-200 p-3 rounded border border-slate-800">
                                Authorization: Basic QUUwMDAwMDAwMTpBQkMxMjM6UGFzc3dvcmQxMjMh
                            </div>
                            <p className="text-sm text-muted-foreground m-0">Every HTTP request also requires these custom headers:</p>
                            <ul className="text-sm text-muted-foreground space-y-2 pl-4 list-disc mt-2">
                                <li><code>AccessAffiliateNumber</code>: Your assigned partner code (e.g. <code>1062</code>).</li>
                                <li><code>AccessServiceNumber</code>: The corridor service identifier (e.g. <code>21012</code>).</li>
                            </ul>
                            <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                                <span className="text-xs text-muted-foreground">
                                    Retrieve your staging or live credentials from the service profiles tab.
                                </span>
                                <Button asChild size="xs" variant="link" className="text-primary hover:underline font-semibold p-0 h-auto">
                                    <Link href="/developers/credentials?service=mto" className="flex items-center gap-1">
                                        View MTO Credentials <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Testing Accounts Section */}
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
                </div>

                {/* API Reference Tabs */}
                <Tabs defaultValue="rest" className="w-full">
                    <div className="border-b px-4 sm:px-6 lg:px-8">
                        <TabsList className="bg-transparent border-b-0 py-2">
                            <TabsTrigger value="rest" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent rounded-full px-6 py-1.5 font-semibold text-sm">
                                REST API Endpoints
                            </TabsTrigger>
                            <TabsTrigger value="ftp" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent rounded-full px-6 py-1.5 font-semibold text-sm">
                                FTP Gateway Specifications
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* REST API Endpoints Section */}
                    <TabsContent value="rest" className="mt-0 space-y-0">
                        <MtoForexApiSections />
                        {/* Get Live FX Rate — legacy */}
                        <section id="get-rate">
                            <EndpointBlock
                                method="GET"
                                path="/Mto/GetRate"
                                title="Get Live Exchange Rates"
                                description="Retrieve real-time exchange rates for money transfer, mobile top-up, and bill collections available on your affiliate profile."
                                responseSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "200 OK",
                                                language: "json",
                                                code: `{\n  "responseCode": "10000",\n  "responseMessage": "Successful",\n  "data": [\n    {\n      "fromCurrency": "EUR",\n      "toCurrency": "SGD",\n      "rateMoneyTransfer": 2.1684,\n      "rateMobileAirtime": 1.39,\n      "rateBillPayment": 1.39\n    }\n  ]\n}`
                                            }
                                        ]}
                                        height="280px"
                                    />
                                }
                            >
                                <div className="space-y-4">
                                    <h4 className="font-semibold pt-4">Headers</h4>
                                    <SchemaTable
                                        fields={[
                                            { name: "Authorization", type: "string", required: true, description: "Basic Auth header." },
                                            { name: "AccessAffiliateNumber", type: "string", required: true, description: "Your assigned affiliate code." },
                                            { name: "AccessServiceNumber", type: "string", required: true, description: "Your service code." }
                                        ]}
                                    />
                                </div>
                            </EndpointBlock>
                        </section>

                        <hr className="border-border" />

                        {/* Initiate Transactions */}
                        <section id="create-transaction">
                            <EndpointBlock
                                method="POST"
                                path="/Mto/TransactionCreate"
                                title="Initiate Transaction"
                                description="Submit payment details to process a remittance transfer, mobile top-up, or bill collection."
                                requestSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "Schema Option 1 (Corridors)",
                                                language: "json",
                                                code: `{\n  "Mtn": "MTO-987654321",\n  "Rate": 1.15,\n  "SettlementCurrency": "GBP",\n  "PayoutCurrency": "CAD",\n  "SendingCountryISO": "GBR",\n  "ReceivingCountryISO": "CAD",\n  "TransactionType": "MONEYTRANSFER",\n  "CollectionMode": "BANKACCOUNT",\n  "PurposeCode": "FAMILY_SUPPORT",\n  "sourceOfFund": "SALARY",\n  "CreationDate": "2026-06-15T12:00:00Z",\n  "PayoutPrincipal": 1150.00,\n  "SettlementAmount": 1000.00,\n  "TotalSale": 1000.00,\n  "ServiceProviderCode": "FGCGENERIC",\n  "ServiceProviderName": "Royal Bank of Canada",\n  "BankAccountNumber": "1234567890",\n  "sender": {\n    "FirstName": "John",\n    "LastName": "Doe",\n    "MobileNumber": "447700900077",\n    "gender": "Male",\n    "nationality": "GBR",\n    "countryOfBirth": "GBR",\n    "RelationshipCode": "FAMILY",\n    "occupationCode": "ENGINEER",\n    "EmploymentStatus": "EMPLOYED",\n    "Address": {\n      "addressLine1": "10 Downing Street",\n      "country": "GBR",\n      "postCode": "SW1A 2AA"\n    },\n    "IdDocument": {\n      "type": "PASSPORT",\n      "number": "987654321",\n      "issueDate": "2020-01-01",\n      "expiryDate": "2030-01-01",\n      "placeOfIssue": "GBR"\n    }\n  },\n  "Beneficiary": {\n    "firstName": "Jane",\n    "lastName": "Doe",\n    "mobileNumber": "15140001111",\n    "nationality": "CAN",\n    "Address": {\n      "addressLine1": "100 Queen Street",\n      "country": "CAN"\n    }\n  }\n}`
                                            },
                                            {
                                                label: "Schema Option 2 (Global)",
                                                language: "json",
                                                code: `{\n  "Mtn": "MTO-OTHER-123",\n  "Rate": 2.1684,\n  "SettlementCurrency": "EUR",\n  "PayoutCurrency": "SGD",\n  "SendingCountryISO": "FRA",\n  "ReceivingCountryISO": "SGP",\n  "TransactionType": "MONEYTRANSFER",\n  "CollectionMode": "BANKACCOUNT",\n  "CreationDate": "2026-06-15T12:00:00Z",\n  "PayoutPrincipal": 2168.40,\n  "SettlementAmount": 1000.00,\n  "TotalSale": 1000.00,\n  "ServiceProviderCode": "FGCGENERIC",\n  "ServiceProviderName": "DBS Bank",\n  "BankAccountNumber": "987654321",\n  "sender": {\n    "FirstName": "Pierre",\n    "LastName": "Dupont",\n    "countryOfBirth": "FRA"\n  },\n  "Beneficiary": {\n    "firstName": "Lee",\n    "lastName": "Wei"\n  }\n}`
                                            }
                                        ]}
                                        height="450px"
                                    />
                                }
                                responseSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "200 Success",
                                                language: "json",
                                                code: `{\n  "responseCode": "10000",\n  "responseMessage": "Successful",\n  "data": {\n    "responseReference": "1283391"\n  }\n}`
                                            },
                                            {
                                                label: "400 Validation Error",
                                                language: "json",
                                                code: `{\n  "responseCode": "30001",\n  "responseMessage": "Validation failed for sender.MobileNumber: Sender's mobile number is required.",\n  "data": null\n}`
                                            }
                                        ]}
                                        height="200px"
                                    />
                                }
                            >
                                <div className="space-y-6">
                                    <div className="flex gap-4 border-b pb-4">
                                        <button
                                            type="button"
                                            onClick={() => setActiveSchema("corridor")}
                                            className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeSchema === "corridor" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                                        >
                                            Schema Option 1 (Restricted Corridors)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSchema("global")}
                                            className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeSchema === "global" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                                        >
                                            Schema Option 2 (Global Default)
                                        </button>
                                    </div>

                                    {activeSchema === "corridor" ? (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Used for India (IND), Bangladesh (BGD), Pakistan (PAK), Canada (CAN), and Nigeria (NGA). Heavily validates KYC details.
                                            </p>
                                            <SchemaTable
                                                fields={[
                                                    { name: "Mtn", type: "string", required: true, description: "Unique transaction ID generated on your system.", example: "MTO-987654321" },
                                                    { name: "Rate", type: "number", required: true, description: "Exchange rate applied.", example: "1.15" },
                                                    { name: "SettlementCurrency", type: "string", required: true, description: "ISO 3-letter currency code sent.", example: "GBP" },
                                                    { name: "PayoutCurrency", type: "string", required: true, description: "ISO 3-letter payout currency code.", example: "CAD" },
                                                    { name: "SendingCountryISO", type: "string", required: true, description: "ISO 3-letter origin country code.", example: "GBR" },
                                                    { name: "ReceivingCountryISO", type: "string", required: true, description: "Restricted to IND, CAD, NGA, BGD, PAK.", example: "CAD" },
                                                    { name: "TransactionType", type: "string", required: true, description: "MONEYTRANSFER, MOBILETOPUP, BILLPAYMENT", example: "MONEYTRANSFER" },
                                                    { name: "CollectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH, MOBILEMONEY", example: "BANKACCOUNT" },
                                                    { name: "PayoutPrincipal", type: "number", required: true, description: "Net amount paid out.", example: "1150.00" },
                                                    { name: "SettlementAmount", type: "number", required: true, description: "Net amount collected.", example: "1000.00" },
                                                    { name: "TotalSale", type: "number", required: true, description: "SettlementAmount + Commission.", example: "1000.00" },
                                                    { name: "sender", type: "object", required: true, description: "Nested Sender KYC. Requires Full Name, Mobile, DOB, ID document detail, Address, Occupation." },
                                                    { name: "Beneficiary", type: "object", required: true, description: "Nested Beneficiary. Requires Full Name, Mobile, and Address." }
                                                ]}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Default schema for other countries. Loose validation on KYC details.
                                            </p>
                                            <SchemaTable
                                                fields={[
                                                    { name: "Mtn", type: "string", required: true, description: "Unique transaction ID generated on your system." },
                                                    { name: "Rate", type: "number", required: true, description: "Exchange rate." },
                                                    { name: "SettlementCurrency", type: "string", required: true, description: "ISO code." },
                                                    { name: "PayoutCurrency", type: "string", required: true, description: "ISO code." },
                                                    { name: "SendingCountryISO", type: "string", required: true, description: "ISO code." },
                                                    { name: "ReceivingCountryISO", type: "string", required: true, description: "ISO code." },
                                                    { name: "TransactionType", type: "string", required: true, description: "Type code." },
                                                    { name: "PayoutPrincipal", type: "number", required: true, description: "Net amount paid out." },
                                                    { name: "sender", type: "object", required: true, description: "Nested object containing FirstName, LastName, nationality, and countryOfBirth." },
                                                    { name: "Beneficiary", type: "object", required: true, description: "Nested object containing firstName and lastName." }
                                                ]}
                                            />
                                        </div>
                                    )}
                                </div>
                            </EndpointBlock>
                        </section>

                        <hr className="border-border" />

                        {/* Bank Account Validate */}
                        <section id="validate-bank">
                            <EndpointBlock
                                method="POST"
                                path="/Mto/BankAccountValidate"
                                title="Validate Bank Account"
                                description="Validate the beneficiary's bank account details before initiating a transaction to reduce errors."
                                requestSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "JSON",
                                                language: "json",
                                                code: `{\n  "serviceProviderCode": "2643",\n  "beneficiaryAccountNumber": "1234567890"\n}`
                                            }
                                        ]}
                                    />
                                }
                                responseSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "200 Success",
                                                language: "json",
                                                code: `{\n  "responseCode": "10000",\n  "responseMessage": "Successful",\n  "data": {\n    "message": "Success",\n    "firstName": "John",\n    "middleName": "Paul",\n    "lastName": "Doe"\n  }\n}`
                                            }
                                        ]}
                                    />
                                }
                            >
                                <div className="space-y-4">
                                    <h4 className="font-semibold pt-4">Request Body</h4>
                                    <SchemaTable
                                        fields={[
                                            { name: "serviceProviderCode", type: "string", required: true, description: "Code of the bank provider from Get Providers.", example: "2643" },
                                            { name: "beneficiaryAccountNumber", type: "string", required: true, description: "Account number to validate.", example: "1234567890" }
                                        ]}
                                    />
                                </div>
                            </EndpointBlock>
                        </section>

                        <hr className="border-border" />

                        {/* Retrieve Static Types */}
                        <section id="get-types">
                            <EndpointBlock
                                method="GET"
                                path="/Mto/types"
                                title="Get Static Config Types"
                                description="Fetch available codes for purposes, occupations, source-of-funds, and relation codes."
                                responseSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "200 Success",
                                                language: "json",
                                                code: `{\n  "responseCode": "10000",\n  "responseMessage": "Successful",\n  "data": {\n    "purposes": [\n      {"name": "Family Support", "code": "FAMILY_SUPPORT"}\n    ],\n    "sourceOfFunds": [\n      {"name": "Salary", "code": "SALARY"}\n    ]\n  }\n}`
                                            }
                                        ]}
                                    />
                                }
                            >
                                <div className="space-y-4">
                                    <h4 className="font-semibold pt-4">Query Parameters</h4>
                                    <SchemaTable
                                        fields={[
                                            { name: "filter", type: "string", required: false, description: "Comma separated filter tags: purposes, source-of-funds, occupations, relationships, employment-status, id-types." }
                                        ]}
                                    />
                                </div>
                            </EndpointBlock>
                        </section>

                        <hr className="border-border" />

                        {/* Get Transaction Status */}
                        <section id="get-transaction">
                            <EndpointBlock
                                method="GET"
                                path="/Mto/GetTransaction"
                                title="Get Transaction Status"
                                description="Retrieve the status and payout details of a previously submitted transfer using the Money Transfer Number."
                                responseSamples={
                                    <CodeTabs
                                        tabs={[
                                            {
                                                label: "200 OK",
                                                language: "json",
                                                code: `{\n  "responseCode": "10000",\n  "responseMessage": "Successful",\n  "data": {\n    "mtn": "MTO-987654321",\n    "status": "PROCESSED",\n    "comments": "Funds credited to bank account."\n  }\n}`
                                            }
                                        ]}
                                    />
                                }
                            >
                                <div className="space-y-4">
                                    <h4 className="font-semibold pt-4">Query Parameters</h4>
                                    <SchemaTable
                                        fields={[
                                            { name: "Mtn", type: "string", required: true, description: "Your unique transfer transaction number." }
                                        ]}
                                    />
                                </div>
                            </EndpointBlock>
                        </section>
                    </TabsContent>

                    {/* FTP Specifications Section */}
                    <TabsContent value="ftp" className="mt-0">
                        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
                            {/* Directory Architecture */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <FolderSync className="w-5 h-5 text-primary" /> Directory Layout
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Exchange files securely over the partner SFTP. The following folder structure must be created and maintained:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
                                    <div className="border p-4 rounded-xl bg-card">
                                        <div className="font-semibold text-primary mb-2">/Inbound</div>
                                        <div className="text-xs text-muted-foreground">Submit Transaction CSV files. Polled every 15 minutes.</div>
                                    </div>
                                    <div className="border p-4 rounded-xl bg-card">
                                        <div className="font-semibold text-primary mb-2">/Upload</div>
                                        <div className="text-xs text-muted-foreground">Submit compliance attachments (JPG/PNG) & document reference CSVs.</div>
                                    </div>
                                    <div className="border p-4 rounded-xl bg-card">
                                        <div className="font-semibold text-primary mb-2">/Outbound</div>
                                        <div className="text-xs text-muted-foreground">MITO writes status reports, updated rates, and service provider registries here.</div>
                                    </div>
                                </div>
                            </div>

                            {/* CSV Rules */}
                            <div className="bg-muted/30 p-6 rounded-xl border">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" /> File Formatting Rules
                                </h3>
                                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                                    <li>Files must be strictly pipe-delimited (<code>|</code>).</li>
                                    <li>Strictly NO header row is allowed.</li>
                                    <li>Amounts must be represented in decimals (e.g. <code>100.00</code>).</li>
                                    <li>Maximum of 200 transaction rows allowed per CSV file.</li>
                                    <li>Empty columns must retain the spacing structure (e.g. <code>value||next_value</code>).</li>
                                </ul>
                            </div>

                            {/* File specs */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">Transaction File Layout (Inbound)</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Name format: <code>FURPACCOUNTNOddMMyyyyHHmmss.csv</code>. The columns must align with the exact indexes:
                                </p>
                                <SchemaTable
                                    fields={[
                                        { name: "Col 0: FurpAccountNo", type: "string", required: true, description: "Your assigned MITO Account Number." },
                                        { name: "Col 1: TransactionCreationDate", type: "string", required: true, description: "Date of transaction (yyyy-MM-dd)." },
                                        { name: "Col 2: TransactionCreationTime", type: "string", required: true, description: "Time of transaction (HH:mm:ss)." },
                                        { name: "Col 3: MTN", type: "string", required: true, description: "Money Transfer Number reference." },
                                        { name: "Col 4: Rate", type: "number", required: true, description: "Exchange rate applied." },
                                        { name: "Col 5: SettlementCurrency", type: "string", required: true, description: "Sending currency ISO code (e.g., GBP)." },
                                        { name: "Col 6: SettlementAmount", type: "number", required: true, description: "Amount sent." },
                                        { name: "Col 7: PayoutCurrency", type: "string", required: true, description: "Payout currency ISO code (e.g., NGN)." },
                                        { name: "Col 8: PayoutPrincipal", type: "number", required: true, description: "Principal received." },
                                        { name: "Col 9: Commission", type: "number", required: true, description: "Payout fee / commission." },
                                        { name: "Col 10: TotalSale", type: "number", required: true, description: "SettlementAmount + Commission." },
                                        { name: "Col 11: TransactionType", type: "string", required: true, description: "MONEYTRANSFER, MOBILETOPUP, BILLPAYMENT" },
                                        { name: "Col 12: CollectionMode", type: "string", required: true, description: "BANKACCOUNT, CASH, MOBILEMONEY" },
                                        { name: "Col 20: BeneficiaryFirstName", type: "string", required: true, description: "First name." },
                                        { name: "Col 21: BeneficiaryLastName", type: "string", required: true, description: "Last name." },
                                        { name: "Col 22: BeneficiaryPhoneNumber", type: "string", required: true, description: "Phone with country code." },
                                        { name: "Col 38: SenderFirstName", type: "string", required: true, description: "Sender first name." },
                                        { name: "Col 39: SenderLastName", type: "string", required: true, description: "Sender last name." },
                                        { name: "Col 40: SenderPhoneNumber", type: "string", required: true, description: "Sender phone." },
                                        { name: "Col 61: ServiceProviderCode", type: "string", required: true, description: "Bank or service provider code." },
                                        { name: "Col 63: BeneficiaryAccountNumber", type: "string", required: true, description: "Account number." }
                                    ]}
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Transaction Updates Layout (Outbound)</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Name format: <code>statusddMMyyyyHHmmss.csv</code>. Polled by the partner every 15 minutes to retrieve processing results.
                                </p>
                                <SchemaTable
                                    fields={[
                                        { name: "Col 0: FurpAccountNo", type: "string", required: true, description: "Your account number." },
                                        { name: "Col 1: TransactionUpdateDate", type: "string", required: true, description: "Update date (yyyy-MM-dd)." },
                                        { name: "Col 2: TransactionUpdateTime", type: "string", required: true, description: "Update time (HH:mm:ss)." },
                                        { name: "Col 3: MTN", type: "string", required: true, description: "Money Transfer Number." },
                                        { name: "Col 4: TransactionStatusCode", type: "string", required: true, description: "INPROGRESS, PROCESSED, AWAITINGAFFILIATEUPDATE, FAILED." },
                                        { name: "Col 5: Comments", type: "string", required: false, description: "Reason for fail or audit trails." }
                                    ]}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ApiReferenceLayout>
    );
}
