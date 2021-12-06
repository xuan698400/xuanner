# 安装
* [下载git OSX版本](http://git-scm.com/download/mac)
* [下载 git Windows 版](https://gitforwindows.org/)
* [下载 git Linux 版](http://git-scm.com/download/linux)

# 创建新仓库
创建新文件夹，打开，然后执行：`git init`

# 检出仓库
创建一个克隆版本：`git clone /path/xxx/repository`
如果是远端仓库，你的命令可能是这样：`git clone username@host:/path/xxx/repository`

# 操作流程
检出后，git帮你维护了3部分内容。
* 工作目录：就是实际持有文件，你可以修改这些文件。
* 暂存区（Index）：临时缓存你操作的文件内容
* HEAD：操作文件后你可以提交一个版本到本地，HEAD就指向了你最后一次提交的结果
<img src="data/article/content/Git常用命令/trees.png" width=400 />

# 添加和提交
* 添加：你在工作空间修改文件后，可以用命令提交到暂存区（新增文件需要，在原来已经提交文件上修改不用）：`git add <filename>`或者提交全部`git add *`。
* 提交：可以把暂存区的内容提交的到HEAD记录。`git commit -m "提交说明"`。
（PS：这时你的改动已经提交到了本地仓库，但是还没有合并到你的远端仓库）

# 推送改动
可以把你的改动推送到远端仓库：`git push origin master`。可以把master换成别的分支。

# 分支
可以从master拉一个副本分支出来，进行修改，修改完了以后，可以在合并回去。
<img src="data/article/content/Git常用命令/branches.png" width=400 />
* 创建一个分支：`git checkout -b feature_x`
* 切回主干：`git checkout master`
* 删除新建的分支：`git branch -d feature_x`
* 推动到远端仓库，不然别人看不到：`git push origin feature_x`
* 查看当前本地仓库的所有分支：`git branch`
* 查看远端仓库的所有分支：`git branch -a`

# 更新合并
* 更新：你可以更新别人提交上来的代码：`git pull`
* 合并：你可以合并别的分支的代码到你的分支：`git merge <branch>`
* 冲突：如果同一个文件冲突了，需要你手动进行修改，确认后记得：`git add <filename>`
* 差异预览：你可以查看两个分支之间的差异：`git diff <brnach1> <branch2>`

# 标签
* 获取提交ID：`git log`
* 标记一个tag：`git tag 1.0.0 1b2e1d63ff`。其中1b2e1d63ff是想要标记的提交ID的前10位。

# 替换本地改动


# commit后未push回退
git reset -hard HEAD^