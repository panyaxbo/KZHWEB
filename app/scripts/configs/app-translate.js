"use strict";
app.config(function ($translateProvider) {
    $translateProvider.translations('th', {
        TITLE: {
            NAME: 'โค้ว ซุ่น เฮง - ศูนย์รวมอะไหล่มอเตอร์ไซค์, ยาง และ น้ำมันเครื่อง',
            KEYWORD: 'น้ำมันเครื่อง,ยางนอก,ยางใน,อะไหล่มอเตอร์ไซค์,รถยนต์,รถไถ, ไฟฟ้า, การเกษตร, ประปา',
            DESCRIPTION: 'โค้ว ซุ่น เฮง - ค้าปลีก-ส่ง น้ำมันเครื่อง,ยางนอก,ยางใน,อะไหล่มอเตอร์ไซค์,รถยนต์,รถไถ, ไฟฟ้า, การเกษตร, ประปา สินค้าราคาถูก น่าเชื่อถือ',
            AUTHOR: 'ปัญญา บุญยกุลศรีรุ่ง'
        },
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : 'พิมพ์เพื่อค้นหา และกด enter'
                },
                PRODUCT: 'สินค้า',
                ARTICLE: 'บทความ',
                WEBBOARD: 'เว็บบอร์ด',
                PAYMENT: 'การชำะเงิน',
                DELIVERY: 'การจัดส่งสินค้า',
                PAYMENT_N_DELIVERY: 'ชำระเงิน & จัดส่ง',
                DEFINITION : 'ข้อกำหนด',
                CUSTOMER: 'การสั่งซื้อของลูกค้า',
                ABOUT: 'เกี่ยวกับเรา',
                CONTACT: 'ติดต่อเรา',
                ACCOUNT: 'ตั้งค่าบัญชี',
                HISTORY: 'ประวัติการซื้อ',
                GENERAL: 'ตั้งค่าทั่วไป',
                LOGOUT: 'ออกจากระบบ'
            },
            SIGNIN: 'เข้าสู่ระบบ',
            SIGNOUT: 'ออกจากระบบ',
            MODAL_SIGNIN: {
                HEAD: 'เข้าสู่ระบบ/ลงทะเบียน',
                LABEL_USERNAME: 'รหัสผู้ใช้',
                PLACEHOLDER_USERNAME: 'อีเมล',
                LABEL_PASSWORD: 'รหัสผ่าน',
                PLACEHOLDER_PASSWORD: 'รหัสผ่าน',
                FORGET_PASSWORD : 'ลืมรหัสผ่าน',
                REMEMBER_ME : 'จดจำฉันไว้',
                REMEMBER_ME_REASON : '(ถ้านี่เป็นคอมพิวเตอร์ส่วนตัว)',
                TAB_SIGNUP: 'ลงทะเบียน',
                BUTTON_SIGNIN: 'เข้าสู่ระบบ',
                FACEBOOK_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Facebook',
                TWITTER_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Twitter',
                LINKEDIN_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Linkedin',
                GOOGLE_PLUS_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Google+',
                INSTAGRAM_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Instagram',
                GITHUB_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Github',
                DROPBOX_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Dropbox',
                FOURSQUARE_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Foursquare',
                SOUNDCLOUD_SIGNIN: 'เข้าสู่ระบบด้วยบัญชี Soundcloud',
                FIRST_NAME : "ชื่อ",
                LAST_NAME : "นามสกุล",
                EMAIL : "อีเมล",
                USERNAME : "ชื่อผู้ใช้",
                PASSWORD : "รหัสผ่าน",
                STRENGTH : "ความซับซ้อน",
                RECAPTCHA : "ตรวจสอบว่าท่านไม่ใช่หุ่นยนต์",
                BUTTON_SIGNUP : "ลงทะเบียน",
                TERM_SERVICE_LABEL : 'ฉันยอมรับ',
                TERM_SERVICE : 'ข้อตกลง'
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
                SUMWEIGHT:'รวมน้ำหนัก',
                WEIGHT_UOM:'กรัม',
                SUMWEIGHTAMT:'ค่าจัดส่ง',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- เลือกชนิดการส่งไปรษณีย์ ---',
                    NORMAL: 'ไปรษณีย์ธรรมดา',
                    EMS: 'ไปรษณีย์ด่วนพิเศษ'
                },
                WARN_EMS : '*** น้ำหนัก EMS เกิน 20kg ***',
                NETAMT: 'ยอดสุทธิ',
                SHOP_BUTTON: 'ดูสินค้า',
                SAVE_BUTTON: 'บันทึกตะกร้า',
                CLEAR_BUTTON: 'ล้างตะกร้า',
                CHECKOUT_BUTTON: 'ดำเนินการต่อ',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : 'ลืมรหัสผ่าน ?',
                TEXT: 'ท่านสามารถเปลี่ยนรหัสผ่านโดยกรอกอีเมล',
                EMAIL_PHD : 'อีเมล',
                SEND_EMAIL_BUTTON : 'ส่งอีเมล'
            },
            MODAL_INPUT_PASSWORD : {
                TITLE : 'เปลี่ยนรหัสผ่าน ?',
                TEXT: '',
                PASSWORD : 'รหัสผ่าน',
                CONFIRM_PASSWORD : 'ยืนยันรหัสผ่าน',
                CHANGE_PASSWORD_BUTTON : 'เปลี่ยนรหัสผ่าน'
            },
            WELCOME: 'ยินดีต้อนรับ'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'สีสเปรย์คุณภาพดีเยี่ยม',
                    TEXT : 'สีเปรย์ที่เหมาะกับชิ้นงานที่ต้องการ',
                },
                TWO : {
                    TITLE : 'แบตเตอรี่มอเตอร์ไซค์',
                    TEXT : 'ทั้งยี่ห้อที่มีคุณภาพและปานกลาง GS 3K หรือ GMAX',
                },
                THREE : {
                    TITLE : 'สีสเปรย์',
                    TEXT : 'สีสเปรย์ที่ราคาสมเหตุสมผล แต่คุณภาพเกินราคา',
                },
                FOUR : {
                    TITLE : 'ยางนอกจักรยาน ยางไทยแท้',
                    TEXT : 'ด้วยคุณภาพของเนื้อยางและมีความยืดหยุ่นสูง',
                },
                FIVE : {
                    TITLE : 'ยางนอกมอเตอร์ไซค์ยี่ห้อ CAMEL และ VEERUBBER',
                    TEXT : 'ยี่ห้อที่อยู่คู่ชาวไทยมานาน ยอดขายติดอันดับยอดนิยม',
                },
                SIX : {
                    TITLE : 'ยางนอกมอเตอร์ไซค์ยี่ห้อ CAMEL และ VEERUBBER',
                    TEXT : 'ยี่ห้อที่อยู่คู่ชาวไทยมานาน ยอดขายติดอันดับยอดนิยม',
                },
                SEVEN : {
                    TITLE : 'ซีลวด YAGUSO',
                    TEXT : 'ทำให้การขับขี่ไม่สะดุด วงล้อมอเตอร์ไซค์มีเสถียรภาพ',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: 'จำนวน',
                    PRICE: 'ราคา',
                    WEIGHT: 'น้ำหนัก',
                    WEIGHT_UOM: 'กรัม',
                    LIKE: 'ชอบ',
                    BUY: 'ซื้อ',
                    DETAIL: 'รายละเอียด',
                    LABEL_NEW: 'ใหม่',
                    LABEL_HOT: 'ขายดี !!',
                    LABEL_SALE: 'ลด',
                },
                WEBBOARD: {
                    HEAD: "เว็บบอร์ด",
                },
                PAYMENT: {
                    HEAD: "การชำระเงินและการจัดส่ง",
                    PAYMENT_TITLE : 'การจัดส่งและการสั่งซื้อ',
                    PAYMENT_CHART : 'แผนผังการสั่งซื้อสินค้า',
                    PAYMENT_STEP : 'ขั้นตอนการสั่งซื้อสินค้า',
                    PAYMENT_RETURN : 'การคืนสินค้า',

                    STEP_01 : '1. เมื่อเข้าสู่เว็ปไซต์ http://kzh-parts.com ท่านสามารถกดที่ปุ่ม “เข้าสู่ระบบ” ดังภาพด้านล่าง',
                    STEP_02 : '2. หน้าต่างการเข้าสู่ระบบ/ลงทะเบียน ถ้าท่านยังไม่มีบัญชีเข้าระบบ ที่ส่วนด้านขวาท่านสามารถลงทะเบียนได้ หรือท่านสามารถเข้าสู่ระบบได้ถ้าท่านมีบัญชีอยู่แล้ว หรือสามารถเข้าสู่ระบบด้วยบัญชีโซเชียลอื่นๆ ได้',
                    STEP_03 : '3. ใส่รายละเอียด อีเมลล์ ชื่อผู้ใช้ รหัสผ่าน ของท่าน ตรวจสอบตัวตนและยอมรับข้อตกลง แล้วกดปุ่ม “ลงทะเบียน”', 
                    STEP_04 : '4. รอระบบประมวลผล เมื่อสำเร็จระบบจะแจ้งการลงทะเบียนสำเร็จแล้ว ดังภาพด้านล่าง แต่ท่านยังไม่สามารถเข้าสู่ระบบได้ เนื่องจากท่านต้องยืนยันบัญชีของท่านผ่านทางอีเมลของท่านก่อน',
                    STEP_05 : '5. ท่านจะได้รับอีเมลจากระบบแจ้งการยืนยันการลงทะเบียน',
                    STEP_06 : '6. กดปุ่ม ยืนยันการลงทะเบียน เพื่อเปิดใช้งานบัญชีของท่าน',
                    STEP_07 : '7. ระบบจะกลับมาหน้าเว็บไซต์ ถ้าสำเร็จระบบจะแจ้งข้อความดังภาพ',
                    STEP_08 : '8. การสั่งซื้อสินค้าให้ท่านใส่จำนวนสินค้าที่ต้องการดังภาพด้านล่าง จากนั้นกดที่ “ซื้อ”',
                    STEP_09 : '9. ในตะกร้าสินค้าของท่าน จะมีรายการเพิ่มขึ้นมา 1 รายการ',
                    STEP_10 : '10. เมื่อกดปุ่ม “ตะกร้า” ระบบจะแสดงรายละเอียดสินค้าที่ท่านต้องการสั่งซื้อ ซึ่งขั้นตอนนี้ระบบจะกำหนดการขนส่งไปรษณีย์แบบธรรมดาให้ท่าน ซึ่งท่านสามารถเปลี่ยนการจัดส่งเป็น EMS ได้ จากนั้นท่านสามารถดำเนินการต่อดังนี้',
                    STEP_10_1: '10.1 ดูสินค้า เพื่อเลือกสินค้าใส่ ตะกร้าต่อ',
                    STEP_10_2: '10.2 ล้างตะกร้า เพื่อลบรายการสินค้าในตะกร้าทั้งหมด',
                    STEP_10_3: '10.3 ดำเนินการต่อ เพื่อเข้าสู่ขั้นตอนการจัดส่งและชำระเงิน',
                    STEP_11 : '11. ถ้าหากท่านยังไม่ได้เข้าสู่ระบบ ระบบจะให้ท่านเข้าระบบก่อน',
                    STEP_12 : '12. ใส่รายละเอียดของท่านและที่อยู่การจัดส่งสินค้า เมื่อเสร็จเรียบร้อยกดปุ่ม “ขั้นตอนต่อไป”',
                    STEP_13 : '13. จะมาที่การชำระสินค้าโดยระบบให้ท่านเลือกช่องทาง ',
                    STEP_14 : '14. รอระบบประมวลผลคำสั่งซื้อ',
                    STEP_15 : '15. ระบบแสดงข้อความ เมื่อสร้างรายการสั่งซื้อสำเร็จ',
                    STEP_16 : '16. ท่านได้รับอีเมลจากระบบแจ้งยืนยันรายการสั่งซื้อสินค้าของท่าน',
                    STEP_17 : '17. เลือก เมนูประวัติการสั่งซื้อ เพื่อตรวจสอบและติดตามสถานะการสั่งซื้อ',
                    STEP_18 : '18. เมื่อท่านชำระสินค้าเรียบร้อย กดที่ปุ่มสีเขียว',
                    STEP_19 : '19. ระบบแสดงรายการสั่งซื้อย้อนหลัง จากนั้นเลือกรายการ ”อัพโหลดเอกสารชำระเงิน”',
                    STEP_20 : '20. จากนั้นทีมงานตรวจสอบรายการชำระเงิน และตอบกลับอีเมลไปให้ท่าน',
                    WEIGHT_RATE: 'อัตราน้ำหนัก',
                    POST_NORMAL: 'ไปรษณีย์ธรรมดา',
                    POST_EMS: 'ไปรษณีย์ EMS',
                    TABLE_HEAD_WEIGHT: 'น้ำหนัก（g）',
                    TABLE_HEAD_RATE: 'อัตรา',
                    RETURN_CONDITION : {
                        COND_01 : '1. สินค้าต้องอยู่ในสภาพสมบูรณ์ ไม่มีการแกะฉีก แกะ หรือ ตัดห่อวัสดุ ออก',
                        COND_02 : '2. '
                    }
                },
                ABOUT: {
                    HEAD: "เกี่ยวกับเรา",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: 'ลูกค้า',
                            SUB_TITLE: 'หนึ่งในความสำคัญของร้าน',
                            MESSAGE: 'ลูกค้ามีส่วนสำคัญที่จะทำให้ร้านสามารถก้าวไปต่อได้ '
                        },
                        CONTENT_2: {
                            TITLE: 'สินค้า',
                            SUB_TITLE: 'จำหน่ายทั้งยี่ห้อที่มีคุณภาพและตามที่ลูกค้าพึงพอใจ',
                            MESSAGE: 'ทั้งสินค้า อะไหล่มอเตอร์ไซค์ น้ำมันเครื่อง ยางนอก-ยางใน ทั้งสินค้าที่ได้รับการยอมรับแพร่หลาย หรือสินค้าคุณภาพทางเลือก'
                        },
                        CONTENT_3: {
                            TITLE: 'การบริการ',
                            SUB_TITLE: 'อีกหนึ่งในความสำคัญของร้าน',
                            MESSAGE: 'ให้บริการลูกค้าด้วยใจที่ทุ่มเทและความซื่อสัตย์ ตลอดไปจนถึงแนะนำสินค้าให้กับลูกค้า'
                        },
                        CONTENT_4: {
                            TITLE: 'มุมมอง',
                            SUB_TITLE: 'ความพยายามเปิดตลาดภายนอก',
                            MESSAGE: 'ในปัจจุบันเทคโนโลยีไปเร็วมาก ทางร้านเล็งเห็นความสำคัญในการเปิดตลาดภายนอก เพื่อเพิ่มศักยภาพกับทางร้านให้มากขึ้น เพื่อรองรับกับลูกค้ารายใหม่ๆและโลกที่หมุนเร็วขึ้น...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: "ติดต่อเรา",
                    OFFICE: 'สำนักงานของเรา',
                    FEEDBACK:{
                        NAME :'ชื่อ',
                        NAME_PHD : 'ชื่อ',
                        EMAIL : 'อีเมล',
                        EMAIL_PHD : 'อีเมล',
                        SUBJECT: 'หัวข้อ',
                        SELECT_SUBJECT: '--- เลือก หัวข้อ ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: 'การใช้งานทั่วไป',
                            PRODUCT_INQUIRY: 'สอบถามสินค้า',
                            PROBLEM_OCCUR: 'เกิดปัญหาระหว่างใช้งาน',
                            SHIPMENT_PROCESS: 'การขนส่ง',
                            PAYMENT_PROCESS: 'การชำระเงิน',
                            SUGGESTIONS: 'ข้อเสนอแนะ'
                        },
                        MESSAGE : 'รายละเอียด',
                        MESSAGE_PHD : 'รายละเอียด',
                        SEND_MESSAGE:'ส่งข้อความ'
                    } 
                },
                GOOGLE_MAP: {
                    HEAD: "แผนที่",
                    ADDRESS1: '30-32 หมู่. 2 ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'ระแงง',
                    DISTRICT: 'ศีขรภูมิ',
                    PROVINCE: 'สุรินทร์',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST: {
                    HEAD : "ไปรษณีย์"
                },
                SHIPMENT: {
                    HEAD : "การขนส่ง",
                    BILLING : {
                        STEP : 'ที่อยู่จัดส่งสินค้า',
                        BILL_STEP : 'ที่อยู่จัดส่งสินค้า',
                        BILL_NAME: 'ชื่อ',
                        BILL_LASTNAME: 'นามสกุล',
                        BILL_EMAIL: 'อีเมล',
                        BILL_ADDRESS: 'ที่อยู่',
                        BILL_PROVINCE: 'จังหวัด',
                        BILL_SELECT_PROVINCE: '--- เลือก จังหวัด ---',
                        BILL_DISTRICT: 'เขต/อำเภอ ',
                        BILL_SELECT_DISTRICT: '--- เลือก เขต/อำเภอ ---',
                        BILL_SUBDISTRICT: 'แขวง/ตำบล ',
                        BILL_SELECT_SUBDISTRICT: '--- เลือก แขวง/ตำบล ---',
                        BILL_ZIPCODE: 'รหัสไปรษณีย์ ',
                        BILL_SELECT_ZIPCODE: '--- เลือก ไปรษณีย์ ---',
                        TEL_NO: 'โทรศัพท์',
                        MOBILE_NO: 'มือถือ',
                        TEL_NO_EX: 'เช่น ถ้าเบอร์โทรท่าน 02-999-9999 ให้ใส่ 029999999',
                        MOBILE_NO_EX: 'เช่น ถ้าเบอร์โทรท่าน 088-999-9999 ให้ใส่ 0889999999',

                        SAME_ADDRESS : "ที่อยู่เดียวกับที่จัดส่ง",
        
                        RO_STEP : 'ที่อยู่ที่แสดงในใบเสร็จ ',
                        RO_NAME: 'ชื่อ ',
                        RO_ADDRESS: 'ที่อยู่',
                        RO_PROVINCE: 'จังหวัด',
                        RO_SELECT_PROVINCE: '--- เลือก จังหวัด ---',
                        RO_DISTRICT: 'เขต/อำเภอ',
                        RO_SELECT_DISTRICT: '--- เลือก เขต/อำเภอ ---',
                        RO_SUBDISTRICT: 'แขวง/ตำบล',
                        RO_SELECT_SUBDISTRICT: '--- เลือก แขวง/ตำบล ---',
                        RO_ZIPCODE: 'รหัสไปรษณีย์',
                        RO_SELECT_ZIPCODE: '--- เลือก ไปรษณีย์ ---',

                        BUTTON_NEXT: 'ขั้นตอนต่อไป'
                    },
                    PAYMENT: {
                        STEP : 'การจ่ายเงิน',
                        PAYMENT_TYPE: 'ประเภทของการชำระเงิน',
                        SELECT_PAYMENT_TYPE: '--- เลือก ประเภทของการชำระเงิน ---',
                        TRANSFER: 'โอนเงิน',
                        BBL : {
                            NAME : 'ธ. กรุงเทพ',
                            ACCOUNT_NO : '406-0-74796-3',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สาขา ศีขรภูมิ'
                        },
                        KBANK : {
                            NAME : 'ธ. กสิกรไทย',
                            ACCOUNT_NO : '003-1-71056-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สำนักงานย่อย ศีขรภูมิ'
                        },
                        KTB : {
                            NAME : 'ธ. กรุงไทย',
                            ACCOUNT_NO : '331-0-38978-2',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'สาขา ศีขรภูมิ'
                        },
                        SCB : {
                            NAME : 'ธ. ไทยพาณิชย์',
                            ACCOUNT_NO : '406-749912-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'โรบินสัน สุรินทร์'
                        },
                        KCC : {
                            NAME : 'ธ. กรุงศรี',
                            ACCOUNT_NO : '721-1-02954-1',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'โรบินสัน สุรินทร์'
                        },
                        TMB : {
                            NAME : 'ธ. ทีเอ็มบี',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        UOB : {
                            NAME : 'ธ. ยูโอบี',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        TNC : {
                            NAME : 'ธ. ธนชาต',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'นาย ปัญญา บุญยกุลศรีรุ่ง',
                            ACCOUNT_TYPE : 'ออมทรัพย์',
                            ACCOUNT_BRANCH : 'เมืองสุรินทร์'
                        },
                        PAYPAL : 'เพย์พอล',
                        CREDIT: 'เครดิตการ์ด',
                        BUTTON_NEXT: 'ขั้นตอนต่อไป'
                    },
                    FINISH : {
                        STEP : 'สิ้นสุด',
                        BUTTON : 'กดเพื่อสิ้นสุด',
                        PROCESSING: 'ระบบกำลังประมวลผลคำสั่งซื้อของท่าน กรุณารอสักครู่',
                        THANK_MESSAGE: 'ขอบคุณสำหรับคำสั่งซื้อของท่าน ☺'
                    }
                },
                SETTING: {
                    BUTTON : {
                        NEW : "เพิ่ม",
                        SAVE : "บันทึก",
                        DELETE : "ลบ",
                        CANCEL : "ยกเลิก",
                        SEARCH : "ค้นหา"
                    },
                    PRODUCT_TYPE :{
                        TAB : "ชนิดสินค้า",
                        PRODUCT_TYPE_CODE : "รหัสชนิดสินค้า",
                        PRODUCT_TYPE_NAME_TH : "ชื่อชนิดสินค้า (ไทย)",
                        PRODUCT_TYPE_NAME_EN : "ชื่อชนิดสินค้า (อังกฤษ)",
                        PRODUCT_TYPE_NAME_CN : "ชื่อชนิดสินค้า (จีน)",
                        UPDATE_BY : "อัพเดทโดย",
                        UPDATE_DATE : "วันที่อัพเดท",
                        CREATE_BY : "สร้างโดย",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "เงื่อนไขการค้นหาชนิดสินค้า",
                        PRODUCT_TYPE_CODE_LABEL : "รหัสชนิดสินค้า",
                        PRODUCT_TYPE_NAME_LABEL : "ชื่อชนิดสินค้า",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "ประเภทสินค้า",
                        PRODUCT_CATEGORY_CODE : "รหัสประเภทสินค้า",
                        PRODUCT_CATEGORY_NAME_TH : "ชื่อประเภทสินค้า (ไทย)",
                        PRODUCT_CATEGORY_NAME_EN : "ชื่อประเภทสินค้า (อังกฤษ)",
                        PRODUCT_CATEGORY_NAME_CN : "ชื่อประเภทสินค้า (จีน)",
                        PRODUCT_TYPE : "ชนิดสินค้า ",
                        UPDATE_BY : "อัพเดทโดย ",
                        UPDATE_DATE : "วันที่อัพเดท ",
                        CREATE_BY : "สร้างโดย ",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "เงื่อนไขการค้นหาประเภทสินค้า",
                        PRODUCT_CATEGORY_CODE_LABEL : "รหัสประเภทสินค้า",
                        PRODUCT_CATEGORY_NAME_LABEL : "ชื่อประเภทสินค้า",
                        PRODUCT_TYPE_LABEL : "ชนิดสินค้า"
                    },
                    PRODUCT : {
                        TAB : "สินค้า",
                        PRODUCT_CODE : "รหัสสินค้า",
                        IS_GEN_CODE : "สร้างรหัสอัตโนมัติ",
                        PRODUCT_NAME_TH : "ชื่อสินค้า (ไทย)",
                        PRODUCT_NAME_EN : "ชื่อสินค้า (อังกฤษ)",
                        PRODUCT_NAME_CN : "ชื่อสินค้า (จีน)",
                        PRODUCT_CATEGORY : "ประเภทสินค้า",
                        COST_PRICE : "ราคา ต้นทุน",
                        RETAIL_PRICE : "ราคา ขายปลีก",
                        WHOLESALE_PRICE : "ราคา ขายส่ง",
                        WEIGHT : "น้ำหนัก",
                        CONTAIN_WEIGHT : "น้ำหนัก/บรรจุ",
                        UOM : "หน่วย",
                        CONTAIN_UOM : "หน่วยบรรจุ",
                        CONTAIN_QUANTITY : "จำนวน/บรรจุ",
                        CONTAIN_COST_PRICE : "ราคาต้นทุน/บรรจุ",
                        CONTAIN_WHOLESALE_PRICE : "ราคาขายส่ง/บรรจุ",
                        IS_HOT : "ร้อนแรง ?!!",
                        IS_DEACTIVE : "เลิกใช้งาน",
                        IMAGE : "รูปภาพ",
                        IMAGE_THUMBNAIL : "แสดงรูปภาพ",
                        UPDATE_BY : "อัพเดทโดย",
                        UPDATE_DATE : "วันที่อัพเดท",
                        CREATE_BY : "สร้างโดย",
                        CREATE_DATE : "วันที่สร้าง",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "เงื่อนไขการค้นหาสินค้า",
                        PRODUCT_CODE_LABEL : "รหัสสินค้า",
                        PRODUCT_NAME_LABEL : "ชื่อสินค้า",
                        PRODUCT_CATEGORY_LABEL : "ประเภทสินค้า"
                    },
                    PROMOTION : {
                        TAB : "โปรโมชั่น",
                        
                        PROMOTION_CODE : "รหัสโปรโมชั่น",
                        PROMOTION_NAME_TH : "ชื่อโปรโมชั่น (ไทย)",
                        PROMOTION_NAME_EN : "ชื่อโปรโมชั่น (อังกฤษ)",
                        PROMOTION_NAME_CN : "ชื่อโปรโมชั่น (จีน)",
                        IS_ACTIVE : "ใช้งาน ?",
                        IS_EXPIRE : "หมดอายุ ?",
                        START_DATE : "วันที่เริ่ม",
                        END_DATE : "วันที่สิ้นสุด",
                        DISCOUNT_PERCENT : "ส่วนลด %",

                        SEARCH_PROMOTION_CRITERIA_LABEL : "เงื่อนไขการค้นหาโปรโมชั่น",
                        PROMOTION_CODE_LABEL : "รหัสโปรโมชั่น :",
                        PROMOTION_DATE_LABEL : "วันที่สร้างโปรโมชั่น :",
                        PROMOTION_NAME_LABEL : "ชื่อโปรโมชั่น :",
                        IS_ACTIVE_LABEL : "ใช้งาน ? :",
                        START_DATE_LABEL : "วันที่เริ่ม :",
                        END_DATE_LABEL : "วันที่สิ้นสุด :",

                        SEARCH_PRODUCT : 'ค้นหาสินค้า',
                        ADD_PRODUCT_BUTTON : 'เพิ่มหาสินค้า'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "ชนิดลูกค้า",
                        CUSTOMER_TYPE_CODE : "รหัสชนิดลูกค้า",
                        CUSTOMER_TYPE_NAME_TH : "ชื่อชนิดลูกค้า (ไทย)",
                        CUSTOMER_TYPE_NAME_EN : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_CUSTOMER_TYPE_CRITERIA_LABEL : "เงื่อนไขการค้นหาชนิดลูกค้า",
                        CUSTOMER_TYPE_CODE_LABEL : "รหัสชนิดลูกค้า :",
                        CUSTOMER_TYPE_NAME_LABEL : "ชื่อชนิดลูกค้า :"
                    },
                    CUSTOMER : {
                        TAB : "ลูกค้า",
                        CUSTOMER_CODE : "รหัสลูกค้า",
                        FIRST_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        LAST_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        KNOWN_NAME : "ชื่อชนิดลูกค้า (อังกฤษ)",
                        TEL_NO : "โทรศัพท์",
                        FAX_NO : "โทรสาร",
                        MOBILE_NO : "มือถือ",
                        EMAIL : "อีเมล",
                        DESCRIPTION : "คำอธิบาย", 
                        CUSTOMER_TYPE : "ชนิดลูกค้า",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_CUSTOMER_CRITERIA_LABEL : "เงื่อนไขการค้นหาลูกค้า",
                        CUSTOMER_CODE_LABEL : "รหัสลูกค้า :",
                        CUSTOMER_NAME_LABEL : "ชื่อลูกค้า :",
                        CUSTOMER_TYPE_LABEL : "ชนิดลูกค้า :"
                    },
                    STAFF : {
                        TAB : "พนักงาน",
                        STAFF_CODE : "รหัสพนักงาน",
                        FIRST_NAME : "ชื่อ",
                        LAST_NAME : "นามสกุล",
                        NICK_NAME : "ชื่อเล่น",
                        AGE : "อายุ",
                        SEX : "เพศ",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_STAFF_CRITERIA_LABEL : "เงื่อนไขการค้นหาพนักงาน",
                        STAFF_CODE_LABEL : "รหัสลูกค้า :",
                        STAFF_NAME_LABEL : "ชื่อลูกค้า :"
                    },
                    ROLE : {
                        TAB : "ตำแหน่ง",
                        ROLE_CODE : "รหัสตำแหน่ง :",
                        ROLE_NAME_TH : "ชื่อตำแหน่ง (ไทย) :" ,
                        ROLE_NAME_EN : "ชื่อตำแหน่ง (อังกฤษ) :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_ROLE_CRITERIA_LABEL : "เงื่อนไขการค้นหาบทบาท",
                        ROLE_CODE_LABEL : "รหัสบทบาท :",
                        ROLE_NAME_LABEL : "ชื่อบทบาท :"
                    },
                    UOM : {
                        TAB : "หน่วย",
                        UOM_CODE : "รหัสหน่วย :",
                        UOM_NAME_TH : "ชื่อหน่วย (ไทย) :" ,
                        UOM_NAME_EN : "ชื่อหน่วย (อังกฤษ) :",
                        UOM_NAME_CN : "ชื่อหน่วย (จีน) :",
                        IS_CONTAINER : "หน่วยบรรจุ :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",

                        SEARCH_UOM_CRITERIA_LABEL : "เงื่อนไขการค้นหาหน่วย",
                        UOM_CODE_LABEL : "รหัสหน่วย :",
                        UOM_NAME_LABEL : "ชื่อหน่วย :",
                        IS_CONTAINER_LABEL : "บรรจุ :"
                    },
                    RECEIPT_ORDER : {
                        TAB : "ใบเสร็จ",
                        RO_NO : "รหัสใบเสร็จ",
                        RO_DATE : "วันที่ใบเสร็จ",
                        RO_TIME : "เวลาใบเสร็จ"
                    },
                    SUPPLIER : {
                        TAB : "ผู้ขาย",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "ผู้ใช้ระบบ",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    HEAD : "รายละเอียดผู้ใช้ระบบ",
                    BUTTON : {
                        CANCEL : "ยกเลิก",
                        SAVE : "บันทึก"
                    },
                    
                    FIRST_NAME : "ชื่อ :",
                    LAST_NAME : "นามสกุล :",
                    EMAIL : "อีเมล :",
                    USERNAME : "รหัสผู้ใช้ :",
                    PASSWORD : "รหัสผ่าน :",
                    PROFILE_IMAGE : "รูปภาพ :",
                    DROP_FILE : "ดร็อปเอกสาร :",
                    DROP_IMAGE_PDF : "ดร็อปรูปภาพ หรือ เอกสาร",
                    IMAGE_THUMBNAIL : "แสดงรูปภาพ :"
                },
                HISTORY : {
                    HEAD : "ประวัติการสั่งซื้อ",
                    BUTTON: {
                        SEARCH : "ค้นหา"
                    },
                    FROM: "จาก :",
                    TO: "ถึง :",
                    PAYMENT_STATUS: "สถานะการจ่ายเงิน :",
                    SHIPPING_STATUS: "สถานะการขนส่ง :",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "ค้นหา"
                    },
                    HEAD : "ใบสั่งซื้อลูกค้า :",
                    RO_NO : "เลขที่ใบเสร็จ :",
                    RO_NO_PLACEHOLDER : "เลขที่ใบเสร็จ",
                    CUSTOMER : "ลูกค้า :",
                    CUSTOMER_PLACEHOLDER : "ลูกค้า",
                    FROM : "วันที่เริ่ม :",
                    FROM_PLACEHOLDER : "วันที่เริ่ม",
                    TO : "วันที่สิ้นสุด :",
                    TO_PLACEHOLDER : "วันที่สิ้นสุด",
                    PAYMENT_STATUS : "สถานะการชำระเงิน :",
                    PAYMENT_PLACEHOLDER : "สถานะการชำระเงิน",
                    SHIPPING_STATUS : "สถานะการส่งสินค้า :",
                    SHIPPING_PLACEHOLDER : "สถานะการส่งสินค้า",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : 'วันที่',
                    RO_NO : 'เลขที่ใบเสร็จ',
                    RO_LABEL : 'ใบสั่งซื้อสินค้า',
                    IMAGE_PAYMENT_DOCUMENT : 'รูปเอกสารการชำระเงิน',
                    UPLOAD_BUTTON : 'อัพโหลดเอกสารการชำระเงิน',
                    APPROVE_BUTTON : 'อนุมัติ',
                    REJECT_BUTTON : 'ปฏิเสธ',
                    SHIPPED_BUTTON : 'ส่งสินค้า'
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
                REMARK : 'น้ำมันหล่อลื่นคุณภาพดี ซึ่งมีจำหน่ายหลากหลายยี่ห้อ'
            },
            BATTERY : {
                HEAD : 'แบตเตอรี่',
                REMARK : 'ทั้งมอเตอร์ไซค์ และรถยนต์ ทำให้การขับขี่ไม่สะดุด'
            },
            BRAKE : {
                HEAD : 'ระบบเบรค',
                REMARK : 'ทำให้เชื่อมั่นในการขับขี่ยานพาหนะ ไม่ว่าสถานการณ์ไหน'
            },
            SHOCK : {
                HEAD : 'โช๊คอัพ',
                REMARK : 'ช่วงล่างที่แน่นรู้สึกสบายและมั่นใจในยามขับขี่'
            },
            WRENCH : {
                HEAD : 'เครื่องมือ',
                REMARK : 'ตอบโจทย์ปัญหาของช่างทุกคน'
            },
            COPY_RIGHT : 'สงวนลิขสิทธิ์ 2016 KZHParts ประเทศไทย',
            CONTACT_US : 'ติดต่อ ทีม KZHParts ได้ที่นี่',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : 'สามารถโหลดแอพพลิเคชั่นผ่านมือถือที่ แอพสโตร์ และ เพลสโตร์',
            COMING_SOON : 'เร็วๆนี้...'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS_DEFAULT : "สำเร็จ",
            TITLE_WARNING_DEFAULT : "คำเตือน",
            TITLE_ERROR_DEFAULT : "ข้อผิดพลาด",
            LOGIN :{
                SUCCESS : ''
            },
            HEAD : {
                LOG_IN : {
                    PRE_TITLE_SUCCESS : ''
                },
                LOG_OUT : {

                },
                FORGET_PASSWORD : {

                },
                ADD_CART : {

                }
            },
            BODY: {
                UPDATE_CART_BUY_QTY : "จำนวนต้องเป็นตัวเลข หรือ มากกว่า 0"
            }
        },
        PAGE404 : {
            TITLE : 'ไม่พบหน้าที่ท่านต้องการ :(',
            SUBTITLE_1 : 'ขออภัย, แต่ระบบไม่พบหน้าที่ท่านพยายามเรียก',
            SUBTITLE_2 : 'ดูเหมือนอาจจะเป็นสาเหตุมาจาก',
            CONTENT_1 : '1. ที่อยู่ที่ผิดพลาด',
            CONTENT_2 : '2. ลิงค์หมดอายุไปแล้ว',
            CLOSE_BUTTON : 'ปิดหน้านี้'
        }
    });
    $translateProvider.translations('us', {
        TITLE: {
            NAME: 'Koh Zhun Heng - Center of Motorcycle Parts Tyre and Lubricant',
            KEYWORD: 'Lubricant, Motorcycle Inner Tyre, Motorcycle Outer Tyre,Motorcycle-Parts, Car-Parts, Tractor-Parts, Electricity ,Agriculture, Water, Reasonable Price, Reliable',
            DESCRIPTION: 'Lubricant, Motorcycle Inner Tyre, Motorcycle Outer Tyre, Motorcycle-Parts, Car-Parts, Tractor-Parts, Electricity, Agriculture, Water, Reasonable Price, Reliable',
            AUTHOR: 'Panya Boonyakulsrirung'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS : "Success",
            TITLE_WARNING : "Warning",
            TITLE_ERROR : "Error",
            HEAD : {

            },
            CONTENT: {
                UPDATE_CART_BUY_QTY : "Must input quantity as a number or more than 0"
            }
        },
       
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : "Type for search and press enter"
                },
                PRODUCT: 'Product',
                ARTICLE: 'Article',
                WEBBOARD: 'Webboard',
                PAYMENT: 'Payment',
                DELIVERY: 'Delivery',
                PAYMENT_N_DELIVERY: 'Payment & Delivery',
                DEFINITION : 'Definition',
                ABOUT: 'About us',
                CONTACT : 'Contact us',
                CUSTOMER: 'Customer Order',
                ACCOUNT: 'Account Setting',
                HISTORY: 'Purchase History',
                GENERAL: 'General Setting',
                LOGOUT: 'Logout'
            },
            SIGNIN: 'Log in',
            SIGNOUT: 'Log out',
            MODAL_SIGNIN: {
                HEAD: 'Sign in/Sign up',
                LABEL_USERNAME: 'Username',
                LABEL_PASSWORD: 'Password',
                BUTTON_SIGNIN : 'Log in',
                TAB_SIGNUP: 'Sign up',
                FORGET_PASSWORD : 'Forget Password',
                REMEMBER_ME : 'Remember Me',
                REMEMBER_ME_REASON : '(If this is a private computer)',
                FACEBOOK_SIGNIN: 'Sign in with Facebook',
                TWITTER_SIGNIN: 'Sign in with Twitter',
                GOOGLE_PLUS_SIGNIN: 'Sign in with Google+',
                LINKEDIN_SIGNIN: 'Sign in with Linkedin',
                INSTAGRAM_SIGNIN: 'Sign in with Instagram',
                GITHUB_SIGNIN: 'Sign in with Github',
                DROPBOX_SIGNIN: 'Sign in with Github',
                YOUTUBE_SIGNIN: 'Sign in with Youtube',
                EVERNOTE_SIGNIN: 'Sign in with Evernote',
                FOURSQUARE_SIGNIN: 'Sign in with Foursquare',
                SOUNDCLOUD_SIGNIN: 'Sign in with Soundcloud',
                FIRST_NAME : "Firstname",
                LAST_NAME : "Lastname",
                EMAIL : "Email",
                USERNAME : "Username",
                PASSWORD : "Password",
                STRENGTH : "Password Strength",
                RECAPTCHA : "Recaptcha",
                BUTTON_SIGNUP : "Sign up",
                TERM_SERVICE_LABEL : 'I agree of your',
                TERM_SERVICE : 'Term of Services'
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
                SUMWEIGHTAMT:'Shipping Amount',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- Select Mail Delivery ---',
                    NORMAL: 'Normal',
                    EMS: 'EMS'
                },
                WARN_EMS : '*** EMS weight excess 20kg ***',
                NETAMT: 'Net Amount',
                SHOP_BUTTON: 'Continue Shopping',
                SAVE_BUTTON: 'Save Cart',
                CLEAR_BUTTON: 'Clear Cart',
                CHECKOUT_BUTTON: 'Check out',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : 'Forget Password ?',
                TEXT: 'You can reset your password here.',
                EMAIL_PHD : 'Email Address',
                SEND_EMAIL_BUTTON : 'Send me Email'
            },
            WELCOME: 'Welcome'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'BEELOX - Great Quality of Color Spray',
                    TEXT : 'Suitable with every work',
                },
                TWO : {
                    TITLE : 'Motorcycle Battery',
                    TEXT : 'All quality and normal brand GS 3K GMAX and etc.',
                },
                THREE : {
                    TITLE : 'COMPAC Color Spray',
                    TEXT : 'The reasonble price but high qualtity color spray.',
                },
                FOUR : {
                    TITLE : 'Thai brand outter bicycle tyre',
                    TEXT : 'Rubber quality and high flexibility',
                },
                FIVE : {
                    TITLE : 'With popular brand of outter motorcycle tyre CAMEL and VEERUBBER',
                    TEXT : 'Best price and high quality outter tyre for motorcycle',
                },
                SIX : {
                    TITLE : 'With popular brand of outter motorcycle tyre CAMEL and VEERUBBER',
                    TEXT : 'Best price and high quality outter tyre for motorcycle',
                },
                SEVEN : {
                    TITLE : 'Sprocket YAGUSO',
                    TEXT : 'Make every drive the best',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: 'Qty',
                    PRICE: 'Price',
                    WEIGHT: 'Weight',
                    WEIGHT_UOM: 'g',
                    LIKE: 'Like',
                    BUY: 'Buy',
                    DETAIL: 'Detail',
                    LABEL_NEW: 'N E W',
                    LABEL_HOT: 'Hot !!',
                    LABEL_SALE: 'S A L E',

                },
                WEBBOARD : {
                    HEAD : "Webboard"
                },
                PAYMENT: {
                    HEAD: 'Payment and Delivery',
                    PAYMENT_TITLE : 'Payment and Delivery',
                    PAYMENT_CHART : 'Purchasing order process Chart',
                    PAYMENT_STEP : 'Purchasing order process Step by Step',
                    STEP_01 : '1. Go to website http://kzh-parts.com you can log in to system by pressing “Login” as image below',
                    STEP_02 : '2. The system display Login/Registration dialog. If you don’t have an account, you can input your information on the right side to create your account. If you have system account you can sign in on the left side or even using other social account such as Facebook , Google plus and Twitter etc.',
                    STEP_03 : '3. Input your email, username and password information, verify yourself and accept agreement then click “Register”', 
                    STEP_04 : '4. Wait for system processing after that the system will display success process, but it is almost complete registration which is you can not log in yet. Because of you need to activate your account via email.',
                    STEP_05 : '5. You get an email from system to activate yourself.',
                    STEP_06 : '6. Press button “Activate you account”',
                    STEP_07 : '7. You will back to website if success the system display success registration.',
                    STEP_08 : '8. Purchasing product please input quantity you need then press button “Buy”',
                    STEP_09 : '9. There is additional 1 item in your Cart',
                    STEP_10 : '10. When press button “Cart”, the system display purchasing product information. This step system default normal post type which is you can change post type to EMS later if needed. After that you can continue following step',
                    STEP_10_1: '10.1 Continue shopping.',
                    STEP_10_2: '10.2 Clear Cart to delete all product in cart.',
                    STEP_10_3: '10.3 Check out to go to shipment and payment process.',
                    STEP_11 : '11. If you do not log-in , the system will allow you to log in.',
                    STEP_12 : '12. Input your personal and contactable address information ,then click button “Next Step”',
                    STEP_13 : '13. System allow you to select payment channel.',
                    STEP_14 : '14. Waiting for system processing.',
                    STEP_15 : '15. System display success message for success create purchase order.',
                    STEP_16 : '16. You have got email from system to confirm your purchase order.',
                    STEP_17 : '17. Select menu purchase history to examine and track purchase status.',
                    STEP_18 : '18. When you have already pay for product then click green button.',
                    STEP_19 : '19. System display purchase history detail, then select button "Upload Payment document."',
                    STEP_20 : '20. Then staff determine payment document and respond to customer via email.',
                    WEIGHT_RATE: 'Post of Weight Rate',
                    POST_NORMAL: 'Regular Mail',
                    POST_EMS: 'EMS Mail',
                    TABLE_HEAD_WEIGHT: 'Weight（g）',
                    TABLE_HEAD_RATE: 'Rate'
                },
                ABOUT : {
                    HEAD : "About us",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: 'Customer',
                            SUB_TITLE: 'One of the most important thing for store',
                            MESSAGE: 'Customers are the key to making things can move forward'
                        },
                        CONTENT_2: {
                            TITLE: 'Product',
                            SUB_TITLE: 'All brand and product quality to customer satisfaction',
                            MESSAGE: 'The motorcycle spare parts, lubricant and inner-outer tyres which have been widely accepted or alternative Product'
                        },
                        CONTENT_3: {
                            TITLE: 'Services',
                            SUB_TITLE: 'One of another priorities of the store.',
                            MESSAGE: 'Providing customers with a dedicated and honest mind. Additional, we introduce the product to the customer.'
                        },
                        CONTENT_4: {
                            TITLE: 'Visions',
                            SUB_TITLE: 'To make more store potentiality and Maket Expansion',
                            MESSAGE: 'Nowaday technology goes quickly that we vision the importance of opening external markets. To accommodate the new customers and the world with technology which goes faster ...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: "Contact us",
                    OFFICE: 'Our Office',
                    FEEDBACK:{
                        NAME :'Name',
                        NAME_PHD : 'Input Name',
                        EMAIL : 'Email',
                        EMAIL_PHD : 'Input Email',
                        SUBJECT: 'Subject',
                        SELECT_SUBJECT: '--- Select Subject ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: 'General Usage',
                            PRODUCT_INQUIRY: 'Product Inquiry',
                            PROBLEM_OCCUR: 'Problem occur during usage',
                            SHIPMENT_PROCESS: 'Shipment process',
                            PAYMENT_PROCESS: 'Payment process',
                            SUGGESTIONS: 'Suggestions'
                        },
                        MESSAGE : 'Message',
                        MESSAGE_PHD : 'Message Detail',
                        SEND_MESSAGE:'Send Message'
                    } 
                },
                SHIPMENT: {
                    HEAD : "Shipment",
                    BILLING : {
                        STEP : 'Billing Address',
                        BILL_STEP : 'Billing Address',
                        BILL_NAME: 'First Name',
                        BILL_LASTNAME: 'Last Name',
                        BILL_EMAIL: 'Email',
                        BILL_ADDRESS: 'Address',
                        BILL_PROVINCE: 'Province',
                        BILL_SELECT_PROVINCE: '--- Choose Province ---',
                        BILL_DISTRICT: 'District',
                        BILL_SELECT_DISTRICT: '--- Choose District ---',
                        BILL_SUBDISTRICT: 'Sub-District',
                        BILL_SELECT_SUBDISTRICT: '--- Choose Sub-District ---',
                        BILL_ZIPCODE: 'ZipCode',
                        BILL_SELECT_ZIPCODE: '--- Choose ZipCode ---',
                        TEL_NO: 'Tel No',
                        MOBILE_NO: 'Mobile No',
                        TEL_NO_EX: 'EX. if you tel. no 02-999-9999 please use 029999999',
                        MOBILE_NO_EX: 'EX. if you mobile no 088-999-9999 please use 0889999999',

                        SAME_ADDRESS : "Same as billing address",

                        RO_STEP : 'Receipt Address',
                        RO_NAME: 'Name',
                        RO_ADDRESS: 'Address',
                        RO_PROVINCE: 'Province',
                        RO_SELECT_PROVINCE: '--- Choose Province ---',
                        RO_DISTRICT: 'District',
                        RO_SELECT_DISTRICT: '--- Choose District ---',
                        RO_SUBDISTRICT: 'Sub-District',
                        RO_SELECT_SUBDISTRICT: '--- Choose Sub-District ---',
                        RO_ZIPCODE: 'ZipCode',
                        RO_SELECT_ZIPCODE: '--- Choose ZipCode ---',

                        BUTTON_NEXT: 'Next'
                    },
                    PAYMENT: {
                        STEP : 'Payment',
                        PAYMENT_TYPE: 'Payment Type',
                        SELECT_PAYMENT_TYPE: '--- Choose Payment Type ---',
                        TRANSFER: 'Transfer',
                        BBL : {
                            NAME : 'BANGKOK BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        KBANK : {
                            NAME : 'KASIKORN BANK',
                            ACCOUNT_NO : '003-1-71056-1',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        KTB : {
                            NAME : 'KRUNGTHAI BANK',
                            ACCOUNT_NO : '331-0-38978-2',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SRIKHORAPHUM'
                        },
                        SCB : {
                            NAME : 'SIAM COMMERCIAL BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        KCC : {
                            NAME : 'KRUNGSRI BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        TMB : {
                            NAME : 'TMB BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        UOB : {
                            NAME : 'UOB BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        TNC : {
                            NAME : 'THANACHART BANK',
                            ACCOUNT_NO : '-',
                            ACCOUNT_NAME : 'PANYA BOONYAKULSRIRUNG',
                            ACCOUNT_TYPE : 'SAVING',
                            ACCOUNT_BRANCH : 'SURIN'
                        },
                        PAYPAL : 'Paypal',
                        CREDIT: 'Credit Card',
                        BUTTON_NEXT : 'Next'
                    },
                    FINISH : {
                        STEP : 'Finish',
                        BUTTON_FINISH : 'Click to finish',
                        PROCESSING: 'System is processing your purchase order, please wait a moment',
                        THANK_MESSAGE: 'Thank you for your order. ☺'
                    }
                },
                GOOGLE_MAP: {
                    ADDRESS1: '30-32 Moo. 2 Thepnimit Road ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'Rangang',
                    DISTRICT: 'Srikhoraphum',
                    PROVINCE: 'Surin',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST : {
                    HEAD : "Post"
                },
                SETTING: {
                    BUTTON : {
                        NEW : "New",
                        SAVE : "Save",
                        DELETE : "Delete",
                        CANCEL : "Cancel",
                        SEARCH : "Search"
                    },
                    PRODUCT_TYPE :{
                        TAB : "Product Type",
                        PRODUCT_TYPE_CODE : "Product Type Code",
                        PRODUCT_TYPE_NAME_TH : "Product Type Name (TH)",
                        PRODUCT_TYPE_NAME_EN : "Product Type Name (EN)",
                        PRODUCT_TYPE_NAME_CN : "Product Type Name (CN)",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "Search Product Type Criteria",
                        PRODUCT_TYPE_CODE_LABEL : "Product Type Code",
                        PRODUCT_TYPE_NAME_LABEL : "Product Type Name",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "Product Category",
                        PRODUCT_CATEGORY_CODE : "Product Category Code",
                        PRODUCT_CATEGORY_NAME_TH : "Product Category Name (TH)",
                        PRODUCT_CATEGORY_NAME_EN : "Product Category Name (EN)",
                        PRODUCT_CATEGORY_NAME_CN : "Product Category Name (CN)",
                        PRODUCT_TYPE : "Product Type",

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "Search Product Category Criteria",
                        PRODUCT_CATEGORY_CODE_LABEL : "Product Category Code",
                        PRODUCT_CATEGORY_NAME_LABEL : "Product Category Name",
                        PRODUCT_TYPE_LABEL : "Product Type"
                    },
                    PRODUCT : {
                        TAB : "Product",
                        PRODUCT_CODE : "Product Code",
                        IS_GEN_CODE : "Auto Gen. Code",
                        PRODUCT_NAME_TH : "Product Name (TH)",
                        PRODUCT_NAME_EN : "Product Name (EN)",
                        PRODUCT_NAME_CN : "Product Name (CN)",
                        PRODUCT_CATEGORY : "Product Category",
                        COST_PRICE : "Cost Price",
                        RETAIL_PRICE : "Retail Price",
                        WHOLESALE_PRICE : "Wholesale Price",
                        WEIGHT : "Weight",
                        CONTAIN_WEIGHT : "Contain Weight",
                        UOM : "Uom",
                        CONTAIN_UOM : "Contain Uom",
                        CONTAIN_QUANTITY : "Contain Qty.",
                        CONTAIN_COST_PRICE : "Contain Cost Price",
                        CONTAIN_WHOLESALE_PRICE : "Contain Wholesale Price",
                        IS_HOT : "Is Hot ?!!",
                        IS_DEACTIVE : "Deactive",
                        IMAGE : "Image",
                        IMAGE_THUMBNAIL : "Image Thumbnail",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "Search Product Criteria",
                        PRODUCT_CODE_LABEL : "Product Code",
                        PRODUCT_NAME_LABEL : "Product Name",
                        PRODUCT_CATEGORY_LABEL : "Product Category"
                    },
                    PROMOTION : {
                        TAB : "Promotion",
                        SEARCH_PROMOTION_CRITERIA_LABEL : "Search Promotion Criteria",
                        PROMOTION_CODE : "Promotion Code",
                        PROMOTION_NAME_TH : "Promotion Name (TH)",
                        PROMOTION_NAME_EN : "Promotion Name (EN)",
                        PROMOTION_NAME_CN : "Promotion Name (CN)",
                        IS_ACTIVE : "Active ?",
                        IS_EXPIRE : "Expire ?",
                        START_DATE : "Start Date :",
                        END_DATE : "End Date :",
                        DISCOUNT_PERCENT : "Discount %",

                        PROMOTION_CODE_LABEL : "Promotion Code :",
                        PROMOTION_NAME_TH_LABEL : "Promotion Name (TH) :",
                        PROMOTION_NAME_EN_LABEL : "Promotion Name (EN) :",
                        PROMOTION_NAME_CN_LABEL : "Promotion Name (CN) :",
                        IS_ACTIVE_LABEL : "Is Active? :",
                        START_DATE_LABEL : "Start Date :",
                        END_DATE_LABEL : "End Date :",
                        SEARCH_PRODUCT : 'Search Product',
                        ADD_PRODUCT_BUTTON : 'Add Product'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "Customer Type",
                        CUSTOMER_TYPE_CODE : "Customer Type Code",
                        CUSTOMER_TYPE_NAME_TH : "Customer Type Name (TH)",
                        CUSTOMER_TYPE_NAME_EN : "Customer Type Name (EN)"
                    },
                    CUSTOMER : {
                        TAB : "Customer",
                        CUSTOMER_CODE : "Customer Code",
                        FIRST_NAME : "Firstname",
                        LAST_NAME : "Lastname",
                        KNOWN_NAME : "Knownname",
                        TEL_NO : "Tel No.",
                        FAX_NO : "Fax No.",
                        MOBILE_NO : "Mobile No.",
                        EMAIL : "Email",
                        DESCRIPTION : "Description"
                    },

                    STAFF : {
                        TAB : "Staff",
                        STAFF_CODE : "Staff Code",
                        FIRST_NAME : "Firstname",
                        LAST_NAME : "Lastname",
                        NICK_NAME : "Nickname",
                        AGE : "Age",
                        SEX : "Sex"
                    },
                    ROLE : {
                        TAB : "Role",
                        ROLE_CODE : "Role Code",
                        ROLE_NAME_TH : "Role Name (TH)",
                        ROLE_NAME_EN : "Role Name (EN)"
                    },
                    RECEIPT_ORDER : {
                        TAB : "Receipt",
                        RO_NO : "RO No.",
                        RO_DATE : "RO Date",
                        RO_TIME : "RO Time"
                    },
                    SUPPLIER : {
                        TAB : "Supplier",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "User",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    BUTTON : {
                        CANCEL : "Cancel",
                        SAVE : "Save"
                    },
                    HEADER : "Account Detail",
                    FIRST_NAME : "Firstname",
                    LAST_NAME : "Lastname",
                    EMAIL : "Email",
                    USERNAME : "Username",
                    PASSWORD : "Password",
                    PROFILE_IMAGE : "Profile Image",
                    DROP_FILE : "Drop File",
                    DROP_IMAGE_PDF : "Drop File or PDF file here",
                    IMAGE_THUMBNAIL : "Image Thumbnail"
                },
                HISTORY : {
                    BUTTON: {
                        SEARCH : "Search"
                    },
                    HEAD : "Purchase History",
                    FROM: "From :",
                    TO: "To :",
                    PAYMENT_STATUS: "Payment Status :",
                    SHIPPING_STATUS: "Shipping Status :",
                    PAYMENT : {
                        OWED : "ค้างชำระ",
                        PAID: "ชำระแล้ว"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "ยังไม่ได้ส่งสินค้า",
                        SHIPPING: "ส่งสินค้าแล้ว"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "Search"
                    },
                    HEAD : "Customer Order",
                    RO_NO : "RO No :",
                    RO_NO_PLACEHOLDER : "RO No",
                    CUSTOMER : "Customer :",
                    CUSTOMER_PLACEHOLDER : "Customer",
                    FROM : "Start Date :",
                    FROM_PLACEHOLDER : "Start Date",
                    TO : "End Date :",
                    TO_PLACEHOLDER : "End Date",
                    PAYMENT : "Payment :",
                    PAYMENT_PLACEHOLDER : "Status",
                    SHIPPING : "Shipping :",
                    SHIPPING_PLACEHOLDER : "สถานะการส่งสินค้า",
                    PAYMENT : {
                        OWED : "Owed",
                        PAID: "Paid"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "No Shipping",
                        SHIPPING: "Shipping"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : 'Date :',
                    RO_NO : ' RO No :',
                    RO_LABEL : 'Purchase Order',
                    IMAGE_PAYMENT_DOCUMENT : 'Payment Document',
                    UPLOAD_BUTTON : 'Upload Payment Document',
                    APPROVE_BUTTON : 'Approve',
                    REJECT_BUTTON : 'Reject',
                    SHIPPED_BUTTON : 'Shipped'
                }
            }
        },
        FOOTER : {
            TYRE : {
                HEAD : 'Inner - Outer Tyre',
                REMARK : 'The great and general quality of tyre with top brand.'
            },
            LUBRICANT : {
                HEAD : 'Lubricant',
                REMARK : 'Innumerable high and fair quality of lubricant brand for motorcycle, car and Tractor'
            },
            BATTERY : {
                HEAD : 'Battery',
                REMARK : 'Various quality and alternatives brand Motorcycle, Car and Tractor.'
            },
            BRAKE : {
                HEAD : 'Brake System',
                REMARK : 'Make confident in performance while driving and in every situation.'
            },
            SHOCK : {
                HEAD : 'Shock Absorber',
                REMARK : 'Feel soft and good for every driving and situation'
            },
            WRENCH : {
                HEAD : 'Tools',
                REMARK : 'Worker trust with brand quality tools'
            },
            COPY_RIGHT : 'Copyright 2016 KZHParts Thailand',
            CONTACT_US : 'Contact KZHParts team here',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : 'We are also available on AppStore and PlayStore',
            COMING_SOON : 'Coming Soon...'
            
        },
        PAGE404 : {
            TITLE : 'Not found :(',
            SUBTITLE_1 : 'Sorry, but the page you were trying to view does not exist.',
            SUBTITLE_2 : 'It looks like this was the result of either:',
            CONTENT_1 : '1. a mistyped address',
            CONTENT_2 : '2. an out-of-date link',
            CLOSE_BUTTON : 'Close'
        }
    });
    $translateProvider.translations('cn', {
        TITLE: {
            NAME: '興 順 許 - 實施方案 摩托车配件 橡膠 和 润滑剂',
            KEYWORD: '潤滑油，摩托車內胎，摩托車輪胎外，摩托車零部件，汽車零部件，拖拉機配件，電力，農業，水，合理的價格，可靠的',
            DESCRIPTION: '潤滑油，摩托車內胎，摩托車輪胎外，摩托車零部件，汽車零部件，拖拉機配件，電力，農業，水，合理的價格，可靠的',
            AUTHOR: 'Panya Boonyakulsrirung'
        },
        MESSAGE : {
            TYPE_SUCCESS : "success",
            TYPE_WARNING : "warning",
            TYPE_ERROR : "error",
            TITLE_SUCCESS : "成功",
            TITLE_WARNING : "警告",
            TITLE_ERROR : "錯誤",
            HEAD : {

            },
            CONTENT: {
                UPDATE_CART_BUY_QTY : "必須輸入量為數字或大於0"
            }
        },
        HEAD: {
            MENU: {
                SEARCH : {
                    PLACEHOLDER : "鍵入搜索，然後按 ENTER"
                },
                PRODUCT: '貨物',
                ARTICLE: '文章',
                WEBBOARD: '座談會',
                PAYMENT: '付款',
                DELIVERY: '交貨',
                PAYMENT_N_DELIVERY: '付款 & 交貨',
                DEFINITION : '條款',
                ABOUT: '關於我們',
                CONTACT: '聯繫我們',
                CUSTOMER: '客戶下單',
                ACCOUNT: '賬戶設置',
                HISTORY: '購買歷史',
                GENERAL: '一般設置',
                LOGOUT: '註銷'
            },
            SIGNIN: '登錄',
            SIGNOUT: '登出',
            MODAL_SIGNIN: {
                HEAD : "登入/簽字",
                TAB_SIGNIN: '登入',
                LABEL_USERNAME: '用户名',
                LABEL_PASSWORD: '密码',
                TAB_SIGNUP: '报名',
                BUTTON_SIGNIN: '登錄',
                FORGET_PASSWORD : '忘記密碼',
                REMEMBER_ME : '記住我',
                REMEMBER_ME_REASON : '(如果這是一個私人的電腦)',
                FACEBOOK_SIGNIN: '通過 Facebook 登錄',
                TWITTER_SIGNIN: '通過 Twitter 登錄',
                GOOGLE_PLUS_SIGNIN: '通過 Google+ 登錄',
                LINKEDIN_SIGNIN: '通過 Linkedin 登錄',
                INSTAGRAM_SIGNIN: '通過 Instagram 登錄',
                GITHUB_SIGNIN: '通過 Github 登錄',
                DROPBOX_SIGNIN: '通過 Dropbox 登錄',
                FOURSQUARE_SIGNIN: '通過 Foursquare 登錄',
                SOUNDCLOUD_SIGNIN: '通過 Soundcloud 登錄',
                FIRST_NAME : "名字",
                LAST_NAME : "姓",
                EMAIL : "電子郵件",
                USERNAME : "用戶名",
                PASSWORD : "密碼",
                STRENGTH : "密碼強度",
                RECAPTCHA : "驗證碼",
                BUTTON_SIGNUP : "簽字",
                TERM_SERVICE_LABEL : '我同意',
                TERM_SERVICE : '服務期限'
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
                SUMWEIGHTAMT:'交貨',
                POST_TYPE: {
                    SELECT_POST_TYPE:'--- 選擇郵件傳遞的類型 ---',
                    NORMAL: '正常',
                    EMS: 'EMS'
                },
                WARN_EMS : '*** EMS體重過量20公斤 ***',
                NETAMT: '淨額',
                SHOP_BUTTON: '繼續購物',
                SAVE_BUTTON: '救車',
                CLEAR_BUTTON: '清空購物車',
                CHECKOUT_BUTTON: '繼續',
            },
            MODAL_FORGET_PASSWORD : {
                TITLE : '忘記密碼 ?',
                TEXT: '您可以在這裡重置您的密碼.',
                EMAIL_PHD : '電子郵件',
                SEND_EMAIL_BUTTON : '給我發電子郵件'
            },
            WELCOME: '歡迎'
        },
        BODY: {
            NAV: {},
            CAROUSEL : {
                ONE : {
                    TITLE : 'BEELOX - 彩色噴塑偉大的品質',
                    TEXT : '適合與每一個工作',
                },
                TWO : {
                    TITLE : '摩托車電池',
                    TEXT : '所有的質量和正常的品牌GS 3K GMAX等',
                },
                THREE : {
                    TITLE : 'COMPAC彩色噴塗',
                    TEXT : '講理的價格，但高品質的彩色噴塗',
                },
                FOUR : {
                    TITLE : '泰品牌外自行車輪胎',
                    TEXT : '橡膠的品質和高度的靈活性',
                },
                FIVE : {
                    TITLE : '隨著外摩托車輪胎 CAMEL 和 VEERUBBER 大眾品牌',
                    TEXT : '最好的價格和高品質的外胎摩托車',
                },
                SIX : {
                    TITLE : '隨著外摩托車輪胎 CAMEL 和 VEERUBBER 大眾品牌',
                    TEXT : '最好的價格和高品質的外胎摩托車',
                },
                SEVEN : {
                    TITLE : '鏈輪YAGUSO',
                    TEXT : '使每個驅動器的最佳',
                }
            },
            SECTION: {
                PRODUCT: {
                    QTY: '音量',
                    PRICE: '價格',
                    WEIGHT: '重量',
                    WEIGHT_UOM: '公克',
                    LIKE: '如',
                    BUY: '購買',
                    DETAIL: '細節',
                    LABEL_NEW: '新',
                    LABEL_HOT: '暢銷書 !!',
                    LABEL_SALE: '賣',
                },
                WEBBOARD : {
                    HEAD: "客服中心"
                },
                PAYMENT: {
                    HEAD: '款到發貨',
                    PAYMENT_TITLE : '款到發貨',
                    PAYMENT_CHART : '採購訂單流程表',
                    PAYMENT_STEP : '採購訂單流程一步一步',
                    STEP_01 : '1. 前往網站 http://kzh-parts.com 您可以登錄到系統中按“登錄”，如下形象',
                    STEP_02 : '2. 系統顯示登錄/註冊對話框。如果你沒有一個帳戶，您可以輸入您在右側的信息來創建您的帳戶。如果你有系統帳戶，您可以登錄到左側，甚至使用其他社交帳戶，如Facebook ， Google +和Twitter的等。',
                    STEP_03 : '3. 輸入您的電子郵件，用戶名和密碼信息，驗證自己，接受協議，然後單擊 “註冊”', 
                    STEP_04 : '4. 等待系統處理後，系統會顯示成功的過程，但它幾乎完成註冊這是您無法登錄呢。因為你需要通過電子郵件激活您的帳戶',
                    STEP_05 : '5. 您可以從系統收到一封電子郵件，來激活自己。',
                    STEP_06 : '6. 按下按鈕 “激活您的帳戶”',
                    STEP_07 : '7. 您將回到網站，如果成功，系統顯示註冊成功',
                    STEP_08 : '8. 購買商品請輸入需要數量然後按下按鈕， “買入”',
                    STEP_09 : '9. 還有額外的 1 個項目在您的購物車',
                    STEP_10 : '10. 當按下按鈕“購物車”，系統顯示採購的產品信息。這一步系統默認的正常崗位類型，是你可以根據需要柱式後來改為EMS 。之後，你可以繼續下一步驟',
                    STEP_10_1: '10.1 繼續購物',
                    STEP_10_2: '10.2 清除車來刪除車中的所有產品',
                    STEP_10_3: '10.3 看看去運輸和付款過程',
                    STEP_11 : '11. 如果你沒有登錄時，系統將允許您登錄。',
                    STEP_12 : '12. 輸入您的個人和接觸的地址信息，然後點擊按鈕 “下一步”',
                    STEP_13 : '13. 系統允許您選擇支付通道',
                    STEP_14 : '14. 等待系統處理。',
                    STEP_15 : '15. 成功的系統顯示成功信息創建採購訂單',
                    STEP_16 : '16. 你已經得到的電子郵件系統，以確認您的採購訂單',
                    STEP_17 : '17. 選擇菜單購買歷史來檢查和跟踪購買狀態',
                    STEP_18 : '18. 當你已經支付的產品然後點擊綠色按鈕',
                    STEP_19 : '19. 系統顯示購買歷史細節，然後選擇按鈕 “上傳付款單據”',
                    STEP_20 : '20. 然後，工作人員確定付款單據，並通過電子郵件回复客戶',
                    WEIGHT_RATE: '體重率',
                    POST_NORMAL: '普通郵件',
                    POST_EMS: 'EMS郵件',
                    TABLE_HEAD_WEIGHT: '重量（g）',
                    TABLE_HEAD_RATE: '率'
                },
                ABOUT : {
                    HEAD: "關於我們",
                    MARKETING: {
                        CONTENT_1: {
                            TITLE: '顧客',
                            SUB_TITLE: '其中一個用於存儲最重要的事情',
                            MESSAGE: '客戶是關鍵，使事情能夠向前邁進'
                        },
                        CONTENT_2: {
                            TITLE: '產品',
                            SUB_TITLE: '所有的品牌和優質的產品讓客戶滿意',
                            MESSAGE: '已被廣泛接受的或替代產品的摩托車零配件，潤滑劑和內外胎'
                        },
                        CONTENT_3: {
                            TITLE: '服務',
                            SUB_TITLE: '一個商店的另一個重點。',
                            MESSAGE: '為客戶提供一個專門的和誠實的心靈。另外，我們介紹給客戶的產品。'
                        },
                        CONTENT_4: {
                            TITLE: '願景',
                            SUB_TITLE: '為了讓更多的商店潛力',
                            MESSAGE: '當下 技術過得很快，我們的眼光打開外部市場的重要性。為了適應新的客戶和技術，更快地進入世界...'
                        }
                    }
                },
                CONTACT: {
                    HEAD: '聯繫我們',
                    OFFICE: '我們的辦公室',
                    FEEDBACK:{
                        NAME :'名稱',
                        NAME_PHD : '輸入名字',
                        EMAIL : '電子郵件',
                        EMAIL_PHD : '輸入電子郵件',
                        SUBJECT: '學科',
                        SELECT_SUBJECT: '--- 選擇主題 ---',
                        SUBJECT_TYPE : {
                            GENERAL_USAGE: '一般使用',
                            PRODUCT_INQUIRY: '產品查詢',
                            PROBLEM_OCCUR: '問題在使用過程中會出現',
                            SHIPMENT_PROCESS: '發貨流程',
                            PAYMENT_PROCESS: '支付流程',
                            SUGGESTIONS: '建議'
                        },
                        MESSAGE : '信息',
                        MESSAGE_PHD : '輸入信息詳細',
                        SEND_MESSAGE:'發信息'
                    } 
                },
                GOOGLE_MAP: {
                    HEAD : "裝船",
                    ADDRESS1: '30-32 隊. 2 Thepnimit 路 ',
                    ADDRESS2: '',
                    SUBDISTRICT: 'Rangang',
                    DISTRICT: 'Srikhoraphum',
                    PROVINCE: 'Surin',
                    TEL_NO: '044-561125',
                    EMAIL: 'kzh.parts@gmail.com',
                },
                THAI_POST : {
                    HEAD : "職位"
                },
                SHIPMENT: {
                    HEAD : "裝船",
                    BILLING : {
                        STEP : '帳單地址',
                        BILL_STEP : '帳單地址',
                        BILL_NAME: '名稱',
                        BILL_LASTNAME: '姓',
                        BILL_EMAIL: '電子郵件',
                        BILL_ADDRESS: '地址',
                        BILL_PROVINCE: '省',
                        BILL_SELECT_PROVINCE: '--- 選擇 省 ---',
                        BILL_DISTRICT: '區',
                        BILL_SELECT_DISTRICT: '--- 選擇 區 ---',
                        BILL_SUBDISTRICT: '分地區',
                        BILL_SELECT_SUBDISTRICT: '--- 選擇 分地區 ---',
                        BILL_ZIPCODE: '郵政編碼',
                        BILL_SELECT_ZIPCODE: '--- 選擇 郵政編碼 ---',
                        TEL_NO : '電話號碼',
                        MOBILE_NO : '手機號碼',
                        TEL_NO_EX: '例如，如果你的電話號碼 02-999-9999 請用 029999999',
                        MOBILE_NO_EX: '例如，如果你的手機號碼 02-999-9999 請用 029999999',

                        SAME_ADDRESS : "與付款地址相同",

                        RO_STEP : '收貨地址',
                        RO_NAME: '名稱',
                        RO_ADDRESS: '地址',
                        RO_PROVINCE: '省',
                        RO_SELECT_PROVINCE: '--- 選擇 省 ---',
                        RO_DISTRICT: '區',
                        RO_SELECT_DISTRICT: '--- 選擇 區 ---',
                        RO_SUBDISTRICT: '分地區',
                        RO_SELECT_SUBDISTRICT: '--- 選擇 分地區 ---',
                        RO_ZIPCODE: '郵政編碼',
                        RO_SELECT_ZIPCODE: '--- 選擇 郵政編碼 ---',

                        BUTTON_NEXT: '下一步'

                    },
                    PAYMENT: {
                        STEP : '付款',
                        PAYMENT_TYPE: '支付方式',
                        SELECT_PAYMENT_TYPE: '--- 選擇 支付方式 ---',
                        TRANSFER: '轉讓',
                        ACCOUNT_NAME : 'Panya Boonyakulsrirung',
                        ACCOUNT_TYPE : 'Saving',
                        ACCOUNT_BANK_BBL : 'Bangkok Bank',
                        ACCOUNT_NO_BBL : '-',
                        ACCOUNT_BANK_KBANK : 'Kasikorn Bank',
                        ACCOUNT_NO_KBANK : '-',
                        ACCOUNT_BANK_SCB : 'Siam Commercial Bank',
                        ACCOUNT_NO_SCB : '-',
                        ACCOUNT_BANK_KTB : 'Krungthai Bank',
                        ACCOUNT_NO_KTB : '-',
                        ACCOUNT_BANK_KCC : 'Krungsri Bank',
                        ACCOUNT_NO_KCC : '-',
                        ACCOUNT_BANK_TMB : 'TMB Bank',
                        ACCOUNT_NO_TMB : '-',
                        ACCOUNT_BANK_UOB : 'UOB Bank',
                        ACCOUNT_NO_UOB : '-',
                        PAYPAL : '貝寶',
                        CREDIT: '信用卡',

                        BUTTON_NEXT: '下一步'
                    },
                    FINISH : {
                        STEP : '結束',
                        BUTTON_SUCCESS : '成功',
                        PROCESSING : '系統正在處理您的訂單，請稍等片刻。',
                        THANK_MESSAGE: '謝謝您的訂單。☺'
                    }
                },
                SETTING: {
                    HEAD: "地點",
                    BUTTON : {
                        NEW : "新",
                        SAVE : "保存",
                        DELETE : "刪除",
                        CANCEL : "取消",
                        SEARCH : "搜索"
                    },
                    PRODUCT_TYPE :{
                        TAB : "產品類型",
                        PRODUCT_TYPE_CODE : "產品類型代碼",
                        PRODUCT_TYPE_NAME_TH : "產品型號名稱 (泰國)",
                        PRODUCT_TYPE_NAME_EN : "產品型號名稱 (英語)",
                        PRODUCT_TYPE_NAME_CN : "產品型號名稱 (中國)",

                        SEARCH_PRODUCT_TYPE_CRITERIA_LABEL : "搜索產品類別標準",
                        PRODUCT_TYPE_CODE_LABEL : "產品類型代碼",
                        PRODUCT_TYPE_NAME_LABEL : "產品型號名稱",
                    },
                    PRODUCT_CATEGORY :{
                        TAB : "產品分類",
                        PRODUCT_CATEGORY_CODE : "產品類別代碼",
                        PRODUCT_CATEGORY_NAME_TH : "產品類別名稱 (泰國)",
                        PRODUCT_CATEGORY_NAME_EN : "產品類別名稱 (英語)",
                        PRODUCT_CATEGORY_NAME_CN : "產品類別名稱 (中國)",
                        PRODUCT_TYPE : "產品類型", 

                        SEARCH_PRODUCT_CATEGORY_CRITERIA_LABEL : "搜索產品標準",
                        PRODUCT_CATEGORY_CODE_LABEL : "產品類別代碼",
                        PRODUCT_CATEGORY_NAME_LABEL : "產品類別名稱",
                        PRODUCT_TYPE_LABEL : "產品"
                    },
                    PRODUCT : {
                        TAB : "產品",
                        PRODUCT_CODE : "產品代碼",
                        IS_GEN_CODE : "自動生成代碼",
                        PRODUCT_NAME_TH : "產品名稱 (泰國)",
                        PRODUCT_NAME_EN : "產品名稱 (英語)",
                        PRODUCT_NAME_CN : "產品名稱 (中國)",
                        PRODUCT_CATEGORY : "產品分類",
                        COST_PRICE : "成本價",
                        RETAIL_PRICE : "零售價",
                        WHOLESALE_PRICE : "批發價",
                        WEIGHT : "重量",
                        CONTAIN_WEIGHT : "含有重",
                        UOM : "單元",
                        CONTAIN_UOM : "包裝單位",
                        CONTAIN_QUANTITY : "號/包裝",
                        CONTAIN_COST_PRICE : "成本控制",
                        CONTAIN_WHOLESALE_PRICE : "批發包裝",
                        IS_HOT : "熱 ?!!",
                        IS_DEACTIVE : "未激活",
                        IMAGE : "圖片",
                        IMAGE_THUMBNAIL : "圖片縮略圖",

                        SEARCH_PRODUCT_CRITERIA_LABEL : "เงื่อนไขการค้นหาสินค้า",
                        PRODUCT_CODE_LABEL : "รหัสสินค้า",
                        PRODUCT_NAME_LABEL : "ชื่อสินค้า",
                        PRODUCT_CATEGORY_LABEL : "ประเภทสินค้า"
                    },
                    PROMOTION : {
                        TAB : "提升",
                        SEARCH_PROMOTION_CRITERIA_LABEL : "搜索推廣標準",
                        PROMOTION_CODE : "促銷代碼",
                        PROMOTION_NAME_TH : "促銷名稱 (泰國)",
                        PROMOTION_NAME_EN : "促銷名稱 (英語)",
                        PROMOTION_NAME_CN : "促銷名稱 (中國)",
                        IS_ACTIVE : "活躍 ?",
                        IS_EXPIRE : "到期 ?",
                        START_DATE : "開始日期 :",
                        END_DATE : "結束日期 :",
                        DISCOUNT_PERCENT : "折扣 % :",

                        PROMOTION_CODE_LABEL : "促銷代碼 :",
                        PROMOTION_NAME_TH_LABEL : "促銷名稱 (泰國) :",
                        PROMOTION_NAME_EN_LABEL : "促銷名稱 (英語) :",
                        PROMOTION_NAME_CN_LABEL : "促銷名稱 (中國) :",
                        IS_ACTIVE_LABEL : "活躍? :",
                        START_DATE_LABEL : "開始日期 :",
                        END_DATE_LABEL : "結束日期 :",
                        SEARCH_PRODUCT : '搜索產品',
                        ADD_PRODUCT_BUTTON : '添加產品'
                    },
                    CUSTOMER_TYPE : {
                        TAB : "客戶類型",
                        CUSTOMER_TYPE_CODE : "客戶代碼類型",
                        CUSTOMER_TYPE_NAME_TH : "客戶名稱 (泰國)",
                        CUSTOMER_TYPE_NAME_EN : "客戶名稱 (英語)"
                    },
                    CUSTOMER : {
                        TAB : "客戶",
                        CUSTOMER_CODE : "客戶代碼",
                        FIRST_NAME : "名字",
                        LAST_NAME : "姓",
                        KNOWN_NAME : "綽號",
                        TEL_NO : "電話號碼",
                        FAX_NO : "傳真號",
                        MOBILE_NO : "手機號",
                        EMAIL : "電子郵件",
                        DESCRIPTION : "描述"
                    },
                    STAFF : {
                        TAB : "員工",
                        STAFF_CODE : "員工代碼",
                        FIRST_NAME : "名字",
                        LAST_NAME : "姓",
                        NICK_NAME : "暱稱",
                        AGE : "年齡",
                        SEX : "性別"
                    },
                    ROLE : {
                        TAB : "角色",
                        ROLE_CODE : "角色代碼",
                        ROLE_NAME_TH : "角色名 (泰國)",
                        ROLE_NAME_EN : "角色名 (英語)"
                    },
                    RECEIPT_ORDER : {
                        TAB : "採購訂單",
                        RO_NO : "訂單代碼",
                        RO_DATE : "收到訂單日期",
                        RO_TIME : "收到訂單時間"
                    },
                    SUPPLIER : {
                        TAB : "供應商",
                        SUPPLIER_CODE : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_TH : "ชื่อผู้ขาย (ไทย) :",
                        SUPPLIER_NAME_EN : "ชื่อผู้ขาย (อังกฤษ) :",
                        DESCRIPTION : "คำอธิบาย :",
                        EMAIL : "อีเมล :",
                        TEL_NO : "โทรศัพท์ :",
                        FAX_NO : "โทรสาร :",
                        MOBILE_NO : "มือถือ :",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",

                        SEARCH_SUPPLIER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ขาย",
                        SUPPLIER_CODE_LABEL : "รหัสผู้ขาย :",
                        SUPPLIER_NAME_LABEL : "ชื่อผู้ขาย :",
                        DESCRIPTION_LABEL : "คำอธิบาย :",
                        EMAIL_LABEL : "อีเมล :",
                        TEL_NO_LABEL : "โทรศัพท์ :",
                        FAX_NO_LABEL : "โทรสาร :",
                        MOBILE_NO_LABEL : "มือถือ :"
                    },
                    APP_USER : {
                        TAB : "用戶",
                        USERNAME : "รหัสผู้ใช้",
                        PASSWORD : "รหัสผ่าน้",
                        FIRSTNAME : "ชื่อ",
                        LASTNAME : "นามสกุล",
                        EMAIL : "อีเมล",
                        USER_TYPE : "ชนิดผู้ใช้",
                        ROLE : "บทบาท",
                        TERMINAL : "ช่องทาง",
                        CREATE_BY : "สร้างโดย :",
                        CREATE_DATE : "วันที่สร้าง :",
                        UPDATE_BY : "อัพเดทโดย :",
                        UPDATE_DATE : "วันที่อัพเดท :",
                        SEARCH_APP_USER_CRITERIA_LABEL : "เงื่อนไขการค้นหาผู้ใช้ระบบ",
                        USERNAME_LABEL : "ผู้ใช้ระบบ :",
                        NAME_LABEL : "ชื่อ :",
                        TERMINAL_LABEL : "ช่องทาง :",
                        ROLE_LABEL : "บทบาท :"
                    }
                },
                ACCOUNT : {
                    HEAD : "帳戶資料",
                    BUTTON : {
                        CANCEL : "取消",
                        SAVE : "保存"
                    },
                    FIRST_NAME : "名字",
                    LAST_NAME : "姓",
                    EMAIL : "電子郵件",
                    USERNAME : "用戶名",
                    PASSWORD : "密碼",
                    PROFILE_IMAGE : "資料圖片",
                    DROP_FILE : "拖放文件",
                    DROP_IMAGE_PDF : "拖放文件或 PDF 文件在這裡",
                    IMAGE_THUMBNAIL : "圖片縮略圖"
                },
                HISTORY : {
                    HEAD : "購買記錄",
                    BUTTON: {
                        SEARCH : "搜索"
                    },
                    FROM: "從 :",
                    TO: "至 :",
                    PAYMENT_STATUS: "付款狀態 :",
                    SHIPPING_STATUS: "發貨狀態 :",
                    PAYMENT : {
                        OWED : "拖欠",
                        PAID: "付費"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "沒有運輸",
                        SHIPPING: "送貨"
                    }
                },
                CUSTOMER_ORDER : {
                    BUTTON : {
                        SEARCH : "搜索"
                    },
                    HEAD : "客戶訂單",
                    RO_NO : "收據編號 :",
                    RO_NO_PLACEHOLDER : "收據編號",
                    CUSTOMER : "客 :",
                    CUSTOMER_PLACEHOLDER : "客",
                    FROM : "開始日期 :",
                    FROM_PLACEHOLDER : "開始日期",
                    TO : "結束日期 :",
                    TO_PLACEHOLDER : "結束日期",
                    PAYMENT : "付款 :",
                    PAYMENT_PLACEHOLDER : "付款",
                    SHIPPING : "航運 :",
                    SHIPPING_PLACEHOLDER : "航運",
                    PAYMENT : {
                        OWED : "拖欠",
                        PAID: "付費"
                    },
                    SHIPPING : {
                        NOT_SHIPPING : "沒有運輸",
                        SHIPPING: "送貨"
                    }
                },
                VIEW_RO_MODAL : {
                    DATE : '日期 :',
                    RO_NO : '發票號 :',
                    RO_LABEL : '採購訂單',
                    IMAGE_PAYMENT_DOCUMENT : '付款單據',
                    UPLOAD_BUTTON : '上傳付款單據',
                    APPROVE_BUTTON : '批准',
                    REJECT_BUTTON : '拒絕',
                    SHIPPED_BUTTON :'運'
                }
            } // Setting
        },// BODY
        FOOTER : {
            TYRE : {
                HEAD : '內 - 外 輪胎',
                REMARK : '憑著過硬的質量和優質的替代輪胎'
            },
            LUBRICANT : {
                HEAD : '潤滑劑',
                REMARK : '各種品牌的潤滑油摩托車和汽車'
            },
            BATTERY : {
                HEAD : '摩托車 - 汽車 電池',
                REMARK : '各種品牌的電池摩托車和汽車'
            },
            BRAKE : {
                HEAD : '制動系統',
                REMARK : '對性能有信心，而駕駛，並在任何情況下'
            },
            SHOCK : {
                HEAD : '減震器',
                REMARK : '覺得各種行駛狀況和柔軟性好'
            },
            WRENCH : {
                HEAD : '工具',
                REMARK : '以品牌質量工具工人的信任'
            },
            COPY_RIGHT : '版權所有2016年 KZHParts 泰國',
            CONTACT_US : '聯繫 KZHParts 隊這邊',
            AVAILABLE_ON_APPSTORE_PLAYSTORE : "我們也可在 AppStore 上和 PlayStore",
            COMING_SOON : '快來了...'
        },
        PAGE404 : {
            TITLE : '未找到 :(',
            SUBTITLE_1 : '很抱歉，但頁面您試圖查看不存在。',
            SUBTITLE_2 : '看起來，這是任一結果：',
            CONTENT_1 : '1. 輸入錯誤的地址',
            CONTENT_2 : '2. 出過期的鏈接',
            CLOSE_BUTTON : '關'
        }
    });
    $translateProvider.preferredLanguage('th');
});
