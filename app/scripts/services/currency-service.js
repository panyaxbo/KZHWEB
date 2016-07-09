"use strict";
app.service("CurrencyService", function () {
    return {
        Currency: {
            SelectedCurrency: "thb", 
            MultiplierTHB2USD : 0.0299579, 
            MultiplierTHB2EUR : 0.0261958,
            MultiplierTHB2GBP : 0.0189096,
            MultiplierTHB2CNY : 0.18
        }
    };
});