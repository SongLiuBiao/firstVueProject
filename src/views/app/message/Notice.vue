<template>
    <div class="notice-container">
        <div class="notice-panel">
            <ul class="plat-content">
                <li class="item">
                    <div class="date">2018-07-25 16:22</div>
                    <div class="box">
                        <p class="tit">运营公告关于2017年春节假期值班安排的公告</p>
                        <div class="con">
                            <p>用户刘涌泉（用户名刘涌泉）通过微金石平台成功借入两笔借款，还款方式均为按月付息到期还本。其中，一笔借款成交时间为2016年3月30日，金额4000元，利率16%，期限9个月；另一笔借款成交时间为2016年6月30日，金额3000元，利率24%，期限6个月。刘涌泉用户之前均遵照借款合同按时还款，2016年12月30日为该用户两笔借款的最后一期还款到期日，须归还两笔借款本息共计7111.78元。但刘涌泉用户未按时充值还款，造成两笔逾期。</p>
                            <a class="btn-det" href="javascript:;">详情查看</a>
                        </div>
                        <p class="det">
                            查看详情
                        </p>
                    </div>
                </li>
                <li class="item">
                    <div class="date">2018-07-25 16:22</div>
                    <div class="box">
                        <p class="tit">运营公告关于2017年春节假期值班安排的公告</p>
                        <div class="con">
                            <p>用户刘涌泉（用户名刘涌泉）通过微金石平台成功借入两笔借款...</p>
                            <a class="btn-det" href="javascript:;">详情查看</a>
                        </div>
                        <p class="det">
                            查看详情
                        </p>
                    </div>
                </li>
                <li v-if="loadMore" class="load-more" @click="loadData">
                    加载更多
                </li>
                <li v-if="!loadMore" class="load-more">
                    没有更多了
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "notice",
  data() {
    return {
      loadMore: false
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.notice-container {
  background-color: @grayf5;
  min-height: 100%;
}
.plat-content {
  min-height: 100%;
  padding: 40px 0px;
  .item {
    padding-bottom: 40px;
  }
  .load-more {
    color: @gray9;
    text-align: center;
    font-size: 28px;
  }
  .date {
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 290px;
    height: 44px;
    background-color: @grayc;
    border-radius: 200px;
    text-align: center;
    line-height: 44px;
    color: @white;
    font-size: 28px;
  }
  .box {
    width: 690px;
    max-height: 270px;
    margin-left: auto;
    margin-right: auto;
    background-color: @white;
    border-radius: 6px;
    padding: 32px 0px 0px 0px;
    .tit {
      padding-left: 32px;
      font-size: 30px;
      color: @black;
      margin-bottom: 8px;
    }
    .con {
      padding-left: 32px;
      padding-right: 30px;
      font-size: 26px;
      line-height: 40px;
      max-height: 120px;
      color: @gray9;
      padding-bottom: 8px;
      overflow: hidden;
      position: relative;
      .btn-det {
        position: absolute;
        color: #175199;
        bottom: 8px;
        right: 30px;
        background: #fff;
        z-index: 0;
        height: 40px;
        line-height: 40px;
        font-size: inherit;
        &:before {
          content: "";
          display: block;
          position: absolute;
          height: 100%;
          left: -5em;
          right: 0;
          background: #fff;
          z-index: -1;
          transition: mask-size 0.22s cubic-bezier(0.95, 0.05, 0.795, 0.035),
            max-height 0.32s cubic-bezier(0.95, 0.05, 0.795, 0.035),
            -webkit-mask-size 0.22s cubic-bezier(0.95, 0.05, 0.795, 0.035);
          mask-image: linear-gradient(
            270deg,
            #1a1a1a calc(100% - 5em),
            transparent
          );
          mask-size: 100% 100%;
        }
      }
    }
    .omit {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .det {
      padding: 15px 0px;
      margin-left: 32px;
      display: block;
      font-size: 28px;
      color: @black;
      border-top: 1px solid #e8e8e8; /*no*/
      position: relative;
      &:after {
        content: " ";
        display: inline-block;
        height: 14px;
        width: 14px;
        border-width: 0px 2px 2px 0px;
        border-color: #999999;
        border-style: solid;
        transform: matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0);
        position: absolute;
        top: 23px;
        right: 32px;
      }
    }
  }
}
</style>
