- DATE:2026-06-24 21:20:27

# 添加远程仓库（替换成你的 GitHub 地址）
git remote add origin https://github.com/makelove/makelove.github.io.git

# 确认远程地址是否正确
git remote -v

# 6. 强制覆盖推送到远程 brn 分支
git push -u origin main:ai --force
git push -u origin main:brn --force

```sh
[21:07:25] (.ai) play@playdeMacBook-Air makelove.github.io % git remote add origin https://github.com/makelove/makelove.github.io.git
[21:07:53] (.ai) play@playdeMacBook-Air makelove.github.io % git remote -v
origin  https://github.com/makelove/makelove.github.io.git (fetch)
origin  https://github.com/makelove/makelove.github.io.git (push)
[21:07:59] (.ai) play@playdeMacBook-Air makelove.github.io % git push -u origin main:brn --force
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 257 bytes | 257.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote:
remote: Create a pull request for 'brn' on GitHub by visiting:
remote:      https://github.com/makelove/makelove.github.io/pull/new/brn
remote:
To https://github.com/makelove/makelove.github.io.git
 * [new branch]      main -> brn
branch 'main' set up to track 'origin/brn'.
[21:09:19] (.ai) play@playdeMacBook-Air makelove.github.io %
```