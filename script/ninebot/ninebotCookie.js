/*
九号出行 - 获取Cookie (Cross-Platform Version)
使用说明：

[Loon 配置]
1. 在Loon配置文件中添加以下内容到 [Script] 部分：
   http-request ^https:\/\/cn-cbu-gateway\.ninebot\.com\/portal\/api\/user-sign\/v(1|2)\/sign script-path=https://raw.githubusercontent.com/fishyo/trantorRules/main/script/ninebot/ninebotCookie.js, requires-body=true, tag=九号出行获取Cookie
2. 在Loon配置文件中添加以下内容到 [MITM] 部分：
   hostname = cn-cbu-gateway.ninebot.com

[Egern 配置]
scriptings:
  - http_request:
      name: "九号出行获取Cookie"
      match: "^https:\\/\\/cn-cbu-gateway\\.ninebot\\.com\\/portal\\/api\\/user-sign\\/v(1|2)\\/sign"
      script_url: "https://raw.githubusercontent.com/fishyo/trantorRules/main/script/ninebot/ninebotCookie.js"
      body_required: true
mitm:
  hostnames:
    - "cn-cbu-gateway.ninebot.com"

[Quantumult X 配置]
1. 在 Quantumult X 配置文件中添加以下内容到 [rewrite_local] 部分：
   ^https:\/\/cn-cbu-gateway\.ninebot\.com\/portal\/api\/ url script-request-body ninebotCookie.js
2. 在 Quantumult X 配置文件中添加以下内容到 [mitm] 部分：
   hostname = cn-cbu-gateway.ninebot.com

[操作步骤]
打开九号出行APP，进入签到页面即可自动捕获
*/

const $ = {
  read: (key) => {
    if (typeof $persistentStore !== "undefined") return $persistentStore.read(key);
    if (typeof $prefs !== "undefined") return $prefs.valueForKey(key);
  },
  write: (val, key) => {
    if (typeof $persistentStore !== "undefined") return $persistentStore.write(val, key);
    if (typeof $prefs !== "undefined") return $prefs.setValueForKey(val, key);
  },
  notify: (title, sub, msg) => {
    if (typeof $notification !== "undefined") $notification.post(title, sub, msg);
    else if (typeof $notify !== "undefined") $notify(title, sub, msg);
    else console.log(`${title}\n${sub}\n${msg}`);
  },
  done: (obj) => {
    if (typeof $done !== "undefined") {
      if (typeof obj !== "undefined") $done(obj);
      else $done();
    }
  }
};

const cookieKey = "ninebot_cookie_data";

// 只有在包含签到请求时才处理
if ($request.url.indexOf("user-sign") > -1 && $request.url.indexOf("sign") > -1) {
    const authorization = $request.headers["authorization"] || $request.headers["Authorization"];
    
    if (authorization) {
        let deviceId = "";
        try {
            if ($request.body) {
                const bodyObj = JSON.parse($request.body);
                deviceId = bodyObj.deviceId || bodyObj.device_id || "";
            }
        } catch (e) {
            console.log("解析请求体获取deviceId失败: " + e);
        }

        const cookieData = JSON.stringify({
            authorization: authorization,
            deviceId: deviceId,
            userAgent: $request.headers["user-agent"] || $request.headers["User-Agent"],
            updateTime: new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
            url: $request.url
        });

        const oldData = $.read(cookieKey);

        if (oldData !== cookieData) {
            if ($.write(cookieData, cookieKey)) {
                $.notify("九号出行", "🎉 Cookie 获取成功", "授权信息已更新，可以关闭该脚本");
                console.log("九号出行 Cookie 已更新并保存");
            }
        } else {
            console.log("九号出行 Cookie 未变化，静默跳过");
        }
    }
}

$.done({});
