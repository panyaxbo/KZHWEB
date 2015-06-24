var app = angular.module('KZHWEB', ['ngAnimate', 'ngFileUpload','ngPasswordStrength', 'facebook', 'ngTable', 'flow','pascalprecht.translate']);

//Config Route 
/**app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/content.html",
        controller: "BodyController"
    }).when("/Setting", {
        templateUrl: "views/partial/account-setting.html",
        controller: "BodyController"
    }).when("/ProductSection", {
        templateUrl: "views/content.html#product-section",
        controller: "BodyController"
    }).when("/WebboardSection", {
        templateUrl: "views/content.html#webboard-section",
        controller: "BodyController"
    }).when("/PaymentSection", {
        templateUrl: "views/content.html#payment-section",
        controller: "BodyController"
    }).when("/AboutSection", {
        templateUrl: "views/content.html#about-section",
        controller: "BodyController"
    }).when("/PurchaseHistory", {
        templateUrl: "views/partial/purchase-history.html",
        controller: "BodyController"
    }).otherwise({
        redirectTo: "/"
    });
}]);**/
//var myAppId = '320977548070994';
app.config([
    'FacebookProvider',
    function(FacebookProvider) {
     var myAppId = '320977548070994';
     
     // You can set appId with setApp method
     // FacebookProvider.setAppId('myAppId');
     
     /**
      * After setting appId you need to initialize the module.
      * You can pass the appId on the init method as a shortcut too.
      */
     FacebookProvider.init(myAppId);
     
    }
  ])

//Config translate
app.config(function ($translateProvider) {
    $translateProvider.translations('th', {
        TITLE: 'โค้ว ซุ่น เฮง - ศูนย์รวมอะไหล่มอเตอร์ไซค์ ยาง น้ำมันเครื่อง',
        TITLE: {
            NAME: 'โค้ว ซุ่น เฮง - ศูนย์รวมอะไหล่มอเตอร์ไซค์, ยาง และ น้ำมันเครื่อง',
            DESCRIPTION: ''
        },
        HEAD: {
            MENU: {
                PRODUCT: 'สินค้า',
                WEBBOARD: 'เว็บบอร์ด',
                PAYMENT: 'การชำะเงิน',
                ABOUT: 'เกี่ยวกับเรา',
                ACCOUNT: 'ตั้งค่าบัญชี',
                HISTORY: 'ประวัติการซื้อ',
                GENERAL: 'ตั้งค่าทั่วไป',
                LOGOUT: 'ออกจากระบบ'
            },
            SIGNIN: 'เข้าสู่ระบบ',
            MODAL_SIGNIN: {
                //login
                HEAD: 'เข้าสู่ระบบ',
                LABEL_USERNAME: 'รหัสผู้ใช้',
                PLACEHOLDER_USERNAME: 'อีเมล',
                LABEL_PASSWORD: 'รหัสผ่าน',
                PLACEHOLDER_PASSWORD: 'รหัสผ่าน',
                TAB_SIGNUP: 'ลงทะเบียน',
                BUTTON_SIGNIN: '',
                FACEBOOK_SIGNIN: 'เข้าสู่ระบบด้วยบัญชีเฟสบุค',
                TWITTER_SIGNIN: 'เข้าสู่ระบบด้วยบัญชีทวิตเตอร์',
                GOOGLE_PLUS_SIGNIN: 'เข้าสู่ระบบด้วยบัญชีกูเกิลพลัส'
                //sign up
            },
            CART: 'ตะกร้า',
            MODAL_CART: {
                EMPTY_CART: 'ตะกร้าว่าง',
                PRODUCT_CART: 'สินค้าในตะกร้า',
                SEQ: 'ลำดับ',
                ITEM_NAME: 'รายการ',
                QTY: 'จำนวน',
                UOM: 'หน่วย',
                PRICE: 'ราคา',
                DISCOUNT: 'ส่วนลด',
                AMOUNT: 'รวมเงิน',
                REMOVE: 'ลบ',
                SUMAMT: 'ยอดเงิน',
                SUMDISCAMT: 'รวมส่วนลด',
                SUMVATAMT: 'ภาษี',
                NETAMT: 'ยอดสุทธิ',
                SHOP_BUTTON: 'ดูสินค้า',
                SAVE_BUTTON: 'บันทึกตะกร้า',
                CLEAR_BUTTON: 'ล้างตะกร้า',
                CHECKOUT_BUTTON: 'ดำเนินการต่อ',
            },
            WELCOME: 'ยินดีต้อนรับ'
        },
        BODY: {
            NAV: {},
            //        BODY.SECTION.PAYMENT.SCB_ACC
            SECTION: {
                PRODUCT: {
                    QTY: 'จำนวน',
                    PRICE: 'ราคา',
                    LIKE: 'ชอบ',
                    BUY: 'ซื้อ',
                },
                WEBBOARD: {},
                PAYMENT: {
                    BBL_ACC: 'หมายเลข : 440-99934-3454',
                    KBANK_ACC: 'หมายเลข : 440-99934-3454',
                    SCB_ACC: 'หมายเลข : 440-99934-3454',
                    KTB: 'หมายเลข : 440-99934-3454',
                    KCC: 'หมายเลข : 440-99934-3454'
                },
                ABOUT: {},
                GOOGLE_MAP: {
                    ADDRESS1: '30-32 หมู่. 2 ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'ระแงง',
                    DISTRICT: 'ศีขรภูมิ',
                    PROVINCE: 'สุรินทร์',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST: {},
                SHIPMENT: {
                    BILLING : {
                        NAME: 'ชื่อ',
                        ADDRESS: 'ที่อยู่',
                        PROVINCE: 'จังหวัด',
                        DISTRICT: 'เขต/อำเภอ',
                        SUBDISTRICT: 'แขวง/ตำบล',
                        ZIPCODE: 'รหัสไปรษณีย์'
                    },
                    PAYMENT: {
                        TYPE: 'ประเภทของการชำระเงิน',
                        TRANSFER: 'โอนเงิน',
                        CREDIT: 'เครดิตการ์ด'
                    }
                }
            }
        },
        FOOTER : {
            TYRE : {
                HEAD : 'ยางนอก - ยางใน',
                REMARK : 'ด้วยยางเกรดคุณภาพ และทั่วไป'
            },
            LUBRICANT : {
                HEAD : 'น้ำมันเครื่อง',
                REMARK : 'น้ำมันหล่อลื่นคุณภาพดี ซึ่งมีหลายแบรนด์'
            },
            BATTERY : {
                HEAD : 'แบตเตอรี่',
                REMARK : ''
            },
            BRAKE : {
                HEAD : 'ระบบเบรค',
                REMARK : ''
            },
            SHOCK : {
                HEAD : 'โช๊คอัพ',
                REMARK : ''
            },
            WRENCH : {
                HEAD : 'เครื่องมือ',
                REMARK : ''
            }
        }
    });
    $translateProvider.translations('us', {
        TITLE: 'Koh Zhun Heng - Conter of Motorcycle Parts Tyre and Lubricant',
        TITLE: {
            NAME: 'Koh Zhun Heng - Conter of Motorcycle Parts Tyre and Lubricant',
            DESCRIPTION: ''
        },
        HEAD: {
            MENU: {
                PRODUCT: 'Product',
                WEBBOARD: 'Webboard',
                PAYMENT: 'Payment',
                ABOUT: 'About us',
                ACCOUNT: 'Account Setting',
                HISTORY: 'Purchase History',
                GENERAL: 'General Setting',
                LOGOUT: 'Logout'
            },
            SIGNIN: 'Login',
            MODAL_SIGNIN: {
                TAB_SIGNIN: 'Sign in',
                LABEL_USERNAME: 'Username',
                LABEL_PASSWORD: 'Password',
                TAB_SIGNUP: 'Sign up',
                FACEBOOK_SIGNIN: 'Sign in with Facebook',
                TWITTER_SIGNIN: 'Sign in with Twitter',
                GOOGLE_PLUS_SIGNIN: 'Sign in with Google+'
            },
            CART: 'Cart',
            MODAL_CART: {
                EMPTY_CART: 'Empty Cart',
                PRODUCT_CART: 'Products in Cart',
                SEQ: 'Seq',
                ITEM_NAME: 'Item',
                QTY: 'Qty',
                UOM: 'Uom',
                PRICE: 'Price',
                DISCOUNT: 'Discount',
                AMOUNT: 'Amount',
                REMOVE: 'Remove',
                SUMAMT: 'Sum Amount',
                SUMDISCAMT: 'Sum Discount Amount',
                SUMVATAMT: 'VAT Amount',
                NETAMT: 'Net Amount',
                SHOP_BUTTON: 'Continue Shopping',
                SAVE_BUTTON: 'Save Cart',
                CLEAR_BUTTON: 'Clear Cart',
                CHECKOUT_BUTTON: 'Check out',
            },
            WELCOME: 'Welcome'
        },
        BODY: {
            NAV: {},
            //        BODY.SECTION.PAYMENT.SCB_ACC
            SECTION: {
                PRODUCT: {
                    QTY: 'Qty',
                    PRICE: 'Price',
                    LIKE: 'Like',
                    BUY: 'Buy',
                },
                PAYMENT: {
                    BBL_ACC: 'Acc. No : 440-99934-3454',
                    KBANK_ACC: 'Acc. No : 440-99934-3454',
                    SCB_ACC: 'Acc. No : 440-99934-3454',
                    KTB_ACC: 'Acc. No : 440-99934-3454',
                    KCC_ACC: 'Acc. No : 440-99934-3454'
                },
                SHIPMENT: {}
            }
        },
        FOOTER : {
            TYRE : {
                HEAD : 'Inner - Outer Tyre',
                REMARK : 'ด้วยยางเกรดคุณภาพ และทั่วไป'
            },
            LUBRICANR : {
                HEAD : 'น้ำมันเครื่อง',
                REMARK : 'น้ำมันหล่อลื่น'
            },
            BATTERY : {
                HEAD : 'แบตเตอรี่',
                REMARK : ''
            },
            BRAKE : {
                HEAD : 'ระบบเบรค',
                REMARK : ''
            },
            SHOCK : {
                HEAD : 'โช๊คอัพ',
                REMARK : ''
            },
            WRENCH : {
                HEAD : 'เครื่องมือ',
                REMARK : ''
            }
        }
    });
    $translateProvider.translations('cn', {
        TITLE: '興 順 許 - 實施方案 摩托车配件 橡膠 和 润滑剂',
        TITLE: {
            NAME: '興 順 許 - 實施方案 摩托车配件 橡膠 和 润滑剂',
            DESCRIPTION: ''
        },
        HEAD: {
            MENU: {
                PRODUCT: '貨物',
                WEBBOARD: '座談會',
                PAYMENT: '付款',
                ABOUT: '關於我們',
                ACCOUNT: '賬戶設置',
                HISTORY: '購買歷史',
                GENERAL: '一般設置',
                LOGOUT: '註銷'
            },
            SIGNIN: '登錄',
            MODAL_SIGNIN: {
                TAB_SIGNIN: '登入',
                LABEL_USERNAME: '用户名',
                LABEL_PASSWORD: '密码',
                TAB_SIGNUP: '报名',
                FACEBOOK_SIGNIN: '通過 Facebook 登錄',
                TWITTER_SIGNIN: '通過 Twitter 登錄',
                GOOGLE_PLUS_SIGNIN: '通過 Google+ 登錄'
            },
            CART: '大車',
            MODAL_CART: {
                EMPTY_CART: '空購物車',
                PRODUCT_CART: '在購物車的產品',
                SEQ: '序列',
                ITEM_NAME: '名單',
                QTY: '號碼',
                UOM: '單元',
                PRICE: '價格',
                DISCOUNT: '折扣',
                AMOUNT: '總',
                REMOVE: '刪除',
                SUMAMT: '量總和',
                SUMDISCAMT: '總之折扣金額',
                SUMVATAMT: '總之增值稅金額',
                NETAMT: '淨額',
                SHOP_BUTTON: '繼續購物',
                SAVE_BUTTON: '救車',
                CLEAR_BUTTON: '清空購物車',
                CHECKOUT_BUTTON: '繼續',
            },
            WELCOME: '歡迎'
        },
        BODY: {
            NAV: {},
            SECTION: {
                PRODUCT: {
                    QTY: '音量',
                    PRICE: '價格',
                    LIKE: '如',
                    BUY: '購買',
                },
                PAYMENT: {
                    BBL_ACC: '帳號 : 440-99934-3454',
                    KBANK_ACC: '帳號 : 440-99934-3454',
                    SCB_ACC: '帳號 : 440-99934-3454',
                    KTB_ACC: '帳號 : 440-99934-3454',
                    KCC_ACC: 'ห帳號 : 440-99934-3454'
                }
            }
        }
    });
    $translateProvider.preferredLanguage('th');
});

app.run(function ($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    // For update Menu
    $rootScope.$on('handleHeadMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleHeadMenuBroadcast', args);
    });
    $rootScope.$on('handleBodyMenuEmit', function (event, args) {
        $rootScope.$broadcast('handleBodyMenuBroadcast', args);
    });
    //For update curency
    $rootScope.$on('handleCurrencyEmit', function (event, args) {
        $rootScope.$broadcast('handleCurrencyBroadcast', args);
    });
    // For update Receipt Order
    $rootScope.$on('handleReceiptOrderEmit', function (event, args) {
        $rootScope.$broadcast('handleReceiptOrderBroadcast', args);
    });
    //For update locale
    $rootScope.$on('handleLocaleEmit', function (event, args) {
        $rootScope.$broadcast('handleLocaleBroadcast', args);
    });
    //For update User
    $rootScope.$on('handleUserEmit', function (event, args) {
        $rootScope.$broadcast('handleUserBroadcast', args);
    });
});
/**

For using UI-Router

app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatch url, redirect to state1
    $urlRouterProvider.otherwise("./pages/partial/product.html");

    $stateProvider
        .state("state2", {
            url: "/state2",
            templateUrl: "./pages/partial/article.html"
        })
        .state("state3", {
            url: "/state3",
            templateUrl: "./pages/partial/webboard.html"
        })
        .state("state4", {
            url: "/state4",
            templateUrl: "./pages/partial/payment.html"
        })
        .state("state5", {
            url: "/state5",
            templateUrl: "./pages/partial/about.html"
        })
});

**/
/**

For using ngRoute

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "",
        templateUrl: "/index.html"
    }).when("/article", {
        controller: "",
        templateUrl: "/pages/partial/article.html"
    }).when("/webboard", {
        controller: "",
        templateUrl: "/pages/partial/webboard.html"
    }).when("/payment", {
        controller: "",
        templateUrl: "/pages/partial/payment.html"
    }).when("/about", {
        controller: "",
        templateUrl: "/pages/partial/about.html"
    }).otherwise({
        redirectTo: "/index.html"
    });
});**/