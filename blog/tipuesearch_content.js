var tipuesearch = {"pages":[{"title":"About","text":"CMSimfly 內容管理網誌 課程倉儲: https://github.com/chiamingyen/cmsimfly 內容管理: https://chiamingyen.github.io/cmsimfly/ 課程投影片: https://chiamingyen.github.io/cmsimfly/reveal 課程網誌: https://chiamingyen.github.io/cmsimfly/blog","tags":"misc","url":"./pages/about/"},{"title":"40923127 cd2022","text":"NX1980的使用，和設計協同 Git Starting 建立倉儲 先在github建立一個名為cd2022的空倉儲，然後用git clone複製下來，裡面只會有一個.git資料夾，去github的setting>Developer settings>Personal acces tokens 建立一個token方便push(token要用在.git的config裡) 建立網頁 從cmsimde用 git clone --recurse-submodules 網址 接著從cmsimde>up_dir裡複製除了downloads的所有檔案到倉儲裡，即可在根目錄用cms(開啟網頁)和acp(簡易的psuh)指令 上面是錯誤的，那是用在clone有子模組的倉儲，我們是要把子模組導入我們的倉儲，如果不用 1 git submodules add 網址 會缺少一個.gitmoules的檔案，這樣子模組無法運作，網頁也出不來。 git的push動作 1 2 3 git add . git commit -m %message% git push acp就是把這些指令寫在一起的批次檔 NX1980 https://40923127-1.github.io/cd2022/content/1.html","tags":"Misc","url":"./2022-Fall-Intro-to-computer-programming.html"}]};