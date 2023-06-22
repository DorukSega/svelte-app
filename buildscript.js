const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./out/svelte")) {
    fs.mkdirSync("./out/svelte");
}

//build the application
esbuild
    .build({
        entryPoints: ["./entry.js"],
        mainFields: ["svelte", "browser", "module", "main"],
        outdir: "./out/svelte",
        format: "esm",
        logLevel: "info",
        minify: false,
        bundle: true,
        splitting: true,
        sourcemap: false,
        plugins: [sveltePlugin({
            compilerOptions: {
                generate: "dom",
                errorMode: "throw",
                hydratable: true,
            },
            cache: true,
        })],
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

