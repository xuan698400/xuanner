# Hello Wolrd
## 创建项目
创建文件夹chrome_test_v3，里面放入名为manifest.json的文件，文件内容如下：
```
{
  "name": "徐工ChromeV3测试",
  "description": "徐工ChromeV3测试-描述",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_popup": "popup.html"
  }
}
```
创建一个popup.html文件，代码为：
```
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <b>Hello World!!!</b>
    </body>
</html>
```

## 安装项目
打开chrome的扩展程序，开启开发者模式，选择未解压安装
<img src="data/article/content/Chrome插件开发V3/images/pic1.png" width="300" />

选择刚才的文件夹，安装成功后就会出现这个
<img src="data/article/content/Chrome插件开发V3/images/pic2.png" width="300" />

最后在浏览器右上角打开插件操作项
<img src="data/article/content/Chrome插件开发V3/images/pic3.png" width="300" />

刚才的网页Hello World就出现了
<img src="data/article/content/Chrome插件开发V3/images/pic4.png" width="300" />


# 资料
* 官网：https://developer.chrome.com/
* V3开始：https://developer.chrome.com/docs/extensions/mv3/getstarted/