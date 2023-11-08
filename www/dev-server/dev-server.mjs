import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import {contentTypeExtensions, FileResponse} from "./file-response.mjs";

process.chdir("../");
process.chdir("src");
const port = 80;
http.createServer(processRequest).listen(port);

async function processRequest(request, response)
{
    if (request.url === "/")
    {
        writeResponse(response, await getFile("index.html"));
        return;
    }
    if (request.headers.accept.includes("text/html"))
    {
        writeResponse(response, await getHTMLFile(request.url) || await getFile("404.html"));
        return;
    }
    writeResponse(response, await getFile(request.url) || await getFile("404.html"));
}

async function getHTMLFile(url)
{
    return await getFile(url + ".html") ||
        await getFile(path.join(url, "index.html")) ||
        await getFile(getAlternativeIndexFile(url));
}

function getAlternativeIndexFile(url)
{
    const split = url.split("/");
    return path.join(url, split[split.length - 1] + ".html");
}

async function getFile(uri)
{
    const filename = path.join(process.cwd(), uri);
    if (!fs.existsSync(filename) || fs.statSync(filename).isDirectory())
        return null;

    const data = await fs.promises.readFile(filename, "binary");
    const contentType = contentTypeExtensions[path.extname(filename)];
    const headers = {};
    if (contentType)
        headers["Content-Type"] = contentType;

    return new FileResponse(200, data, headers);
}

function writeResponse(response, file)
{
    response.writeHead(file.StatusCode, file.Headers);
    response.write(file.Data, "binary");
    response.end();
}

console.info(`Server running at http://localhost:${port}\nCTRL + C to shutdown\n`);
