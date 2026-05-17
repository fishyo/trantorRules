#!/usr/bin/env node
'use strict';

/**
 * ACL4SSR → Quantumult X 规则转换器
 *
 * 转换:
 *   node convert.js                          # 转换 enabled: true 的规则
 *   node convert.js BanAD YouTube            # 指定规则名（空格分隔，不区分大小写）
 *   node convert.js --all                    # 强制转换所有规则
 *
 * 管理规则源:
 *   node convert.js --list                   # 列出所有规则源及状态
 *   node convert.js --add <名称> <URL> [策略] [分类]  # 添加新规则源（默认启用）
 *   node convert.js --remove <名称>          # 删除规则源
 *   node convert.js --enable  <名称> [...]   # 设为默认启用
 *   node convert.js --disable <名称> [...]   # 设为默认禁用
 *
 * 策略默认值: proxy   分类默认值: 自定义
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

// ─── ANSI 颜色 ────────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
};
const fmt = (color, s) => `${color}${s}${C.reset}`;

// ─── 类型映射 Clash → Quantumult X ───────────────────────────
const TYPE_MAP = {
  'DOMAIN-SUFFIX':  'host-suffix',
  'DOMAIN-KEYWORD': 'host-keyword',
  'DOMAIN':         'host',
  'IP-CIDR':        'ip-cidr',
  'IP-CIDR6':       'ip6-cidr',
  'GEOIP':          'geoip',
};
// USER-AGENT 在 HTTPS 下无效，静默跳过
const SKIP_TYPES = new Set(['USER-AGENT', 'PROCESS-NAME', 'URL-REGEX']);
const IP_TYPES   = new Set(['IP-CIDR', 'IP-CIDR6', 'GEOIP']);

// ─── 解析规则内容（兼容纯文本 & YAML payload 格式）───────────
function parseContent(raw) {
  const rules = [];
  let lines = [];

  if (/^\s*payload\s*:/m.test(raw)) {
    // YAML payload 格式：截取 payload 块，逐行去掉 "- " 前缀
    const m = raw.match(/payload\s*:\s*\n([\s\S]*)/);
    if (m) {
      lines = m[1].split('\n').map(l =>
        l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '').trim()
      );
    }
  } else {
    // 纯文本格式：去掉行内注释（# ; //）
    lines = raw.split(/\r?\n/).map(l => l.split(/\s+[#;]|\/\//)[0].trim());
  }

  for (const line of lines) {
    if (!line || /^[#;/]/.test(line)) continue;

    const parts = line.split(',').map(p => p.trim());
    if (parts.length < 2) continue;

    const type = parts[0].toUpperCase();
    if (SKIP_TYPES.has(type)) continue;
    if (!TYPE_MAP[type]) continue;

    const value     = parts[1];
    const noResolve = parts.some(p => p.toLowerCase() === 'no-resolve');
    rules.push({ type, value, noResolve });
  }

  return rules;
}

// ─── 生成 QX 规则行 ───────────────────────────────────────────
function toQXLines(rules, policy) {
  return rules.map(r => {
    let line = `${TYPE_MAP[r.type]}, ${r.value}, ${policy}`;
    // IP 类规则保留 no-resolve 标记
    if (r.noResolve && IP_TYPES.has(r.type)) line += ', no-resolve';
    return line;
  });
}

// ─── HTTP/HTTPS 获取，支持重定向 ─────────────────────────────
function fetchURL(url, hops = 5) {
  return new Promise((resolve, reject) => {
    if (hops === 0) return reject(new Error('重定向次数过多'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'qx-converter/2.0' } }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        return fetchURL(res.headers.location, hops - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('请求超时')); });
    req.on('error', reject);
  });
}

// ─── 保存配置到 sources.json ─────────────────────────────────
function saveConfig(configPath, config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

// ─── 转换单个规则源 ───────────────────────────────────────────
async function convertSource(src, outputDir) {
  const { name, url, policy } = src;

  // 策略颜色
  const policyColor = policy === 'reject' ? C.red : policy === 'direct' ? C.green : C.blue;
  console.log(`\n  ${fmt(C.bold + C.cyan, name)} ${fmt(C.dim, '→')} ${fmt(policyColor, policy)}`);

  let raw;
  try {
    raw = await fetchURL(url);
  } catch (e) {
    console.log(`  ${fmt(C.red, '✗')} 获取失败: ${e.message}`);
    return null;
  }

  const rules = parseContent(raw);
  const lines = toQXLines(rules, policy);
  const skipped = rules.length - lines.length;

  console.log(`  ${fmt(C.dim, '·')} 解析 ${fmt(C.bold, rules.length)} 条 → 输出 ${fmt(C.bold, lines.length)} 条${skipped ? fmt(C.dim, `（跳过 ${skipped} 条不支持类型）`) : ''}`);

  // 构建输出文件内容
  const ts      = new Date().toISOString();
  const ghRepo  = url.match(/githubusercontent\.com\/([^/]+\/[^/]+)/)?.[1];
  const srcLink = ghRepo ? `https://github.com/${ghRepo}` : url;
  const content = [
    `# ${name}`,
    `# Source: ${srcLink}`,
    `# Policy: ${policy} | Generated: ${ts} | Rules: ${lines.length}`,
    '',
    ...lines,
    '',
  ].join('\n');

  const filename   = `${name}.snippet`;
  const outputPath = path.join(outputDir, filename);
  try {
    let oldContent = '';
    if (fs.existsSync(outputPath)) {
      oldContent = fs.readFileSync(outputPath, 'utf-8');
    }

    const normalize = str => str.replace(/Generated: .*? \|/, 'Generated: TIMESTAMP |').replace(/\r\n/g, '\n');

    if (oldContent && normalize(oldContent) === normalize(content)) {
      console.log(`  ${fmt(C.green, '✓')} 规则无变动，跳过更新 ${fmt(C.dim, outputPath)}`);
    } else {
      fs.writeFileSync(outputPath, content, 'utf-8');
      console.log(`  ${fmt(C.green, '✓')} 已保存 ${fmt(C.dim, outputPath)}`);
    }
  } catch (e) {
    console.log(`  ${fmt(C.red, '✗')} 处理失败: ${e.message}`);
    return null;
  }

  return { name, filename, policy, count: lines.length };
}

// ─── 主流程 ───────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h') || args.includes('help')) {
    console.log(`
${fmt(C.bold, '🚀 ACL4SSR → Quantumult X 规则转换器')}

${fmt(C.bold, '用法:')}
  node convert.js [选项] [规则名...]

${fmt(C.bold, '选项 (转换):')}
  (无参数)                          转换所有已启用的规则 (enabled: true)
  <规则名> [规则名2...]             转换指定的规则（忽略大小写，无论是否启用）
  -a, --all                         强制转换所有规则
  -l, --list                        列出所有配置及状态

${fmt(C.bold, '管理配置:')}
  --add <名称> <URL> [策略] [分类]  添加新的自定义规则源
  --remove <名称>                   删除指定的规则源
  --enable <名称> [名称2...]        将指定的规则源设为启用
  --disable <名称> [名称2...]       将指定的规则源设为禁用

${fmt(C.dim, '说明: 增删启停等操作会自动同步更新 README.md 中的一键添加链接。')}
`);
    return;
  }

  // 读取配置
  const configPath = path.join(__dirname, 'sources.json');
  if (!fs.existsSync(configPath)) {
    console.error(fmt(C.red, '✗ 未找到 sources.json，请检查 converter/ 目录'));
    process.exit(1);
  }
  const config    = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const outputDir = path.resolve(__dirname, config.outputDir || '../rules');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // ── --add：添加新规则源 ──
  if (args.includes('--add')) {
    const idx = args.indexOf('--add');
    const rest = args.slice(idx + 1).filter(a => !a.startsWith('--'));
    const [name, url, policy = 'proxy', category = '自定义'] = rest;

    if (!name || !url) {
      console.error(fmt(C.red, '用法: node convert.js --add <名称> <URL> [策略] [分类]'));
      console.error(fmt(C.dim, '示例: node convert.js --add MyAI https://raw.../AI.list proxy 常用服务'));
      process.exit(1);
    }
    if (config.sources.find(s => s.name.toLowerCase() === name.toLowerCase())) {
      console.error(fmt(C.red, `✗ 规则源 "${name}" 已存在，请先 --remove 再添加，或直接修改 sources.json`));
      process.exit(1);
    }

    const entry = { name, url, policy, category, enabled: true };
    config.sources.push(entry);
    saveConfig(configPath, config);

    const polColor = policy === 'reject' ? C.red : policy === 'direct' ? C.green : C.blue;
    console.log(`\n  ${fmt(C.green, '✓')} 已添加规则源 ${fmt(C.bold, name)}`);
    console.log(`    ${fmt(C.dim, 'URL:')}      ${url}`);
    console.log(`    ${fmt(C.dim, '策略:')}     ${fmt(polColor, policy)}`);
    console.log(`    ${fmt(C.dim, '分类:')}     ${category}`);
    console.log(`    ${fmt(C.dim, '状态:')}     ${fmt(C.green, '默认启用')}`);
    updateReadme(config);
    console.log(fmt(C.dim, `\n  运行 node convert.js ${name} 立即转换\n`));
    return;
  }

  // ── --remove：删除规则源 ──
  if (args.includes('--remove')) {
    const idx  = args.indexOf('--remove');
    const name = args[idx + 1];
    if (!name) {
      console.error(fmt(C.red, '用法: node convert.js --remove <名称>'));
      process.exit(1);
    }
    const before = config.sources.length;
    config.sources = config.sources.filter(s => s.name.toLowerCase() !== name.toLowerCase());
    if (config.sources.length === before) {
      console.error(fmt(C.yellow, `⚠ 未找到规则源: ${name}`));
      process.exit(1);
    }
    saveConfig(configPath, config);
    console.log(`\n  ${fmt(C.green, '✓')} 已删除规则源 ${fmt(C.bold, name)}`);
    updateReadme(config);
    console.log();
    return;
  }

  // ── --enable / --disable：切换启用状态 ──
  for (const flag of ['--enable', '--disable']) {
    if (args.includes(flag)) {
      const idx    = args.indexOf(flag);
      const names  = args.slice(idx + 1).filter(a => !a.startsWith('--'));
      const enable = flag === '--enable';

      if (!names.length) {
        console.error(fmt(C.red, `用法: node convert.js ${flag} <名称> [名称2 ...]`));
        process.exit(1);
      }

      let changed = 0;
      for (const name of names) {
        const src = config.sources.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (!src) {
          console.warn(`  ${fmt(C.yellow, '⚠')} 未找到规则源: ${name}`);
          continue;
        }
        src.enabled = enable;
        console.log(`  ${fmt(C.green, '✓')} ${fmt(C.bold, src.name)} → ${enable ? fmt(C.green, '启用') : fmt(C.dim, '禁用')}`);
        changed++;
      }
      if (changed) {
        saveConfig(configPath, config);
        console.log(fmt(C.dim, '\n  已更新 sources.json'));
        updateReadme(config);
        console.log();
      }
      return;
    }
  }

  // ── --list：列出所有预设 ──
  if (args.includes('--list') || args.includes('-l')) {
    console.log(`\n${fmt(C.bold, '预设规则源')}  ${fmt(C.dim, '✓=默认启用  ○=禁用')}\n`);
    const cats = {};
    for (const s of config.sources) (cats[s.category] ??= []).push(s);
    for (const [cat, list] of Object.entries(cats)) {
      console.log(`  ${fmt(C.yellow, cat)}`);
      for (const s of list) {
        const tick = s.enabled ? fmt(C.green, '✓') : fmt(C.dim, '○');
        const pol  = s.policy === 'reject' ? fmt(C.red, s.policy)
                   : s.policy === 'direct' ? fmt(C.green, s.policy)
                   : fmt(C.blue, s.policy);
        console.log(`    ${tick} ${s.name.padEnd(22)} ${pol}`);
      }
    }
    console.log(`\n  ${fmt(C.dim, '管理命令: --add  --remove  --enable  --disable')}\n`);
    return;
  }

  // ── 确定要转换的目标 ──
  let targets;
  if (args.includes('--all') || args.includes('-a')) {
    targets = config.sources;
  } else if (args.filter(a => !a.startsWith('-')).length > 0) {
    // 按名称指定（不区分大小写）
    const names = args.filter(a => !a.startsWith('-')).map(n => n.toLowerCase());
    targets = names.map(n => {
      const found = config.sources.find(s => s.name.toLowerCase() === n);
      if (!found) console.warn(`  ${fmt(C.yellow, '⚠')} 未找到规则源: ${n}`);
      return found;
    }).filter(Boolean);
  } else {
    targets = config.sources.filter(s => s.enabled);
  }

  if (!targets.length) {
    console.log(fmt(C.yellow, '\n没有可转换的规则源。用 --list 查看所有预设，或在 sources.json 中设置 enabled: true\n'));
    process.exit(0);
  }

  // ── 开始转换 ──
  const bar = '─'.repeat(52);
  console.log(`\n${fmt(C.bold, '🚀 QX 规则转换器')}  ${fmt(C.dim, `共 ${targets.length} 个规则源`)}`);
  console.log(fmt(C.dim, bar));

  const results = [];
  for (const src of targets) {
    const r = await convertSource(src, outputDir);
    if (r) results.push(r);
  }

  if (!results.length) {
    console.log(`\n${fmt(C.red, '转换失败，未生成任何文件')}\n`);
    process.exit(1);
  }

  // ── 输出 filter_remote 配置块 ──
  console.log(`\n${fmt(C.dim, bar)}`);
  console.log(`\n${fmt(C.bold, '📋 Quantumult X [filter_remote] 配置')}`);
  console.log(fmt(C.dim, '将以下内容添加到 QX 配置文件（替换 your-server 为实际域名/IP）\n'));
  console.log(fmt(C.dim, '[filter_remote]'));
  for (const r of results) {
    console.log(
      `${fmt(C.cyan, `https://your-server/rules/${r.filename}`)}, ` +
      `tag=${r.name}, force-policy=${r.policy}, ` +
      `update-interval=86400, opt-parser=false, enabled=true`
    );
  }

  // ── 更新 README 快捷链接 ──
  updateReadme(config);

  const total = results.reduce((s, r) => s + r.count, 0);
  console.log(`\n${fmt(C.bold + C.green, '✓ 完成！')} 共 ${results.length} 个文件，${total} 条规则`);
  console.log(fmt(C.dim, `输出目录: ${outputDir}\n`));
}

main().catch(e => {
  console.error(`\n${fmt(C.red, `致命错误: ${e.message}`)}\n`);
  process.exit(1);
});

// ─── 更新 README 快捷链接 ──────────────────────────────────────
function updateReadme(config) {
  const readmePath = path.join(__dirname, '../../README.md');
  if (!fs.existsSync(readmePath)) return;

  const rawBase = 'https://raw.githubusercontent.com/fishyo/trantorRules/main/quantumultx/rules';
  const enabledSources = config.sources.filter(s => s.enabled);
  
  const tableLines = [
    '<!-- RULES_TABLE_START -->',
    '| 规则 | 策略 | 说明 | 一键添加 |',
    '|------|------|------|---------|'
  ];
  for (const s of enabledSources) {
    const link = `${rawBase}/${s.name}.snippet, tag=${s.name}, force-policy=${s.policy}, update-interval=86400, opt-parser=false, enabled=true`;
    const addUrl = `https://quantumult.app/x/open-app/add-resource?remote-resource=${encodeURIComponent(JSON.stringify({ filter_remote: [link] }))}`;
    tableLines.push(`| ${s.name} | \`${s.policy}\` | ${s.category} | [Add](${addUrl}) |`);
  }
  tableLines.push('<!-- RULES_TABLE_END -->');
  
  const codeLines = ['<!-- RULES_CODE_START -->', '```'];
  for (const s of enabledSources) {
    codeLines.push(`${rawBase}/${s.name}.snippet, tag=${s.name}, force-policy=${s.policy}, update-interval=86400, opt-parser=false, enabled=true`);
  }
  codeLines.push('```', '<!-- RULES_CODE_END -->');
  
  let readme = fs.readFileSync(readmePath, 'utf-8');
  const oldReadme = readme;
  
  readme = readme.replace(/<!-- RULES_TABLE_START -->[\s\S]*<!-- RULES_TABLE_END -->/, tableLines.join('\n'));
  readme = readme.replace(/<!-- RULES_CODE_START -->[\s\S]*<!-- RULES_CODE_END -->/, codeLines.join('\n'));
  
  if (readme !== oldReadme) {
    fs.writeFileSync(readmePath, readme, 'utf-8');
    console.log(`\n  ${fmt(C.green, '✓')} 已自动更新 ${fmt(C.bold, 'README.md')} 的快捷添加链接`);
  }
}
