app.service("CurrencyService", function () {
	// 1.00 THB	=	0.18 CNY
	// 1 THB    =   0.0299579 USD
	// 1 THB    	= 0.0261958 EUR
	// 1.00 THB 	= 	0.0189096 GBP
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