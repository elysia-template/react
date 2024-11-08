
import { resolve } from "path";
import { Elysia } from "elysia";

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
    app.use( staticFiles( resolve( __dirname, "./dist/client" ) ) )
    app.get( "*", () => Bun.file( resolve( __dirname, "./dist/index.html" ) ) )
}

app.group( "/api", ( app ) =>
    app.get( "/", context => ({ code:200, message:"Welcome!" }) )
)

app.listen( production ? 3000 : 3001 );
