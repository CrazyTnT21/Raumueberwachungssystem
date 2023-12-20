const path = require("path");

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
        },
        compress: true,
        port: 80,

    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    target: "web",
};
