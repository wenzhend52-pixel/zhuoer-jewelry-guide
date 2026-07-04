# 卓尔：店内五行珠宝导购工具

这是一个移动端优先的店内珠宝顾问 MVP。客户到店后扫码打开页面，输入出生日期、出生时间和出生城市，系统生成八字五行参考、五行气质画像和珠宝搭配建议，方便店员进行现场推荐与试戴沟通。

本项目不是线上电商网站，不包含购物车、在线支付、订单、物流和线上成交流程。

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- lunar-javascript
- Mock 数据
- 预留 Supabase 接入
- 适合部署到 Vercel

## 当前页面

- `/` 首页
- `/test` 八字五行珠宝分析
- `/result` 八字五行珠宝建议结果
- `/elements` 五行珠宝方向说明
- `/inspirations` 五行珠宝灵感
- `/jewelries` 店内珠宝展示
- `/jewelries/[slug]` 珠宝详情展示
- `/admin` 后台管理基础页，第一版不在公开导航展示

## 当前数据

第一版使用 mock 数据，不连接 Supabase。

主要数据位置：

- `lib/jewelries.ts`：店内珠宝样式 mock 数据
- `data/jewelry-rules.ts`：五行对应颜色、宝石、材质与话术
- `data/element-support-rules.ts`：辅助五行判断规则配置

## 本地运行

```bash
pnpm install
pnpm dev
```

打开：

```bash
http://127.0.0.1:3000
```

## 构建检查

```bash
pnpm build
```

## 部署到 Vercel

1. 将项目上传到 GitHub。
2. 登录 Vercel。
3. 选择 `Add New Project`。
4. 导入 GitHub 仓库。
5. Framework Preset 选择 `Next.js`。
6. Build Command 使用默认：

```bash
pnpm build
```

7. 部署成功后，会得到一个公网地址，例如：

```bash
https://your-project.vercel.app
```

8. 用该地址生成门店二维码，客户扫码即可使用。

## 正式上线前建议

- 后台管理页目前没有登录系统，已从公开导航隐藏。
- 如果要让店员使用后台，建议后续接入登录或访问码。
- 第一版不存客户姓名和手机号。
- 结果仅作为到店试戴参考，不做绝对化判断。
- 后续可接入 Supabase 保存珠宝资料、推荐话术和测试结果。
