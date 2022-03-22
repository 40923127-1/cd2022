var tipuesearch = {"pages": [{'title': 'Starting', 'text': '建立倉儲 \n 先在github建立一個名為cd2022的空倉儲，然後用git clone複製下來，裡面只會有一個.git資料夾，去github的setting>Developer settings>Personal acces tokens 建立一個token方便push(token要用在.git的config裡) \n 建立網頁 \n 從 cmsimde 用 \n git clone --recurse-submodules 網址 \n 接著從cmsimde>up_dir裡複製除了downloads的所有檔案到倉儲裡，即可在根目錄用cms(開啟網頁)和acp(簡易的psuh)指令 \n 上面是錯誤的，那是用在clone有子模組的倉儲，我們是要把子模組導入我們的倉儲，如果不用 \n  git submodules add 網址 \n \n 會缺少一個.gitmoules的檔案，這樣子模組無法運作，網頁也出不來。 \n \n git的push動作 \n git add .\ngit commit -m %message%\ngit push\n\n \n acp就是把這些指令寫在一起的批次檔 \n', 'tags': '', 'url': 'Starting.html'}, {'title': '13', 'text': '\n from browser import html\nfrom browser import document\nimport random\n\nbrython_div = document["brython_div"]\n\n# 根據 href 與 content 將 html 元件中的 anchor 插入頁面\ndef makeLink(href, content):\n    brython_div <= html.A(content, href=href)\n    #brython_div <= html.BR()\n\naorb = "b"\nurl = "https://mde.tw/studlist/2022spring/2b.txt"\ncourse = "cd2022"\n# 從 url 讀取資料後, 以跳行符號分割資料進入數列後\n# 去除數列中的第一筆與最後一筆資料後可得每位學員所填的資料\ndata = open(url).read().split("\\n")[1:-1]\n#print(data)\n# 再以 \\t 分割每位學員的資料, \n#可以取得每位學員的學號, github 帳號與組別\nbig = []\nnum_github = {}\nfor i in data:\n    stud_no, github, grp_no = i.split("\\t")\n    #print(stud_no, github, grp_no)\n    big.append([stud_no, github, grp_no])\n    if github != "":\n        num_github[stud_no] = github\n    else:\n        num_github[stud_no] = stud_no\n#print(big)\n# 根據每一 element 的第三個 element sort\nbig.sort(key = lambda x: x[2])\n# big 已經按照組別排序\n#print(big)\nungrouped = []\ngrouped = []\nfor i in big:\n    if i[2] == "":\n        ungrouped.append(i[0])\n    else:\n        # 將組別放到第一位置\n        grouped.append([i[2], i[0]])\n#print(grouped)\n#print(ungrouped)\nd = {}\n# 逐一檢視 grouped 數列\nfor i in grouped:\n    # 若該組序已存在 d dict 中,\n    # 則以 extend() 納入除組序之外的組員學號\n    if i[0] in d:\n        d[i[0]].extend(i[1:])\n        #print("i[0] in d:",i[0], "d:", d)\n    else:\n        # 若已納分組的 element 中之組序為全新組序,\n        # 則將該已納分組的 element 放入 dict 首位元素\n        # 準備透過 extend() 納入其他組員學號\n        d[i[0]] = i\n        #print("i i[0] not in d:", i, "d:", d)\n#print("finally d:", d, "d.values():", d.values())\ngroup_member = list(d.values())\n# group_member 第一位為組序, 隨後為組員學號\n#print(group_member)\nrandom.shuffle(ungrouped)\n#print("ungrouped:" + str(len(ungrouped)))\ngrp = 1\ngroup = []\nfor i in group_member:\n    #print("grp " + str(i[0]) + ": num, " + str(len(i[1:])))\n    if len(i[1:]) < 8:\n        #print("can take " + str(8 - len(i[1:])) + "members")\n        # 若仍有學員未納組, 則可根據缺額補入學員學號\n        try:\n            #print("add " + str(ungrouped[:8-len(i[1:])]))\n            i.extend(list(ungrouped[:8-len(i[1:])]))\n            # 拿掉已經分配組別的學員學號\n            ungrouped = ungrouped[8-len(i[1:]):]\n        except:\n            #print("no member to add!")\n            pass\n    else:\n        #print("full")\n        pass\n    # 根據增量決定組序\n    i[0] = str(grp)\n    group.append(i)\n    grp += 1\n#print(group)\nfor i in group:\n    brython_div <= "第" + str(i[0]) + "組:" + html.BR()\n    grp_repo = course + aorb + "g" + str(i[0])\n    for num in i[1:]:\n        # num 為各組組員學號\n        #print(num)\n        studhref = "https://"+ str(num_github[num]) + ".github.io/" + course\n        repohref = "https://github.com/"+ str(num_github[num]) +"/"+course\n        grphref = "https://"+ str(num_github[num]) + ".github.io/" + grp_repo\n        grp_repohref = "https://github.com/"+ str(num_github[num]) +"/" + grp_repo       \n        brython_div <= "repo: "\n        makeLink(repohref, str(num))\n        brython_div <= " www: "\n        makeLink(studhref, str(num))\n        brython_div <= " " + grp_repo + "-repo: "\n        makeLink(grp_repohref, str(num))\n        brython_div <= " " + grp_repo + "-www: "\n        makeLink(grphref, str(num))\n        brython_div <= html.BR()\nprint("done") \n', 'tags': '', 'url': '13.html'}, {'title': '20220316', 'text': '\n 今天建立小組倉儲同步 \n 小組倉儲 \n', 'tags': '', 'url': '20220316.html'}, {'title': 'NX1980', 'text': '\n \n 教學影片 \n \n NX Tutorial 1 - View Controls - Version 1855 \n 如何使用滑鼠控制視角 \n F8正視 \n ctrl+H/clip section 剖面 \n Show and hide 顯示設定 \n fIT/Ctrl+f 重製視角 \n', 'tags': '', 'url': 'NX1980.html'}, {'title': '1', 'text': '\n \n \n \n \n   \n \n \n \n \n \n \n \n \n', 'tags': '', 'url': '1.html'}]};