/** Staging / live API base URLs shown on Documentation Overview */
export const PARTNER_API_BASE_URLS = [
    {
        id: "retail",
        title: "Retail",
        authType: "JWT",
        staging: "https://furp02-staging.funtechcom.com",
        live: "https://furp02-pre-pord.funtechcom.com",
        guideHref: "/developers/guides/retail",
        authHref: "/developers/guides/retail#authentication",
    },
    {
        id: "biller",
        title: "Biller",
        authType: "Basic Auth",
        staging: "https://furp02-staging.funtechcom.com",
        live: "https://furp02-pre-pord.funtechcom.com",
        guideHref: "/developers/guides/biller",
        authHref: "/developers/api-reference/biller-api#auth",
    },
    {
        id: "mto",
        title: "MTO",
        authType: "JWT / Bearer",
        staging: "https://furp02-staging.funtechcom.com",
        live: "https://furp02-pre-pord.funtechcom.com",
        guideHref: "/developers/guides/mto",
        authHref: "/developers/api-reference/mto-api#auth-login",
    },
] as const;
