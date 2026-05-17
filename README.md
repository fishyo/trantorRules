# Trantor Rules

一个支持多平台的通用代理规则和脚本集合，适用于 Quantumult X、Loon、Egern 和 Mihomo。

## 🚀 快速添加 (一键订阅)

### 🔵 Quantumult X

**规则集 (Filter):**
| 规则名称 | 策略 | 说明 | 一键添加 |
|---------|------|------|---------|
| ai | `proxy` | AI 规则 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/ai.snippet, tag=ai, force-policy=proxy, update-interval=86400, opt-parser=false, enabled=true"]}) |
| blockHttpdns | `reject` | 拦截 HTTPDNS | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/blockHttpdns.snippet, tag=blockHttpdns, force-policy=reject, update-interval=86400, opt-parser=false, enabled=true"]}) |
| proxyGfwlist | `proxy` | 代理列表 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/proxyGfwlist.snippet, tag=proxyGfwlist, force-policy=proxy, update-interval=86400, opt-parser=false, enabled=true"]}) |
| supercell | `proxy` | Supercell 游戏 | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/supercell.snippet, tag=supercell, force-policy=proxy, update-interval=86400, opt-parser=false, enabled=true"]}) |
| telegram | `proxy` | Telegram | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/telegram.snippet, tag=telegram, force-policy=proxy, update-interval=86400, opt-parser=false, enabled=true"]}) |
| youtube | `proxy` | YouTube | [Add](https://quantumult.app/x/open-app/add-resource?remote-resource={"filter_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules/youtube.snippet, tag=youtube, force-policy=proxy, update-interval=86400, opt-parser=false, enabled=true"]}) |

**重写 (Rewrite):**
- [Google 重写](https://quantumult.app/x/open-app/add-resource?remote-resource={"rewrite_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rewrite/googleRewrite.snippet, tag=GoogleRewrite, update-interval=86400, opt-parser=false, enabled=true"]})
- [九号出行 (Ninebot) 签到与 Cookie](https://quantumult.app/x/open-app/add-resource?remote-resource={"rewrite_remote":["https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rewrite/ninebot.snippet, tag=Ninebot, update-interval=86400, opt-parser=false, enabled=true"]})

### 🟢 Loon

**插件 (Plugin):**
- [广告拦截 (Ad Block)](loon://import?plugin=https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/plugin/adBlock.lpx)

**规则 (Rule):**
- [代理规则 (Proxy)](https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/proxy.lsr)
- [Supercell](https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/rules/supercell.lsr)

### 🟡 Egern

**规则集:**
- [广告拦截 (Ad Block)](https://raw.githubusercontent.com/fishyo/trantorRules/main/egern/adBlock.yaml)

**小组件 (Widget):**
- [VPS 流量监控 (VPS Widget)](https://raw.githubusercontent.com/fishyo/trantorRules/main/egern/widget/vpsWidget.yaml)

### 🐱 Mihomo / Clash

**规则提供者 (Rule Providers):**
- [代理规则 (Proxy)](https://raw.githubusercontent.com/fishyo/trantorRules/main/mihomo/proxy.yaml)
- [Supercell](https://raw.githubusercontent.com/fishyo/trantorRules/main/mihomo/supercell.yaml)

### 🧰 BoxJS 订阅

点击下方链接一键订阅本项目的 BoxJS：
- [一键添加 BoxJS 订阅](http://boxjs.com/#/sub/add/https://raw.githubusercontent.com/fishyo/trantorRules/main/script/boxjs.json)

---

## 🛠️ 管理 Quantumult X 规则
本项目提供了一个 Node.js 转换器，可以将 ACL4SSR 规则转换为 Quantumult X 格式：
```bash
cd quantumultx/converter
node convert.js --help
```
