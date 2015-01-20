angular.module("env", [])

    .constant("ENV", {
        SERVER_ADDRESS: "http://localdocker/api/",
        BASE_URL: "http://localhost:8000/app/"
    });
