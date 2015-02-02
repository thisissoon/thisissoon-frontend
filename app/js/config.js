angular.module("config", [])

    .constant("ENV", {
        SERVER_ADDRESS: "http://localdocker/",
        API_ADDRESS: "http://localdocker/api/",
        BASE_URL: "http://localhost:8000/"
    });
