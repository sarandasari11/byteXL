# Git terminal session — what I did and why

This document explains the sequence of commands you ran in PowerShell, what the messages meant, and how to fix common problems you encountered. It also includes recommended PowerShell commands you can re-run safely.

## 1) Initial status message

Message seen:

```
nothing added to commit but untracked files present (use "git add" to track)
```

Meaning: Git detected files in the working directory that are not yet staged for commit.

What you tried next:

```
PS C:\Users\asus\OneDrive\Desktop\FULLSTACK> git add .
fatal: Unable to create 'C:/Users/asus/OneDrive/Desktop/FULLSTACK/.git/index.lock': File exists.

Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
```

Why it happened: Git creates a lock file (`.git/index.lock`) while updating the index to prevent concurrent changes. If a previous Git operation crashed or was interrupted, that lock file can be left behind and prevent new index updates.

Quick fix (PowerShell):

```
# Make sure no git process is running. If no other git process exists, remove the stale lock:
Remove-Item -Force .git\index.lock
# Then re-run add/commit
git add .
```

If you prefer to check processes first:

```
# Find git-related processes
tasklist | Select-String git
# Or use Get-Process (may require elevated permissions)
Get-Process -Name git* -ErrorAction SilentlyContinue
```

## 2) You ran `git init`

```
PS C:\Users\asus\OneDrive\Desktop\FULLSTACK> git init
Initialized empty Git repository in C:/Users/asus/OneDrive/Desktop/FULLSTACK/.git/
```

Note: `git init` creates a new Git repository (or reinitializes an existing one). Running it in a folder with no repo or where `.git` was missing is fine. It is harmless if a repo already exists — it will reinitialize the repo config. In your session, the subsequent `git commit` shows the repo used and files were committed successfully.

## 3) `git add .` produced CRLF warnings

Example warning:

```
warning: in the working copy of 'middleware-express/package-lock.json', LF will be replaced by CRLF the next time Git touches it
```

Meaning: Git detected LF line endings in files on disk, and on Windows it will convert them to CRLF when checking them out (based on `core.autocrlf` behavior). This is a warning, not an error.

Recommended action on Windows: enable automatic conversion so collaborators on different OSes don't get noisy changes:

```
git config --global core.autocrlf true
```

Alternative (if you prefer to keep LF in the repository):

```
git config --global core.autocrlf input
# or
git config --global core.autocrlf false
```

Also consider adding a `.gitattributes` to the repo to pin line-ending behavior per file type.

## 4) `git commit -m "initisl push"`

Output shows a successful commit:

```
[master (root-commit) 5becfdb] initisl push
 27 files changed, 5414 insertions(+)
 create mode 100644 .gitignore
 ... (other files)
```

This created the initial commit on the `master` branch.

## 5) Branch rename and remote add

You ran:

```
git branch -M main
git remote add origin https://github.com/sarandasari11/byteXL.git
```

`git branch -M main` renames the current branch to `main` (force-move). `git remote add origin ...` registers the remote repository URL under the name `origin`.

## 6) Mistyped push attempt and errors

You attempted:

```
git push -u orign msun
error: src refspec msun does not match any
error: failed to push some refs to 'orign'
```

Problems:
- `orign` is a typo of `origin` (so Git treated it as a remote name, but it doesn't exist)
- `msun` is likely a typo of the branch name (e.g., `main` or `master`) so Git couldn't find a local ref named `msun`.

Then you tried to push to `orign` again:

```
git push -u orign main
fatal: 'orign' does not appear to be a git repository
```

Fix: use the correct remote name `origin` and the correct branch name. Example:

```
git push -u origin main
```

## 7) Final branch rename and successful push

You renamed the branch to `deve` and pushed:

```
git branch -M deve
git push -u origin deve
```

This created the `deve` branch on the remote and successfully pushed the commit(s) up. Git output confirms the remote link and even printed a helpful GitHub link to create a pull request.

## Short, safe step-by-step recovery / best-practices (PowerShell)

If you ever get stuck with the same problems, follow these steps in the repo root.

```
# 1. Make sure you are in the repo root
Set-Location -Path 'C:\Users\asus\OneDrive\Desktop\FULLSTACK'

# 2. If git reports index.lock, ensure no git process is running, then remove lock
Get-Process -Name git* -ErrorAction SilentlyContinue
Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue

# 3. Stage files
git add .

# 4. Set up Windows-friendly line endings (optional, one-time)
git config --global core.autocrlf true

# 5. Commit
git commit -m "Initial commit"

# 6. Add remote (only if not added yet) - double-check the URL and spelling
git remote add origin https://github.com/sarandasari11/byteXL.git

# 7. Rename branch if desired and push (example: create 'deve' branch locally and push)
git branch -M deve
git push -u origin deve

# 8. If you intended to push 'main' instead:
git branch -M main
git push -u origin main
```

## Notes and suggestions

- Avoid typos in remote names and branch names. Use `git remote -v` to verify remotes.
- `git init` is fine to run if no `.git` exists; running it inside an existing repo will reinitialize the repository.
- If you regularly use Windows and collaborate with Linux/macOS users, commit a `.gitattributes` file to normalize line endings.
- The `.gitignore` file you added is already present and will prevent committing node_modules and other local files.

## Quick reference commands

- Check repo status: `git status`
- List branches: `git branch --all`
- Show remotes: `git remote -v`
- Remove stale index lock: `Remove-Item -Force .git\index.lock`

---

If you want, I can:

- Add a `.gitattributes` file with recommended line-ending rules and commit it for you.
- Create this guide as `GIT_TERMINAL_GUIDE.md` (already added) and open it for further edits.
- Add a small troubleshooting script (PowerShell) that checks for stale lock files and fixes them.

