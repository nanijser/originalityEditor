var PicCutting = (function () {
    var instantiated;
    function init() {
    	var pc,
	    	width = 600,
	    	height = 300,
	    	picWidth = 300,
	    	picHeight = 200,
	    	fitW = 300,
	    	fitH = 200,
	    	$picDialog,
	    	$picDialogMask,
	    	$pic,
	    	callback,
	    	picData,
	    	dialogTpl = '<div id="pic-dialog-mask"></div><div id="pic-dialog" class="f-bd">		<div class="pic-dialog-title"><span class="pic-dialog-title-text">修改图片</span>			<span class="pic-dialog-title-close close"></span>		</div>		<div class="pic-dialog-content">			<img class="pic-inner"/>		</div>		<div class="pic-dialog-button"><span class="cancel">取消</span><span class="confirm">确定</span></div>	</div>';

	    	/* 函数节流 */
	    	var throttle = function(method, context){
	    		clearTimeout(method.tid);
	    		method.tid = setTimeout(function(){
	    			method.call(context);
	    		},200);
	    	};
	    	var imageScale = function(){

	    	}
	    	var appendDialog = function(){
	    		$(document.body).append($.parseHTML(dialogTpl));
        		$picDialog = $("#pic-dialog");
        		$pic = $picDialog.find(".pic-inner");
        		$pic.load(function(){
        			width = $pic.width();
        			height = $pic.height();
            		editSizeDialog();
            	});
        		$picDialogMask = $("#pic-dialog-mask");
        		// $picDialogMask.click(function(){
        		// 	hideDialog();
        		// });
        		$picDialog.find(".close,.cancel").click(function(){
        			hideDialog();
        		});
        		$picDialog.find(".confirm").click(function(){
        			confirm();
        		});

        		$(window).resize(function(){
					throttle(editSizeDialog);
				});
	    	};
	    	var showDialog = function(){
            	//$picDialog.fadeIn("slow");
            	//$picDialogMask.fadeIn("slow");
            	$picDialog.show();
            	$picDialogMask.show();
            };
	        var hideDialog = function(){
            	$picDialog.fadeOut("slow");
            	$picDialogMask.fadeOut("slow");
            };
	        var confirm = function(){
            	callback && callback(picData);
            };
	    	var editSizeDialog = function(){
	    		var _w = fitW+60,
	    			_h = fitW+80;
	    		$picDialog.width(_w).height(_h);
	    		$picDialog.offset({
	    			top:($(window).height()/2 - _h/2),
	    			left:($(window).width()/2 - _w/2)
	    		});
        	};
	        return {
	        	addDialog:function(){
	        		if($picDialog) return;
	        		appendDialog();
	        	},
	        	load:function(d){
	        		if(!d.callback) return "error";
	            	if(!d.result) return "error";
	            	fitW = d.fitW || 300;
	            	fitH = d.fitH || 200;
	            	callback = d.callback;
	            	showDialog();
	            	//$pic.hide();
	            	$pic.attr("src",d.result);
	        	}
	        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            instantiated.addDialog();
            return instantiated;
        }
    };
})();


jQuery.fn.extend({
	UploadPic:function(d){
		var _this = this;
		_this.change(function(){

		});
	}
});