app.service("ReceiptOrderService", function () {
    this.ROHead = {};

    this.ROLineList = [];

    return {
        ROHead: {
            Id: 0,
            RONo: "",
            RODate: new Date(),
            CustomerId: 0,
            CustomerFirstName: "",
            SumAmount: 0,
            SumVatAmount: 0,
            VatRate: 0,
            SumVatAmount: 0,
            SumDiscountAmount: 0,
            NetAmount: 0,
            ROLineList: []
        }
    };
});