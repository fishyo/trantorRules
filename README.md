# Trantor Rules

一个支持多平台的通用代理规则和脚本集合，适用于 Quantumult X、Loon、Egern 和 Mihomo。

## 🚀 快速添加 (一键订阅)

### 🔵 Quantumult X

**分流规则 (Filter):**

| 规则 | 策略 | 说明 | 一键添加 | 复制链接 |
|------|------|------|---------|---------|
| ai | `proxy` | AI 规则 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fai.snippet%2C%20tag%3Dai%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/ai.snippet) |
| blockHttpdns | `reject` | 拦截 HTTPDNS | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2FblockHttpdns.snippet%2C%20tag%3DblockHttpdns%2C%20force-policy%3Dreject%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/blockHttpdns.snippet) |
| proxyGfwlist | `proxy` | 代理列表 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2FproxyGfwlist.snippet%2C%20tag%3DproxyGfwlist%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/proxyGfwlist.snippet) |
| supercell | `proxy` | Supercell 游戏 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fsupercell.snippet%2C%20tag%3Dsupercell%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/supercell.snippet) |
| telegram | `proxy` | Telegram | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Ftelegram.snippet%2C%20tag%3Dtelegram%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/telegram.snippet) |
| youtube | `proxy` | YouTube | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fyoutube.snippet%2C%20tag%3Dyoutube%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rules/youtube.snippet) |

**重写规则 (Rewrite):**

| 名称 | 说明 | 一键添加 | 复制链接 |
|------|------|---------|---------|
| GoogleRewrite | Google 重定向 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frewrite%2FgoogleRewrite.snippet%2C%20tag%3DGoogleRewrite%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rewrite/googleRewrite.snippet) |
| Ninebot | 九号出行 Cookie 获取 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frewrite%2Fninebot.snippet%2C%20tag%3DNinebot%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rewrite/ninebot.snippet) |
| tonghuashun | 同花顺去广告 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frewrite%2Ftonghuashun.snippet%2C%20tag%3Dtonghuashun%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) | [Copy](https://raw.githubusercontent.com/fishyo/trantorRules/main/quanX/rewrite/tonghuashun.snippet) |

### 🟢 Loon

**插件 (Plugin):**

| 名称 | 说明 | 一键导入 | 复制链接 |
|------|------|---------|---------|
| adBlock | 广告拦截 | [导入](https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/plugin/adBlock.lpx) | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/plugin/adBlock.lpx) |

**规则 (Rule):**

| 名称 | 说明 | 一键导入 | 复制链接 |
|------|------|---------|---------|
| proxy | 代理规则 | [导入](https://www.nsloon.com/openloon/import?rules=https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/proxy.lsr) | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/proxy.lsr) |
| supercell | Supercell 直连 | [导入](https://www.nsloon.com/openloon/import?rules=https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/supercell.lsr) | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/supercell.lsr) |

### 🟡 Egern

*(注：部分平台不支持识别 `egern://` 协议跳转，如点击无效请直接复制链接导入)*

**模块与小组件 (Module):**

| 名称 | 说明 | 一键导入 | 复制链接 |
|------|------|---------|---------|
| AdBlock | 自用广告拦截 | [导入](egern://modules/new?name=AdBlock&url=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Fegern%2FadBlock.yaml) | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/egern/adBlock.yaml) |
| VPSWidget | VPS 流量监控组件 | [导入](egern://modules/new?name=VPSWidget&url=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Fegern%2Fwidget%2FvpsWidget.yaml) | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/egern/widget/vpsWidget.yaml) |

### 🐱 Mihomo / Clash

**规则提供者 (Rule Providers):**

| 名称 | 说明 | 复制链接 |
|------|------|---------|
| proxy | 代理规则 | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/mihomo/proxy.yaml) |
| supercell | Supercell 直连 | [复制](https://raw.githubusercontent.com/fishyo/trantorRules/main/mihomo/supercell.yaml) |

### 🧰 BoxJS 订阅

**一键订阅本项目的 BoxJS：**
[点击添加 BoxJS](http://boxjs.com/#/sub/add/https://raw.githubusercontent.com/fishyo/trantorRules/main/script/boxjs.json) | [复制订阅链接](https://raw.githubusercontent.com/fishyo/trantorRules/main/script/boxjs.json)

---

## 🛠️ 管理 Quantumult X 规则
本项目提供了一个 Node.js 转换器，可以将 ACL4SSR 规则转换为 Quantumult X 格式：
```bash
cd quanX/converter
node convert.js --help
```

---

## ⚠️ 免责声明

1. 本项目内所有资源文件、脚本及代理规则仅供**学习和技术交流使用**，请在下载后 24 小时内自觉删除。
2. 脚本和规则均搜集自互联网或根据公开文档编写，不保证其完全准确、安全及可用性。
3. 请合理、合法地使用本项目内容，严禁用于任何商业用途或非法牟利。
4. 对于任何因使用本仓库内容（包括但不限于修改代理配置、运行脚本）而导致的隐私泄漏、设备故障、账号封禁或其他直接或间接损失，**本项目及代码贡献者概不负责**。
5. **使用（包括但不限于下载、分发、查阅或运行）本项目的任何内容，即代表您已充分知晓并同意本免责声明。**
