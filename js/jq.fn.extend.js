jQuery.fn.extend({
	nav:function(data,fn){
		if(!data) return;
		if(!data.navs) return;
		
		var navs = data.navs,
			tplid = data.tplid || "tplNavCategory",
			initialNum = (data.initialNum || 10) + 1;
			tpl =  $("#"+tplid).html(), 
			template = Handlebars.compile(tpl),
			$nav = this,
			callback = typeof fn === "function" ? fn : function(){};
		//more-time 
		$.each(navs,function(i,n){
			var _$item = $($.parseHTML(template(n))),
				_ismore = n.ismore,
				_ismutil = n.ismulti,
				_$values = _$item.find(".nav-values"),
				_$moreBtn,
				_$cancelBtn,
				_type = n["type"];

			if(_ismore === "more"){
				_$values.find("li:nth-child(n+"+initialNum+")").hide();
				_$moreBtn = _$item.find(".nav-more");
				_$cancelBtn = _$item.find(".nav-cancel");
				_$item.find(".nav-cancel")
				_$moreBtn.click(function(){
					_$moreBtn.hide();
					_$cancelBtn.show();
					_$values.addClass("more-time");
					_$values.find("li").show();
				});
				_$cancelBtn.click(function(){
					_$moreBtn.show();
					_$cancelBtn.hide();
					_$values.removeClass("more-time");
					_$values.find("li:nth-child(n+"+initialNum+")").hide();
				});
			}
			_$values.on("click",".nav-val",{type:_type},function(e){
				var _vals = [],
					_this = $(this),
					_isCkb = (e.target.tagName === "INPUT"),
					_isSelected = _this.hasClass("selected");

				if(_ismutil === "multi"){
					var _ckb = _this.find('input');
					if(!_isCkb){
						_ckb[0].checked = !_ckb[0].checked;
					}
					if(_ckb[0].checked){
						_this.addClass("selected");
					}else{
						_this.removeClass("selected");
					}
					_$values.find('input:checked').each(function(){    
            			_vals.push($(this).val());  
            		});
            		_vals = _vals.join(",");
				}else{
					if(_isSelected){
						return;
					}
					_$values.find(".selected").removeClass("selected");
					_vals = _this.data("val");
					_this.addClass("selected");
				}
				callback({
					key:e.data.type,
					val:_vals
				});
			});
			_$item.find(".unlimited-btn").click(function(){
				_$values.find('input:checked').each(function(i,n){    
        			n.checked = false;
        		});
				_$values.find(".selected").removeClass("selected");
				callback({
					key:_type,
					val:"all"
				});
			});
			$nav.append(_$item);
		});
	},
	grid:function(data,fn){
		if(!data) return;
		if(!data.grids) return;
		
		var grids = data.grids,
			template = Handlebars.compile(data.tpl),
			$grid = this,
			callback = typeof fn === "function" ? fn : function(){};
		
		$grid.html($.parseHTML(template(data)));
	}
});