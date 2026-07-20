import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src");
const appRoot = path.join(root, "app", "developers");

function walk(dir, files = []) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, files);
        else if (/\.(tsx|ts|jsx|js)$/.test(ent.name)) files.push(p);
    }
    return files;
}

const pageFiles = walk(appRoot).filter((f) => f.endsWith("page.tsx"));

function routeFromPage(file) {
    let rel = path.relative(path.join(root, "app"), file).replace(/\\/g, "/");
    rel = rel.replace(/\/page\.tsx$/, "");
    return "/" + rel;
}

/** Collect static id="..." and common Guide* defaults from a page source. */
function collectIds(src) {
    const ids = new Set();

    for (const m of src.matchAll(/\bid=["']([^"']+)["']/g)) ids.add(m[1]);
    for (const m of src.matchAll(/\bid=\{\s*["']([^"']+)["']\s*\}/g)) ids.add(m[1]);

    if (/<GuideIntro[\s/>]/.test(src) || /<GuideIntro>/.test(src)) {
        if (!/<GuideIntro[^>]*\bid=/.test(src)) ids.add("introduction");
    }
    if (/<GuideWorkflow[\s/>]/.test(src)) {
        if (!/<GuideWorkflow[^>]*\bid=/.test(src)) ids.add("overall-workflow");
    }
    if (/<GuideOptionsChooser[\s/>]/.test(src)) {
        const m = src.match(/<GuideOptionsChooser[^>]*\bid=["']([^"']+)["']/);
        ids.add(m ? m[1] : "integration-options");
    }
    if (/<GuideApisInvolved[\s/>]/.test(src)) {
        const m = src.match(/<GuideApisInvolved[^>]*\bid=["']([^"']+)["']/);
        ids.add(m ? m[1] : "apis-involved");
    }
    if (/<GuideRelatedHelpers[\s/>]/.test(src)) ids.add("related-helpers");

    for (const m of src.matchAll(/<GuideOptionDetail[^>]*\bid=["']([^"']+)["']/g)) {
        const id = m[1];
        ids.add(id);
        ids.add(`${id}-overview`);
        ids.add(`${id}-diagram`);
        ids.add(`${id}-sequence`);
        ids.add(`${id}-notes`);
    }

    // DocsTopicCard / dynamic group ids in GuideApisInvolved groups
    for (const m of src.matchAll(/\bid:\s*["']([^"']+)["']/g)) ids.add(m[1]);

    return ids;
}

/** Resolve simple relative imports used by a page and merge their ids. */
function collectImportedIds(pageFile, src, depth = 0) {
    const ids = collectIds(src);
    if (depth > 2) return ids;

    // EndpointBlock path → id (same as ApiBlocks.tsx)
    for (const m of src.matchAll(/path=["']([^"']+)["']/g)) {
        const id = m[1].replace(/\//g, "-").replace(/^-/, "");
        if (id) ids.add(id);
    }

    const importRe = /from\s+["'](@\/[^"']+|\.\.?\/[^"']+)["']/g;
    let im;
    while ((im = importRe.exec(src))) {
        let spec = im[1];
        if (spec.startsWith("@/")) spec = path.join(root, spec.slice(2));
        else spec = path.resolve(path.dirname(pageFile), spec);

        const candidates = [
            spec,
            `${spec}.tsx`,
            `${spec}.ts`,
            path.join(spec, "index.tsx"),
            path.join(spec, "index.ts"),
        ];
        const found = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
        if (!found) continue;
        // Only pull docs UI / section components
        if (!/components[\\/]developers|components[\\/]layout/.test(found) && depth === 0) {
            // still allow @/components/developers from pages
            if (!found.includes(`${path.sep}components${path.sep}`)) continue;
        }
        try {
            const childSrc = fs.readFileSync(found, "utf8");
            for (const id of collectImportedIds(found, childSrc, depth + 1)) ids.add(id);
        } catch {
            /* ignore */
        }
    }
    return ids;
}

const routes = new Map();
for (const f of pageFiles) {
    const route = routeFromPage(f);
    const src = fs.readFileSync(f, "utf8");
    routes.set(route, { file: f, ids: collectImportedIds(f, src), src });
}

// href="..." and object href: "..." (sidebar / topic cards)
const allSrcFiles = walk(root);
const linkRes = [
    /href=["'](\/developers[^"'#?]*)(\?[^"'#]*)?(#[^"']*)?["']/g,
    /\bhref:\s*["'](\/developers[^"'#?]*)(\?[^"'#]*)?(#[^"']*)?["']/g,
];
const issues = [];
const ok = [];
const seen = new Set();

function normalizeRoute(raw) {
    return (raw || "/developers").replace(/\/$/, "") || "/developers";
}

for (const f of allSrcFiles) {
    const src = fs.readFileSync(f, "utf8");
    for (const linkRe of linkRes) {
        linkRe.lastIndex = 0;
        let m;
        while ((m = linkRe.exec(src))) {
            const route = normalizeRoute(m[1]);
            const query = m[2] || "";
            const hash = m[3] ? m[3].slice(1) : null;
            const display = route + query + (hash ? "#" + hash : "");
            const key = `${path.relative(process.cwd(), f)}|${display}`;
            if (seen.has(key)) continue;
            seen.add(key);

            const info = routes.get(route);
            if (!info) {
                issues.push({
                    type: "MISSING_ROUTE",
                    from: path.relative(process.cwd(), f),
                    href: display,
                });
                continue;
            }
            if (hash) {
                if (!info.ids.has(hash)) {
                    issues.push({
                        type: "MISSING_ANCHOR",
                        from: path.relative(process.cwd(), f),
                        href: display,
                        available: [...info.ids].sort(),
                    });
                } else {
                    ok.push(display);
                }
            } else {
                ok.push(display);
            }
        }
    }
}

// Extra: IntegrationGuide / ApiEntryList may generate ids differently — report pages with few ids
console.log(`Routes: ${routes.size}`);
console.log(`Unique OK: ${new Set(ok).size}`);
console.log(`Issues: ${issues.length}\n`);

const byType = { MISSING_ROUTE: [], MISSING_ANCHOR: [] };
for (const i of issues) byType[i.type].push(i);

if (byType.MISSING_ROUTE.length) {
    console.log("=== MISSING ROUTES ===");
    for (const i of byType.MISSING_ROUTE) {
        console.log(`${i.href}`);
        console.log(`  from: ${i.from}`);
    }
    console.log("");
}

if (byType.MISSING_ANCHOR.length) {
    console.log("=== MISSING ANCHORS ===");
    for (const i of byType.MISSING_ANCHOR) {
        console.log(`${i.href}`);
        console.log(`  from: ${i.from}`);
        console.log(`  available: ${i.available.join(", ") || "(none)"}`);
        console.log("");
    }
}

if (!issues.length) console.log("All /developers hrefs resolve to existing pages and anchors.");
