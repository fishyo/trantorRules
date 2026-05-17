# Trantor Rules

一个支持多平台的通用代理规则和脚本集合，适用于 Quantumult X、Loon、Egern 和 Mihomo。

## 🚀 快速添加 (一键订阅)

### 🔵 Quantumult X

**规则集 (Filter):**
| 规则名称 | 策略 | 说明 | 一键添加 |
|---------|------|------|---------|
| ai | `proxy` | AI 规则 | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fai.snippet%2C%20tag%3Dai%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |
| blockHttpdns | `reject` | 拦截 HTTPDNS | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2FblockHttpdns.snippet%2C%20tag%3DblockHttpdns%2C%20force-policy%3Dreject%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |
| proxyGfwlist | `proxy` | 代理列表 | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2FproxyGfwlist.snippet%2C%20tag%3DproxyGfwlist%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |
| supercell | `proxy` | Supercell 游戏 | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fsupercell.snippet%2C%20tag%3Dsupercell%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |
| telegram | `proxy` | Telegram | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Ftelegram.snippet%2C%20tag%3Dtelegram%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |
| youtube | `proxy` | YouTube | [一键添加](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frules%2Fyoutube.snippet%2C%20tag%3Dyoutube%2C%20force-policy%3Dproxy%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D) |

**重写 (Rewrite):**
- [Google 重写](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frewrite%2FgoogleRewrite.snippet%2C%20tag%3DGoogleRewrite%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D)
- [九号出行 (Ninebot) 签到与 Cookie](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2FquanX%2Frewrite%2Fninebot.snippet%2C%20tag%3DNinebot%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D)

### 🟢 Loon

由于 GitHub 限制，无法直接点击跳转 Loon。请复制以下链接，在 Safari 浏览器中打开，或直接在 Loon 中添加：

**插件 (Plugin):**
- 广告拦截 (Ad Block):
  `loon://import?plugin=https://raw.githubusercontent.com/fishyo/trantorRules/main/loon/plugin/adBlock.lpx`

**规则 (Rule):**
- 代理规则 (Proxy):
  `loon://import?rules=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Floon%2Frules%2Fproxy.lsr`
- Supercell:
  `loon://import?rules=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Floon%2Frules%2Fsupercell.lsr`

### 🟡 Egern

由于 GitHub 限制，请复制以下链接，在 Safari 浏览器中打开导入：

**规则集与小组件 (Modules):**
- 广告拦截 (Ad Block):
  `egern:/modules/new?name=AdBlock&url=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Fegern%2FadBlock.yaml`
- VPS 流量监控 (VPS Widget):
  `egern:/modules/new?name=VPSWidget&url=https%3A%2F%2Fraw.githubusercontent.com%2Ffishyo%2FtrantorRules%2Fmain%2Fegern%2Fwidget%2FvpsWidget.yaml`

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
