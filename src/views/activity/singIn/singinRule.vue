<template>
    <div class="rule">
        <div class="content">
            <div class="txt">
                <div>活动小攻略</div>
                <p>1.11月1日打卡活动正式开始，点击进入页面就算打卡一次，首次打卡即为报名参与活动，报名截止日为11月5日（6号首次进该页面则不能参加活动）；</p>
                <p>2.用户必须连续打卡30天，才能领取30元现金，领取后则由系统发送至用户账户内；</p>
                <p>3.如果用户有却卡，可以按照规则获取补卡机会，并在第30天或30天内进行补卡，补满三十天，依然有资格领取30元现金；</p>
                <p>4.在补卡机会中，如果已完成"开户绑卡"，"首次投资微智享"，则参加活动即可获得相应次数的补卡机会。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "singinRule"
    }
</script>

<style scoped lang="less">
    .rule {
        min-height: 100%;
        background: #5a4ccf url("https://f.weijinshi.com/myoss/data/B051ADFB1B11A4F6976C1C5AF57AE0D7.png") no-repeat;
        background-size: 100%;
        padding-top: 60%;
        .content {
            background: url("https://f.weijinshi.com/myoss/data/C28B34C33D6B2E460520BC82AA5DE765.png") no-repeat;
            background-size: 100% auto;
            padding-top: 26%;
            padding-bottom: 80px;
            .txt {
                background: #ffffff;
                padding: 60px 40px;
                width: 90%;
                margin: 0 auto;
                border-radius: 20px;
                div {
                    text-align: center;
                    font-size: 36px;
                    font-weight: bold;
                    padding-bottom: 40px;
                    position: relative;
                    &::before {
                        content: "";
                        display: block;
                        width: 180px;
                        height: 5px;
                        background: #CCCCCC;
                        position: absolute;
                        left: 0;
                        top: 18px;
                    }
                    &::after {
                        content: "";
                        display: block;
                        width: 180px;
                        height: 5px;
                        background: #CCCCCC;
                        position: absolute;
                        right: 0;
                        top: 18px;
                    }
                }
                p {
                    color: #666;
                    font-size: 26px;
                    line-height: 46px;
                }
            }
        }
    }
</style>