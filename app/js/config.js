angular.module("config", [])

    .constant("ENV", {
        SERVER_ADDRESS: "http://localdocker/",
        API_ADDRESS: "http://thisissoon.com/api/",
        BASE_URL: "http://localhost:8000/"
    });
