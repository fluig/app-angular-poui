const proxy = [
  {
    context: "/process-management/api",
    target: "https://universo.fluig.io",
    changeOrigin: true,
    secure: true
  }
];
module.exports = proxy;
