//工具函数
//配置合并
function extend(def, opt, override) {
    for (var k in opt) {
        if (opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
            def[k] = opt[k]
        }
    }
    return def;
}

//日期格式化
function formartDate(y, m, d, symbol) {
    symbol = symbol || '-';
    m = (m.toString())[1] ? m : '0' + m;
    d = (d.toString())[1] ? d : '0' + d;
    return y + symbol + m + symbol + d
}

function Schedule(opt) {
    var def = {},
        opt = extend(def, opt, true),
        curDate = opt.date ? new Date(opt.date) : new Date(),
        singInDayArr = opt.singInDayArr ? opt.singInDayArr : [],
        year = curDate.getFullYear(),
        month = curDate.getMonth(),
        el = document.querySelector(opt.el) || document.querySelector('body'),
        _this = this;

    var bindEvent = function (){
    	el.addEventListener('click',function(e){
    		switch (e.target.id) {
    			case 'nextMonth':
    				_this.nextMonthFun();
    				break;
    			case 'prevMonth':
    				_this.prevMonthFun();
    				break;
    			default:
    				break;
    		};
    	},false)
    }

    var init = function () {
        var scheduleHd =
            `<div class="schedule-hd">
			           <div id="prevMonth"></div>签到日历（<span class="curMonth"></span>）<div id="nextMonth"></div>
		     </div>`;
        var scheduleBd = '<ul class="schedule-bd ul-box clearfix" ></ul>';
        el.innerHTML = scheduleHd + scheduleBd;
        bindEvent();
        render();
    }
    var render = function () {
        var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
            startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
            total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7),//元素总个数
            lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
            eleTemp = [];
        for (var i = 0; i < total; i++) {
            if (i < startWeek) {
                eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
            } else if (i < (startWeek + fullDay)) {
                var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
                var addClass = '';
                singInDayArr.indexOf(nowDate) != -1 && (addClass = 'singInDay-flag');

                eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')

            } else {
                eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
            }
        }
        el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
        el.querySelector('.curMonth').innerHTML = month + 1 + '月';
    };
    this.nextMonthFun = function () {
    	if(month+1 > 11){
    		year += 1;
    		month = 0;
    	}else{
    		month += 1;
    	}
    	render();
    	opt.nextMonthCb && opt.nextMonthCb(year,month+1);
    };

    this.prevMonthFun = function () {
    	if(month-1 < 0){
    		year -= 1;
    		month = 11;
    	}else{
    		month -= 1;
    	}
    	render();
    	opt.prevMonthCb && opt.prevMonthCb(year,month+1);
    };

    init();
}

export default Schedule;