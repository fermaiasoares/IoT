// Initialize your app
var myApp = new Framework7();
// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
// app.js
$.ajaxSetup({
    cache: true,
    crossDomain: true,
        statusCode: {
        406: function () {
            myApp.alert('Error 406 请求速度过快！', '智能物联');
        },
        412: function () {
            myApp.alert('Error 412 用户名或密码错误！', '智能物联');
        },
        404: function () {
            myApp.alert('Error 404 系统没有对应服务接口！', '智能物联');
        },
        417: function () {
            myApp.alert('Error 417 系统没有对应谓词接口！', '智能物联');
        }
    }
});
jQuery.support.cors = true;

// Init Here
var ip = ko.observable('http://192.168.1.116:8080');
var camIp = ko.observable('http://192.168.1.111:8081');

//var ip = function(){
//    return localStorage.getItem('ip');
//};

if(!localStorage.getItem('ip') && !localStorage.getItem('camIp')) {
    localStorage.setItem('ip', 'http://192.168.1.116:8080');
    localStorage.setItem('camIp', 'http://192.168.1.111:8081');
    ip('http://192.168.1.116:8080');
    camIp('http://192.168.1.111:8081');
} else {
    ip(localStorage.getItem('ip'));
    camIp(localStorage.getItem('camIp'));
}

ko.applyBindings({
    setLocal: function() {
        localStorage.setItem('ip', 'http://192.168.1.116:8080');
        localStorage.setItem('camIp', 'http://192.168.1.111:8081');
        ip('http://192.168.1.116:8080');
        camIp('http://192.168.1.111:8081');
        console.log("localStorage.getItem('ip'): ", localStorage.getItem('ip'));
    },
    setZero: function() {
        localStorage.setItem('ip', 'http://shuzitongxin.oicp.net:25214');
        localStorage.setItem('camIp', 'http://shuzitongxin.oicp.net:25501');
        ip('http://shuzitongxin.oicp.net:25214');
        camIp('http://shuzitongxin.oicp.net:25501');
        console.log("localStorage.getItem('ip'): ", localStorage.getItem('ip'));
    },
    setSelf: function() {
        myApp.prompt('设置自定义IP地址', '智能物联', function (value){
            var isURL = function (str_url) {
                var strRegex = '^((https|http)?://)'
                    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
                    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                    + '|' // 允许IP和DOMAIN（域名）
                    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                    + '[a-z]{2,6})' // first level domain- .com or .museum
                    + '(:[0-9]{1,4})?' // 端口- :80
                    + '((/?)|' // a slash isn't required if there is no file name
                    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
                var re = new RegExp(strRegex);
                return re.test(str_url);
            };
            var mainIp = 'http://' + value + ':8080';
            var cameraIp = 'http://' + value + ':8081';
            if(!isURL(mainIp)) {
                myApp.alert('IP地址"' + mainIp + '" 格式有误！');
                console.log("localStorage.getItem('ip'): ", localStorage.getItem('ip'));
            }
            else {
                localStorage.setItem('ip', mainIp);
                localStorage.setItem('camIp', cameraIp);
                ip(mainIp);
                camIp(cameraIp);
                myApp.alert('设置成功"' + mainIp + '" ！');
                console.log("localStorage.getItem('ip'): ", localStorage.getItem('ip'));
            }
        });
    }
}, document.getElementById('ip-area') );


myApp.onPageInit("led", function(page){
    console.log(page);
    var led = new SwitchViewModel(1);
    setTimeout(led.loadData, 200);
    ko.applyBindings(led, page.container );
});

myApp.onPageInit("door", function(page){
    console.log(page);
    var door = new SwitchViewModel(2);
    setTimeout(door.loadData, 200);
    ko.applyBindings(door, page.container );
});

myApp.onPageInit("kic", function(page){
    console.log(page);
    var kic = new SwitchViewModel([3,4]);
    setTimeout(kic.loadData, 200);
    ko.applyBindings(kic, page.container );
});

myApp.onPageInit("projector", function(page) {
    console.log(page);
    var projector = new Step2ViewModel(5);
    setTimeout(projector.loadData, 200);
    ko.applyBindings(projector, page.container );
});
myApp.onPageInit("camera", function(page) {
    console.log(page);
    var screen = new Step2ViewModel(6);
    screen.camIp = camIp;
    console.log('cam: ', ip(), screen.camIp());
    setTimeout(screen.loadData, 200);
    ko.applyBindings(screen, page.container );
});
myApp.onPageInit("led2", function(page) {
    console.log(page);
    var led2 = new Step2ViewModel(7);
    setTimeout(led2.loadData, 200);
    ko.applyBindings(led2, page.container );
});
myApp.onPageInit("air", function(page){
    console.log(page);
    var air = new AirViewModel(8);
    setTimeout(air.loadData, 200);
    ko.applyBindings(air, page.container );
});

myApp.onPageInit("tv", function(page){
    console.log(page);
    var tv = new Step2ViewModel(9);
    setTimeout(tv.loadData, 200);
    ko.applyBindings(tv, page.container );
});

myApp.onPageInit("curtain", function(page){
    console.log(page);
    var curtain = new Step2ViewModel(10);
    setTimeout(curtain.loadData, 200);
    ko.applyBindings(curtain, page.container );
});

myApp.onPageInit("screen", function(page){
    console.log(page);
    var screen = new Step2ViewModel(11);
    setTimeout(screen.loadData, 200);
    ko.applyBindings(screen, page.container );
});

myApp.onPageInit("volume", function(page){
    console.log(page);
    var volume = new Step2ViewModel(12);
    setTimeout(volume.loadData, 200);
    ko.applyBindings(volume, page.container );
});

myApp.onPageInit("window", function(page){
    console.log(page);
    var window = new Step2ViewModel(14);
    setTimeout(window.loadData, 200);
    ko.applyBindings(window, page.container );
});

// MQTT
var blood = ko.observable('0.00');
ko.applyBindings({
    blood: blood
}, document.getElementById('blood'));

var client = mqtt.connect(ip().replace('http', 'ws')); // you add a ws:// url here
client.subscribe("gas");
client.subscribe("heart");

client.on("message", function(topic, payload) {
    if(topic === 'gas') {
        if(payload)
            myApp.alert('煤气可能泄漏，请注意关闭阀门！', '智能物联');
    } else if(topic === 'heart') {

        blood(payload);

    } else {
        myApp.addNotification({
            title: topic,
            message: payload
        });
    }

});

function SwitchViewModel(code) {
    var self = this;
    // make the variables observable
    self.switchValue ={}; self.switch = {};
    if(Object.prototype.toString.call(code) === "[object Array]") {
        for(var i in code) {
            self.switchValue[code[i]] = ko.observable(false);
        }
    } else {
        self.switchValue[code] = ko.observable(false);
    }

    self.loadData = function () {
        $.ajax({
            url: ip() + "/devices"
        }).done(function (data) {
            var index; var devValue;
            if(Object.prototype.toString.call(code) === "[object Array]") {
                for(var i in code) {
                    index = (Number(code[i])-1);
                    devValue = data[index].value;
                    self.switch[code[i]] =  Number(devValue) ;
                    self.switchValue[code[i]](Boolean(self.switch[code[i]]));
                }
            } else {
                index = (Number(code)-1);
                devValue = data[index].value;
                self.switch[code] =  Number(devValue) ;
                self.switchValue[code](Boolean(self.switch[code]));
            }

        }).fail(function () {
            myApp.alert('未请求到设备信息，请检查网络', '智能物联');
        });
    };
    self.switchChanged = function(id){
       return function() {
           var index = (Number(id)-1);
            if (self.switch[id]) {
                self.switch[id] = 0;
                self.switchValue[id](false);
                console.log("No. " + id + " device value 1 to 0");
            } else {
                self.switch[id] = 1;
                self.switchValue[id](true);
                console.log("No. " + id + " device value 0 to 1");
            }

            var switchData = '{"type":"switch","value":' + Number(self.switch[id]) +'}';//+',"controller":'+Number(self.controller[id]())
            $.ajax({
                type: "POST",
                url: ip() + "/devices/" + id,
                data: JSON.parse(switchData)
            }).done(function(){
                if(self.switch[id])
                    myApp.alert('开启成功', '智能物联');
                else
                    myApp.alert('关闭成功', '智能物联');
            }).fail(function () {
                myApp.alert('不能更新设备信息，请检查网络', '智能物联');
            });
        };
    };
}

function StepViewModel(id) {
    var self = this;
    // make the variables observable
    self.switch = 0;
    self.controller = ko.observable(0);
    self.switchValue = ko.observable(false);

    self.loadData = function () {
        $.ajax({
            url: ip + "/devices/" + id
        }).done(function (data) {
            var index = (Number(id) - 1);
            var devValue = JSON.parse(data.value);
            self.switch = Number(devValue.switch);
            self.switchValue(Boolean(self.switch));
            self.controller(Number(devValue.controller));
        }).fail(function () {
            myApp.alert('未接入网络', '系统消息');
        });
    };
    self.switchChanged = function () {
        if (self.switch) {
            self.switch = 0;
            self.switchValue(false);
        } else {
            self.switch = 1;
            self.switchValue(true);
        }

        var switchData = '{"type":"step","switch":' + Number(self.switch) +',"controller":'+Number(self.controller())+'}';
        $.ajax({
            type: "POST",
            url: ip + "/devices/" + id,
            data: JSON.parse(switchData)
        }).done(function () {
            if (self.switch)
                myApp.alert('开启成功', '系统消息');
        else
            myApp.alert('关闭成功', '系统消息');
        }).fail(function () {
            myApp.alert('未成功连接设备', '系统消息');
        });
    };
    self.controllerChanged = function () {
        if(self.switch) {
            console.log("调整值：self.controller()", self.controller());
            var switchData = '{"type":"step","switch":' + Number(self.switch) +',"controller":'+Number(self.controller())+'}';
            $.ajax({
                type: "POST",
                url: ip + "/devices/" + id,
                data: JSON.parse(switchData)
            }).done(function () {
                console.log("更新到设备：self.controller()", self.controller());
            }).fail(function () {
                myApp.alert('未成功连接设备', '系统消息');
            });
        }
    };
    self.sliderChange = function () {

    };
}
function Step2ViewModel(code, group) {
    var self = this;
    // make the variables observable
    self.switchValue ={}; self.switch = {}; self.controller = {};
    if(Object.prototype.toString.call(code) === "[object Array]") {
        for(var i in code) {
            self.switchValue[code[i]] = ko.observable(false);
            self.controller[code[i]] = ko.observable(0);
        }
    } else {
        self.switchValue[code] = ko.observable(false);
        self.controller[code] = ko.observable(0);
    }
    console.log("init Step2: ", ip(), camIp());

    self.loadData = function () {
        $.ajax({
            url: ip() + "/devices"
        }).done(function (data) {
            var index; var devValue;
            if(Object.prototype.toString.call(code) === "[object Array]") {
                for(var i in code) {
                    index = (Number(code[i])-1);
                    devValue = JSON.parse(data[index].value);
                    self.switch[code[i]] =  Number(devValue.switch) ;
                    self.switchValue[code[i]](Boolean(self.switch[code[i]]));
                    self.controller[code[i]](Number(devValue.controller));
                }
            } else {
                index = (Number(code)-1);
                devValue = JSON.parse(data[index].value);
                console.log(data);
                self.switch[code] =  Number(devValue.switch) ;
                self.switchValue[code](Boolean(self.switch[code]));
                self.controller[code](Number(devValue.controller));
            }
        }).fail(function () {
            myApp.alert('未请求到设备信息，请检查网络', '智能物联');
        });
    };
    self.switchChanged = function(id) {
        return function() {
            var index = (Number(id)-1);
            if (self.switch[id]) {
                self.switch[id] = 0;
                self.switchValue[id](false);
                console.log("No. " + id + " device value 1 to 0");
            } else {
                self.switch[id] = 1;
                self.switchValue[id](true);
                console.log("No. " + id + " device value 0 to 1");
            }

            var switchData = '{"type":"switch","value":' + Number(self.switch[id]) +',"controller":'+Number(self.controller[id]()) +'}';//
            $.ajax({
                type: "POST",
                url: ip() + "/devices/" + id,
                data: JSON.parse(switchData)
            }).done(function(){
                if(self.switch[id])
                    myApp.alert('开启成功', '智能物联');
                else
                    myApp.alert('关闭成功', '智能物联');
            }).fail(function () {
                myApp.alert('不能更新设备信息，请检查网络', '智能物联');
            });
        };

    };
    self.controllerChanged = function (id){
        return function (dv, e) {
            var togSwitch  = self.switch[id];
            if(togSwitch) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                var nodeName = target.nodeName.toLocaleLowerCase();
                var targetId;
                if(nodeName == "div") {
                    return;
                }
                if(nodeName == "i" ) {
                    if(target.parentNode.nodeName.toLocaleLowerCase() == "a")
                        targetId = target.parentNode.id;
                    else
                        return;
                } else if(nodeName == "a") {
                    targetId = target.id;
                } else {
                    return;
                }
                self.controller[id](targetId.slice(3));
                console.log("DEBUG: targetId ", targetId);
                 var controllerNumber = self.controller[id]();
                 var controllerData = '{"type":"step","switch":' + Number(togSwitch) +',"controller":'+controllerNumber +'}';
                $.ajax({
                    type: "POST",
                    url: ip() + "/devices/" + id,
                    data: JSON.parse(controllerData)
                }).done(function() {
                        //myApp.alert('更新成功', '智能物联');
                    console.log("UPDATE: ", target.nodeName, controllerData);
                }).fail(function () {
                    myApp.alert('不能更新设备信息，请检查网络', '智能物联');
                });
            }
        };
    };
    self.controllerChanged2 = function (id) {
        return function (dv, e) {
            var togSwitch  = self.switch[id];
            if(1) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                var nodeName = target.nodeName.toLocaleLowerCase();
                var targetId;
                if(nodeName == "i" ) {
                    if(target.parentNode.nodeName.toLocaleLowerCase() == "a")
                        targetId = target.parentNode.dataset["code"];
                    else
                        return;
                } else if(nodeName == "a") {
                    targetId = target.dataset["code"];
                } else {
                    return;
                }
                self.controller[id](Number(targetId));
                console.log("DEBUG: targetId ", targetId);

                var controllerNumber = self.controller[id]();
                var controllerData = '{"type":"step","switch":' + Number(1) +',"controller":'+controllerNumber +'}';
                console.log("DEBUG: targetId ", togSwitch);
                $.ajax({
                    type: "POST",
                    url: ip() + "/devices/" + id,
                    data: JSON.parse(controllerData)
                }).done(function(){
                    //myApp.alert('更新成功', '智能物联');
                    console.log("UPDATE: ", target.nodeName, controllerData);
                }).fail(function () {
                    myApp.alert('不能更新设备信息，请检查网络', '智能物联');
                });
            }
        };
    };

    self.controllerChanged3 = function (id) {
        return function (dv, e) {
            var togSwitch  = self.switch[id];
            if(togSwitch) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                var nodeName = target.nodeName.toLocaleLowerCase();
                var targetId;
                var node = target;
                while(node) {
                    if(node.nodeName.toLocaleLowerCase() != "input") {
                        node = node.parentNode;
                    } else {
                        targetId = node.dataset["code"];
                        break;
                    }
                }
                self.controller[id](Number(targetId));
                console.log("DEBUG: targetId ", targetId);

                var controllerNumber = self.controller[id]();
                var controllerData = '{"type":"step","switch":' + Number(togSwitch) +',"controller":'+controllerNumber +'}';
                $.ajax({
                    type: "POST",
                    url: ip() + "/devices/" + id,
                    data: JSON.parse(controllerData)
                }).done(function() {
                    //myApp.alert('更新成功', '智能物联');
                    console.log("UPDATE: ", target.nodeName, controllerData);
                }).fail(function () {
                    myApp.alert('不能更新设备信息，请检查网络', '智能物联');
                });
            }
        };
    };
}

function AirViewModel(id) {
    var self = this;
    self.switch = 0;
    self.controller = ko.observable(0);

    self.loadData = function () {
        $.ajax({
            url: ip() + "/devices/" + id
        }).done(function (data) {
            var index = (Number(id) - 1);
            var devValue = JSON.parse(data.value);
            self.switch = Number(devValue.switch);
            self.controller(Number(devValue.controller));
        }).fail(function () {
            myApp.alert('未接入网络', '系统消息');
        });
    };
    self.options = [
        { name: '制冷', value: 1},
        { name: '制热', value: 2},
        { name: '送风', value: 3}
    ];

    self.sliderChange = function () {
        self.switch = Number($("#air-mode").val());
        if(self.switch == 3) {
            return;
        }
        var switchData = '{"type":"step","switch":' + Number(self.switch) +',"controller":'+Number(self.controller())+'}';
        console.log("Air 调整值：switchData: ", switchData);
        $.ajax({
            type: "POST",
            url: ip() + "/devices/" + id,
            data: JSON.parse(switchData)
        }).done(function () {
            console.log("更新到设备Air：self.controller()", self.controller());
        }).fail(function () {
            myApp.alert('未成功连接设备', '系统消息');
        });
    };
    self.windChange = function (dv, e) {
        self.switch = Number($("#air-mode").val());
        if(self.switch == 3) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            var nodeName = target.nodeName.toLocaleLowerCase();
            var targetId;
            if(nodeName == "i" ) {
                if(target.parentNode.nodeName.toLocaleLowerCase() == "a")
                    targetId = target.parentNode.dataset["code"];
                else
                    return;
            } else if(nodeName == "a") {
                targetId = target.dataset["code"];
            } else {
                return;
            }
            if(Number(targetId) == 0 || Number(targetId) == 1 || Number(targetId) == 2) {
                self.controller(Number(targetId));
            } else {
                return;
            }
            console.log("DEBUG: targetId ", targetId);

            var controllerData = '{"type":"step","switch":' + self.switch  +',"controller":'+ self.controller() +'}';
            $.ajax({
                type: "POST",
                url: ip() + "/devices/" + id,
                data: JSON.parse(controllerData)
            }).done(function(){
                console.log("UPDATE: ", target.nodeName, controllerData);
            }).fail(function () {
                myApp.alert('不能更新设备信息，请检查网络', '智能物联');
            });
        }
    };

    self.powerOff =  function (dv, e) {
        var controllerData;
        if(self.switch != 0) {
            self.switch = 0;
            controllerData = '{"type":"step","switch":' + self.switch +',"controller":'+ self.controller() +'}';
        } else {
            self.switch = Number($("#air-mode").val());
            controllerData = '{"type":"step","switch":' + self.switch +',"controller":'+ self.controller() +'}';
        }
        $.ajax({
            type: "POST",
            url: ip() + "/devices/" + id,
            data: JSON.parse(controllerData)
        }).done(function(){
            console.log("UPDATE: ", controllerData);
        }).fail(function () {
            myApp.alert('不能更新设备信息，请检查网络', '智能物联');
        });
    };
}

