import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import {contentTypeExtensions, FileResponse} from "./file-response.mjs";

process.chdir("../");
const port = 80;
http.createServer(processFile).listen(port);

async function processFile(request, response)
{
    let file = null;
    if (request.headers.accept.split(",").includes("text/html"))
    {
        if (request.url === "/")
        {
            file = await getFile("index.html");
        }
        else
        {
            const route = request.url + ".html";
            file = await getFile(route);
        }
        if (!file)
        {
            file = await getFile(path.join(request.url, "index.html"));
            if (!file)
            {
                const split = request.url.split("/");
                const route = path.join(request.url, split[split.length - 1] + ".html");
                file = await getFile(route);
            }
        }
    }
    file = file || await getFile(request.url) || await getFile("404.html");

    writeResponse(response, file);
}

async function getFile(uri)
{
    const filename = path.join(process.cwd(), "src", uri);
    if (!fs.existsSync(filename) || fs.statSync(filename).isDirectory())
        return null;

    const data = await fs.promises.readFile(filename, "binary");
    const contentType = contentTypeExtensions[path.extname(filename)];
    const headers = {};
    if (contentType)
        headers["Content-Type"] = contentType;

    return new FileResponse(200, data, headers);
}

console.info(`Server running at http://localhost:${port}\nCTRL + C to shutdown\n`);

function writeResponse(response, file)
{
    response.writeHead(file.StatusCode, file.Headers);
    response.write(file.Data, "binary");
    response.end();
}

