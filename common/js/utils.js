function get_key() {
	return "1h@Khad*ChRPvDwlzTC5EAy4l^0nNk@s8dZe*wkMQzqYv^";
}

function get_api_url() {
	return "http://app.chepaix.com/";
}

function get_url_realm() {
	return "http://app.chepaix.com";
}

function get_version() {
	return "v1";
}
function getstatusInfo() {
	try {
	    const res = uni.getSystemInfoSync();
		return res;
	} catch (e) {
	    return "";
	}
};


//获取当前时间的时间戳
function get_timestamp() {
	var timestamp = parseInt(new Date().getTime() / 1000);
	return timestamp;
}

//电话号码验证
function phone_check(phone) {
	if (!(/^1[3456789]\d{9}$/.test(phone))) {
		return false;
	}
	return true;
}

function pwd_check(pwd) {
	if (!(/^[0-9a-zA-Z]{1,}$/.test(pwd))) {
		return false;
	}
	return true;
}



function get_p_yzm() {
	var pool=["1","2","3","4","5","6","7","8","9","0"];
	var _p_yzm = [];
	for (var i = 0; i < 4; i++) {
		var p_yzm_info = new Object();
		p_yzm_info['text'] = pool[rn(0, pool.length - 1)];
		p_yzm_info['deg'] = rn(-30, 30);
		p_yzm_info['color'] = rc(80, 150);
		_p_yzm.push(p_yzm_info);
	}
	return _p_yzm;
}

function rn(max, min) {
	return parseInt(Math.random() * (max - min)) + min;
}

function rc(min, max) {
	var r = rn(min, max);
	var g = rn(min, max);
	var b = rn(min, max);
	return "rgb(" + r + "," + g + "," + b + ")";
}

//重新登录
function again_login() {
	uni.removeStorageSync('cpx_token');
	uni.reLaunch({
		url: '/pages/login/login'
	});
}

//判断是否登录 
function is_login() {
	var cpx_token = uni.getStorageSync('cpx_token');
	return !isEmpty(cpx_token);
}

//从缓存中获取token
function get_token() {
	var cpx_token = uni.getStorageSync('cpx_token');
	if (isEmpty(cpx_token)) {
		return "";
	}
	return cpx_token;
}

function GetURL(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var tmpURL = window.location.search.substr(1);
	tmpURL = tmpURL.replace(/&amp;/g, "&");
	var r = tmpURL.match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}




//时间戳(秒)转日期
function formatDate(time, fmt) {
	var date = new Date(time * 1000);
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

//时间戳(毫秒)转日期
function formatDate_date(time, fmt) {
	var date = new Date(time);
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

//获取时间与当前的时间差 小于2天具体时间 
function get_time_difference(time) {
	var date = new Date(time);
	var year=date.getFullYear();
	var month=date.getMonth();//获取当前月份(0-11,0代表1月)
	var day=date.getDate();
	var time_stamp=parseInt(date.getTime());
	var Date_dq = new Date();
	var year_dq=Date_dq.getFullYear();
	var month_dq=Date_dq.getMonth();
	var day_dq=Date_dq.getDate();
	var time_stamp_dq=parseInt(Date_dq.getTime())
	
	if(year_dq-year>0 && month_dq-month>0){
		return (year_dq-year)+"年前";
	}
	
	if(year_dq-year>0 && month_dq-month==0){
		if(day_dq-day>=0){
			return (year_dq-year)+"年前";
		}
		
		if(year_dq-year>1){
			return (year_dq-year-1)+"年前";
		}
		else{
			return (11-month+month_dq)+"月前";
		}
	}	
	
	if(year_dq-year>0 && month_dq-month<0){		
		if(year_dq-year>1){
			return (year_dq-year-1)+"年前";
		}
		
		if(day_dq-day>=0){
			return (12-month+month_dq)+"月前";
		}
		
		return (11-month+month_dq)+"月前";
	}
	
	if(month_dq-month>0 && day_dq-day>=0){
		return (month_dq-month)+"月前";
	}
	
	if(month_dq-month>1 && day_dq-day<0){
		return (month_dq-month-1)+"月前";
	}
	
	var timestamp = time_stamp_dq - time_stamp;
	if(timestamp>=(86400000*2)){
		return Math.floor(timestamp/86400000)+"天前"
	}
	
	if(formatDate_date(time_stamp_dq,"yyyy-MM-dd")!=formatDate_date(time_stamp,"yyyy-MM-dd")){
		return "昨天 "+formatDate_date(time_stamp,"hh:mm");
	}
	
	return formatDate_date(time_stamp,"hh:mm");
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
};

function isEmpty(v) {
	switch (typeof v) {
		case 'undefined':
			{
				return true;
			}
		case 'string':
			{
				v = trim(v); //去两端空格
				if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) {
					return true;
				}
				break;
			}
		case 'boolean':
			{
				if (!v) return true;
				break;
			}
		case 'number':
			{
				if (isNaN(v)) return true;
				break;
			}
		case 'bigInt':
			{
				if (isNaN(v)) return true;
				break;
			}
		case 'object':
			{
				if (null === v || v.length === 0) return true;
				for (var i in v) {
					return false;
				}
				return true;
				break;
			}
	}
	return false;
}

//去两端空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//接口调用 obj：接口参数 method：接口类型（POST/PUT/DELETE/GET）exclude_key:参数排除项 callback：回调
function request(obj, method, exclude_key, callback, Content_Type) {
	method = trim(method);
	method = method.toUpperCase();
	if (method != "POST" && method != "PUT" && method != "DELETE" && method != "GET") {
		uni.showToast({
			title: '接口封装过，暂只支持POST/PUT/DELETE/GET，其他请完善封装或直接调用原生写法',
			icon: 'none'
		});
		return;
	}
	obj.url = get_api_url() + get_version() + obj.url;
	obj['timestamp'] = get_timestamp();
	if (is_login()) {
		obj['access_token'] = get_token();
	}
	obj['version'] = get_version();
	obj['key'] = get_key();
	obj["method"] = method.toLowerCase();

	var sign = getsign(obj);
	var tmpdata = new Object();
	for (var key_src in obj) {
		//去除多余参数
		if (key_src == "url" || key_src == "version" || key_src == "key" || key_src == "method") {
			continue;
		}
		if (method != "GET") {
			if (key_src == "timestamp" || key_src == "access_token") {
				continue;
			}
		}

		var has_exclude_key = false;
		for (var i in exclude_key) {
			if (exclude_key[i] == key_src) {
				has_exclude_key = true;
				break;
			}
		}
		
		if (has_exclude_key) {
			continue;
		}

		tmpdata[key_src] = obj[key_src];
	}

	if (method == "GET") {
		tmpdata['sign'] = sign;
	}

	var tmpurl = obj.url;
	if (method != "GET") {
		tmpurl = obj.url + "?timestamp=" + obj.timestamp + "&sign=" + sign;
		if (!isEmpty(obj.access_token)) {
			tmpurl = tmpurl + "&access_token=" + obj.access_token;
		}
	}

	if (isEmpty(Content_Type)) {
		Content_Type = "application/json";
	}
	uni.request({
		url: tmpurl,
		method: method,
		data: tmpdata,
		header: {
			'Content-Type': Content_Type
		},
		success: res => {
			console.log(res.data);
			if (res.data.code == 1003) {
				again_login();
			} else {
				callback(res.data);
			}
		},
		fail: res => {
			callback({
				'code': 11111,
				'data': "",
				'message': "网络繁忙"
			});
		}
	});
}


//文件上传接口调用 obj：接口参数 callback：回调
function request_file(obj, files, callback) {
	var method = "POST";

	obj.url = get_api_url() + get_version() + obj.url;
	obj['timestamp'] = get_timestamp();
	if (is_login()) {
		obj['access_token'] = get_token();
	}
	obj['version'] = get_version();
	obj['key'] = get_key();
	obj["method"] = method.toLowerCase();

	var sign = getsign(obj);
	var tmpdata = new Object();
	for (var key_src in obj) {
		//去除多余参数
		if (key_src == "url" || key_src == "version" || key_src == "key" || key_src == "method") {
			continue;
		}
		tmpdata[key_src] = obj[key_src];
	}

	tmpdata['sign'] = sign;

	var tmpurl = obj.url;
	console.log(11111111)
	console.log(tmpurl)
	console.log(files)
	console.log(tmpdata)
	uni.uploadFile({
		url: tmpurl,
		files: files,
		formData: tmpdata,
		success: res => {
			console.log(res);
			if (res.statusCode == 200) {
				var data = JSON.parse(res.data);
				console.log(data);
				callback(data);
			} else {
				callback({
					'code': 11111,
					'data': "",
					'message': "网络繁忙"
				});
			}
		}
	});
}

//签名
function getsign(obj) {
	var strkeyArr = getObjectKey(obj);
	strkeyArr = getKeySort(strkeyArr);
	var str = getKeyValueSortStr(strkeyArr, obj);
	return md5(str).toUpperCase();
}

//返回需要签名的Key(数组)
function getObjectKey(obj) {
	var obj_key = Object.keys(obj);
	var obj_key01 = obj_key;
	if (obj_key != null) {
		obj_key01 = new Array();
		for (var i in obj_key) {
			if (obj_key[i] == "sign" || isEmpty(obj[obj_key[i]]) || typeof obj[obj_key[i]] == "object") {
				continue;
			}
			obj_key01.push(obj_key[i]);
		}
	}
	return obj_key01;
}

/**
 * 传入数组
 * 按字母顺序,升序
 * 冒泡排序
 */
function getKeySort(strArr) {
	var count = 0;
	var compareInt = 0;
	for (var i = 0; i < strArr.length; i++) {
		for (var j = 0; j < strArr.length - 1 - i; j++) {
			compareToIndexValue(strArr, compareInt, j);
			count++;
		}
	}
	return strArr;
}

/**
 *  根据首字母 排序,如果首字母相同则根据第二个字母排序...直到排出大小
 */
function compareToIndexValue(arr, int, arrIndex) {
	if (arr[arrIndex].substring(int, int + 1) == arr[arrIndex + 1].substring(int, int + 1)) compareToIndexValue(arr, int +
		1, arrIndex); //如果第一位相等,则继续比较第二个字符
	else if (arr[arrIndex].substring(int, int + 1) > arr[arrIndex + 1].substring(int, int + 1)) {
		var temp = arr[arrIndex + 1];
		arr[arrIndex + 1] = arr[arrIndex];
		arr[arrIndex] = temp
	}
	return;
}

/**
 * 输入排序过后的key=value 值数组,用  "&" 字符拼接为字符串
 */
function getKeyValueSortStr(strArr, strobj) {
	var longStr = "";
	for (var str in strArr) {
		longStr += strArr[str] + "=" + strobj[strArr[str]] + "&";
	}
	return longStr.substring(0, longStr.length - 1); //移除最后一个 & 符号
}

function md5(string) {
	function md5_RotateLeft(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}

	function md5_AddUnsigned(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function md5_F(x, y, z) {
		return (x & y) | ((~x) & z);
	}

	function md5_G(x, y, z) {
		return (x & z) | (y & (~z));
	}

	function md5_H(x, y, z) {
		return (x ^ y ^ z);
	}

	function md5_I(x, y, z) {
		return (y ^ (x | (~z)));
	}

	function md5_FF(a, b, c, d, x, s, ac) {
		a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
		return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	};

	function md5_GG(a, b, c, d, x, s, ac) {
		a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
		return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	};

	function md5_HH(a, b, c, d, x, s, ac) {
		a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
		return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	};

	function md5_II(a, b, c, d, x, s, ac) {
		a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
		return md5_AddUnsigned(md5_RotateLeft(a, s), b);
	};

	function md5_ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1 = lMessageLength + 8;
		var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};

	function md5_WordToHex(lValue) {
		var WordToHexValue = "",
			WordToHexValue_temp = "",
			lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		}
		return WordToHexValue;
	};

	function md5_Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	};
	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22;
	var S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20;
	var S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23;
	var S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;
	string = md5_Utf8Encode(string);
	x = md5_ConvertToWordArray(string);
	a = 0x67452301;
	b = 0xEFCDAB89;
	c = 0x98BADCFE;
	d = 0x10325476;
	for (k = 0; k < x.length; k += 16) {
		AA = a;
		BB = b;
		CC = c;
		DD = d;
		a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		a = md5_AddUnsigned(a, AA);
		b = md5_AddUnsigned(b, BB);
		c = md5_AddUnsigned(c, CC);
		d = md5_AddUnsigned(d, DD);
	}
	return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

module.exports = {
	getstatusInfo: getstatusInfo,//获取系统信息
	isEmpty: isEmpty,//数据是否为空判断
	trim: trim,//去两端空格
	get_url_realm: get_url_realm,
	formatDate: formatDate,
	formatDate_date: formatDate_date,
	phone_check: phone_check,
	again_login: again_login,
	is_login: is_login,
	get_token: get_token,
	GetURL: GetURL,
	request: request,
	request_file: request_file,
	pwd_check: pwd_check,
	get_version: get_version,
	get_api_url: get_api_url,
	get_timestamp: get_timestamp,
	get_p_yzm:get_p_yzm,
	get_time_difference:get_time_difference,
	md5:md5,
}
