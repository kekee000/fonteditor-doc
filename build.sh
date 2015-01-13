#!/bin/bash

# 时间戳
version=`date "+%Y%m%d"`
# 编辑器发布路径
editorReleasePath='../fonteditor/release'

# build静态资源
build_asset() {
    edp build --stage=release --force
    echo "asset path：./release"
}

# build模板文件
build_tpl() {

    mv ./release/src ./release/$version

    cat ./release/index.html |
        sed -e "s#\.\/dep#../dep#g" |
        sed -e "s#'\.\/src'#'./$version'#g" |
        tr -s "\n" " " |
        sed 's#[[:space:]]\+# #g' > ./release/index.tmp

    mv ./release/index.tmp ./release/index.html
    mkdir -p $editorReleasePath/doc
    rm -rf $editorReleasePath/doc/*
    mv ./release/* $editorReleasePath/doc
    echo "release path：$editorReleasePath/doc"
}


build_asset
build_tpl
