﻿/*
 * Name:column navigation
 * Version: 1.2
 * Author: Ariex
 * Date: 2011/3/28
 * Example: <code>$("#column_nav").column_nav({width:200});</code>
 */
 
(function($){
	$.fn.extend({
		column_nav:function(options){
			var _default={
				"width":200, // 菜单宽度
				"min_height":0, // 容器的最小高度
				"hot_zone":-1, // 热区宽度（菜单项左侧不触发展开子菜单的区域），对没有子菜单的菜单项无效。当小于0时，则为宽度的70%
				"return_text":"", // 返回按钮文字
				"root_name":"root", // 根菜单名称
				"return_style":"return", // 返回按钮样式
				"next_style":"next", // 包含子菜单的菜单项的样式
				"duration":500 // 动画时长
			};
			var opts=$.extend(_default,options);
			if(opts.hot_zone<0)
				opts.hot_zone=opts.width*0.7;
			var sync_height=function(c,height){
				c.animate({
					height:height+"px"
				},{
					duration:opts.duration
				});
			};
			return this.each(function(index,item){
				var container=$(item);
				if(container.attr("column_nav")=="true"){
					return;
				}
				container.attr("column_nav","true").css({ // 设置外框必须的样式
					"width":opts.width+"px",
					"position":"relative",
					"overflow":"hidden"
				}).find("ul").css({ // 设置所有子菜单容器的宽度
					"width":opts.width+"px"
				});
				// 给第一个菜单加上标记
				// 给第一个菜单容器加上定位样式，方便子菜单容器定位
				container.children("ul").attr("is_nav_root","true").css("position","relative")
				.find("ul").css({ // 设置所有子菜单容器样式
					"left":opts.width+"px",
					"position":"absolute",
					"top":"0px",
					"display":"none" // 默认不显示，否则会有“重影”
				});
				
				// 处理所有的子菜单，有下级的加上样式，并添加下级菜单显示动画
				container.find("li").each(function(li_i,li_item){
					// 制作“返回”按钮
					var li_return=$("<li/>");
					var return_text=opts.return_text;
					if(return_text.length<1){
						var txt=$(li_item).parent().parent().text().split("\n")[0];
						return_text=txt.length>0?txt:opts.root_name;
					}
					li_return.text(return_text);
					li_return.addClass(opts.return_style);
					li_return.click(function(event){
						// return to last level
						event.stopPropagation(); // 禁止事件冒泡
						var that=$(this);
						var tmp_p=$(that.parents("ul")[1]); // 等同于 that.parent().parent().parent()
						var h=tmp_p.height();
						sync_height(container,(h>opts.min_height?h:min_height)); // 返回上一级菜单时改变容器高度
						tmp_p.animate({
							left:tmp_p.attr("is_nav_root")=="true"?"0px":(opts.width+"px")
						},{
							duration:opts.duration,
							complete:function(){
								that.parent("ul").css("display","none");
							}
						});
					});
					// 有下级菜单的菜单项加上对应的样式，并添加返回菜单
					$(li_item).has("ul").addClass(opts.next_style).children("ul").prepend(li_return);
					$(li_item).has("ul").each(function(iii,li_has_ul){
						var that=$(this);
						// 非JQ绑定的事件需要特别处理
						if(that.attr("onclick")!=undefined)
							that.dblclick(that.attr("onclick")).removeAttr("onclick");
						// 处理jq绑定的事件
						var handlers=that.data("events") || {};
						for(var handler in handlers){
							if(handler=="click"){ // 只处理click事件
								// 绑定click事件到dblclick
								that.bind("dblclick",handlers[handler][0].handler).unbind("click");
							}
						}
					});
					$(li_item).has("ul").click(function(event){ // 菜单点击事件
						event.stopPropagation();
						// 菜单分为菜单区，点击后执行默认的事件；和非菜单区，点击后展开下级菜单。
						// 不包含下级菜单的菜单项没有这个区分
						var that=$(this);
						if(event.pageX-that.offset().left<opts.hot_zone){
							that.dblclick(); // 点击热区则应触发原先的click事件
							return;
						}
						that.children("ul").css("display","block");
						var h=that.children("ul").height();
						that.parent("ul").animate({
							left:that.parent("ul").attr("is_nav_root")=="true"?(opts.width*-1+"px"):"0px"
						},{
							duration:opts.duration,
							complete:sync_height(container,(h>opts.min_height?h:min_height)) // 展开下级菜单时改变容器高度
						});
					});
				});
			});
		}
	});
})(jQuery);