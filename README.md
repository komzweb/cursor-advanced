# Cursor AI 開発をマスターする！完全ガイド【応用編】

[note - Cursor AI 開発をマスターする！完全ガイド【応用編】](https://note.com/komzweb/n/n2679df267e73)

## shadcn/ui

```bash
npx shadcn@latest init
```

```bash
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › yes
```

↑ 構成はお好みで

```bash
npx shadcn@latest add tabs
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
```

## Supabase プロジェクト（開発用）

[Supabase ダッシュボード](https://supabase.com/dashboard/projects)で、「**New project**」をクリックする。

- **Organization**: 組織名を選択（例: `TechTube`）
- **Project name**: プロジェクト名を入力（例: `TechTube Dev`）
- **Database Password**: データベースのパスワードを入力（「**Generate a password**」で生成しても良い）
- **Region**: リージョン（サービス提供エリア）を選択（例: `Northeast Asia (Tokyo)`）

「**Create new project**」をクリックして、プロジェクトを作成する。

> 本番用は、別のプロジェクトとして作成する。

## GitHub OAuth アプリケーション（開発用）

1 . [GitHub](https://github.com/) の **Settings** > **Developer Settings** > **OAuth Apps** で新規作成。

- **Application name**: アプリケーション名を入力（例: `TechTube Dev`）
- **Homepage URL**: ホームページの URL を入力（例: `http://localhost:3000`）
- **Authorization callback URL**: 認証コールバック URL を入力（例: `https://<project-ref>.supabase.co/auth/v1/callback`）

> 「**Enable Device Flow**」はチェック不要。

> Callback URL は、Supabase プロジェクト > **Authentication** > **Providers** の **GitHub** を開いてコピーできる。

2 .「**Register application**」をクリックして、アプリケーションを作成する

3 . 作成したアプリケーションの **Client ID** と **Client Secret** をコピーする

4 . Supabase プロジェクト > **Authentication** > **Providers** の **GitHub** に、コピーした情報を設定する

5 .「**GitHub enabled**」をオンにして、「**Save**」をクリックする

> 本番用は、別のアプリケーションとして作成する。

## カスタム SMTP with Resend

1 . [Resend](https://resend.com/) アカウントを作成する

2 . Resend ダッシュボード > **Domains** でドメインを追加する（**独自ドメインが必要**）

3 . Resend ダッシュボード > **API Keys** で API キーを作成する

4 . Supabase プロジェクト > **Project Settings** > **Authentication** > **SMTP Settings** に移動する

4-1 .「**Enable Custom SMTP**」を**オン**にする

4-2 . Resend の SMTP サーバー情報を設定する（[ドキュメント](https://resend.com/docs/send-with-supabase-smtp)）

- **Sender email**: 送信元のメールアドレスを設定（例: `noreply@mail.techtube.com`）
- **Sender name**: 送信元の表示名を設定（例: `TechTube`）
- **Host**: `smtp.resend.com`
- **Port number**: `465`
- **Username**: `resend`
- **Password**:（作成した Resend API キー）

4-3 .「**Save**」をクリックして、有効化する
