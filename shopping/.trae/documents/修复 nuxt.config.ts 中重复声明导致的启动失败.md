## 问题诊断

* 报错信息显示“Identifier `path` has already been declared”，定位到 `nuxt.config.ts:159`。

* 在同一文件中 `path` 被重复导入：一次在 `nuxt.config.ts:3`，一次在 `nuxt.config.ts:159`。

* 这会触发解析错误，导致 `yarn dev`（实际运行 `nuxt dev` 脚本）启动失败。

## 修复步骤

1. 删除重复的导入：移除 `nuxt.config.ts:159` 的 `import path from 'path'`。
2. 规范导入位置：将 `import { fileURLToPath } from 'url'` 上移到文件顶部，与其他导入（例如 `nuxt.config.ts:2-3`）放在一起，保证一致性与可读性。
3. 可选整理：合并文件中重复出现的 `experimental` 配置块，只保留一个并包含需要的所有字段，避免后续维护混淆。

## 验证步骤

* 保存修改后运行 `yarn dev`，应正常启动开发服务器且不再出现 ParseError。

* 若仍有异常，提供新的报错信息以继续定位（例如别名路径或缺少文件的错误）。

