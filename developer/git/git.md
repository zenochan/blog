# Git

---
### commit 
- git commit --amend: 修改 comment
### checkout

1. revert 所有改变的文件



		git checkout .

		

2. revert 指定文件

		

		git checkout file1 file2 ...



3. [恢复 git reset -hard 的误操作](http://www.cnblogs.com/mliudong/archive/2013/04/08/3007303.html)



		//查看操作记录

		$ git reflog

		b7057a9 HEAD@{0}: reset: moving to b7057a9

		98abc5a HEAD@{1}: commit: more stuff added to foo

		b7057a9 HEAD@{2}: commit (initial): initial commit

		

		//回到误操作之前的版本号

		$ git reset --hard 98abc5a

4. [git使用中checkout生成临时br的问题](http://blog.csdn.net/mydo/article/details/42784735)



		$git branch

		* (detached from 548a7fa) b7451ea v0.8 重新导入了真实的题库

 		master                  548a7fa v0.6 加入分页功能

 		

 		//切回master 

 		$git checkout master

 		

 		//切到最新的hash

 		$git reset --hard b7451

 		

 		

### git merge ###



- [git merge简介](http://blog.csdn.net/hudashi/article/details/7664382)
- [git merge 跟 git merge -no-ff](http://www.myexception.cn/program/1987549.html)



---



1. ##### merge #####

 注意没参数的情况下 merge 是 **fast-forward** 的，即 Git 将 master 分支的指针直接移到 dev 的最前方。

 		

 		git merge origin/dev

 		

 ![](http://img.blog.csdn.net/20150317150204419?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHVkYXNoaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



 ---

 

2. ##### merge --no-ff #####

 使用--no-ff参数后，会执行正常合并，在Master分支上生成一个新节点。为了保证版本演进的清晰，我们希望采用这种做法。

 		

 		git merge --no-ff origin/dev

 		

 ![](http://img.blog.csdn.net/20150317150436227?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHVkYXNoaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



3. ##### git merge --squash #####



	---

	

	是用来把一些不必要commit进行压缩，比如说，你的feature在开发的时候写的commit很乱，那么我们合并的时候不希望把这些历史commit带过来，于是使用--squash进行合并，此时文件已经同合并后一样了，但不移动HEAD，不提交。需要进行一次额外的commit来“总结”一下，然后完成最终的合并。

	

	![](http://segmentfault.com/img/bVkJAj)



3. ##### 冲突 #####

  

	---



	```

	<<<<<<< HEAD

	test in master

	=======

	test in dev

	>>>>>>> dev

	```

	

	- __<<<<<<<__: 标记冲突开始，后面跟的是__当前分支__中的内容。 

 

	- __HEAD__: 指向当前分支末梢的提交。  



	- __=======__ 之后，__>>>>>>>__ 之前是要merge过来的__另一条分支__上的代码。  



	- __>>>>>>>__ 之后的dev是该分支的名字。  



	对于简单的合并，手工编辑，然后去掉这些标记，运行git add 将把它们标记为已解决（resolved）

	

	```

	Auto-merged xxx/A.java

	CONFLICT (content) : Merge conflict in xxx/A.java

	Automatic merge failed; fix conflicts and then commit the result.

	```



	这时候两个程序员达成一致，最后应该完全采用甲的版本，因为乙只是在原基础上优化，而甲进行了全方面的重写。在这种情况下，git checkout 命令的   - -theirs 和 - -ours 就派上用场了。前者表示保留甲 想要merge的版本，后者表示保留master branch中的版本，即乙的版本。  

	

	```

	$ git checkout - -ours xxx/A.java // 抛弃甲的版本，保留乙的  

	

	$ git checkout - -theirs xxx/A.java // 抛弃乙的版本，完全采用甲的

	```

	

	

### git cherry-pick ###



git cherry-pick用于把另一个本地分支的commit修改应用到当前分支。

```bash
#取消对文件的修改。还原到最近的版本，废弃本地做的修改。
git checkout -- <file>

#取消已经暂存的文件。即，撤销先前"git add"的操作
git reset HEAD <file>...

#修改最后一次提交。用于修改上一次的提交信息，或漏提交文件等情况。
git commit --amend

#回退所有内容到上一个版本
git reset HEAD^

#回退a.py这个文件的版本到上一个版本  
git reset HEAD^ a.py  

#向前回退到第3个版本  
git reset –soft HEAD~3  

#将本地的状态回退到和远程的一样  
git reset –hard origin/master  

#回退到某个版本  
git reset 057d  

#回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit.(代码回滚到上个版本，并提交git)
git revert HEAD
```
