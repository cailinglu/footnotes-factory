---
layout: post
title: "Git(hub) tips: pull requests"
date: 2017-03-11
categories: [Git]
---
I'd like to share some Git(hub) knowledge that came in handy for me. (1) Testing someone else's pull request and (2) pushing a specific commit to a Github repository. The latter has a fun name -- "cherry picking"!

## Testing someone else's pull request
You should be in the root directory of your project. Make sure that you don't have any uncommitted changes first, using `git status`.

You're going to grab the PR and save it onto a separate branch (so don't worry about it messing up your work).

Assuming that the PR is on your **upstream** repository, use this command: `git fetch upstream pull/PULL REQUEST NUMBER/head:A NEW BRANCH NAME`.[^1]

Now you can checkout onto the branch A NEW BRANCH NAME and see what changes were made. When you're done, you can force delete the local branch with `git branch -D A NEW BRANCH NAME`.

## [Cherry picking](https://git-scm.com/docs/git-cherry-pick)
I ran into this when I was making changes to a local branch. I made a single commit when I was finished. And then I pulled from the remote repository instead of doing a rebase (this was a while ago, but I think this is what happened). When I went to do my pull request, I had about 300 extra commits from other people. Cherry picking let me pick out and push to Github the single commit that I had actually made.

First, you're going to need the commit's [checksum](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History). You can find this with `git log`.

Once you've found the commit that you want to cherry pick, use the command `git cherry-pick CHECKSUM`[^2]. Immediately after, do a `git push` to wherever the commit needs to go. And you'll have to use `git checkout SOME BRANCH NAME` to get back to your usual branch.

### Resources
- [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick)
- [Git Basics - Viewing the Commit History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)

[^1]: Don't forget to replace 'PULL REQUEST NUMBER' and 'A NEW BRANCH NAME' with your own values. It doesn't matter what the branch name is, as long as you don't already have a local branch with that name.
[^2]: Replace 'CHECKSUM' with your checksum!