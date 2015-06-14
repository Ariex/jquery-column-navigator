# Description #
This jQuery plug-in will transform the unordered list from a web page into a one-column navigator. Once a menu item clicked, its sub menu will slide into this column from right, and if the "return" menu item clicked, current menu will slide out from right and the parent menu will shown. In this case. It can provide a friendly user interface and better user experiences for end user.

The original click event in the menu item will be reserved, if click the menu in the "hot zone", The original click event will be triggered; otherwise the sub menu will shown (if there are sub menus). However, to achieve this, the "double click" event is not available for user any more.

# Example #
As a jQuery plug-in, column navigator is easy to use, what the user need to do is simple create a "ul" hierarchy (with or without pre-binded events), and call the jquery plug-in function after it has been loaded.

In this example, you can see how easy to use this plug-in, and how it can handle pre-binded menu item click event appropriately.

[Demo](http://bozhao.info/web_examples/columnNavi.html)
## Html Source ##
```
<div class="column_nav">
	<ul>
		<li>item1</li>
		<li>item2
			<ul>
				<li>item2.1</li>
				<li>item2.2</li>
				<li onclick="aaa(this)">item2.3 clickme
					<ul>
						<li>item2.3.1</li>
						<li onclick="alert('aaa')">item2.3.2 clickme
							<ul>
								<li>item2.3.2.1</li>
								<li>item2.3.2.2</li>
								<li>item2.3.2.3</li>
								<li>item2.3.2.4</li>
								<li>item2.3.2.5</li>
								<li>item2.3.2.6</li>
								<li>item2.3.2.7</li>
								<li>item2.3.2.8</li>
								<li>item2.3.2.9</li>
								<li>item2.3.2.10</li>
							</ul>
						</li>
						<li>item2.3.3</li>
						<li>item2.3.4</li>
					</ul>
				</li>
				<li>item2.4</li>
			</ul>
		</li>
		<li>item3
			<ul>
				<li id="test">item3.1 clickme
					<ul>
						<li>item3.1.1</li>
						<li>item3.1.2</li>
					</ul>
				</li>
				<li>item3.2</li>
				<li>item3.3</li>
			</ul>
		</li>
		<li>item4
			<ul>
				<li>item4.1</li>
				<li>item4.2</li>
				<li>item4.3</li>
				<li>item4.4</li>
			</ul>
		</li>
		<li>item5</li>
		<li>item6</li>
		<li>item7</li>
		<li>item8</li>
	</ul>
</div>
```
## javascript source ##
```
$(function(){
	$("#test").click(function(){
		aaa(this);
	});
	$(".column_nav").column_nav({"width":300});
});
function aaa(obj){
	alert($(obj).text().split("\n")[0]+" is clicked");
}
```
## CSS source ##
This is not necessary, but it can make user tell the different from normal menu item and menu item that have children.
```
.column_nav{
	cursor:default;
	border:1px dashed red;
}
.column_nav li.next{
	background:url("http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/16x16/actions/arrow-right-3.png") no-repeat 90%;
}
.column_nav li.return{
	background:url("http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/16x16/actions/arrow-left-double-2.png")  no-repeat 0%;
	padding-left:20px;
}
```
## Options ##
```
var _default={
	// 菜单宽度. menu width
	"width":200,
	// 容器的最小高度. min height for container
	"min_height":0,
	// 热区宽度（菜单项左侧不触发展开子菜单，而触发点击事件的区域），对没有子菜单的菜单项无效。当小于0时，则为宽度的70%.
	// Click in the hot zone will fire click event, otherwise sub menu will shown. There is no hot zone for menu items which does not contains any children.
	// if this value is less than 0, it will be set to width*0.7
	"hot_zone":-1,
	// 返回按钮文字，置空或者使用“-”则会自动使用上级菜单名字. text for "return" menu, using "-" or "" to use the name of parent menu item.
	"return_text":"",
	// 根菜单名称. Default name for root.
	"root_name":"root",
	// 返回按钮样式. style name for "return" item
	"return_style":"return",
	// 包含子菜单的菜单项的样式. style name for menu items who has children
	"next_style":"next",
	// 菜单动画时长. Duration for menu animate.
	"duration":500
};
```

# Notification #
This plug-in is developed based on jQuery 1.5.1, and been tested in FF4.0, Chrome, IE9/8.