
import { resolve } from "path";
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

const production = import.meta.env['NODE_ENV'] === "production";

const staticFiles = ( directory: string ) => {
    const plugin = new Elysia({ name: "staticPlugin", seed: directory });
    const glob = new Bun.Glob( `${directory}/**` );
    for ( const path of glob.scanSync() ) {
        const file = Bun.file( path );
        plugin.get( path.substring( directory.length ), () => new Response( file ) );
    }
    return plugin;
}

const app = new Elysia()

if ( production ) {
    const __pathname = new URL( '.', import.meta.url ).pathname;
    app.use( staticFiles( resolve( __pathname, "client" ) ) )
    app.get( "*", () => Bun.file( resolve( __pathname, "index.html" ) ) )
} else {
    app.use( swagger({ provider:"swagger-ui" }) )
    app.get( "*", ({ set }) => {
        set.status = "Not Found";
        return { code:404, message:"This page cloud not be found." }
    })
}

app.group( "/api", ( app ) =>
    app.get( "/", () => ({ code:200, message:"Welcome!" }) )
)

app.listen( production ? 3000 : 3001 );
