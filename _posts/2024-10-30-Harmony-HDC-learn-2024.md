---
layout:     post
title:      "鸿蒙开发设备调试工具HDC学习日志"
subtitle:    "原文：https://blog.csdn.net/ToBeTheEnder/article/details/139325200"
date:       2024-10-30 20:00:00
author:     "Comet"
header-img: "img/in-post/HarmonyOS.jpg"
tags:
    - 鸿蒙
    - 华为
---

**由于鸿蒙生态还处于初期，官方提供的hdc命令还在不断修改中，这篇文档更新不及时，请以[github](https://github.com/codematrixer/awesome-hdc)和[官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V3/ide-command-line-hdc-0000001237908229-V3#section1756645732914/)为准**

HDC（OpenHarmony Device Connector） 是为鸿蒙开发/测试人员提供的用于设备调试的命令行工具，类似Android端的ADB工具。

HDC主要有三部分组成

1. `hdc client`：运行于电脑上的客户端，用户可以在电脑命令终端（windows cmd/linux shell）下请求执行相应的hdc命令。
2. `hdc server`：作为后台进程也运行于电脑上，server管理client和设备端daemon之间通信包括连接的复用、数据通信包的收发，以及个别本地命令的直接处理。
3. `hdc daemon`：daemon部署于OpenHarmony设备端作为守护进程按需运行，负责处理来自client端请求。

## HDC安装

* 下载 [Command Line Tools](https://developer.huawei.com/consumer/cn/download/) 并解压 ↳

  > 或者在DevEco Studio的设置里的OpenHarmony SDK下载（推荐）

* `hdc`文件在`command-line-tools/sdk/default/toolchains`目录下 ↳

  > DevEco Studio下载的在OpenHarmony\Sdk\版本号\toolchains下

* 配置电脑环境变量，以Windows为例：

  在系统变量中添加：

  - 变量名：HM_SDK_HOME
    变量值：D:\Harmony_dev\commandline-tools-windows-x64-5.0.3.900\command-line-tools\sdk\default

    > DevEco Studio下载：盘符:\OpenHarmony\Sdk
    
  - 然后在PATH里面添加%HM_SDK_HOME%\openharmony\toolchains
  
    > DevEco Studio下载：%HM_SDK_HOME%\版本号\toolchains
  
  - 在CMD输入一下命令查看是否配置成功

```
hdc -v
```



也可以自行编译安装：参考鸿蒙官方gitee文档

## 基本用法

### 基本语法

```
hdc -t <connectKey> <command>
```

如果只有一个设备/模拟器连接时，可以省略掉`-t <connectKey>` 这一部分，直接使用`hdc <command>`。在多个设备/模拟器连接的情况下需要指定`-t` 参数， `connectKey`可以通过`hdc list targets`命令获取，对应Android里的`adb devices`获取的`serialNumber`。

```
$ hdc list targets

127.0.0.1:5555    //<IP>:<Port>形式的connectKey ，一般为无线连接的设备或模拟器
FMR0223C13000649
```

比如给`FMR0223C13000649` 这个设备安装应用：

```
$ hdc -t FMR0223C13000649 install entry-default-signed.hap

[Info]App install path:/Users/develop/entry-default-signed.hap, queuesize:0, msg:install bundle successfully.
AppMod finish
```

**注意事项**

* 使用`hdc`，如果出现异常，可以尝试通过`hdc kill -r`命令杀掉并重启hdc服务。
* 如果出现`hdc list targets`获取不到设备信息的情况，可以通过任务管理器查看是否有hdc进程存在。若进程存在，则通过`hdc kill -r`命令杀掉该进程。

## 设备连接管理

### 查看HDC版本

```
$ hdc -v

Ver: 3.1.0b
```

### 启动/停止 HDC Server

停止

```
$ hdc kill

Kill server finish
```

重启

```
$ hdc start -r
```

### 查询设备列表

```
$ hdc list targets

127.0.0.1:5555
```

`-v` 选项 显示详细信息

```
$ hdc list targets -v

127.0.0.1:5555          TCP     Connected       localhost       hdc
COM3            UART    Ready   unknown...      hdc
COM4            UART    Ready   unknown...      hdc
```

输出的内容第一列为设备的`connectKey`， 第二列是设备`连接方式`，第三列为设备`连接状态`，第四列暂时未知

### 查询设备UDID

```
$ hdc shell bm get --udid

udid of current device is :
454D55057494E058383609DC0A6C85F774AA9B67B4A14250C2BFA00000000000
```

这个`udid`在用开发者账号打包时，需要添加这个`udid`到对应的`profile`文件中

### 重启手机

```
$ hdc target boot
```

## 查看设备信息

### 名称

```
$ hdc shell param get const.product.name               

emulator
```

### Brand

```
$ hdc shell param get const.product.brand

HUAWEI 
```

### Model

```
$ hdc shell param get const.product.model

emulator 
```

### 系统版本

```
$ hdc shell param get const.product.software.version                                      

emulator 5.0.0.102(SP1DEVC00E102R4P11log) 
```

### OS版本

```
$ hdc shell param get const.ohos.apiversion  

13
```

### CPU架构

```
$ hdc  shell param get const.product.cpu.abilist  

x86_64 
```

### 分辩率

```
$ hdc shell hidumper -s RenderService -a screen


-------------------------------[ability]-------------------------------


----------------------------------RenderService----------------------------------
-- ScreenInfo
screen[0]: id=0, powerstatus=POWER_STATUS_ON, backlight=1, screenType=EXTERNAL_TYPE, render size: 1260x2720, physical screen resolution: 1260x2720, isvirtual=false, skipFrameInterval_:
1

  supportedMode[0]: 1260x2720, refreshrate=60
  activeMode: 1260x2720, refreshrate=60
  capability: name=express_display, phywidth=72, phyheight=156,supportlayers=10, virtualDispCount=1, propCount=0, type=DISP_INTF_HDMI, supportWriteBack=false
```

执行上述命令后，解析返回内容，可以通过正则表达式提取`1260x2720`

### wlan IP

```
$ hdc shell ifconfig

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0 
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 TX bytes:0

eth0      Link encap:Ethernet  HWaddr 52:54:00:12:34:56
          inet addr:10.0.2.15  Bcast:10.0.2.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:73 errors:0 dropped:0 overruns:0 frame:0
          TX packets:152 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:25919 TX bytes:39850

wifi_eth  Link encap:Ethernet  HWaddr 52:54:00:12:34:57
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:4 errors:0 dropped:0 overruns:0 frame:0
          TX packets:7 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:440 TX bytes:602

wlan0     Link encap:Ethernet  HWaddr 52:54:00:12:34:57
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 TX bytes:0

```

注意：这个命令在Beta3版本之前，会提示`Cannot open netlink socket: Permission denied`，需要升级系统。

### 电量/温度

```
$ hdc shell hidumper -s BatteryService -a -i                

-------------------------------[ability]-------------------------------


----------------------------------BatteryService----------------------------------
Current time: 2024-10-30 20:32:06.695
capacity: 100
batteryLevel: 1
chargingStatus: 0
healthState: 1
pluggedType: 0
voltage: 4000000
present: 1
technology: Li-ion
nowCurrent: 900000
currentAverage: -1
totalEnergy: 5000000
remainingEnergy: -1
remainingChargeTime: 0
temperature: 250
chargeType: 0
```

### 查看屏幕信息

```
$ hdc shell hidumper -s DisplayManagerService -a -a

-------------------------------[ability]-------------------------------


----------------------------------DisplayManagerService----------------------------------
-------------- DMS FREEZED PID LIST  --------------
-------------- DMS KEY EVENTS LIST  --------------
[10-30 20:07:03.254]: Dms construct.
[10-30 20:07:04.173]: Default screen id : 0
[10-30 20:07:04.173]: OnScreenChange triggered. screenId: 0  screenEvent: 0
[10-30 20:07:04.174]: Dms OnScreenChange register success.
[10-30 20:07:04.176]: CreateScreenProperty by rsInterface success.
[10-30 20:07:04.199]: GetScreenPower state:0 screenId:0
[10-30 20:07:04.199]: create screen session success.
[10-30 20:07:04.202]: Dms RefreshRateChange register success.
[10-30 20:07:04.215]: Dms subscribed to sensor successfully.
[10-30 20:07:04.215]: Dms init end.
[10-30 20:07:04.234]: Dms onstart end.
[10-30 20:07:07.383]: GetScreenPower state:0 screenId:0
[10-30 20:07:07.402]: GetScreenPower state:0 screenId:0
[10-30 20:07:07.896]: set client userId: 100 newScbPid: 1175 clientName: com.ohos.sceneboard
[10-30 20:07:07.898]: currentUserId: 0  currentScbPId: -1  newUserId: 100  newScbPid: 1175  coldBoot: 1
-------------- DMS Multi User Info --------------
[oldScbPid:]
[userId:] 100
[ScbPid:] 1175
---------------- Screen ID: 0 ----------------
FoldStatus:                   UNKNOWN
[SCREEN SESSION]
Name:                         UNKNOWN
RSScreenId:                   0
activeModes<id, W, H, RS>:    0, 1260, 2720, 60
SourceMode:                   0
ScreenCombination:            0
Orientation:                  0
Rotation:                     0
ScreenRequestedOrientation:   0
[RS INFO]
GraphicPixelFormat:           0
[CUTOUT INFO]
WaterFall_L<X,Y,W,H>:         0, 0, 0, 0
WaterFall_T<X,Y,W,H>:         0, 0, 0, 0
WaterFall_R<X,Y,W,H>:         0, 0, 0, 0
WaterFall_B<X,Y,W,H>:         0, 0, 0, 0
BoundingRects<X,Y,W,H>:       [494, 36, 273, 72]
[SCREEN INFO]
VirtualWidth:                 387
VirtualHeight:                836
LastParentId:                 18446744073709551615
ParentId:                     1
IsScreenGroup:                0
VirtualPixelRatio:            3.25
Rotation:                     0
Orientation:                  0
SourceMode:                   0
ScreenType:                   1
[SCREEN PROPERTY]
Rotation:                     0
Density:                      3.25
DensityInCurResolution:       3.25
PhyWidth:                     72
PhyHeight:                    156
RefreshRate:                  60
VirtualPixelRatio:            3.25
ScreenRotation:               0
Orientation:                  0
DisplayOrientation:           0
GetScreenType:                1
ReqOrientation:               0
DPI<X, Y>:                    444.5, 442.871
Offset<X, Y>:                 0, 0
Bounds<L,T,W,H>:              0, 0, 1260, 2720,
PhyBounds<L,T,W,H>:           0, 0, 1260, 2720,
AvailableArea<X,Y,W,H>        0, 0, 1260, 2720,
DefaultDeviceRotationOffset   270
```

执行上述命令后，解析返回内容，通过正则提取需要的信息，比如屏幕尺寸分辨率Bounds，VirtualWidth，VirtualHeight，PhyWidth，PhyHeight，ScreenRotation

### 查看屏幕旋转状态

```
$ hdc shell hidumper -s DisplayManagerService -a -a

-------------------------------[ability]-------------------------------


----------------------------------DisplayManagerService----------------------------------
-------------- DMS FREEZED PID LIST  --------------
-------------- DMS KEY EVENTS LIST  --------------
[10-30 20:07:03.254]: Dms construct.
[10-30 20:07:04.173]: Default screen id : 0
[10-30 20:07:04.173]: OnScreenChange triggered. screenId: 0  screenEvent: 0
[10-30 20:07:04.174]: Dms OnScreenChange register success.
[10-30 20:07:04.176]: CreateScreenProperty by rsInterface success.
[10-30 20:07:04.199]: GetScreenPower state:0 screenId:0
[10-30 20:07:04.199]: create screen session success.
[10-30 20:07:04.202]: Dms RefreshRateChange register success.
[10-30 20:07:04.215]: Dms subscribed to sensor successfully.
[10-30 20:07:04.215]: Dms init end.
[10-30 20:07:04.234]: Dms onstart end.
[10-30 20:07:07.383]: GetScreenPower state:0 screenId:0
[10-30 20:07:07.402]: GetScreenPower state:0 screenId:0
[10-30 20:07:07.896]: set client userId: 100 newScbPid: 1175 clientName: com.ohos.sceneboard
[10-30 20:07:07.898]: currentUserId: 0  currentScbPId: -1  newUserId: 100  newScbPid: 1175  coldBoot: 1
-------------- DMS Multi User Info --------------
[oldScbPid:]
[userId:] 100
[ScbPid:] 1175
---------------- Screen ID: 0 ----------------
FoldStatus:                   UNKNOWN
[SCREEN SESSION]
Name:                         UNKNOWN
RSScreenId:                   0
activeModes<id, W, H, RS>:    0, 1260, 2720, 60
SourceMode:                   0
ScreenCombination:            0
Orientation:                  0
Rotation:                     0
ScreenRequestedOrientation:   0
[RS INFO]
GraphicPixelFormat:           0
[CUTOUT INFO]
WaterFall_L<X,Y,W,H>:         0, 0, 0, 0
WaterFall_T<X,Y,W,H>:         0, 0, 0, 0
WaterFall_R<X,Y,W,H>:         0, 0, 0, 0
WaterFall_B<X,Y,W,H>:         0, 0, 0, 0
BoundingRects<X,Y,W,H>:       [494, 36, 273, 72]
[SCREEN INFO]
VirtualWidth:                 387
VirtualHeight:                836
LastParentId:                 18446744073709551615
ParentId:                     1
IsScreenGroup:                0
VirtualPixelRatio:            3.25
Rotation:                     0
Orientation:                  0
SourceMode:                   0
ScreenType:                   1
[SCREEN PROPERTY]
Rotation:                     0
Density:                      3.25
DensityInCurResolution:       3.25
PhyWidth:                     72
PhyHeight:                    156
RefreshRate:                  60
VirtualPixelRatio:            3.25
ScreenRotation:               0
Orientation:                  0
DisplayOrientation:           0
GetScreenType:                1
ReqOrientation:               0
DPI<X, Y>:                    444.5, 442.871
Offset<X, Y>:                 0, 0
Bounds<L,T,W,H>:              0, 0, 1260, 2720,
PhyBounds<L,T,W,H>:           0, 0, 1260, 2720,
AvailableArea<X,Y,W,H>        0, 0, 1260, 2720,
DefaultDeviceRotationOffset   270
```

通过上面的查看屏幕信息命令，通过正则提取ScreenRotation字段即可，ScreenRotation有四个值：

* 0：未旋转
* 90：顺时针旋转90度
* 180：顺时针旋转180度
* 270：顺时针旋转270度

备注：目前旋转状态只能查看，不支持设置

### 查看屏幕亮屏状态

```
$ hdc shell hidumper -s PowerManagerService -a -s

-------------------------------[ability]-------------------------------


----------------------------------PowerManagerService----------------------------------
POWER STATE DUMP:
Current State: DIM  Reason: 1  Time: 2929230
ScreenOffTime: Timeout=30000ms
DUMP DETAILS:
Last Screen On: 2905219
Last Screen Off: 0
Last SuspendDevice: 0
Last WakeupDevice: 0
Last Refresh: 2905219
DUMP EACH STATES:
State: AWAKE   Reason: REFRESH   Time: 2898718
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: FREEZE   Reason: UNKNOWN   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: INACTIVE   Reason: UNKNOWN   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: STAND_BY   Reason: UNKNOWN   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: DOZE   Reason: UNKNOWN   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: SLEEP   Reason: UNKNOWN   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: HIBERNATE   Reason: INIT   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: SHUTDOWN   Reason: INIT   Time: 0
   Failure: INIT   Reason:    From: AWAKE   Time: 0

State: DIM   Reason: TIMEOUT   Time: 2929230
   Failure: INIT   Reason:    From: AWAKE   Time: 0
```

屏幕状态有这几种：

* INACTIVE
* SLEEP
* AWAKE

### 点亮屏幕（唤醒）

```
$ hdc shell power-shell wakeup

WakeupDevice is called
```

### 查看网络状态

**联网状态**

```
$ hdc shell hidumper -s NetConnManager

-------------------------------[ability]-------------------------------


----------------------------------NetConnManager----------------------------------
Net connect Info:
        SupplierId: 1003
        NetId: 100
        ConnStat: 1
        IsAvailable: 1
        IsRoaming: 0
        Strength: 0
        Frequency: 0
        LinkUpBandwidthKbps: 0
        LinkDownBandwidthKbps: 0
        Uid: 0
Dns result Info:
        netId: 100
        totalReports: 1
        failReports: 0
```

**wifi信息**

```
$ hdc shell hidumper -s WifiDevice

-------------------------------[ability]-------------------------------


----------------------------------WifiDevice----------------------------------
WiFi active state: activated

WiFi connection status: not connected

Country Code: CN
```

## 应用管理

### 安装应用

```
$ hdc app install BrowserCE-1.2.1.hap

[Info]App install path:F:\DevEcoStudioProjects\test\BrowserCE-1.2.1.hap, queuesize:0, msg:install bundle successfully. 
AppMod finish
```

或者

```
$ hdc install BrowserCE-1.2.1.hap

[Info]App install path:F:\DevEcoStudioProjects\test\BrowserCE-1.2.1.hap, queuesize:0, msg:install bundle successfully. 
AppMod finish
```

### 卸载应用

```
$ hdc app uninstall org.ohosdev.browserce  #使用hdc shell "aa dump -a"或者hdc shell aa dump -l找到包名

[Info]App uninstall path:, queuesize:0, msg:uninstall bundle successfully. 
AppMod finish
```

或者

```
$ hdc uninstall org.ohosdev.browserce

[Info]App uninstall path:, queuesize:0, msg:uninstall bundle successfully.
AppMod finish
```

### 获取应用列表

```
$ hdc shell bm dump -a

ID: 100:
        com.example.test
        com.huawei.hmos.calendardata
        com.huawei.hmos.filemanager
        com.huawei.hmos.files
        com.huawei.hmos.hipreview
        com.huawei.hmos.hiviewx
        com.huawei.hmos.huaweicast
        com.huawei.hmos.inputmethod
        com.huawei.hmos.instantshare
        com.huawei.hmos.mediacontroller
        com.huawei.hmos.ouc
        com.huawei.hmos.photos
        com.huawei.hmos.projectmenu
        com.huawei.hmos.screenrecorder
        com.huawei.hmos.screenshot
        com.huawei.hmos.security.privacycenter
        com.huawei.hmos.settings
        com.huawei.hmos.superhub
        com.huawei.hmos.themedataservice
        com.huawei.hmsapp.intelligent
        com.huawei.msdp.antimisoperation
        com.ohos.UserFile.ExternalFileManager
        com.ohos.amsdialog
        com.ohos.backgroundtaskmgr.resources
        com.ohos.certmanager
        com.ohos.devicemanagerui
        com.ohos.dlpmanager
        com.ohos.formrenderservice
        com.ohos.inputmethodchoosedialog
        com.ohos.medialibrary.medialibrarydata
        com.ohos.notificationdialog
        com.ohos.nweb
        com.ohos.pasteboarddialog
        com.ohos.permissionmanager
        com.ohos.powerdialog
        com.ohos.ringtonelibrary.ringtonelibrarydata
        com.ohos.sceneboard
        com.ohos.settingsdata
        com.ohos.useriam.authwidget
        com.usb.right
        ohos.global.systemres
        org.ohosdev.browserce
```

### 启动应用

通过启动`Ability`来拉起`APP`

```
hdc shell aa start -a {abilityName} -b {bundleName} 
hdc shell aa start -a org.ohosdev.browserce:entry:MainAbility -b org.ohosdev.browserce #运行出错了，我不知道是什么错误
```

* 其中`bundleName`可以通过`hdc shell bm dump -a`获取

* 其中`abilityName`可以通过如下命令获取（查看当前任务栈的ability信息）

```
$ hdc shell aa dump -l    # 运行命令前需要手动打开app

User ID #100
  current mission lists:{
    Mission ID #52  mission name #[#org.ohosdev.browserce:entry:MainAbility]  lockedState #0  mission affinity #[]
      AbilityRecord ID #29
        app name [org.ohosdev.browserce]
        main name [MainAbility]
        bundle name [org.ohosdev.browserce]
        ability type [PAGE]
        state #FOREGROUND  start time [3745716]
        app state #FOREGROUND
        ready #1  window attached #0  launcher #0
        callee connections:
        isKeepAlive: false
 }
```

里面的EntryAbility就是你要打开app的Ability名称

### 退出应用

强制退出应用

```
hdc shell aa force-stop org.ohosdev.browserce

force stop process successfully.
```

* 其中`bundleName`可以通过`hdc shell bm dump -a`获取

### 获取应用版本

```
$ hdc shell bm dump -n org.ohosdev.browserce

org.ohosdev.browserce:
{
    "appId": "org.ohosdev.browserce_BAcYHDciANDwxnn0GmXdAoxvjcK9ZJkZXWnTwGwP3UnJcLVXkLJWKtmSv2EpQG5aRZYGLYOQTHeid7drnQR+7No=",
    "appIdentifier": "",
    "appIndex": 0,
..............
..............
..............
    "vendor": "ohosdev",
    "versionCode": 1000004,
    "versionName": "1.2.1"
}
```

执行上述命令后，再解析json, 提取`versionName`字段即可

### Dump应用信息

**aa dump**

```
$ hdc shell aa dump -h

usage: aa dump <options>
options list:
  -h, --help                   list available commands
  -a, --all                    dump all abilities
  -l, --mission-list           dump mission list
  -i, --ability                dump abilityRecordId
  -e, --extension              dump elementName (FA: serviceAbilityRecords,Stage: ExtensionRecords)
  -p, --pending                dump pendingWantRecordId
  -r, --process                dump process
  -d, --data                   dump the data abilities
  -u, --userId                 userId
  -c, --client                 client
  -c, -u are auxiliary parameters and cannot be used alone
```

**bm dump**

```
$ hdc shell bm dump -h

usage: bm dump <options>
options list:
  -h, --help                           list available commands
  -a, --all                            list all bundles in system
  -n, --bundle-name <bundle-name>      list the bundle info by a bundle name
  -s, --shortcut-info                  list the shortcut info
  -d, --device-id <device-id>          specify a device id
  -u, --user-id <user-id>              specify a user id
```

#### 获取应用 Ability信息

```
$ hdc shell aa dump -l    //运行命令前需要手动打开app

User ID #100
  current mission lists:{
    Mission ID #53  mission name #[#org.ohosdev.browserce:entry:MainAbility]  lockedState #0  mission affinity #[]
      AbilityRecord ID #48
        app name [org.ohosdev.browserce]
        main name [MainAbility]
        bundle name [org.ohosdev.browserce]
        ability type [PAGE]
        state #FOREGROUND  start time [4737386]
        app state #FOREGROUND
        ready #1  window attached #0  launcher #0
        callee connections:
        isKeepAlive: false
 }
```

#### 获取应用详情

查询该应用的详细信息

```
$ hdc shell bm dump -n org.ohosdev.browserce

org.ohosdev.browserce:
{
    "appId": "org.ohosdev.browserce_BAcYHDciANDwxnn0GmXdAoxvjcK9ZJkZXWnTwGwP3UnJcLVXkLJWKtmSv2EpQG5aRZYGLYOQTHeid7drnQR+7No=",
    "appIdentifier": "",
    "appIndex": 0,
..............
..............
..............
    "vendor": "ohosdev",
    "versionCode": 1000004,
    "versionName": "1.2.1"
}
```

通过这个命令可以获取到很多应用的关键信息，比如`reqPermissions`，`version`，`abilities`等等

### 清除应用数据

```
$ hdc shell bm clean -h

usage: bm clean <options>
options list:
  -h, --help                                      list available commands
  -n, --bundle-name  <bundle-name>                bundle name
  -c, --cache                                     clean bundle cache files by bundle name
  -d, --data                                      clean bundle data files by bundle name
  -u, --user-id <user-id>                         specify a user id
```

#### 清除应用缓存

```
$ hdc shell bm clean -n org.ohosdev.browserce  -c

clean bundle cache files successfully.
```

其中`bundleName`可以通过`hdc shell bm dump -a`获取， 比如`com.kuaishou.hmapp`

#### 清除应用数据

```
$ hdc shell bm clean -n org.ohosdev.browserce -d 

clean bundle data files successfully.
```

### 显示可调试应用列表

```
$  hdc jpid

1175
1200
1536
1712

$ hdc track-jpid

0000

```

* `jpid`显示可调试应用列表
* `track-jpid`动态显示可调试应用列表。

## 端口转发

| 命令                    | 说明                            |
| --------------------- | ----------------------------- |
| fport ls              | 展示全部“端口转发主机端口转发数据到设备侧端口”的转发任务 |
| fport local remote    | 端口转发主机端口转发数据到设备侧端口            |
| fport rm local remote | 删除指定“端口转发主机端口转发数据到设备侧端口”的转发任务 |
| rport ls              | 展示全部“端口转发设备侧端口转发数据到主机端口”的转发任务 |
| rport local remote    | 端口转发设备侧端口转发数据到主机端口            |
| rport rm local remote | 删除指定“端口转发设备侧端口转发数据到主机端口”的转发任务 |

### 显示端口转发列表

展示电脑端口转发到手机端口的列表

```
$ hdc fport ls

#因为用的模拟器，所以是空
[Empty]
#正常应该是以下形式
FMR0223C13000649    tcp:7912 tcp:7912    [Forward]
```

### 本地端口转发到手机

将本地电脑的`7913`端口转发到手机`7912`端口

```
$ hdc fport tcp:7913 tcp:7912

Forwardport result:OK
```

这个命令非常实用，比如我再手机上实现了一个 `http`服务，没有这个命令前需要通过手机`ip:port`来访问，这就需要提前知道手机的`wlanIP`，执行这个命令后可以直接通过`localhost:localPort`来访问手机里的服务。

### 删除端口转发任务

```
$ hdc fport rm tcp:7913 tcp:7912
Remove forward ruler success, ruler:tcp:7913 tcp:7912

$ hdc fport ls
[Empty]

```

同理，`rport`命令表示手机端口转发到电脑端口，我就不一一举例了.

## 无线调试

1. 在手机上开启5555端口 `hdc -t {SERIAL} tmode port {PORT}`
2. 连接手机上的端口 `hdc -t {SERIAL} tconn {WLANIP}:{PORT}`
3. 恢复手机USB连接 `hdc -t {SERIAL} tmode usb`

**示例**

```
$ hdc tmode port 5555

$ hdc tconn 172.31.124.84:5555
Connect OK

$ hdc list targets
172.31.124.84:5555

$ hdc tmode usb      
Set device run mode successful.

```

不过目前这个无线调试，会导致该手机USB连接方式断开，导致无法进行端口转发，每次进行无线调试时，需要知道手机的wlanip才行。\
这个问题也在和鸿蒙方沟通，待解决。\
记个TODO.

## 文件传输

| 命令                     | 说明           |
| ---------------------- | ------------ |
| file send local remote | 从本地发送文件至远端设备 |
| file recv remote local | 从远端设备发送文件至本地 |

### 从本地电脑发送文件至手机

```
$ hdc file send Harmony.png /data/local/tmp/

hdc file send Harmony.png /data/local/tmp/
FileTransfer finish, Size:12454, File count = 1, time:7ms rate:1779.14kB/s
```

### 从手机拷贝文件至本地电脑

```
$  hdc file recv /data/local/tmp/2.jpeg ./     
#这个图是下面截图的图
FileTransfer finish, Size:111128, File count = 1, time:7ms rate:15875.43kB/s
```

## UI模拟操作(点击滑动等)

支持操作类型：`点击` `双击` `长按` `慢滑` `快滑` `拖拽` `输入文字` `KeyEvent`

| 配置参数名       | 配置参数含义                                  | 配置参数取值                                                                                                                                                                                            | 示例                                                                                       |
| ----------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| click       | 模拟单击操作                                  | point\_x (必选参数,点击x坐标点) point\_y (必选参数,点击y坐标点)                                                                                                                                                     | hdc shell uitest uiInput click point\_x point\_y                                         |
| doubleClick | 模拟双击操作                                  | point\_x (必选参数,双击x坐标点) point\_y (必选参数,双击y坐标点)                                                                                                                                                     | hdc shell uitest uiInput doubleClick point\_x point\_y                                   |
| longClick   | 模拟长按操作                                  | point\_x (必选参数,长按x坐标点) point\_y (必选参数,长按y坐标点)                                                                                                                                                     | hdc shell uitest uiInput longClick point\_x point\_y                                     |
| fling       | 模拟快滑操作                                  | from\_x (必选参数,滑动起点x坐标) from\_y(必选参数,滑动起点y坐标) to\_x(必选参数,滑动终点x坐标) to\_y(必选参数,滑动终点y坐标) swipeVelocityPps\_ (可选参数,滑动速度,取值范围: 200-40000, 默认值: 600, 单位: px/s) stepLength(可选参数,滑动步长,默认值:滑动距离/50, 单位: px) | hdc shell uitest uiInput fling from\_x from\_y to\_x to\_y swipeVelocityPps\_ stepLength |
| swipe       | 模拟慢滑操作                                  | from\_x (必选参数,滑动起点x坐标) from\_y(必选参数,滑动起点y坐标) to\_x(必选参数,滑动终点x坐标) to\_y(必选参数,滑动终点y坐标) swipeVelocityPps\_ (可选参数,滑动速度,取值范围: 200-40000, 默认值: 600, 单位: px/s)                                           | hdc shell uitest uiInput swipe from\_x from\_y to\_x to\_y swipeVelocityPps\_            |
| drag        | 模拟拖拽操作                                  | from\_x (必选参数,拖拽起点x坐标) from\_y(必选参数,拖拽起点y坐标) to\_x(必选参数,拖拽终点x坐标) to\_y(必选参数,拖拽终点y坐标) swipeVelocityPps\_ (可选参数,滑动速度,取值范围: 200-40000, 默认值: 600, 单位: px/s)                                           | hdc shell uitest uiInput drag from\_x from\_y to\_x to\_y swipeVelocityPps\_             |
| dircFling   | 模拟指定方向滑动操作                              | direction (可选参数,滑动方向,可选值: \[0,1,2,3], 滑动方向: \[左,右,上,下],默认值: 0) swipeVelocityPps\_ (可选参数,滑动速度,取值范围: 200-40000, 默认值: 600, 单位: px/s) stepLength(可选参数,滑动步长,默认值:滑动距离/50, 单位: px)                       | hdc shell uitest uiInput dircFling direction swipeVelocityPps\_ stepLength               |
| inputText   | 模拟输入框输入文本操作                             | point\_x (必选参数,输入框x坐标点) point\_y (必选参数,输入框y坐标点) input(输入文本)                                                                                                                                       | hdc shell uitest uiInput inputText point\_x point\_y text                                |
| keyEvent    | 模拟实体按键事件(如:键盘,电源键,返回上一级,返回桌面等),以及组合按键操作 | keyID (必选参数,实体按键对应ID) keyID2 (可选参数,实体按键对应ID)                                                                                                                                                      | hdc shell uitest uiInput keyEvent keyID                                                  |

**举例**

```
//点击
hdc shell uitest uiInput click 100 100

//双击
hdc shell uitest uiInput doubleClick 100 100

//长按
hdc shell uitest uiInput longClick 100 100

//快滑
hdc shell uitest uiInput fling 10 10 200 200 500

//慢滑
hdc shell uitest uiInput swipe 10 10 200 200 500

//拖拽
hdc shell uitest uiInput drag 10 10 100 100 500

//左滑
hdc shell uitest uiInput dircFling 0 500

//右滑
hdc shell uitest uiInput dircFling 1 600

//上滑
hdc shell uitest uiInput dircFling 2

//下滑
hdc shell uitest uiInput dircFling 3

//输入框输入
hdc shell uitest uiInput inputText 100 100 hello

//返回主页
hdc shell uitest uiInput keyEvent Home

//返回上一步
hdc shell uitest uiInput keyEvent Back

//组合键粘贴操作
hdc shell uitest uiInput keyEvent 2072 2038
```

`keyEvent`映射表可以参考这个文档：<https://docs.openharmony.cn/pages/v4.1/en/application-dev/reference/apis-input-kit/js-apis-keycode.md>

## 屏幕截图

hdc提供了两种截图命令

方式一

```
$ hdc shell uitest screenCap
// 默认存储路径：/data/local/tmp，文件名：时间戳 + .png。
ScreenCap saved to /data/local/tmp/screenCap_757158519.png


$ hdc shell uitest screenCap -p /data/local/tmp/1.png
// 指定存储路径和文件名。
ScreenCap saved to /data/local/tmp/1.png
```

【推荐】方式二

```
$ hdc shell snapshot_display -f /data/local/tmp/2.jpeg
// 截图完成后可以通过 hdc file recv 命令导入到本地


process: display 0: width 1260, height 2720
snapshot: pixel format is: 3
snapshot: convert rgba8888 to rgb888 successfully.

success: snapshot display 0 , write to /data/local/tmp/2.jpeg as jpeg, width 1260, height 2720
```

方式二的截图性能效率远远高于方式一

## 屏幕录屏

相关hdc命令还未支持，官方在开发中。。。

我这边通过python脚本实现了录屏功能，使用方法如下

```
cd awesome-hdc/scripts
pip3 install -r requirements.txt

python3 screen_recroding.py
```

## 打开Scheme (URL)

```
$ hdc shell aa start -U http://www.baidu.com
start ability successfully.

$ hdc shell aa start -U kwai://home
```

## 获取页面布局信息（控件树）

```
$ hdc shell uitest dumpLayout -p {saveDumpPath}   # 运行命令前需要手动打开app，进入对应页面

DumpLayout saved to:/data/local/tmp/layout_407568854.json
```

* `-p`表示控件树保存的目录，如果不指定，则默认保存在手机的`/data/local/tmp`目录\
  `/data/local/tmp/layout_407568854.json`文件内容如下：

```
{
    "attributes": {
        "accessibilityId": "",
        "bounds": "[0,0][1260,2720]",
        "checkable": "",
        "checked": "",
        "clickable": "",
        "description": "",
        "enabled": "",
        "focused": "",
        "hostWindowId": "",
        "id": "",
        "key": "",
        "longClickable": "",
        "origBounds": "",
        "scrollable": "",
        "selected": "",
        "text": "",
        "type": ""
    },
    "children": [
    	
      ...
      
    ]
```

## 录制用户操作

将当前界面操作记录到`/data/local/tmp/layout/record.csv`，结束录制操作使用`Ctrl+C`结束录制

```
$  hdc shell uitest uiRecord record

windowBounds : (0,0,1260,2720)
Current ForAbility :SCBDesktop13, SCBDesktop13
The result will be written in csv file at location: /data/local/tmp/record.csv
Started Recording Successfully...
click , fingerNumber:1 , 
        finger1:click:  at Widget( id: AppIcon_Image_org.ohosdev.browserce_16777230_0, text: , type: Image) ; from Widget(id: AppIcon_Image_org.ohosdev.browserce_16777230_0, type: Imag
e, text: ) ;  to Point(x:194, y:411) ;
click , fingerNumber:1 , 
        finger1:click:  at Point(x:620, y:987) ; from Point(x:620, y:987)  to Point(x:620, y:983) ;
doubleClick , fingerNumber:1 , 
        finger1:doubleClick:  at Point(x:158, y:2633) ; from Point(x:158, y:2633)  to Point(x:158, y:2633) ;
click , fingerNumber:1 , 
        finger1:click:  at Point(x:829, y:2587) ; from Point(x:829, y:2587)  to Point(x:829, y:2587) ;
recent , fingerNumber:1 , 
        finger1:from Point(x:652, y:2697)  to Point(x:694, y:1719) ;
fling , fingerNumber:1 , 
        finger1:from Point(x:662, y:1833)  to Point(x:637, y:724) ; Off-hand speed:2183.83, Step length:38;
fling , fingerNumber:1 , 
        finger1:from Widget(id: SwiperPage_Grid_WorkSpace_1, type: Grid, text: ) ; to Widget(id: AppIcon_Image_com.huawei.hmos.files_16777217_0, type: Image, text: ) ; Off-hand speed:3
50.328, Step length:42;
fling , fingerNumber:1 , 
        finger1:from Widget(id: SwiperPage_Grid_WorkSpace_1, type: Grid, text: ) ; to Widget(id: AppName_text_com.huawei.hmos.files_文件管理_m2wnkjsholhzucg0wrs, type: Text, text: 文件
管理) ; Off-hand speed:562.963, Step length:92;
fling , fingerNumber:1 , 
        finger1:from Widget(id: SwiperPage_Grid_WorkSpace_1, type: Grid, text: ) ;  to Point(x:573, y:144) ; Off-hand speed:128.394, Step length:42;
fling , fingerNumber:1 , 
        finger1:from Widget(id: SwiperPage_Grid_WorkSpace_1, type: Grid, text: ) ; to Widget(id: StatusBarBackground_Row_0, type: Row, text: ) ; Off-hand speed:3966.14, Step length:45;
1259966024, 12023, key, 1, 2045, , 
No operation detected for 5 seconds,
```

支持两种方式查看数据:

* `uiRecord record`, 将事件的位置坐标写入文件
* `uiRecord read`, 将文件内容打印到控制台

录制完成后，再将`csv`文件拷贝到电脑上

```
$ hdc file recv  /data/local/tmp/layout/record.csv ./record.csv

1
```

`record`数据字段含义请参考如下示例数据

```
{
  "ABILITY": "com.ohos.launcher.MainAbility", // 前台应用界面
  "BUNDLE": "com.ohos.launcher", // 操作应用
  "CENTER_X": "", // 模拟捏合中心X, pinch事件
  "CENTER_Y": "", // 模拟捏合中心Y, pinch事件
  "EVENT_TYPE": "pointer", //  
  "LENGTH": "0", // 总体步长
  "OP_TYPE": "click", //事件类型，当前支持点击、双击、长按、拖拽、捏合、滑动、抛滑动作录制
  "VELO": "0.000000", // 离手速度
  "direction.X": "0.000000",// 总体移动X方向
  "direction.Y": "0.000000", // 总体移动Y方向
  "duration": 33885000.0, // 手势操作持续时间
  "fingerList": [{
      "LENGTH": "0", // 总体步长
      "MAX_VEL": "40000", // 最大速度
      "VELO": "0.000000", // 离手速度
      "W1_BOUNDS": "{"bottom":361,"left":37,"right":118,"top":280}", // 起点控件bounds
      "W1_HIER": "ROOT,3,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0", // 起点控件hierarchy
      "W1_ID": "", // 起点控件id
      "W1_Text": "", // 起点控件text
      "W1_Type": "Image", // 起点控件类型
      "W2_BOUNDS": "{"bottom":361,"left":37,"right":118,"top":280}", // 终点控件bounds
      "W2_HIER": "ROOT,3,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0", // 终点控件hierarchy
      "W2_ID": "", // 终点控件id
      "W2_Text": "", // 终点控件text
      "W2_Type": "Image", // 终点控件类型
      "X2_POSI": "47", // 终点X
      "X_POSI": "47", // 起点X
      "Y2_POSI": "301", // 终点Y
      "Y_POSI": "301", // 起点Y
      "direction.X": "0.000000", // x方向移动量
      "direction.Y": "0.000000" // Y方向移动量
  }],
  "fingerNumber": "1" //手指数量
}
```

## 系统日志（log）

```
$ hdc hilog -h

Usage:
-h --help
  Show all help information.
  Show single help information with option:
  query/clear/buffer/stats/persist/private/kmsg/flowcontrol/baselevel/domain/combo
Querying logs options:
  No option performs a blocking read and keeps printing.
  -x --exit
    Performs a non-blocking read and exits when all logs in buffer are printed.
  -a <n>, --head=<n>
    Show n lines logs on head of buffer.
  -z <n>, --tail=<n>
    Show n lines logs on tail of buffer.
  -t <type>, --type=<type>
    Show specific type/types logs with format: type1,type2,type3
    Don't show specific type/types logs with format: ^type1,type2,type3
    Type coule be: app/core/init/kmsg, kmsg can't combine with others.
    Default types are: app,core,init.
  -L <level>, --level=<level>
    Show specific level/levels logs with format: level1,level2,level3
    Don't show specific level/levels logs with format: ^level1,level2,level3
    Long and short level string are both accepted
    Long level string coule be: DEBUG/INFO/WARN/ERROR/FATAL.
    Short level string coule be: D/I/W/E/F.
    Default levels are all levels.
  -D <domain>, --domain=<domain>
    Show specific domain/domains logs with format: domain1,domain2,doman3
    Don't show specific domain/domains logs with format: ^domain1,domain2,doman3
    Max domain count is 5.
    See domain description at the end of this message.
  -T <tag>, --tag=<tag>
    Show specific tag/tags logs with format: tag1,tag2,tag3
    Don't show specific tag/tags logs with format: ^tag1,tag2,tag3
    Max tag count is 10.
  -P <pid>, --pid=<pid>
    Show specific pid/pids logs with format: pid1,pid2,pid3
    Don't show specific domain/domains logs with format: ^pid1,pid2,pid3
    Max pid count is 5.
  -e <expr>, --regex=<expr>
    Show the logs which match the regular expression <expr>.
  -v <format>, --format=<format>
    Show logs in different formats, options are:
      color or colour      display colorful logs by log level.i.e.
        DEBUG        INFO        WARN        ERROR       FATAL
      time format options are(single accepted):
        time       display local time, this is default.
        epoch      display the time from 1970/1/1.
        monotonic  display the cpu time from bootup.
      time accuracy format options are(single accepted):
        msec       display time by millisecond, this is default.
        usec       display time by microsecond.
        nsec       display time by nanosecond.
      year       display the year when -v time is specified.
      zone       display the time zone when -v time is specified.
    Different types of formats can be combined, such as:
    -v color -v time -v msec -v year -v zone.
-r
  Remove all logs in hilogd buffer, advanced option:
  -t <type>, --type=<type>
    Remove specific type/types logs in buffer with format: type1,type2,type3
    Type coule be: app/core/init/kmsg.
    Default types are: app,core
-g
  Query hilogd buffer size, advanced option:
  -t <type>, --type=<type>
    Query specific type/types buffer size with format: type1,type2,type3
    Type coule be: app/core/init/kmsg.
    Default types are: app,core
-G <size>, --buffer-size=<size>
  Set hilogd buffer size, <size> could be number or number with unit.
  Unit could be: B/K/M/G which represents Byte/Kilobyte/Megabyte/Gigabyte.
  <size> range: [64.0K,64.0K].
  Advanced option:
  -t <type>, --type=<type>
    Set specific type/types log buffer size with format: type1,type2,type3
    Type coule be: app/core/init/kmsg.
    Default types are: app,core
  **It's a persistant configuration**
-s, --statistics
  Query log statistic information.
  Set param persist.sys.hilog.stats true to enable statistic.
  Set param persist.sys.hilog.stats.tag true to enable statistic of log tag.
-S
  Clear hilogd statistic information.
-w <control>,--write=<control>
  Log persistance task control, options are:
    query      query tasks informations
    stop       stop all tasks
    start      start one task
    clear      clear /data/log/hilog/hilog*.gz
  Persistance task is used for saving logs in files.
  The files are saved in directory: /data/log/hilog/
  Advanced options:
  -f <filename>, --filename=<filename>
    Set log file name, name should be valid of Linux FS.
  -l <length>, --length=<length>
    Set single log file size. <length> could be number or number with unit.
    Unit could be: B/K/M/G which represents Byte/Kilobyte/Megabyte/Gigabyte.
    <length> range: [64.0K, 512.0M].
  -n <number>, --number<number>
    Set max log file numbers, log file rotate when files count over this number.
    <number> range: [2, 1000].
  -m <compress algorithm>,--stream=<compress algorithm>
    Set log file compressed algorithm, options are:
      none       write file with non-compressed logs.
      zlib       write file with zlib compressed logs.
  -j <jobid>, --jobid<jobid>
    Start/stop specific task of <jobid>.
    <jobid> range: [10, 0xffffffff).
  User can start task with options (t/L/D/T/P/e/v) as if using them when "Query logs" too.
  **It's a persistant configuration**
-p <on/off>, --privacy <on/off>
  Set HILOG api privacy formatter feature on or off.
  **It's a temporary configuration, will be lost after reboot**
-k <on/off>, --kmsg <on/off>
  Set hilogd storing kmsg log feature on or off
  **It's a persistant configuration**
-Q <control-type>
  Set log flow-control feature on or off, options are:
    pidon     process flow control on
    pidoff    process flow control off
    domainon  domain flow control on
    domainoff domain flow control off
  **It's a temporary configuration, will be lost after reboot**
-b <loglevel>, --baselevel=<loglevel>
  Set global loggable level to <loglevel>
  Long and short level string are both accepted.
  Long level string coule be: DEBUG/INFO/WARN/ERROR/FATAL/X.
  Short level string coule be: D/I/W/E/F/X.
  X means that loggable level is higher than the max level, no log could be printed.
  Advanced options:
  -D <domain>, --domain=<domain>
    Set specific domain loggable level.
    See domain description at the end of this message.
  -T <tag>, --tag=<tag>
    Set specific tag loggable level.
    The priority is: tag level > domain level > global level.
  **It's a temporary configuration, will be lost after reboot**
The first layer options can't be used in combination, ILLEGAL expamples:
    hilog -S -s; hilog -w start -r; hilog -p on -k on -b D


Domain description:
  Log type "core" & "init" are used for OS subsystems, the range is [0xd000000,  0xd0fffff]
  Log type "app" is used for applications, the range is [0x0,  0xffff]
  To reduce redundant info when printing logs, only last five hex numbers of domain are printed
  So if user wants to use -D option to filter OS logs, user should add 0xD0 as prefix to the printed domain:
  Exapmle: hilog -D 0xD0xxxxx
  The xxxxx is the domain string printed in logs.


Dictionary description:
-d <path>, --dictionary=<path>
  Set elf file path, name should be valid of Linux FS.
  Rescan the elf file in the system to generate a full data dictionary file
```

## 导出日志

```
$ hdc file recv data/log/hilog/ ./


FileTransfer finish, Size:18754808, File count = 42, time:646ms rate:29032.21kB/s
```

## 导出crash日志

```
$ hdc file recv data/log/faultlog/faultlogger/ ./

FileTransfer finish, Size:129048, File count = 1, time:9ms rate:14338.67kB/s
```

## hidumper工具

```
$ hdc shell hidumper -h

usage:
  -h                          |help text for the tool
  -lc                         |a list of system information clusters
  -ls                         |a list of system abilities
  -c                          |all system information clusters
  -c [base system]            |system information clusters labeled "base" and "system"
  -s                          |all system abilities
  -s [SA0 SA1]                |system abilities labeled "SA0" and "SA1"
  -s [SA] -a ['-h']           |system ability labeled "SA" with arguments "-h" specified
  -e                          |faultlogs of crash history
  --net [pid]                 |dump network information; if pid is specified, dump traffic usage of specified pid
  --storage [pid]             |dump storage information; if pid is specified, dump /proc/pid/io
  -p                          |processes information, include list and information of processes and threads
  -p [pid]                    |dump threads under pid, includes smap, block channel, execute time, mountinfo
  --cpuusage [pid]            |dump cpu usage by processes and category; if PID is specified, dump category usage of specified pid
  --cpufreq                   |dump real CPU frequency of each core
  --mem [pid]                 |dump memory usage of total; dump memory usage of specified pid if pid was specified
  --zip                       |compress output to /data/log/hidumper
  --mem-smaps pid [-v]        |display statistic in /proc/pid/smaps, use -v specify more details
  --mem-jsheap pid [-T tid] [--gc]  |triggerGC and dumpHeapSnapshot under pid and tid
```

### list system abilities

```
$ hdc shell hidumper -ls

System ability list:
SystemAbilityManager             RenderService                    AbilityManagerService
DataObserverMgr                  UriPermissionMgr                 AccountMgr
BundleMgr                        FormMgr                          ApplicationManagerService
AccessibilityManagerService      UserIdmService                   UserAuthService
AuthExecutorMgrService           PinAuthService                   FaceAuthService
WifiDevice                       WifiHotspot                      WifiScan
1125                             1126                             NetConnManager
NetPolicyManager                 NetStatsManager                  VPNManager
EthernetManager                  NetsysNative                     DistributedNet
HiviewService                    HiviewFaultLogger                HiviewSysEventService
1204                             HiDumperService                  XpowerManager
HiDumperCpuService               DistributedKvData                ContinuationManagerService
ResourceSched                    BackgroundTaskManager            WorkSchedule
SocPerfService                   DeviceUsageStatistics            MemoryManagerService
ConcurrentTaskService            DeviceStandbyService             1918
1919                             LocationLocator                  2901
DeviceStatusService              2903                             2904
2908                             AudioDistributed                 PlayerDistributedService
CameraService                    AudioPolicyService               AVSessionService                 
AVCodecService                   MediaKeySystemService            3013
MultimodalInput                  DistributedNotificationService   CommonEventService
PowerManagerService              BatteryService                   ThermalService
BatteryStatisticsService         DisplayPowerManagerService       AccessTokenManagerService
PrivacyManagerService            KeystoreService                  CertManagerService
RiskAnalysisManagerService       DataCollectManagerService        3526
DlpCreService                    SensorService                    MiscDeviceService
PasteboardService                TimeService                      InputMethodService
ScreenlockService                WallpaperManagerService          3706
ParamWatcher                     SysParamDevice                   TelephonyCallManager
TelephonyCellularCall            TelephonyCellularData            TelephonySmsMms
TelephonyStateRegistry           TelephonyCoreService             UsbService
4353                             WindowManagerService             DisplayManagerService
DSoftbus                         DeviceAuthService                DeviceManagerService
StorageDaemon                    StorageManager                   HdfDeviceServiceManager
DistributedDeviceProfile         EcologicalRuleManager            AppDomainVerifyManager
UiService                        UiAppearanceService              AssetService
65570                            65728                            65777
65850                            65926                            65958
66054                            70633                            70635
```

获取到abilities后，就可以指定service获取相关的信息。 比如通过RenderService获取一些信息

```
$ hdc shell hidumper -s RenderService             

-------------------------------[ability]-------------------------------


----------------------------------RenderService----------------------------------
------Graphic2D--RenderSerice ------
Usage:
 h                             |help text for the tool
screen                         |dump all screen infomation in the system
surface                        |dump all surface information
composer fps                   |dump the fps info of composer
[surface name] fps             |dump the fps info of surface
composer fpsClear              |clear the fps info of composer
[windowname] fps               |dump the fps info of window
[windowname] hitchs            |dump the hitchs info of window
[surface name] fpsClear        |clear the fps info of surface
nodeNotOnTree                  |dump nodeNotOnTree info
allSurfacesMem                 |dump surface mem info
RSTree                         |dump RSTree info
EventParamList                 |dump EventParamList info
allInfo                        |dump all info
dumpMem                        |dump Cache
trimMem cpu/gpu/shader         |release Cache
surfacenode [id]               |dump node info
fpsCount                       |dump the refresh rate counts info
clearFpsCount                  |clear the refresh rate counts info
flushJankStatsRs|flush rs jank stats hisysevent
```

### RenderService

**获取分辩率**

```
$ hdc shell hidumper -s RenderService -a screen 

-------------------------------[ability]-------------------------------


----------------------------------RenderService----------------------------------
-- ScreenInfo
screen[0]: id=0, powerstatus=POWER_STATUS_ON, backlight=1, screenType=EXTERNAL_TYPE, render size: 1260x2720, physical screen resolution: 1260x2720, isvirtual=false, skipFrameInterval_:
1

  supportedMode[0]: 1260x2720, refreshrate=60
  activeMode: 1260x2720, refreshrate=60
  capability: name=express_display, phywidth=72, phyheight=156,supportlayers=10, virtualDispCount=1, propCount=0, type=DISP_INTF_HDMI, supportWriteBack=false
```

**获取帧率**\
首先执行如下命令进入到shell环境

```
$ hdc shell

```

然后执行`hidumper [surface name] fps` , 例如`composer fps`

```
$ hidumper -s RenderService -a "composer fps"
#不知道为什么都是零

-------------------------------[ability]-------------------------------


----------------------------------RenderService----------------------------------

-- The recently fps records info of screens:

The fps of screen [Id:0] is:
0
0
0
0
0
0
0
0
0
0
0
0
0
0
0
```

### DisplayManagerService

```
$ hdc shell hidumper -s DisplayManagerService

-------------------------------[ability]-------------------------------


----------------------------------DisplayManagerService----------------------------------
-------------- DMS FREEZED PID LIST  --------------
-------------- DMS KEY EVENTS LIST  --------------
[10-31 09:54:28.367]: Dms construct.
[10-31 09:54:30.663]: Default screen id : 0
[10-31 09:54:30.663]: Dms OnScreenChange register success.
[10-31 09:54:30.663]: OnScreenChange triggered. screenId: 0  screenEvent: 0
[10-31 09:54:30.671]: GetScreenPower state:0 screenId:0
[10-31 09:54:30.672]: Dms subscribed to sensor successfully.
[10-31 09:54:30.672]: Dms init end.
[10-31 09:54:30.672]: CreateScreenProperty by rsInterface success.
[10-31 09:54:30.682]: create screen session success.
[10-31 09:54:30.687]: Dms onstart end.
[10-31 09:54:30.690]: Dms RefreshRateChange register success.
[10-31 09:54:31.850]: GetScreenPower state:0 screenId:0
[10-31 09:54:32.156]: GetScreenPower state:0 screenId:0
[10-31 09:54:34.584]: set client userId: 100 newScbPid: 1215 clientName: com.ohos.sceneboard
[10-31 09:54:34.587]: currentUserId: 0  currentScbPId: -1  newUserId: 100  newScbPid: 1215  coldBoot: 1
-------------- DMS Multi User Info --------------
[oldScbPid:]
[userId:] 100
[ScbPid:] 1215
Usage:
 -h                             |help text for the tool
 -a                             |dump all screen information in the system
 -z                             |switch to fold half status
 -y                             |switch to expand status
 -p                             |switch to fold status
 -f                             |get to fold status
```

### PowerManagerService

```
$ hdc shell hidumper -s PowerManagerService

-------------------------------[ability]-------------------------------


----------------------------------PowerManagerService----------------------------------
Power manager dump options:
  [-h] [-runninglock]
  description of the cmd option:
    -a: show dump info of all power modules.
    -h: show this help.
    -r: show the information of runninglock.
    -s: show the information of power state machine.
    -d: show power off dialog.
```

例如上文提到的获取屏幕状态

```
$ hdc shell hidumper -s PowerManagerService -a -s

```

### BatteryService

```
$ hdc shell hidumper -s BatteryService

-------------------------------[ability]-------------------------------


----------------------------------BatteryService----------------------------------
Usage:
      -h: dump help
      -i: dump battery info
```

例如上文提到的获取电量温度

```
$ hdc shell hidumper -s BatteryService -a -i                

```

### NetConnManager

```
$ hdc shell hidumper -s NetConnManager

-------------------------------[ability]-------------------------------


----------------------------------NetConnManager----------------------------------
Net connect Info:
	defaultNetSupplier_ is nullptr
	SupplierId:
	NetId: 0
	ConnStat: 0
	IsAvailable:
	IsRoaming: 0
	Strength: 0
	Frequency: 0
	LinkUpBandwidthKbps: 0
	LinkDownBandwidthKbps: 0
	Uid: 0
Dns result Info:
	netId: 0
	totalReports: 2
	failReports: 2

```

### StorageManager

## aa工具

Ability assistant（Ability助手，简称为aa），是实现应用及测试用例启动功能的工具，为开发者提供基本的应用调试和测试能力，例如启动应用组件、强制停止进程、打印应用组件相关信息等。

```
$ hdc shell aa help
usage: aa <command> <options>
These are common aa commands list:
  help                        list available commands
  start                       start ability with options
  stop-service                stop service with options
  dump                        dump the ability info
  force-stop <bundle-name>    force stop the process with bundle name
  attach                      attach application to enter debug mdoe
  detach                      detach application to exit debug mode
  test                        start the test framework with options
  appdebug                    set / cancel / get waiting debug status
```

### start

### stop-service

### force-stop

### test

### attach

### detach

### appdebug

详细介绍请参考文档：<https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/aa-tool.md>

## bm工具

Bundle Manager（包管理工具，简称bm）是实现应用安装、卸载、更新、查询等功能的工具，bm为开发者提供基本的应用安装包的调试能力，例如：安装应用，卸载应用，查询安装包信息等。

```
$ hdc shell bm help
usage: bm <command> <options>
These are common bm commands list:
  help         list available commands
  install      install a bundle with options
  uninstall    uninstall a bundle with options
  dump         dump the bundle info
  get          obtain device udid
  quickfix     quick fix, including query and install
  compile      Compile the software package
  dump-overlay dump overlay info of the specific overlay bundle
  dump-target-overlay dump overlay info of the specific target bundle
  dump-dependencies dump dependencies by given bundle name and module name
  dump-shared dump inter-application shared library information by bundle name
  clean        clean the bundle data
```

### install

### uninstall

### dump

### clean

### enable

### disable

### get

详细介绍请参考文档：<https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/bm-tool.md>

## param工具

param是为开发人员提供用于操作系统参数的工具，该工具只支持标准系统。

```
$ hdc shell param                                   
Command list:
    param ls [-r] [name]                            --display system parameter
    param get [name]                                --get system parameter
    param set name value                            --set system parameter
    param wait name [value] [timeout]               --wait system parameter
    param dump [verbose]                            --dump system parameter
    param shell [-p] [name] [-u] [username] [-g] [groupname]    --shell system parameter
    param save    
```

详细介绍请参考文档：<https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/param-tool.md>

## Instrument Test

主要用来做APP 的UI自动化测试，将应用测试包安装到测试设备上，在cmd窗口中执行aa命令，完成对用例测试。

`aa test`命令执行配置参数

| 执行参数全写       | 执行参数缩写 | 执行参数含义                       | 执行参数示例                                            |
| ------------ | ------ | ---------------------------- | ------------------------------------------------- |
| –bundleName  | -b     | 应用 Bundle 名称                 | -b com.test.example                               |
| –packageName | -p     | 应用模块名，适用于 FA 模型应用            | -p com.test.example.entry                         |
| –moduleName  | -m     | 应用模块名，适用于 STAGE 模型应用         | -m entry                                          |
| NA           | -s     | 特定参数，以 \<key, value> 键值对方式传入 | -s unittest /ets/testrunner/OpenHarmonyTestRunner |

```
$ hdc shell aa test -h
usage: aa test <options>
options list:
  -h, --help                                             list available commands
  -b <bundle-name> -s unittest <test-runner>             start the test framework with options
                  [-p <package-name>]                    the name of package with test-runner, required for the FA model
                  [-m <module-name>]                     the name of module with test-runner, required for the STAGE model
                  [-s class <test-class>]
                  [-s level <test-level>]
                  [-s size <test-size>]
                  [-s testType <test-testType>]
                  [-s timeout <test-timeout>]
                  [-s <any-key> <any-value>]
                  [-w <wait-time>]
                  [-D]
```

**举例**

```
$ hdc shell aa test -b com.example.myapplication -m entry_test -s unittest /ets/testrunner/OpenHarmonyTestRunner -s class UiTestDemo timeout 15000

```

查看测试结果\
cmd模式执行过程,会打印如下相关日志信息。

```
OHOS_REPORT_STATUS: class=testStop
OHOS_REPORT_STATUS: current=1
OHOS_REPORT_STATUS: id=JS
OHOS_REPORT_STATUS: numtests=447
OHOS_REPORT_STATUS: stream=
OHOS_REPORT_STATUS: test=stop_0
OHOS_REPORT_STATUS_CODE: 1

OHOS_REPORT_STATUS: class=testStop
OHOS_REPORT_STATUS: current=1
OHOS_REPORT_STATUS: id=JS
OHOS_REPORT_STATUS: numtests=447
OHOS_REPORT_STATUS: stream=
OHOS_REPORT_STATUS: test=stop_0
OHOS_REPORT_STATUS_CODE: 0
OHOS_REPORT_STATUS: consuming=4

OHOS_REPORT_RESULT: stream=Tests run: 447, Failure: 0, Error: 1, Pass: 201, Ignore: 245
OHOS_REPORT_CODE: 0

OHOS_REPORT_RESULT: breakOnError model, Stopping whole test suite if one specific test case failed or error
OHOS_REPORT_STATUS: taskconsuming=16029
```

## 性能工具

`SmartPerf`是一款基于系统开发的性能功耗测试工具，操作简单易用。工具可以检测性能、功耗相关指标，包括`FPS`、`CPU`、`GPU`、`RAM`、`Temp`等，通过量化的指标项了解应用性能状况。在开发过程中，使用的可能是有屏或无屏设备，对此`SmartPerf`提供了两种方式：分别是`SmartPerf-Device`和`SmartPerf-Daemon`。`SmartPerf-Device`适用于有屏设备，支持可视化操作。测试时是通过悬浮窗的开始和暂停来实时展示性能指标数据，保存后可生成数据报告，在报告中可分析各指标数据详情。`SmartPerf-Daemon`支持`shell命令行`方式，同时适用于有屏和无屏设备。

* CPU：每秒读取一次设备节点下CPU大中小核的频点和各核使用率，衡量应用占用CPU资源的情况，占用过多的CPU资源会导致芯片发烫。
* GPU：每秒读取一次设备节点下GPU的频点和负载信息，衡量应用占用GPU资源的情况，当GPU占用过多时，会导致性能下降，应用程序的运行速度变慢。
* FPS：应用界面每秒刷新次数，衡量应用画面的流畅度，FPS越高表示图像流畅度越好，用户体验也越好。
* POWER：每秒读取一次设备节点下的电流及电压信息。
* TEMP：每秒读取一次设备节点下电池温度、系统芯片温度等信息。
* RAM：每秒读取一次应用进程的实际物理内存，衡量应用的内存占比情况。
* snapshot：每秒截取一张应用界面截图。

```
$ hdc shell

# SP_daemon

// 查看daemon进程是否存在
# ps -ef | grep SP_daemon
shell        11005     1 37469777 10:27:28 ? 213502-23:34:22 SP_daemon
shell        11033  9753 141940753 10:27:37 136:0 213502-23:34:22 grep SP_daemon
```

执行查看帮助命令

```
# SP_daemon --help
OpenHarmony performance testing tool SmartPerf command-line version
Usage: SP_daemon [options] [arguments]

options:
 -N             set the collection times(default value is 0) range[1,2147483647], for example: -N 10
 -PKG           set package name, must add, for example: -PKG ohos.samples.ecg
 -c             get device CPU frequency and CPU usage, process CPU usage and CPU load ..
 -g             get device GPU frequency and GPU load
 -f             get app refresh fps(frames per second) and fps jitters and refreshrate
 -profilerfps   get refresh fps and timestamp
 -sections      set collection time period(using with profilerfps)
 -t             get remaining battery power and temperature..
 -p             get battery power consumption and voltage
 -r             get process memory and total memory
 -snapshot      get screen capture
 -net           get uplink and downlink traffic
 -start         collection start command
 -stop          collection stop command
 -VIEW          set layler, for example: -VIEW DisplayNode
 -screen        get screen resolution
 -OUT           set csv output path.
 -d             get device DDR information
 -m             get other memory
example:
SP_daemon -N 20 -c -g -t -p -r -m -net -snapshot -d
SP_daemon -N 20 -PKG ohos.samples.ecg -c -g -t -p -f -r -m -net -snapshot -d
SP_daemon -start -c
SP_daemon -stop
SP_daemon -screen
```

基于`hdc`命令行的`SmartPerf`性能工具使用详细文档参考这个：https\://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/application-test/smartperf-guidelines.md

## 参考链接

* <https://gitee.com/openharmony/developtools\_hdc>
* <https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V2/ide-command-line-hdc-0000001237908229-V2#section116322265308>
* <https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/application-test/smartperf-guidelines.md>
* <https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/aa-tool.md>
* <https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/bm-tool.md>
* <https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/param-tool.md>
* <https://github.com/mzlogin/awesome-adb>
