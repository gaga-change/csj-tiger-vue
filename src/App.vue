<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
// 字数限制的输入框，附加样式
.input-suffix-fa {
  .el-input__suffix {
    right: -42px;
  }
}
.el-button {
  font-size: 12px;
}
.el-link {
  font-size: 12px !important;
  line-height: 1.4;
}
.simpleCard {
  padding-bottom: 0;
  margin-bottom: 20px;
  box-shadow: 0 !important;
  .el-form-item {
    margin-bottom: 10px;
    .el-input {
      max-width: 200px;
    }
  }
  .simpleCardLastLine {
    margin-bottom: 0;
  }
}
// 非当前项目专属的公共样式。即使拷贝到其他项目也能使用。
// 公共样式  字体大小  字重  padding

.c-333 {
  color: #333;
}

.c-666 {
  color: #666;
}
.c-ccc {
  color: #ccc;
}
.c-red {
  color: red;
}

//  字体大小。 如： f12、f26
$fontSizeList: 12 14 16 18 20 22 24 26 28;

@each $var in $fontSizeList {
  .f#{$var} {
    font-size: #{$var}px;
  }
}

// 字重。如: fw600
$fontWeightList: 400 500 600 700;

@each $var in $fontWeightList {
  .fw#{$var} {
    font-weight: #{$var};
  }
}

// margin。如: mt20（margin-top:20px;）、ml15(margin-left:15)
$dirList: "l" "r" "t" "b";
$dirMap: (
  "l": "left",
  "r": "right",
  "t": "top",
  "b": "bottom"
);

$dirSizeList: 5 10 15 20 25;

@each $dir in $dirList {
  @each $size in $dirSizeList {
    .m#{$dir}#{$size} {
      margin-#{map-get($dirMap, $dir)}: #{$size}px;
    }
  }
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.clearfix {
  &::after {
    content: "";
    clear: both;
  }
}

.nowrap {
  white-space: nowrap;
}
</style>

