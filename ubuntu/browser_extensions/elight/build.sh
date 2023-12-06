#!/usr/bin/env bash

# checks if branch has something pending
function parse_git_dirty() {
  git diff --quiet --ignore-submodules HEAD 2>/dev/null; [ $? -eq 1 ]
}

# gets the current git branch
function parse_git_branch() {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

# get last commit hash prepended with @ (i.e. @8a323d0)
function parse_git_hash() {
  git rev-parse --short HEAD 2> /dev/null | sed "s/\(.*\)/@\1/"
}

if [ "$1" = "" ]
then
    echo "- Bạn chưa nhập mesage cho việc commit"
    echo "Thử cú pháp:"
    echo "      sh build.sh 'message'"
elif [ "$1" = "pull" ]
then
    echo "pull code from branch '$(parse_git_branch)'"
    git pull origin $(parse_git_branch);
elif [ "$1" = "push" ]
then
    echo "push code to branch '$(parse_git_branch)'"
    git push origin $(parse_git_branch);
else
    echo "--------------Grunt process---------------"
    grunt;
    echo "---------------GIT process----------------"
    git status; git add .; git commit -m "$1"; git pull origin $(parse_git_branch); git push origin $(parse_git_branch)
fi
