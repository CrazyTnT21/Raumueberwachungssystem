export class FileResponse
{
    StatusCode;
    Data;
    Headers;

    constructor(statusCode, data, headers)
    {
        this.StatusCode = statusCode;
        this.Data = data;
        this.Headers = headers;
    }
}

export const contentTypeExtensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
};