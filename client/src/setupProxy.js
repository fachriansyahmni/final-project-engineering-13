const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('/api/v1/auth/login',
        {
            target: "http://localhost:8090",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/api/v1/auth/register',
        {
            target: "http://localhost:8090",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/api/v1/auth/logout',
        {
            target: "http://localhost:8090",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/api/v1/profile',
        {
            target: "http://localhost:8090",
            changeOrigin: true
        })
    )
}
