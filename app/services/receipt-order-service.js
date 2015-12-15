app.service("ReceiptOrderService", function () {
    this.ROHead = {};

    this.ROLineList = [];

    /**   this.updateROHead = function (newROHead) {
           this.ROHead.Id = newROHead.Id;
           this.ROHead.RONo = newROHead.RONo;
       }

       this.getROHead = function () {
           return this.ROHead;
       }
       this.addROLineList = function (newROLine) {
           console.log("b service " + this.ROLineList.length);
           this.ROLineList.push({
               Id: newROLine.Id,
               ProductCode: newROLine.ProductCode,
               ProductNameTh: newROLine.ProductNameTh,
               Quantity: newROLine.Quantity,
               Price: newROLine.Price,
               Discount: newROLine.Discount,
               Amount: newROLine.Amount
           });
           console.log("af service " + this.ROLineList.length);
       }

       this.getROLineList = function () {
           return this.ROLineList;
       }
       **/
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