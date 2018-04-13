/**
 *使用步骤：
 *1.初始化参数:Weather('百度地图ak','和风天气KEY');
 *
 *2.创建操作函数，函数名称必须为：createHtml(data),data为天气信息;
 *
 *3.执行对象Weather.getWeather(city),参数city:城市名称，默认为空，当为空时自动获取当前城市;
 *
 * 4.完毕
 */

var Weather = {
	init : function(mapak,weatherKey){
		this.mapAk = mapak;
		this.weatherKey = weatherKey;
	},
	getWeather : function(city = '')
	{
		_self = this;

		if (city == '') {
			_self.getCityInfo().then(function(data){
				return _self.getWeatherInfo(data.content.address_detail.city);
			}).then(function(data){
				return _self.createHtml(data.HeWeather6[0]);
			});
		}else{
			_self.getWeatherInfo(city).then(function(data){
				return _self.createHtml(data.HeWeather6[0]);
			});
		}
		
	},
	getWeatherInfo : function(city)
	{
		return $.ajax({
					url: 'https://free-api.heweather.com/s6/weather/now',
					type: 'GET',
					dataType: 'json',
					data: {location: city,key:this.weatherKey},
				})
				.done(function() {})
				.fail(function() {})
				.always(function() {});
	},
	getCityInfo : function()
	{
		return $.ajax({
					url: 'http://api.map.baidu.com/location/ip',     //接口地址
					type: 'GET',       //发送类型 get or post
					dataType: 'jsonp',   //返回数据类型		
					data: {ak: this.mapAk},  //发送数据
				})
				.done(function(e) {})
				.fail(function() {})
				.always(function() {});		
	}
}