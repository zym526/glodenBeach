// 文字提示带跳转
const tips=function(opt, to_url){
	if (typeof opt == 'string') {
	    to_url = opt;
	    opt = {};
	}
	var title = opt.title || '', icon = opt.icon || 'none', endtime = opt.endtime || 2000;
	if (title) uni.showToast({ title: title, icon: icon, duration: endtime })
	if (to_url != undefined) {
		if (typeof to_url == 'object') {
			var tab = to_url.tab || 1, url = to_url.url || '';
			switch (tab) {
				case 1:
				//一定时间后跳转至 table
				setTimeout(function () {
					uni.switchTab({
						url: url
					})
				}, endtime);
				break;
	        case 2:
				//跳转至非table页面
				setTimeout(function () {
					uni.navigateTo({
						url: url,
					})
				}, endtime);
				break;
	        case 3:
				//返回上页面
				setTimeout(function () {
					uni.navigateBack({
						delta: parseInt(url),
					})
				}, endtime);
				break;
	        case 4:
				//关闭当前所有页面跳转至非table页面
				setTimeout(function () {
					uni.reLaunch({
						url: url,
					})
				}, endtime);
				break;
	        case 5:
				//关闭当前页面跳转至非table页面
				setTimeout(function () {
					uni.redirectTo({
						url: url,
					})
				}, endtime);
				break;
			}
	    }else if(typeof to_url == 'function'){
			setTimeout(function () { 
				to_url && to_url();
			}, endtime);
	    }else{
			//没有提示时跳转不延迟
			setTimeout(function () {
				uni.navigateTo({
					url: to_url,
				})
			}, title ? endtime : 0);
	    }
	}
}
const formatDuring=function(mss) {
    if( Math.ceil(mss)>= 60){
      var second = addZero(Math.ceil(mss) % 60);  //取余获得秒数
      var min = addZero(parseInt(Math.ceil(mss) / 60));  //当剩余分钟数不大于60分钟时，取整获得分数
      time = min + ":" + second;     
    }else{
		var time = "00:"+addZero(Math.ceil(mss));
	}
    return time;
}
const calcTimer=function(timer) {
	if(timer === 0 || typeof timer !== 'number') {
		return '00:00'
	}
	let mm = Math.floor(timer / 60)
	let ss = Math.floor(timer % 60)
	if(mm < 10) {
		mm = '0' + mm
	}
	if(ss < 10) {
		ss = '0' + ss
	}
	return mm + ':' + ss
}
// 时间戳转年月日时分秒
const format=function(timestamp,type,divide1,divide2) {
    var date = new Date(timestamp*1000);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());
	if(type==0){
		return year + divide1 + month + divide1 + day + ' ' + hours + divide2 + minutes + divide2 + seconds;
	}else if(type==1){
		return year + divide1 + month + divide1 + day;
	}else if(type==2){
		return year + divide1 + month;
	}else if(type==3){
		return month + divide1 + day;
	}else if(type==4){
		return hours + divide2 + minutes + divide2 + seconds;
	}else if(type==5){
		return hours + divide2 + minutes;
	}else if(type==6){
		return year + divide1 + month + divide1 + day + ' ' + hours + divide2 + minutes;
	}
}
const regular=function(type,info){
	if(type=='phone'){
		if(!(/^1[3456789]\d{9}$/.test(info))){
			return false; 
		}else{
			return true
		}
	}
}
function addZero(num){
	return num < 10 ? '0' + num : num
}
module.exports={
	tips,
	format,
	formatDuring,
	calcTimer,
	regular
}