<template>
    <div class="safety-content">
        <div class="safety">
            <div class="safety_left left">
                <img src="https://f.weijinshi.com/public/wechat/activity/safety-1.png" alt="">
            </div>
            <div class="safety_right right">
                <p>信息披露透明</p>
                <div class="safety_text">
                    平台信息全面展示，内容更新及时
                    借款人审核严格，信息真实透明
                    出借人账户管理，资金去向透明
                </div>
            </div>

        </div>
        <div class="safety">
            <div class="safety_left left">
                <img src="https://f.weijinshi.com/public/wechat/activity/safety-2.png" alt="">
            </div>
            <div class="safety_right right">
                <p>技术安全保障</p>
                <div class="safety_text">
                    获技术系统获软件著作权登记证书
                    专业硬件防护设备
                    MD5信息加密
                </div>
            </div>

        </div>
        <div class="safety">
            <div class="safety_left left">
                <img src="https://f.weijinshi.com/public/wechat/activity/safety-3.png" alt="">
            </div>
            <div class="safety_right right">
                <p>平台实力雄厚</p>
                <div class="safety_text">
                    注册资金5000万，实缴资金5000万
                    国资企业实力打造
                    上市公司强力支持
                </div>
            </div>

        </div>
        <div class="safety">
            <div class="safety_left left">
                <img src="https://f.weijinshi.com/myoss/data/73FDFC157A6F27155BFA946CE6B01524.png" alt="">
            </div>
            <div class="safety_right right">
                <p>项目风险分散</p>
                <div class="safety_text">
                    专注于小额信贷交易撮合服务，通过小额分散降低违约关联性，控制集中度风险
                </div>
            </div>

        </div>
        <div class="safety">
            <div class="safety_left left">
                <img src="https://f.weijinshi.com/public/wechat/activity/safety-5.png" alt="">
            </div>
            <div class="safety_right right">
                <p>风控严谨</p>
                <div class="safety_text">
                    3重风控防线，18项风控标准
                    严格的贷前、贷中、贷后的管理制度
                    实地尽职调查
                    全程覆盖的大风控模式
                    对借款人全方位验证和评估
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "safety"
};
</script>

<style scoped lang="less">
/**
     安全保障
     */
.safety-content {
  padding: 60px 60px 0 0;
  background: #fff;
  overflow: hidden;

  .safety {
    overflow: hidden;
    margin-bottom: 64px;
    .safety_left {
      overflow: hidden;
      width: 44%;
      text-align: center;
      line-height: 160px;
      img {
        display: inline-block;
        height: 120px;
        width: 120px;
      }
    }
    .safety_right {
      width: 56%;
      p {
        font-size: 28px;
        color: #5b71f9;
        margin-bottom: 16px;
      }
      .safety_text {
        font-size: 24px;
        color: #333333;
        line-height: 38px;
      }
    }
  }
}
</style>
