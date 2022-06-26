var tipuesearch = {"pages": [{'title': 'Starting', 'text': '建立倉儲 \n 先在github建立一個名為cd2022的空倉儲，然後用git clone複製下來，裡面只會有一個.git資料夾，去github的setting>Developer settings>Personal acces tokens 建立一個token方便push(token要用在.git的config裡) \n 建立網頁 \n 從 cmsimde 用 \n git clone --recurse-submodules 網址 \n 接著從cmsimde>up_dir裡複製除了downloads的所有檔案到倉儲裡，即可在根目錄用cms(開啟網頁)和acp(簡易的psuh)指令 \n 上面是錯誤的，那是用在clone有子模組的倉儲，我們是要把子模組導入我們的倉儲，如果不用 \n  git submodules add 網址 \n \n 會缺少一個.gitmoules的檔案，這樣子模組無法運作，網頁也出不來。 \n \n git的push動作 \n git add .\ngit commit -m %message%\ngit push\n\n \n acp就是把這些指令寫在一起的批次檔 \n', 'tags': '', 'url': 'Starting.html'}, {'title': '13', 'text': '\n from browser import html\nfrom browser import document\nimport random\n\nbrython_div = document["brython_div"]\n\n# 根據 href 與 content 將 html 元件中的 anchor 插入頁面\ndef makeLink(href, content):\n    brython_div <= html.A(content, href=href)\n    #brython_div <= html.BR()\n\naorb = "b"\nurl = "https://mde.tw/studlist/2022spring/2b.txt"\ncourse = "cd2022"\n# 從 url 讀取資料後, 以跳行符號分割資料進入數列後\n# 去除數列中的第一筆與最後一筆資料後可得每位學員所填的資料\ndata = open(url).read().split("\\n")[1:-1]\n#print(data)\n# 再以 \\t 分割每位學員的資料, \n#可以取得每位學員的學號, github 帳號與組別\nbig = []\nnum_github = {}\nfor i in data:\n    stud_no, github, grp_no = i.split("\\t")\n    #print(stud_no, github, grp_no)\n    big.append([stud_no, github, grp_no])\n    if github != "":\n        num_github[stud_no] = github\n    else:\n        num_github[stud_no] = stud_no\n#print(big)\n# 根據每一 element 的第三個 element sort\nbig.sort(key = lambda x: x[2])\n# big 已經按照組別排序\n#print(big)\nungrouped = []\ngrouped = []\nfor i in big:\n    if i[2] == "":\n        ungrouped.append(i[0])\n    else:\n        # 將組別放到第一位置\n        grouped.append([i[2], i[0]])\n#print(grouped)\n#print(ungrouped)\nd = {}\n# 逐一檢視 grouped 數列\nfor i in grouped:\n    # 若該組序已存在 d dict 中,\n    # 則以 extend() 納入除組序之外的組員學號\n    if i[0] in d:\n        d[i[0]].extend(i[1:])\n        #print("i[0] in d:",i[0], "d:", d)\n    else:\n        # 若已納分組的 element 中之組序為全新組序,\n        # 則將該已納分組的 element 放入 dict 首位元素\n        # 準備透過 extend() 納入其他組員學號\n        d[i[0]] = i\n        #print("i i[0] not in d:", i, "d:", d)\n#print("finally d:", d, "d.values():", d.values())\ngroup_member = list(d.values())\n# group_member 第一位為組序, 隨後為組員學號\n#print(group_member)\nrandom.shuffle(ungrouped)\n#print("ungrouped:" + str(len(ungrouped)))\ngrp = 1\ngroup = []\nfor i in group_member:\n    #print("grp " + str(i[0]) + ": num, " + str(len(i[1:])))\n    if len(i[1:]) < 8:\n        #print("can take " + str(8 - len(i[1:])) + "members")\n        # 若仍有學員未納組, 則可根據缺額補入學員學號\n        try:\n            #print("add " + str(ungrouped[:8-len(i[1:])]))\n            i.extend(list(ungrouped[:8-len(i[1:])]))\n            # 拿掉已經分配組別的學員學號\n            ungrouped = ungrouped[8-len(i[1:]):]\n        except:\n            #print("no member to add!")\n            pass\n    else:\n        #print("full")\n        pass\n    # 根據增量決定組序\n    i[0] = str(grp)\n    group.append(i)\n    grp += 1\n#print(group)\nfor i in group:\n    brython_div <= "第" + str(i[0]) + "組:" + html.BR()\n    grp_repo = course + aorb + "g" + str(i[0])\n    for num in i[1:]:\n        # num 為各組組員學號\n        #print(num)\n        studhref = "https://"+ str(num_github[num]) + ".github.io/" + course\n        repohref = "https://github.com/"+ str(num_github[num]) +"/"+course\n        grphref = "https://"+ str(num_github[num]) + ".github.io/" + grp_repo\n        grp_repohref = "https://github.com/"+ str(num_github[num]) +"/" + grp_repo       \n        brython_div <= "repo: "\n        makeLink(repohref, str(num))\n        brython_div <= " www: "\n        makeLink(studhref, str(num))\n        brython_div <= " " + grp_repo + "-repo: "\n        makeLink(grp_repohref, str(num))\n        brython_div <= " " + grp_repo + "-www: "\n        makeLink(grphref, str(num))\n        brython_div <= html.BR()\nprint("done") \n', 'tags': '', 'url': '13.html'}, {'title': '20220316', 'text': '\n 今天建立小組倉儲同步 \n 小組倉儲 \n', 'tags': '', 'url': '20220316.html'}, {'title': 'NX1980', 'text': '\n \n 教學影片 \n \n NX Tutorial 1 - View Controls - Version 1855 \n 如何使用滑鼠控制視角 \n F8正視 \n ctrl+H/clip section 剖面 \n Show and hide 顯示設定 \n fIT/Ctrl+f 重製視角 \n', 'tags': '', 'url': 'NX1980.html'}, {'title': '1', 'text': '\n \n \n \n \n   \n \n \n \n \n \n \n \n \n \n \n \n \n', 'tags': '', 'url': '1.html'}, {'title': 'w7 summary', 'text': '今天clone了 https://github.com/mdecourse/scarysim.git ，修改了 scarysim.pro(蓋掉第11行)，因為用的隨身系統過舊，裡面沒有需要的程式，所以下載 新的隨身系統 。 \n 因為隨身系統容量過大，所以正在解壓縮。 \n \n', 'tags': '', 'url': 'w7 summary.html'}, {'title': 'W8', 'text': 'uarm工程圖 \n', 'tags': '', 'url': 'W8.html'}, {'title': 'W10', 'text': '\n 建立NX1980的Block UI \n 使用SSH \n', 'tags': '', 'url': 'W10.html'}, {'title': 'w10_ssh', 'text': '\n \n \n', 'tags': '', 'url': 'w10_ssh.html'}, {'title': 'w10_block_ui', 'text': '\n \n \n', 'tags': '', 'url': 'w10_block_ui.html'}, {'title': 'W14', 'text': '\n 以鍵盤控制 MTB_nx robot (for CoppeliaSim 4.3.0)的程式碼 \n math.pi 圓周率 \n 360度=2倍的圓周率 \n 1度=math.pi/180 \n sim.getObject(\'/零件名字\') \n function sysCall_init() \n    axis1=sim.getObject(\'/joint1\')\n    axis2=sim.getObject(\'/joint2\')\n    axis3=sim.getObject(\'/joint3\')\n    suctionPad=sim.getObject(\'/suctionPad\')\n    MTB_Robot=sim.getObject("/base")\n    BaseFrame=sim.getObject("/BaseFrame")\n    block =sim.getObject("/block")\n    rotation1 = 0\n    distance3 = 0\n    deg = math.pi/180.\nend\n \n \nfunction sysCall_actuation() \n--[[\n    rotation1 = rotation1 + 0.5*deg\n    print(rotation1)\n    sim.setJointPosition(axis1, -rotation1)\n    sim.setJointPosition(axis2, -rotation1)\n]]\n \n    message, auxiliaryData=sim.getSimulatorMessage()\n        while message ~= -1 do\n            key=auxiliaryData[1]\n            sim.addStatusbarMessage(\'user press key:\'..key)\n            if (message==sim.message_keypress) then\n               --if (auxiliaryData[1]==112) then --p activate the suction pad\n                if (auxiliaryData[1]==string.byte(\'p\')) then\n                    -- if key p pressed activate the suction mode\nsim.setScriptSimulationParameter(sim.getScriptAssociatedWithObject(suctionPad),\'active\',\'true\')\n                end -- if p\n                if (auxiliaryData[1]==113) then --q deactivate the suction pad\n                    -- if key q pressed deactivate the suction mode\nsim.setScriptSimulationParameter(sim.getScriptAssociatedWithObject(suctionPad),\'active\',\'false\')\n                end -- if q\n                if (auxiliaryData[1]==114) then --r right turn in degree\n                    -- if key r pressed axis1 angle adds 5 degrees\n                     rotation1 = rotation1 + 5*deg\n                     sim.setJointPosition(axis1, rotation1)\n                end -- if r\n                if (auxiliaryData[1]==108) then --l left turn in degree\n                    -- if key l pressed axis1 angle substract 5 degrees\n                     rotation1 = rotation1 - 5*deg\n                     sim.setJointPosition(axis1, rotation1)\n                end -- if l\n                if (auxiliaryData[1]==100) then --d suction pad down\n                    -- if key d pressed axis3 will down 0.01 m\n                     distance3 = distance3 + 0.01\n                     sim.setJointPosition(axis3, distance3)\n                end -- if d\n                if (auxiliaryData[1]==117) then --u suction pad up\n                    -- if key u pressed axis3 will up 0.01 m\n                     distance3 = distance3 - 0.01\n                     sim.setJointPosition(axis3, distance3)\n                end -- if u\n                if (auxiliaryData[1]==99) then --c coordinate of block\n                    --blockPosition = sim.getObjectPosition(block, BaseFrame)\n                    blockPosition = sim.getObjectPosition(suctionPad, BaseFrame)\n                    sim.addStatusbarMessage("coordinate:"..table_to_string(blockPosition))\n                end --if c\n           end  -- if\n    message, auxiliaryData=sim.getSimulatorMessage()\n        end -- while\nend -- function\nfunction sysCall_sensing() \n--[[\n    -- Read Proximity sensor (0= nothing detected, 1 = object detected)\n    local res = sim.readProximitySensor(proximity)\n \n    -- Check if possible to insert an new box\n    if (sim.getSimulationTime()-T_last_inserted > T_insert) and not hasStopped then\n        insertBox()\n    end\n \n    -- If proximity sensor detects an object, stop the belt, stop inserting objects\n    if res == 1 and not hasStopped then\n        if boolList[1] then\n            sim.setScriptSimulationParameter(sim.handle_self,"conveyorBeltVelocity",0)\n            deltaTime = sim.getSimulationTime()-T_last_inserted\n            hasStopped = true\n        else\n            local box = table.remove(boxList,1)\n            local boxDummy = table.remove(boxDummyList,1)\n            table.remove(boolList,1)\n \n            sim.removeObject(box)\n            sim.removeObject(boxDummy)\n        end\n    end\n \n    -- If proximity sensor detects nothing and belt has stopped, start belt, continue inserting\n    if res == 0 and hasStopped then\n        sim.setScriptSimulationParameter(sim.handle_self,"conveyorBeltVelocity",beltSpeed)\n        hasStopped = false\n        T_last_inserted = sim.getSimulationTime()-deltaTime\n    end\n     \n]]--\nend\nfunction sysCall_cleanup() \nend\n-- Convert a lua table into a lua syntactically correct string\nfunction table_to_string(tbl)\n    local result = "{"\n    for k, v in pairs(tbl) do\n        -- Check the key type (ignore any numerical keys - assume its an array)\n        if type(k) == "string" then\n            result = result.."[\\""..k.."\\"]".."="\n        end\n \n        -- Check the value type\n        if type(v) == "table" then\n            result = result..table_to_string(v)\n        elseif type(v) == "boolean" then\n            result = result..tostring(v)\n        else\n            v = round(v, 4)\n            result = result.."\\""..v.."\\""\n        end\n        result = result..","\n    end\n    -- Remove leading commas from the result\n    if result ~= "" then\n        result = result:sub(1, result:len()-1)\n    end\n    return result.."}"\nend\nfunction round(x, n)\n    n = math.pow(10, n or 0)\n    x = x * n\n    if x >= 0 then x = math.floor(x + 0.5) else x = math.ceil(x - 0.5) end\n    return x / n\nend\n \n \nfunction insertBox()\n    -- Generate random numbers\n    local rand1 = math.random()\n    local rand2 = math.random()\n    local rand3 = math.random()\n    -- Generate random disturbances on position and orientation\n    local dx = (2*rand1-1)*0.1\n    local dy = (2*rand2-1)*0.1\n    local dphi = (2*rand3-1)*0.5\n    local disturbedCoordinates = {0,0,0}\n    disturbedCoordinates[1] = insertCoordinate[1]+dx\n    disturbedCoordinates[2] = insertCoordinate[2]+dy\n    disturbedCoordinates[3] = insertCoordinate[3]\n    -- Copy and paste box and boxDummy\n    local insertedObjects = sim.copyPasteObjects({box,boxDummy},0)\n    -- Update last inserted box time\n    T_last_inserted = sim.getSimulationTime()\n    -- Move and rotate\n    sim.setObjectPosition(insertedObjects[1],-1,disturbedCoordinates)\n    sim.setObjectOrientation(insertedObjects[1],-1,{0,0,dphi})\n    -- Store handles to boxes and dummies\n    table.insert(boxList,insertedObjects[1])\n    table.insert(boxDummyList,insertedObjects[2]) \n    -- Decide if object is good or bad\n    local decision = math.random() \n    if decision <= goodPercentage then\n    -- Object is good, assign goodColor\n        sim.setShapeColor(insertedObjects[1],nil,sim.colorcomponent_ambient_diffuse,goodColor)\n        table.insert(boolList,true)\n    else\n    -- Object is bad, assign random color\n        sim.setShapeColor(insertedObjects[1],nil,sim.colorcomponent_ambient_diffuse,{rand1,rand2,rand3})\n        table.insert(boolList,false)\n    end\nend \n 會自己動的版本 \n \n \n \n \n \n', 'tags': '', 'url': 'W14.html'}, {'title': '期末考週', 'text': '', 'tags': '', 'url': '期末考週.html'}, {'title': 'NX左右互換繪圖重點', 'text': '\n \n', 'tags': '', 'url': 'NX左右互換繪圖重點.html'}]};