/**
 * Canonical structure for partner detail/guide pages.
 * Apply this order on every integration guide (Retail, Biller, MTO, methods).
 *
 * Page overview:
 *   1. Introduction
 *   2. Overall workflow (diagram + steps)
 *   3. Integration options (chooser → detail sections)
 *   4. API contract (auth, environments, webhooks — integration-facing)
 *      Error handling, idempotency, and status models live in API Reference pages.
 *
 * Each integration option detail section:
 *   1. Overview
 *   2. Workflow Diagram
 *   3. API Sequence
 *   4. Notes & Responsibilities
 *
 * Keep content partner-facing only — no internal pipelines, rate engines, or provider selection.
 */
export const DETAIL_PAGE_OVERVIEW_ORDER = [
    "introduction",
    "overall-workflow",
    "integration-options",
    "api-contract",
] as const;

export const DETAIL_PAGE_API_CONTRACT_ORDER = [
    "authentication",
    "environments",
    "webhooks",
] as const;

/** Lives on API Reference pages (e.g. retail-api), not guide overviews */
export const API_REFERENCE_CONTRACT_ORDER = [
    "errors",
    "idempotency",
    "status-model",
] as const;

export const DETAIL_OPTION_SECTION_ORDER = [
    "overview",
    "workflow-diagram",
    "api-sequence",
    "notes-responsibilities",
] as const;
