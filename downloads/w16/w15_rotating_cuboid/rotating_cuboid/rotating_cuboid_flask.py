import sim as vrep                  #V-rep library
import os
import sys
import time                #used to keep track of time
import numpy as np         #array library
import cv2
import imutils
# 以多執行續啟動 coppeliasim headless mode
import threading
import keyboard
# 以下 for Flask
from flask import Flask, render_template, send_from_directory, Response, redirect, url_for

def start_copsim():
    dir = os.getcwd()
    os.system("Y:/CoppeliaSimEdu/coppeliaSim.exe -h " + dir + "/rotating_cuboid.ttt")
    return 'start copsim'

def pause_copsim():
    # 暫停執行緒
    pill2kill.clear()
    # 暫停模擬
    vrep.simxPauseSimulation(clientID, vrep.simx_opmode_oneshot_wait)
    return "pause copsim"
    
def start():
    pill2kill.set
    #啟動模擬
    vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot)
    return "start simulation"

flask_ip = "127.0.0.1"
flask_port = 5000

# kill previous coppeliaSim
os.system("taskkill /IM coppeliaSim.exe /F")
# 開啟 rotating_cuboid 場景
threading.Thread(target=start_copsim).start()
pill2kill = threading.Event()

lastFrame = None

def get_image(clientID, cameraHandle):
    err, resolution, image = vrep.simxGetVisionSensorImage(clientID, cameraHandle, 0, vrep.simx_opmode_buffer)
    if err == vrep.simx_return_ok:
        img = np.array(image,dtype=np.uint8)
        img.resize([resolution[1],resolution[0],3])
        lastFrame = imutils.rotate_bound(img, 180) # 將影像轉 180 度
        return 1, lastFrame;
    elif err == vrep.simx_return_novalue_flag:
        return 0, None
    else:
        return err, None

def send_image(clientID, cameraHandle):
    while True:
        err, img = get_image(clientID, cameraHandle)
        ret, jpeg = cv2.imencode('.jpg', img)
        yield (b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

vrep.simxFinish(-1) # just in case, close all opened connections
clientID = vrep.simxStart('127.0.0.1',19997,True,True,5000,5) # Get the client ID
#啟動模擬
vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot)
errorCode, camera1_handle = vrep.simxGetObjectHandle(clientID, 'camera1', vrep.simx_opmode_oneshot_wait)
errorCode, camera2_handle = vrep.simxGetObjectHandle(clientID, 'camera2', vrep.simx_opmode_oneshot_wait)
vrep.simxGetVisionSensorImage(clientID, camera1_handle, 0, vrep.simx_opmode_streaming)
vrep.simxGetVisionSensorImage(clientID, camera2_handle, 0, vrep.simx_opmode_streaming)

# Self test the camera
print('Setting up the camera system...')
lastFrame = None
err = 0
# 測試 camera
while(err != 1):
    err, lastFrame = get_image(clientID, camera1_handle)
print('Camera setup successful.')

app = Flask(__name__)

@app.route("/")
def index():
    return redirect(url_for("showimage1"))
    
@app.route("/showimage1")
def showimage1():
    return '''
<html>
    <head>
        <title>Rotating Cube</title>
    </head>
    <body>
        <h1>Rotating Cube</h1>
        <img src="/video_feed1" width="600" height="400"></img>
        <br />
        <a href="/showimage2">Camera2</a> | <a href="/pause1">Pause</a> | <a href="/restart1">Restart</a>
    <script src="jquery-3.6.0.min.js"></script>
    <script>
    $(function(){
    $('button').click(function(){
        var user = $('#inputUsername').val();
        var pass = $('#inputPassword').val();
        $.ajax({
            url: '/signUpUser',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                error: function(error){
                console.log(error);
             }
        });
    );
});
    </script>
    </body>
</html>
'''

@app.route("/showimage2")
def showimage2():
    return '''
<html>
    <head>
        <title>Rotating Cube</title>
    </head>
    <body>
        <h1>Rotating Cube</h1>
        <img src="/video_feed2" width="600" height="400"></img>
        <br />
        <a href="/showimage1">Camera1</a> | <a href="/pause2">Pause</a> | <a href="/restart2">Restart</a>
    <script src="jquery-3.6.0.min.js"></script>
    <script>
    $(function(){
    $('button').click(function(){
        var user = $('#inputUsername').val();
        var pass = $('#inputPassword').val();
        $.ajax({
            url: '/signUpUser',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response);
                error: function(error){
                console.log(error);
             }
        });
    );
});
    </script>
    </body>
</html>
'''

@app.route("/video_feed1")
def video_feed1():
    #err1, img1 = get_image(clientID, camera1_handle)
    return Response(send_image(clientID, camera1_handle), mimetype="multipart/x-mixed-replace; boundary=frame")
    
@app.route("/video_feed2")
def video_feed2():
    #err1, img1 = get_image(clientID, camera1_handle)
    return Response(send_image(clientID, camera2_handle), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/pause1")
def pause1():
    pause_copsim()
    return redirect(url_for("showimage1"))
    
@app.route("/pause2")
def pause2():
    pause_copsim()
    return redirect(url_for("showimage2"))
    
@app.route("/restart1")
def restart1():
    pill2kill.set
    #啟動模擬
    vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot)
    return redirect(url_for("showimage1"))
    
@app.route("/restart2")
def restart2():
    pill2kill.set
    #啟動模擬
    vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot)
    return redirect(url_for("showimage2"))

@app.route("/exit")
def exit():
    os.system("taskkill /IM coppeliaSim.exe /F")
    # 應該要追蹤所啟動的 threading 並且只 kill 對應執行續, 但在此直接關掉 python
    os.system("taskkill /IM python.exe /F")
    sys.exit()

'''
# 進入重複圍圈
while True:
    # keyboard event
    if keyboard.is_pressed('p'):
        print(pause_copsim())
    elif keyboard.is_pressed('s'):
        pill2kill.set
        #啟動模擬
        vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot)
    elif keyboard.is_pressed('e'):
        os.system("taskkill /IM coppeliaSim.exe /F")
        # 應該要追蹤所啟動的 threading 並且只 kill 對應執行續, 但在此直接關掉 python
        os.system("taskkill /IM python.exe /F")
        sys.exit()
    # Start time for image process
    start = time.time()
    err1, img1 = get_image(clientID, camera1_handle)
    err2, img2 = get_image(clientID, camera2_handle)
    # End time for image process
    end = time.time()
    dt = end - start
    print('Frame took:', dt*1000.0, 'ms')
    cv2.imshow('camera1', img1) # use camera1 as window name to show img1
    cv2.imshow('camera2', img2) # user camera2 as window name to show img2
    cv2.waitKey(1) # in milliseconds
'''

if __name__ == '__main__':
    app.run(host=flask_ip, port=flask_port)