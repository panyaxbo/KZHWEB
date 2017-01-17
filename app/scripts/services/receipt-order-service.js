"use strict";
app.service("ReceiptOrderService", ["$q","$http", "ENV", ($q, $http, ENV) => {

    return {
        CreateReceiptOrder: (ROHeadObject) => {
            var defer = $q.defer();
            var createReceiptUrl = ENV.apiEndpoint + '/receipts/CreateReceipt';
            $http.post(createReceiptUrl, ROHeadObject)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByUserIdAndStatus: (UserId, PaymentStatus, ShippingStatus, StartDate, EndDate) => {
            var defer = $q.defer();
            var historyReceiptUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByUserIdAndStatus/" + UserId + "/" + PaymentStatus
            + "/" + ShippingStatus + "/" + StartDate + "/" + EndDate;
            $http.get(historyReceiptUrl)
            .success((data) => {
                defer.resolve(data);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadByStaff: (CustomerRONo, CustomerName, CustomerOrderPaymentStatus, CustomerOrderShippingStatus, CustomerOrderStartDate, CustomerOrderEndDate) => {
            var defer = $q.defer();
            var CustomerOrderUrl = ENV.apiEndpoint + "/receipts/LoadROHeadByStaff/"+ CustomerRONo +"/"+ CustomerName+"/"+CustomerOrderPaymentStatus+"/"+ CustomerOrderShippingStatus +"/"+CustomerOrderStartDate+"/"+CustomerOrderEndDate;
            console.log(CustomerOrderUrl);
            $http.get(CustomerOrderUrl)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((err, status) => {
                defer.reject(err);
            });
            return defer.promise;
        },
        LoadROHeadROLineByROHeadId: (ROHeadId) => {
            var defer = $q.defer();
            var loadROHeadLineUrl = ENV.apiEndpoint + "/receipts/LoadROHeadROLineByObjId/" + ROHeadId;
            $http.get(loadROHeadLineUrl)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((error, status) => {
                defer.resolve(error);
            });
            return defer.promise;
        },
        PerformApprovePayment: (RONo) => {
            var defer = $q.defer();
            var approvePaymentUrl = ENV.apiEndpoint + '/receipts/ApprovePayment/' + RONo;
            $http.get(approvePaymentUrl)
            .success((data, status) => {
                defer.resolve(data);
            })
            .error((error, status) => {
                defer.reject(error);
            });
            return defer.promise;
        }
    };
}]);