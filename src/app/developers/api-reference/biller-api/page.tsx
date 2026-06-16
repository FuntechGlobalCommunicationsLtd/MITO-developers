"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs, CodeBlock } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Landmark, RefreshCw, ShieldCheck, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillerApiReference() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                {/* Page Header */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Biller Submission API</h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        Integrate MITO&apos;s Biller Collection engine to accept local payments, perform automatic FX conversions, and execute settled payouts to corporate bank accounts.
                    </p>
                    <Button asChild className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                        <a href="/biller-api.postman_collection.json" download="biller-api.postman_collection.json">
                            <Download className="w-4 h-4" /> Download Postman Collection
                        </a>
                    </Button>
                </div>

                {/* Authentication and Setup */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-primary" /> Biller Authentication
                    </h2>
                    <p className="text-muted-foreground">
                        Biller collection endpoints are secured via HTTPS Basic Authentication. Every API request must supply the following headers:
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-foreground m-0">Required Headers</h4>
                        <SchemaTable
                            fields={[
                                { name: "Authorization", type: "string", required: true, description: "Basic Base64 encoded partner credentials.", example: "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" },
                                { name: "AccessAffiliateNumber", type: "string", required: true, description: "Your assigned affiliate collector code.", example: "1062" },
                                { name: "Content-Type", type: "string", required: true, description: "Must be set to application/json.", example: "application/json" }
                            ]}
                        />
                        <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                            <span className="text-xs text-muted-foreground">
                                Retrieve your staging or live credentials from the service profiles tab.
                            </span>
                            <Button asChild size="xs" variant="link" className="text-primary hover:underline font-semibold p-0 h-auto">
                                <Link href="/developers/credentials?service=biller" className="flex items-center gap-1">
                                    View Biller Credentials <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* API Sections */}
                <div className="space-y-0">
                    
                    {/* SECTION: PAYMENT COLLECTIONS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Payment Collections</Badge>
                    </div>

                    <section id="initiate-transaction">
                        <EndpointBlock
                            method="POST"
                            path="/api/v2/Business/InitiateTransactions"
                            title="Initiate Collection Transaction"
                            description="Initiate a collection process. Depending on the paymentMode, this triggers an STK Push, bank account debit, or returns a payment redirection link."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "billerId": "bill_778899",\n  "partnerReferenceNumber": "INV-2026-001",\n  "sendAmount": 150.00,\n  "senderAccountNumber": "234687",\n  "senderFirstName": "Vakil",\n  "senderLastName": "Singh",\n  "senderGender": "Male",\n  "senderMobileNumber": "+447700900088",\n  "senderEmail": "vakil.singh@example.com",\n  "senderAddressBuildingNumber": "12",\n  "senderAddressStreet": "High Street",\n  "senderAddressCity": "London",\n  "senderAddressPostcode": "EC1A 1BB",\n  "senderDateOfBirth": "1985-10-10",\n  "paymentMode": "MOBILE_MONEY",\n  "callbackUrl": "https://yourwebsite.com/api/webhooks/mito",\n  "expireTime": 15,\n  "redirectUrl": "https://yourwebsite.com/done"\n}`
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
                                            code: `{\n  "responseReference": "31000521",\n  "responseMessage": "Successful",\n  "responseCode": "10000",\n  "data": {\n    "paymentReference": "MITO-BILL-8899",\n    "status": "pending",\n    "redirectUrl": "https://link.mito.money/pay/collect?journeyCode=abc123token"\n  }\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." },
                                        { name: "partnerReferenceNumber", type: "string", required: true, description: "Your unique invoice/transaction order code." },
                                        { name: "sendAmount", type: "number", required: true, description: "The collection amount." },
                                        { name: "senderFirstName", type: "string", required: true, description: "Customer's first name." },
                                        { name: "senderLastName", type: "string", required: true, description: "Customer's last name." },
                                        { name: "senderMobileNumber", type: "string", required: true, description: "E.164 phone number." },
                                        { name: "paymentMode", type: "string", required: true, description: "E.g. CARD, MOBILE_MONEY, BANK_TRANSFER." },
                                        { name: "callbackUrl", type: "string", required: true, description: "Webhook endpoint for transaction status notifications." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-status">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Business/GetTransactionStatus"
                            title="Get Collection Status"
                            description="Retrieve payment state of a collection transaction using the MITO referenceNo or partnerReferenceNumber."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "referenceNo": "31000521",\n  "partnerReferenceNumber": "INV-2026-001",\n  "amount": 150.00,\n  "status": "completed",\n  "settledAmount": 147.00,\n  "feeAmount": 3.00,\n  "settlementCurrency": "USD"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "referenceNo", type: "integer", required: false, description: "MITO generated transaction reference ID." },
                                        { name: "partnerReferenceNumber", type: "string", required: false, description: "Your internal tracking order reference ID." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-balances">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Business/balances"
                            title="Get Biller Balances"
                            description="Check balances inside your biller operational settlement wallets."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "walletId": "wall_usd_001",\n    "currency": "USD",\n    "availableBalance": 45000.00,\n    "pendingSettlement": 1200.00\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        />
                    </section>

                    {/* SECTION: SETTLEMENT PAYOUTS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Settlement Payouts</Badge>
                    </div>

                    <section id="create-payout">
                        <EndpointBlock
                            method="POST"
                            path="/api/v2/payout/CreatePayout"
                            title="Execute Settlement Payout"
                            description="Transfer aggregated operational wallet balances into one of your approved corporate bank accounts."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "amount": 5000.00,\n  "description": "Weekly settlement payout",\n  "accountId": "070386bf-b14f-4ef4-a8a5-819ea2f6f257",\n  "partnerReferenceNumber": "PAY-2026-06"\n}`
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
                                            code: `{\n  "payoutId": "pay_998877",\n  "status": "processing",\n  "amount": 5000.00,\n  "currency": "USD"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "amount", type: "number", required: true, description: "Payout value to withdraw." },
                                        { name: "accountId", type: "string", required: true, description: "Corporate bank account identifier (UUID) from Get Payout Accounts." },
                                        { name: "description", type: "string", required: false, description: "Narrative description for bank statements." },
                                        { name: "partnerReferenceNumber", type: "string", required: true, description: "Your unique payout tracking ID." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    <section id="get-payout-accounts">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/payout/GetPayoutAccounts"
                            title="Get Payout Bank Accounts"
                            description="List approved corporate destination bank accounts available on your biller account."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "accountId": "070386bf-b14f-4ef4-a8a5-819ea2f6f257",\n    "bankName": "Barclays Bank",\n    "accountNumber": "******8901",\n    "currency": "GBP",\n    "status": "APPROVED"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        />
                    </section>

                    {/* SECTION: REFUNDS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Refunds Management</Badge>
                    </div>

                    <section id="create-refund">
                        <EndpointBlock
                            method="POST"
                            path="/api/v2/Refund/CreateRefund"
                            title="Create Refund"
                            description="Initiate a refund for a previously captured collection transaction."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "referenceNo": "31000521",\n  "amount": 150.00,\n  "reason": "Customer cancellation"\n}`
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
                                            code: `{\n  "refundReference": "ref_992211",\n  "status": "pending",\n  "amount": 150.00\n}`
                                        }
                                    ]}
                                />
                            }
                        />
                    </section>
                </div>
            </div>
        </ApiReferenceLayout>
    );
}
