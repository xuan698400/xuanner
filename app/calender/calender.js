function Calender() {
    this.datas = [];
    this.selectDay = undefined;
}

Calender.prototype = {
    constructor: Calender,
    init: function () {
        let _this = this;
        this.loadData(function () {
            _this.renderWeek();
            _this.renderCalendar();
            _this.initEvent();
            _this.renderTips();
        });
    },
    //判断是否是闰年。规则判断：能被400整除的，或者非100年且能被4整除的
    isLeapYear: function (year) {
        return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    },
    //获取一个月中的天数。注意 month - [0-11]
    getMonthCount: function (year, month) {
        let _this = this;
        let arr = [
            31, null, 31, 30,
            31, 30, 31, 31,
            30, 31, 30, 31
        ];
        let count = arr[month] || (_this.isLeapYear(year) ? 29 : 28);
        return Array.from(new Array(count), (item, value) => value + 1);
    },
    //获得某年某月的1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday: function (year, month) {
        let date = new Date(year, month, 1);
        return date.getDay();
    },
    //获得上个月的天数
    getPreMonthCount: function (year, month) {
        let _this = this;
        if (month === 0) {
            return _this.getMonthCount(year - 1, 11);
        } else {
            return _this.getMonthCount(year, month - 1);
        }
    },
    //获得下个月的天数
    getNextMonthCount: function (year, month) {
        let _this = this;
        if (month === 11) {
            return _this.getMonthCount(year + 1, 0);
        } else {
            return _this.getMonthCount(year, month + 1);
        }
    },
    //渲染星期
    renderWeek: function () {
        let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        // 插入星期dom
        let oFragWeek = document.createDocumentFragment();
        weekArr.forEach(item => {
            let oSpan = document.createElement('span');
            let oText = document.createTextNode(item);
            oSpan.appendChild(oText);
            oSpan.classList.add('week-item');
            oFragWeek.appendChild(oSpan);
        });
        let weekWrap = document.getElementById('weekLine');
        weekWrap.appendChild(oFragWeek);
    },
    renderTopBtn: function (year, month, day) {
        document.getElementById('nowYear').innerHTML = year;
        document.getElementById('nowMonth').innerHTML = month + 1;
        document.getElementById('nowDate').innerHTML = day;
    },
    renderDays: function (days) {
        let str = '';
        for (let i = 0; i < 6; i++) {
            str += '<div class="date-line">';
            for (let j = 0; j < 7; j++) {
                let day = days.shift();
                str += this.renderDay(day);
                if (j === 6) {
                    str += '</div>';
                }
            }
        }
        document.getElementById('dateWrap').innerHTML = str;
    },
    renderDay: function (day) {
        let dataText = this.renderObj('data-y={y} data-m={m} data-d={d}', day);
        let showObj = {'clazz': '', 'showDayText': day.d, 'showDayDetailText': day.ldCn, 'dataText': dataText};

        //是否非本月匹配
        if (!day.isCurrentMonth) {
            showObj.clazz = 'date-item-grey';
        }

        //是否是今天匹配
        let currentDay = this.getCurrentDay();
        if (currentDay.y === day.y && currentDay.m === day.m && currentDay.d === day.d) {
            console.log(currentDay)
            console.log(day.m)

            showObj.showDayText += "(今)";
            showObj.clazz = 'date-item-current';
        }

        //是否有提示匹配
        for (let i in this.datas) {
            let data = this.datas[i];
            if (this.matchMessage(data, day)) {
                //有重要提示信息
                showObj.showDayText += '(' + data.msg + ')';
                showObj.clazz = 'date-item-message';
            }
        }

        let template = '<div class="date-item {clazz}" {dataText} ><p>{showDayText}</p><p class="detail">{showDayDetailText}</p></div>';

        return this.renderObj(template, showObj);
    },
    renderTips: function () {
        if (this.selectDay === undefined) {
            this.selectDay = this.getCurrentDay();
        }

        let hitDatas = [];
        for (let i in this.datas) {
            let data = this.datas[i];
            if (this.matchMessage(data, this.selectDay)) {
                hitDatas.push(data);
            }
        }

        $('#detail-date').html(this.renderObj('{y}-{m}-{d}', this.selectDay));
        $('#detail-day').html(this.selectDay.d);
        $('#detail-ldate').html(this.renderObj('{lmCn}{ldCn}(农历{lm}月{ld})', this.selectDay));
        $('#detail-gzdate').html(this.renderObj('{gzY}年 {gzM}月 {gzD}日', this.selectDay));
        $('#detail-animal').html(this.renderObj('{animal} {astro}', this.selectDay));

        let detailMessagesObj = $('#detail-messages');
        detailMessagesObj.html('');
        for (let i in hitDatas) {
            detailMessagesObj.append(this.renderObj('<p>{msg}:{msgDetail}</p>', hitDatas[i]));
        }
    },
    matchMessage: function (data, day) {
        let yy = data.isLunar ? day.ly : day.y;
        let mm = data.isLunar ? day.lm : day.m;
        let dd = data.isLunar ? day.ld : day.d;
        if (data.year !== '*' && data.year !== yy) {
            return false;
        }
        if (data.month !== '*' && data.month !== mm) {
            return false;
        }
        if (data.day !== '*' && data.day !== dd) {
            return false;
        }
        return true;
    },
    getCurrentDay: function () {
        let currentDay = {};
        let nowDate = new Date();
        currentDay.y = nowDate.getFullYear();
        currentDay.m = nowDate.getMonth() + 1;
        currentDay.d = nowDate.getDate();
        this.fillLunarDay(currentDay);
        return currentDay;
    },
    fillLunarDay: function (day) {
        let lDay = calendar.solar2lunar(day.y, day.m, day.d);
        day.ly = lDay.lYear;
        day.lm = lDay.lMonth;
        day.ld = lDay.lDay;
        day.lmCn = lDay.IMonthCn;
        day.ldCn = lDay.IDayCn;
        day.gzY = lDay.gzYear;
        day.gzM = lDay.gzMonth;
        day.gzD = lDay.gzDay;
        day.animal = lDay.Animal;
        day.astro = lDay.astro;
    },
    //根据当前月，获取当前页需要显示的日期
    getDays: function (year, month) {
        let _this = this;
        // 生成日历数据，上个月剩下的 x 天 + 当月的 28（平年的2月）或者29（闰年的2月）或者30或者31天 + 下个月的 y 天 = 42
        let currentMonth = _this.getMonthCount(year, month);
        let preMonth = _this.getPreMonthCount(year, month);
        let nextMonth = _this.getNextMonthCount(year, month);
        let whereMonday = _this.getWeekday(year, month);
        if (whereMonday === 0) {
            whereMonday = 7
        }
        let preArr = preMonth.slice(-1 * whereMonday);
        let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);

        //
        let days = [];
        let currentM = month + 1;
        let preM = currentM === 1 ? 12 : currentM - 1;
        let nextM = currentM === 12 ? 1 : currentM + 1;

        let currentY = year;
        let preY = currentM === 1 ? currentY - 1 : currentY;
        let nextY = currentM === 12 ? currentY + 1 : currentY;

        for (let i in preArr) {
            days.push({
                y: preY,
                m: preM,
                d: preArr[i],
                isCurrentMonth: false
            });
        }
        for (let i in currentMonth) {
            days.push({
                y: currentY,
                m: currentM,
                d: currentMonth[i],
                isCurrentMonth: true
            });
        }
        for (let i in nextArr) {
            days.push({
                y: nextY,
                m: nextM,
                d: nextArr[i],
                isCurrentMonth: false
            });
        }
        for (let i in days) {
            _this.fillLunarDay(days[i]);
        }
        return days;
    },
    renderCalendar: function (year, month, day) {
        //都为空时获取当前时间
        if (typeof year === 'undefined' && typeof month === 'undefined' && typeof day === 'undefined') {
            let nowDate = new Date();
            year = nowDate.getFullYear();
            month = nowDate.getMonth();
            day = nowDate.getDate();
        }
        let days = this.getDays(year, month);
        this.renderTopBtn(year, month, day);
        this.renderDays(days);
        this.initDateItemClick();
    },
    loadData: function (callback) {
        var _this = this;
        $.get('calender.json', function (datas) {
            _this.datas = datas;
            if (callback) {
                callback();
            }
        });
    },
    //初始化事件
    initEvent: function () {
        //
        let _this = this;
        let oPreButton = document.getElementById('preMonth');
        let oNextButton = document.getElementById('nextMonth');
        oPreButton.addEventListener('click', function () {
            let currentYear = +document.getElementById('nowYear').textContent;
            let currentMonth = +document.getElementById('nowMonth').textContent - 1;
            let currentDate = +document.getElementById('nowDate').textContent;
            if (currentMonth === 0) {
                _this.renderCalendar(currentYear - 1, 11, currentDate);
            } else {
                _this.renderCalendar(currentYear, currentMonth - 1, currentDate);
            }
        });
        oNextButton.addEventListener('click', function () {
            let currentYear = +document.getElementById('nowYear').textContent;
            let currentMonth = +document.getElementById('nowMonth').textContent - 1;
            let currentDate = +document.getElementById('nowDate').textContent;
            if (currentMonth === 11) {
                _this.renderCalendar(currentYear + 1, 0, currentDate);
            } else {
                _this.renderCalendar(currentYear, currentMonth + 1, currentDate);
            }
        });
    },
    initDateItemClick: function () {
        let _this = this;
        $('.date-item').on('click', function () {
            $('.date-item').removeClass('active');
            $(this).addClass('active');

            let day = {'y': $(this).data('y'), 'm': $(this).data('m'), 'd': $(this).data('d')};
            _this.fillLunarDay(day);
            _this.selectDay = day;
            _this.renderTips();
        });
    },
    renderObj: function (template, obj, customRenderCallback) {
        var regex = /\{(.+?)\}/g;
        var vars = template.match(regex);
        if (vars) {
            for (var i = 0, n = vars.length; i < n; i++) {
                var attr = vars[i].replace('{', '').replace('}', '');
                var attrs = attr.split('.');

                var v = obj;
                for (var j = 0, m = attrs.length; j < m; j++) {
                    v = v[attrs[j]];
                }
                template = template.replace(vars[i], customRenderCallback ? customRenderCallback(vars[i], v) : v);
            }
        }
        return template;
    }
}
;

$(function () {
    let calender = new Calender();
    calender.init();
    // console.log(calendar.solar2lunar(2021,12,12));
});

