app.service("ReceiptOrderService", ["$q","$http", "ENV", function ($q, $http, ENV) {
    this.ROHead = {};

    this.ROLineList = [];

    return {
        CreateReceiptOrder: function(ROHeadObject) {
            var defer = $q.defer();
            var createReceiptUrl = ENV.apiEndpoint + '/receipts/CreateReceipt';
            $http.post(createReceiptUrl, ROHeadObject)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(err, status) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByUserIdAndStatus: function(UserId, PaymentStatus, ShippingStatus, StartDate, EndDate) {
            var defer = $q.defer();
            var historyReceiptUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByUserIdAndStatus/" + UserId + "/" + PaymentStatus
            + "/" + ShippingStatus + "/" + StartDate + "/" + EndDate;
            $http.get(historyReceiptUrl)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByStaff: function(CustomerRONo, CustomerName, CustomerOrderPaymentStatus, CustomerOrderShippingStatus, CustomerOrderStartDate, CustomerOrderEndDate) {
            var defer = $q.defer();
            var CustomerOrderUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByStaff/"+ CustomerRONo +"/"+ CustomerName
        +"/"+CustomerOrderPaymentStatus+"/"+ CustomerOrderShippingStatus +"/"+CustomerOrderStartDate+"/"+CustomerOrderEndDate;
            console.log(customerOrderUrl);
            $http.get(CustomerOrderUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function (err, status) {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadROLineByROHeadId: function(ROHeadId) {
            var defer = $q.defer();
            var loadROHeadLineUrl = ENV.apiEndpoint + "/receipts/LoadROHeadROLineByObjId/" + ROHeadId;
            $http.get(loadROHeadLineUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.resolve(error);
            });
            return defer.promise;
        },
        PerformApprovePayment: function(RONo) {
            var defer = $q.defer();
            var approvePaymentUrl = ENV.apiEndpoint + '/receipts/ApprovePayment/' + RONo;
            $http.get(approvePaymentUrl)
            .success(function (data, status) {
                defer.resolve(data);
            })
            .error(function(error, status) {
                defer.reject(error);
            });
            return defer.promise;
        }
    };
}]);