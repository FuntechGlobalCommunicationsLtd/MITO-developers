"use client";

import { ApiReferenceLayout } from "@/components/layout/ApiReferenceLayout";
import { EndpointBlock } from "@/components/developers/ApiBlocks";
import { CodeTabs } from "@/components/developers/CodeBlocks";
import { SchemaTable } from "@/components/developers/SchemaTable";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillerApiReference() {
    return (
        <ApiReferenceLayout>
            <div className="flex flex-col w-full">
                {/* Page Header */}
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl border-b">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Biller Submission API</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        Biller collection, wallet, and payout APIs. Requires registered <strong>billerId</strong> on every transaction. Spec:{" "}
                        <a href="https://furp02-pre-pord.funtechcom.com/affiliate-payment-collection.html" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                            affiliate-payment-collection.html
                        </a>
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

                    {/* Initiate Collection Transaction */}
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
                                            code: `{\n  "billerId": "bill_778899",\n  "partnerReferenceNumber": "INV-2026-001",\n  "sendAmount": 100,\n  "senderFirstName": "FIROPO",\n  "senderLastName": "AKIN-AGUNBIADE",\n  "senderGender": "M",\n  "senderMobileNumber": "+4487456133",\n  "senderEmail": "jaskaran.brar.6.2@gmail.com",\n  "senderAddressBuildingNumber": "39",\n  "senderAddressStreet": "COLERIDGE WAY",\n  "senderAddressCity": "BOREHAMWOOD",\n  "senderAddressPostcode": "WD6 2AE",\n  "senderDateOfBirth": "1979-09-06",\n  "paymentMode": "PLAID",\n  "expireTime": "2029-05-16",\n  "callbackurl": "https://webhook.site/b28426b8-1532-4ba0-a090-a0be1ea7003d",\n  "redirectUrl": "https://payment.rhemito.com/payment_st.html",\n  "paymentReference": "a0be521571076"\n}`
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
                                        { name: "senderGender", type: "string", required: true, description: "Customer's gender ('M' or 'F')." },
                                        { name: "senderMobileNumber", type: "string", required: true, description: "E.164 phone number." },
                                        { name: "senderEmail", type: "string", required: true, description: "Customer's email address." },
                                        { name: "senderAddressBuildingNumber", type: "string", required: true, description: "Building number." },
                                        { name: "senderAddressStreet", type: "string", required: true, description: "Street address." },
                                        { name: "senderAddressCity", type: "string", required: true, description: "City." },
                                        { name: "senderAddressPostcode", type: "string", required: true, description: "Postcode." },
                                        { name: "senderDateOfBirth", type: "string", required: true, description: "Customer's date of birth (yyyy-MM-dd)." },
                                        { name: "paymentMode", type: "string", required: true, description: "E.g. PLAID, CARDCHECKOUT, MOBILE_MONEY, BANKPAYMENT." },
                                        { name: "expireTime", type: "string", required: true, description: "Expiry date time." },
                                        { name: "callbackurl", type: "string", required: true, description: "Webhook endpoint for transaction status notifications." },
                                        { name: "redirectUrl", type: "string", required: true, description: "Redirect landing URL after payment capture." },
                                        { name: "paymentReference", type: "string", required: false, description: "Optional reference number." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Collection Status */}
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
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
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
                                        { name: "partnerRefernceNumber", type: "string", required: false, description: "Your internal tracking order reference ID (note spelling: partnerRefernceNumber)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Transaction List (NEW) */}
                    <section id="get-transactions">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Business/GetTransactions"
                            title="Get Transaction List"
                            description="List all collection transactions for your biller account with support for pagination and search filters."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": [\n    {\n      "referenceNo": 31000395,\n      "partnerRefernceNumber": "274543222",\n      "status": "COMPSUCCESS"\n    }\n  ],\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." },
                                        { name: "pageNo", type: "integer", required: false, description: "Page number for pagination. Default is 1." },
                                        { name: "pageSize", type: "integer", required: false, description: "Number of items to retrieve per page. Default is 10." },
                                        { name: "SearchingText", type: "string", required: false, description: "A text filter to search for transactions." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Confirm Payment (NEW) */}
                    <section id="payment-confirmation">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Business/PaymentConfirmation"
                            title="Confirm Payment"
                            description="Approve or reject a pending transaction status. Useful for simulated environment testing or administrator actions."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "ReferenceNo", type: "string", required: true, description: "MITO generated transaction reference ID." },
                                        { name: "approvalStatus", type: "string", required: true, description: "Target status ('Approve' or 'Reject')." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Switch Payment Mode (NEW) */}
                    <section id="switch-payment-mode">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Business/SwitchPaymentMode"
                            title="Switch Payment Mode"
                            description="Change the payout method or checkout path for an already-initiated collection session."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "PaymentReference", type: "string", required: true, description: "Session payment reference." },
                                        { name: "PaymentMode", type: "string", required: true, description: "Target payment mode, e.g. CARDCHECKOUT, MOBILE_MONEY." },
                                        { name: "ReferenceNo", type: "string", required: false, description: "Optional transaction reference number." },
                                        { name: "PartnerRefernceNumber", type: "string", required: false, description: "Optional partner reference number." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Biller Balances */}
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
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: SETTLEMENT PAYOUTS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Settlement Payouts</Badge>
                    </div>

                    {/* Execute Settlement Payout */}
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
                                            code: `{\n  "amount": 100.00,\n  "description": "Monthly payout",\n  "partnerReferenceNumber": "1243fsf",\n  "accountId": "b6c286e4-12f5-4d56-a144-9155af26383a"\n}`
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
                                            code: `{\n  "transactionId": "guid-12345",\n  "message": "Payout created successfully."\n}`
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

                    {/* Add Payout Bank Account (NEW) */}
                    <section id="add-payout-account">
                        <EndpointBlock
                            method="POST"
                            path="/api/v2/Payout/AddPayoutAccount"
                            title="Add Payout Bank Account"
                            description="Register a new destination corporate bank account for processing your settlement withdrawals."
                            requestSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "JSON",
                                            language: "json",
                                            code: `{\n  "billerId": "bill_778899",\n  "AccountHolderName": "MITO Corp Ltd",\n  "BankName": "Barclays Bank",\n  "AccountNumber": "142412314",\n  "Sortcode": "123131",\n  "bankCountryIso3Code": "GBR",\n  "currencyCode": "GBP"\n}`
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
                                            code: `{\n  "message": "Payout Account created successfully.",\n  "AccountId": "422113"\n}`
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
                                        { name: "AccountHolderName", type: "string", required: true, description: "Full name on the corporate bank account." },
                                        { name: "BankName", type: "string", required: true, description: "Official bank name." },
                                        { name: "AccountNumber", type: "string", required: true, description: "Destination bank account number." },
                                        { name: "Sortcode", type: "string", required: true, description: "Bank routing sort code." },
                                        { name: "bankCountryIso3Code", type: "string", required: true, description: "3-letter country ISO code of the bank." },
                                        { name: "currencyCode", type: "string", required: true, description: "3-letter currency code (e.g. GBP)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Payout Bank Accounts */}
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
                                            code: `[\n  {\n    "AccountHolderName": "MITO Corp Ltd",\n    "BankName": "Barclays Bank",\n    "AccountNumber": "142412314",\n    "Sortcode": "123131",\n    "AccountId": "121443154"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Payout Report (NEW) */}
                    <section id="get-payout-report">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/payout/report"
                            title="Get Payout Report"
                            description="Retrieve a detailed payout status report within a specified date range."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `[\n  {\n    "transactionId": "guid-12345",\n    "amount": 100.00,\n    "status": "Completed",\n    "createdDate": "2024-09-20T12:00:00Z"\n  }\n]`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." },
                                        { name: "startDate", type: "string", required: false, description: "Start date filter (format: YYYY/MM/DD)." },
                                        { name: "endDate", type: "string", required: false, description: "End date filter (format: YYYY/MM/DD)." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    {/* SECTION: REFUNDS */}
                    <div className="bg-muted/10 py-6 px-8 border-b">
                        <Badge className="bg-primary hover:bg-primary/95 text-white">Refunds Management</Badge>
                    </div>

                    {/* Create Refund */}
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
                                            code: `{\n  "referenceNo": 100072,\n  "partnerReferenceNumber": "3f1aab3d-121a-4713-8d06-d92ce6223dcf",\n  "reason": "test 1234"\n}`
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
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Request Body</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "referenceNo", type: "integer", required: true, description: "MITO generated transaction reference ID." },
                                        { name: "partnerReferenceNumber", type: "string", required: true, description: "Your unique refund reference ID." },
                                        { name: "reason", type: "string", required: false, description: "Reason for processing the refund." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Refund Details (NEW) */}
                    <section id="get-refund">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Refund/GetRefund"
                            title="Get Refund Details"
                            description="Retrieve detailed status and metadata of a specific refund using its reference ID."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "refundReferenceNo", type: "string", required: true, description: "The unique reference ID of the refund." }
                                    ]}
                                />
                            </div>
                        </EndpointBlock>
                    </section>

                    <hr className="border-border" />

                    {/* Get Refund List (NEW) */}
                    <section id="get-refund-list">
                        <EndpointBlock
                            method="GET"
                            path="/api/v2/Refund/GetRefundList"
                            title="Get Refund List"
                            description="List all refunds initiated for your biller account with support for pagination and search text."
                            responseSamples={
                                <CodeTabs
                                    tabs={[
                                        {
                                            label: "200 OK",
                                            language: "json",
                                            code: `{\n  "data": {\n    "referenceNo": 31000395,\n    "partnerRefernceNumber": "274543222",\n    "status": "COMPSUCCESS"\n  },\n  "message": null,\n  "code": 200,\n  "responseType": "Success"\n}`
                                        }
                                    ]}
                                />
                            }
                        >
                            <div>
                                <h4 className="font-semibold pt-4">Query Parameters</h4>
                                <SchemaTable
                                    fields={[
                                        { name: "billerId", type: "string", required: true, description: "Your unique biller service code." },
                                        { name: "pageNo", type: "integer", required: false, description: "Page number. Default is 1." },
                                        { name: "pageSize", type: "integer", required: false, description: "Items per page. Default is 10." },
                                        { name: "SearchingText", type: "string", required: false, description: "Text filter to search specific refunds." }
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
