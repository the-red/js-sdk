import { Command } from "commander";

interface ParsedArgs {
    baseUrl: string;
    username: string | null;
    password: string | null;
    oAuthToken: string | null;
    apiToken: string | null;
    proxy: string | null;
    proxyHost: string | null;
    proxyPort: string | null;
    basicAuthPassword: string | null;
    basicAuthUsername: string | null;
    appId: string | null;
    preview: boolean;
    guestSpaceId: string | null;
    demo: boolean;
    typeName: string;
    namespace: string;
    output: string;
}

export function parse(argv: string[]): ParsedArgs {
    const program = new Command();
    program
        .option(
            "--demo",
            "Generate Type definition from demo data.",
            false
        )

        .option(
            "--host [host]",
            "A base URL for the Kintone environment. This will be replaced with the --base-url option",
            null
        )
        .option(
            "--base-url [baseUrl]",
            "A base URL for the Kintone environment",
            process.env.KINTONE_BASE_URL || null
        )
        .option(
            "-u, --username [username]",
            "A username for the Kintone environment",
            process.env.KINTONE_USERNAME || null
        )
        .option(
            "-p, --password [password]",
            "A password for the Kintone environment",
            process.env.KINTONE_PASSWORD || null
        )
        .option(
            "--api-token [apiToken]",
            "An API token for the Kintone environment",
            process.env.KINTONE_API_TOKEN || null
        )
        .option(
            "--oauth-token [oAuthToken]",
            "An OAuth token for the Kintone environment",
            process.env.KINTONE_OAUTH_TOKEN || null
        )
        .option(
            "--app-id [appId]",
            "id of kintone app",
            null
        )
        .option(
            "--guest-space-id [guestSpaceId]",
            "id of kintone guest space id",
            null
        )
        .option(
            "--preview",
            "set this option if kintone app is in preview mode",
            false
        )
        .option(
            "--type-name [typeName]",
            "type name to be generated",
            "Fields"
        )
        .option(
            "--namespace [namespace]",
            "namespace of type to be generated",
            "kintone.types"
        )
        .option(
            "--proxy-host [proxyHost]",
            "proxy host",
            null
        )
        .option(
            "--proxy-port [proxyPort]",
            "proxy port",
            null
        )
        // Axios handles HTTP_PROXY and HTTPS_PROXY natively,
        // so we don't use the environment variables as the default value
        .option("--proxy [proxy]", "proxy server", null)
        .option(
            "--basic-auth-username [basicAuthUsername]",
            "A username for basic authentication",
            process.env.KINTONE_BASIC_AUTH_USERNAME || null
        )
        .option(
            "--basic-auth-password [basicAuthPassword]",
            "A password for basic authentication",
            process.env.KINTONE_BASIC_AUTH_PASSWORD || null
        )
        .option(
            "-o, --output [output]",
            "output file name",
            "fields.d.ts"
        )
        .parse(argv);

    const {
        host,
        username,
        password,
        apiToken,
        oauthToken,
        proxy,
        proxyHost,
        proxyPort,
        basicAuthPassword,
        basicAuthUsername,
        appId,
        preview,
        guestSpaceId,
        demo,
        typeName,
        namespace,
        output,
    } = program;

    const baseUrl = program.baseUrl || host;
    if (baseUrl === null) {
        throw new Error(
            "--base-url (KINTONE_BASE_URL) must be specified"
        );
    }

    return {
        baseUrl,
        username,
        password,
        apiToken,
        oAuthToken: oauthToken,
        proxy,
        proxyHost,
        proxyPort,
        basicAuthPassword,
        basicAuthUsername,
        appId,
        preview,
        guestSpaceId,
        demo,
        typeName,
        namespace,
        output,
    };
}
