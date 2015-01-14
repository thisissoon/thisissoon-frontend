angular.module("env", [])

    .constant("ENV", {
        SERVER_ADDRESS: "http://localdocker:5000/api/",
        BASE_URL: "http://localhost:8000/app/"
    });
