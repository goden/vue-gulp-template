# 重慶時時彩

本專案為「重慶時時彩」的前端專案

# 環境設定

## 初次設定

### Git 安裝

請透過Git指令確認系統中有安裝Git

```
    git --version
```

如果沒有安裝，可透過以下網址下載並安裝 Git

        https://git-scm.com/downloads


下個章節談到的NPM系統，NPM會透過Git來下載指定套件。

### NPM 安裝

請透過npm指令於命令列中確認系統中有安裝 NPM 
```
    npm -v
```

若未安裝，可下載NodeJS。專案採用NPM(Node Package Manager)作為前端套件的管理系統，請先行下載並安裝LTS (Long-term Support)的NodeJS並進行安裝。

        https://nodejs.org/en/


NodeJS是基於Chrome V8引擎的Javascript運行環境，採用Event-Driven、Non-blocking IO的實作概念且包含套件管理系統 NPM 的軟體。

安裝完畢後，以下列指令於命令列中確定NodeJS版本：

```
    node -v
```

本文撰寫時，NodeJS版本為 v8.9.3、NPM版本為 v5.6.0


## 安裝套件

當您下載好專案並完成初次設定後，利用NPM指令再行安裝

```
    npm install
```

NPM 系統會依照package.json檔案中的設定將開發與部署所需函式一次安裝到位。

## 開發專案

本專案是採用Gulp + Browserify作為建構前端程式碼與開發環境部署的工具。
專案中在gulpfile.babel.js 定義了不少的 gulp task，這些task可以協助開發者進行編譯所需程式碼與執行測試環境。

可以透過gulp指令對指定task名進行操作

```
    gulp <taskname>    // taskname 也可以不打
```

程式碼編譯 & 部署
--------------------

有四組task會逕行建置並部署HTML, SCSS, Javascript與IMG，這些task分別為.. 

- build-html： 將src目錄下的html壓縮後部署至dist目錄。

- build-script： 將src/scripts目錄下的*.js檔搭配browserify編譯，browserify將引用的函式庫一併匯入包裝成單個javascript檔，再將程式碼轉譯成符合ECMA 2015的型式後，壓縮並部署至src/js目錄。

- build-style： 將src/styles目錄下的*.scss透過與gulp-sass轉譯器結合對其進行編譯後再部署至dist/css目錄下。

- build-image： 將src/img目錄下所有圖像檔進行壓縮優化後再行部署至dist/img目錄下。

在本專案將其四個專案組合成單一task，執行以下指令進行

```
    gulp build
```

自動編譯 & 部署
-

每次程式碼變更後，都需要執行一次gulp build，著實沒有效率。在此提供另一組 gulp task 隨時監看src目錄，一旦有變更就立刻執行編譯並部署。

```
    gulp watch
```


瀏覽器同步檢視
- 

解決程式碼變更重新建置並部署的議題，在此採用browser-sync來搭建服務器並自動刷新頁面。

```
    gulp browser
```

所以每次src目錄下的程式碼一變更，就會重新建置然後再部署至dist目錄。當dist目錄一有更新，瀏覽器就會更同步更新頁面。





