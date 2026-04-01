//
// Patchworks JavaScript functions
//

/*
 * Set the title in the browser tab
 */  
function windowTitle(title) {
    parent.window.postMessage(title, "*");
}

// Add a listener for title change messages
function addTitleChangeListener() {
    Split(['#leftSplit', '#rightSplit'], {sizes: [15, 85]},);
    window.addEventListener("message", function(event) {
     document.title = event.data;
    });
    selector("index.html", "Index")
}

/*
 * Put the header on the top of the page.  The header consists of the
 * show/hide navigation button, the print button, and the font size change.
*/
function header(prefix) {
  var s = "Hide";
  if (window == top)
    s = "Show";
  ndeSetTextSize();
  document.writeln("<span class=\"noprint\"><table class=\"navTable\" width=\"100%\">");
  document.writeln("<tr><td class=\"navTable\" align=\"left\" width=\"50%\" bgcolor=\"#CFDCED\">");  document.writeln("&nbsp;<input value=\""+s+" Navigator\" title=\""+s+" navigation pane\" onclick=\"toggleNav('"+prefix+"'); return false;\" type=\"button\">");
  document.writeln("&nbsp;<input value=\"Print\" title=\"Print the current window\" onclick=\"window.print(); return false;\" type=\"button\">");
  document.writeln("</td>");
  document.writeln("<td class=\"navTable\" align=\"right\" width=\"50%\" bgcolor=\"#CFDCED\">");
  document.writeln("Font size:");
  document.writeln("&nbsp;<input value=\"-a\" class=\"smallerfont\" title=\"Shrink text\" onclick=\"ndeSetTextSize('decr'); return false;\" type=\"button\">");
  document.writeln("&nbsp;<input value=\"+a\" class=\"biggerfont\" title=\"Enlarge text\" onclick=\"ndeSetTextSize('incr'); return false;\" type=\"button\">");
  document.writeln("&nbsp;<input value=\"Reset\" class=\"resetfont\" title=\"Reset text\" onclick=\"ndeSetTextSize('reset'); return false;\" type=\"button\">&nbsp;");
  document.writeln("</td></tr></table></span>");
}

/*
 * Toggle between showing and hiding the navigation pane
 */
function toggleNav ( prefix ) {
  if(window==top) {
    top.location = prefix+"index-frames.html";
  } else {
    top.location = self.location;
  }
}

/*
 * Set up for the navigation tree
 */
if (typeof iconPrefix == "undefined") {
  iconPrefix = '';
}

var TREE_TPL = {
	'target'  : 'content',

	'icon_e'  : iconPrefix+'html/icons/empty.gif', // empty image
	'icon_l'  : iconPrefix+'html/icons/line.gif',  // vertical line

        'icon_32' : iconPrefix+'html/icons/base.gif',   // root leaf icon normal
        'icon_36' : iconPrefix+'html/icons/base.gif',   // root leaf icon selected
	
	'icon_48' : iconPrefix+'html/icons/base.gif',   // root icon normal
	'icon_52' : iconPrefix+'html/icons/base.gif',   // root icon selected
	'icon_56' : iconPrefix+'html/icons/base.gif',   // root icon opened
	'icon_60' : iconPrefix+'html/icons/base.gif',   // root icon selected
	
	'icon_16' : iconPrefix+'html/icons/folder.gif', // node icon normal
	'icon_20' : iconPrefix+'html/icons/folderopen.gif', // node icon selected
	'icon_24' : iconPrefix+'html/icons/folderopen.gif', // node icon opened
	'icon_28' : iconPrefix+'html/icons/folderopen.gif', // node icon selected opened

	'icon_0'  : iconPrefix+'html/icons/page.gif', // leaf icon normal
	'icon_4'  : iconPrefix+'html/icons/page.gif', // leaf icon selected
	
	'icon_2'  : iconPrefix+'html/icons/joinbottom.gif', // junction for leaf
	'icon_3'  : iconPrefix+'html/icons/join.gif',       // junction for last leaf
	'icon_18' : iconPrefix+'html/icons/plusbottom.gif', // junction for closed node
	'icon_19' : iconPrefix+'html/icons/plus.gif',       // junction for last closed node
	'icon_26' : iconPrefix+'html/icons/minusbottom.gif',// junction for opened node
	'icon_27' : iconPrefix+'html/icons/minus.gif'       // junction for last opended node
};

// Title: Tigra Tree
// Description: See the demo at url
// URL: http://www.softcomplex.com/products/tigra_menu_tree/
// Version: 1.1 (size optimized)
// Date: 11-12-2002 (mm-dd-yyyy)
// Notes: This script is free. Visit official site for further details.

// Respond to a click in the toc menu
if (typeof selector == "undefined") {
  selector = function setSelected(aReport, aTitle) {
      document.getElementById('main').src = aReport;
      document.title = aTitle;
  };
}

function tree (a_items, a_template) {

	this.a_tpl      = a_template;
	this.a_config   = a_items;
	this.o_root     = this;
	this.a_index    = [];
	this.o_selected = null;
	this.n_depth    = -1;
	
	var o_icone = new Image(),
		o_iconl = new Image();
	o_icone.src = a_template['icon_e'];
	o_iconl.src = a_template['icon_l'];
	a_template['im_e'] = o_icone;
	a_template['im_l'] = o_iconl;
	for (var i = 0; i < 64; i++)
		if (a_template['icon_' + i]) {
			var o_icon = new Image();
			a_template['im_' + i] = o_icon;
			o_icon.src = a_template['icon_' + i];
		}
	
	this.toggle = function (n_id) {	var o_item = this.a_index[n_id]; o_item.open(o_item.b_opened) };
	this.select = function (n_id) { return this.a_index[n_id].select(); };
	this.mout   = function (n_id) { this.a_index[n_id].upstatus(true) };
	this.mover  = function (n_id) { this.a_index[n_id].upstatus() };

	this.a_children = [];
	for (var i = 0; i < a_items.length; i++)
		new tree_item(this, i);

	this.n_id = trees.length;
	trees[this.n_id] = this;
	
	for (var i = 0; i < this.a_children.length; i++) {
		document.write(this.a_children[i].init());
		this.a_children[i].open();
	}
}
function tree_item (o_parent, n_order) {

	this.n_depth  = o_parent.n_depth + 1;
	this.a_config = o_parent.a_config[n_order + (this.n_depth ? 2 : 0)];
	if (!this.a_config) return;

	this.o_root    = o_parent.o_root;
	this.o_parent  = o_parent;
	this.n_order   = n_order;
	this.b_opened  = !this.n_depth;

	this.n_id = this.o_root.a_index.length;
	this.o_root.a_index[this.n_id] = this;
	o_parent.a_children[n_order] = this;

	this.a_children = [];
	for (var i = 0; i < this.a_config.length - 2; i++)
		new tree_item(this, i);

	this.get_icon = item_get_icon;
	this.open     = item_open;
	this.select   = item_select;
	this.init     = item_init;
	this.upstatus = item_upstatus;
	this.is_last  = function () { return this.n_order == this.o_parent.a_children.length - 1 };
}

function item_open (b_close) {
	var o_idiv = get_element('i_div' + this.o_root.n_id + '_' + this.n_id);
	if (!o_idiv) return;
	
	if (!o_idiv.innerHTML) {
		var a_children = [];
		for (var i = 0; i < this.a_children.length; i++)
			a_children[i]= this.a_children[i].init();
		o_idiv.innerHTML = a_children.join('');
	}
	o_idiv.style.display = (b_close ? 'none' : 'block');
	
	this.b_opened = !b_close;
	var o_jicon = document.images['j_img' + this.o_root.n_id + '_' + this.n_id],
		o_iicon = document.images['i_img' + this.o_root.n_id + '_' + this.n_id];
	if (o_jicon) o_jicon.src = this.get_icon(true);
	if (o_iicon) o_iicon.src = this.get_icon();
	this.upstatus();
}

function item_select (b_deselect) {
	if (!b_deselect) {
		var o_olditem = this.o_root.o_selected;
		this.o_root.o_selected = this;
		if (o_olditem) o_olditem.select(true);
	}
	var o_iicon = document.images['i_img' + this.o_root.n_id + '_' + this.n_id];
	if (o_iicon) o_iicon.src = this.get_icon();
	get_element('i_txt' + this.o_root.n_id + '_' + this.n_id).style.fontWeight = b_deselect ? 'normal' : 'bold';
	
	this.upstatus();
	return Boolean(this.a_config[1]);
}

function item_upstatus (b_clear) {
	window.setTimeout('window.status="' + (b_clear ? '' : this.a_config[0] + (this.a_config[1].replace(/'/g,'\\\'') ? ' ('+ this.a_config[1].replace(/'/g,'\\\'') + ')' : '')) + '"', 10);
}

function item_init () {
	var a_offset = [],
		o_current_item = this.o_parent;
	for (var i = this.n_depth; i > 1; i--) {
		a_offset[i] = '<img src="' + this.o_root.a_tpl[o_current_item.is_last() ? 'icon_e' : 'icon_l'] + '" border="0" align="absbottom">';
		o_current_item = o_current_item.o_parent;
	}
	return '<table cellpadding="0" cellspacing="0" border="0"><tr><td nowrap>' + (this.n_depth ? a_offset.join('') + (this.a_children.length
		? '<a href="javascript: trees[' + this.o_root.n_id + '].toggle(' + this.n_id + ')" onmouseover="trees[' + this.o_root.n_id + '].mover(' + this.n_id + ')" onmouseout="trees[' + this.o_root.n_id + '].mout(' + this.n_id + ')"><img src="' + this.get_icon(true) + '" border="0" align="absbottom" name="j_img' + this.o_root.n_id + '_' + this.n_id + '"></a>'
		: '<img src="' + this.get_icon(true) + '" border="0" align="absbottom">') : '') 
		+ '<a onclick="selector(\'' + this.a_config[1].replace(/'/g,'\\\'') + '\', \'' + this.a_config[0].replace(/'/g,'\\\'') + '\'); return trees[' + this.o_root.n_id + '].select(' + this.n_id + ')" ondblclick="trees[' + this.o_root.n_id + '].toggle(' + this.n_id + ')" onmouseover="trees[' + this.o_root.n_id + '].mover(' + this.n_id + ')" onmouseout="trees[' + this.o_root.n_id + '].mout(' + this.n_id + ')" class="t' + this.o_root.n_id + 'i" id="i_txt' + this.o_root.n_id + '_' + this.n_id + '"><img src="' + this.get_icon() + '" border="0" align="absbottom" name="i_img' + this.o_root.n_id + '_' + this.n_id + '" class="t' + this.o_root.n_id + 'im">' + this.a_config[0] + '</a></td></tr></table>' + (this.a_children.length ? '<div id="i_div' + this.o_root.n_id + '_' + this.n_id + '" style="display:none"></div>' : '');
}

function item_get_icon (b_junction) {
	return this.o_root.a_tpl['icon_' + ((this.n_depth ? 0 : 32) + (this.a_children.length ? 16 : 0) + (this.a_children.length && this.b_opened ? 8 : 0) + (!b_junction && this.o_root.o_selected == this ? 4 : 0) + (b_junction ? 2 : 0) + (b_junction && this.is_last() ? 1 : 0))];
}

var trees = [];
get_element = document.all ?
	function (s_id) { return document.all[s_id] } :
	function (s_id) { return document.getElementById(s_id) };

function checkBrowser(){
  if (!document.getElementsByTagName){
    return true;
  }
  else{
    return false;
  }
}

/*
 * Functions to save the selected font size between sessions
 */
function ndeSetTextSize(chgsize,rs){
  var startSize;
  var newSize;

  if (!checkBrowser) {
    return;
  }

  startSize = parseInt(ndeGetDocTextSize());

  if (!startSize) {
    startSize = 16;
  }

  switch (chgsize) {
  case 'incr':
    newSize = startSize + 2;
    break;

  case 'decr':
    newSize = startSize - 2;
    break;

  case 'reset':
    if (rs) {newSize = rs;} else {newSize = 16;}
    break;

  default:
    try{
      newSize = parseInt(ndeReadCookie("sps-textsize"));
    } catch(e){
      alert(e);
    }
    
    if (!newSize || newSize == 'NaN') {
      newSize = startSize;
    }
    break;
  }

  if (newSize < 10) {
    newSize = 10;
  }

  newSize += 'px';

  document.getElementsByTagName('html')[0].style.fontSize = newSize;
  document.getElementsByTagName('body')[0].style.fontSize = newSize;

  ndeCreateCookie("sps-textsize", newSize, 365);
}

function ndeGetDocTextSize() {
  if (!checkBrowser) {
    return 0;
  }

  var size = 0;
  var body = document.getElementsByTagName('body')[0];

  if (body.style && body.style.fontSize) {
    size = body.style.fontSize;
  } else if (typeof(getComputedStyle) != 'undefined') {
    size = getComputedStyle(body,'').getPropertyValue('font-size');
  } else if (body.currentStyle) {
   size = body.currentStyle.fontSize;
  }

  //fix IE bug
  if( isNaN(size)) {
    if(size.substring(size.length-1)=="%"){
      return
    }
  }

  return size;
}

function ndeCreateCookie(name,value,days) {
  var cookie = name + "=" + value + ";";

  if (days)   {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    cookie += " expires=" + date.toGMTString() + ";";
  }
    cookie += " path=/;";
    cookie += " SameSite=Lax";

  document.cookie = cookie;
}

function ndeReadCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

 
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    ctest = c.substring(0,name.length);
 
    if(ctest == name) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

/*
 * Apply the table hover highlighting to the .dataTable class
 */
 (function(C){var A=function(Q){var S=Q.rows;var K=S.length;var P=[];for(var I=0;I<K;I++){var R=S[I].cells;var O=R.length;for(var H=0;H<O;H++){var N=R[H];var M=N.rowSpan||1;var J=N.colSpan||1;var L=-1;if(!P[I]){P[I]=[]}var E=P[I];while(E[++L]){}N.realIndex=L;for(var G=I;G<I+M;G++){if(!P[G]){P[G]=[]}var D=P[G];for(var F=L;F<L+J;F++){D[F]=1}}}}};var B=function(H){var E=0,F,D,G=(H.tHead)?H.tHead.rows:0;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}for(D=0;D<H.tBodies.length;D++){G=H.tBodies[D].rows;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}}G=(H.tFoot)?H.tFoot.rows:0;if(G){for(F=0;F<G.length;F++){G[F].realRIndex=E++}}};C.fn.tableHover=function(D){var E=C.extend({allowHead:true,allowBody:true,allowFoot:true,headRows:false,bodyRows:true,footRows:false,spanRows:true,headCols:false,bodyCols:true,footCols:false,spanCols:true,ignoreCols:[],headCells:false,bodyCells:true,footCells:false,rowClass:"hover",colClass:"",cellClass:"",clickClass:""},D);return this.each(function(){var N=[],M=[],J=this,F,K=0,O=[-1,-1];if(!J.tBodies||!J.tBodies.length){return }var G=function(U,X){var W,V,T,R,Q,S;for(T=0;T<U.length;T++,K++){V=U[T];for(R=0;R<V.cells.length;R++){W=V.cells[R];if((X=="TBODY"&&E.bodyRows)||(X=="TFOOT"&&E.footRows)||(X=="THEAD"&&E.headRows)){S=W.rowSpan;while(--S>=0){M[K+S].push(W)}}if((X=="TBODY"&&E.bodyCols)||(X=="THEAD"&&E.headCols)||(X=="TFOOT"&&E.footCols)){S=W.colSpan;while(--S>=0){Q=W.realIndex+S;if(C.inArray(Q+1,E.ignoreCols)>-1){break}if(!N[Q]){N[Q]=[]}N[Q].push(W)}}if((X=="TBODY"&&E.allowBody)||(X=="THEAD"&&E.allowHead)||(X=="TFOOT"&&E.allowFoot)){W.thover=true}}}};var L=function(R){var Q=R.target;while(Q!=this&&Q.thover!==true){Q=Q.parentNode}if(Q.thover===true){H(Q,true)}};var I=function(R){var Q=R.target;while(Q!=this&&Q.thover!==true){Q=Q.parentNode}if(Q.thover===true){H(Q,false)}};var P=function(T){var R=T.target;while(R&&R!=J&&!R.thover){R=R.parentNode}if(R.thover&&E.clickClass!=""){var Q=R.realIndex,U=R.parentNode.realRIndex,S="";C("td."+E.clickClass+", th."+E.clickClass,J).removeClass(E.clickClass);if(Q!=O[0]||U!=O[1]){if(E.rowClass!=""){S+=",."+E.rowClass}if(E.colClass!=""){S+=",."+E.colClass}if(E.cellClass!=""){S+=",."+E.cellClass}if(S!=""){C("td, th",J).filter(S.substring(1)).addClass(E.clickClass)}O=[Q,U]}else{O=[-1,-1]}}};var H=function(R,T){if(T){C.fn.tableHoverHover=C.fn.addClass}else{C.fn.tableHoverHover=C.fn.removeClass}var V=N[R.realIndex]||[],S=[],U=0,Q,W;if(E.colClass!=""){while(E.spanCols&&++U<R.colSpan&&N[R.realIndex+U]){V=V.concat(N[R.realIndex+U])}C(V).tableHoverHover(E.colClass)}if(E.rowClass!=""){Q=R.parentNode.realRIndex;if(M[Q]){S=S.concat(M[Q])}U=0;while(E.spanRows&&++U<R.rowSpan){if(M[Q+U]){S=S.concat(M[Q+U])}}C(S).tableHoverHover(E.rowClass)}if(E.cellClass!=""){W=R.parentNode.parentNode.nodeName.toUpperCase();if((W=="TBODY"&&E.bodyCells)||(W=="THEAD"&&E.headCells)||(W=="TFOOT"&&E.footCells)){C(R).tableHoverHover(E.cellClass)}}};A(J);B(J);for(F=0;F<J.rows.length;F++){M[F]=[]}if(J.tHead){G(J.tHead.rows,"THEAD")}for(F=0;F<J.tBodies.length;F++){G(J.tBodies[F].rows,"TBODY")}if(J.tFoot){G(J.tFoot.rows,"TFOOT")}C(this).bind("mouseover",L).bind("mouseout",I).click(P)})}})(jQuery);
$(document).ready(function()
{
$('.dataTable').tableHover({colClass: 'hover', cellClass: 'hovercell', clickClass: 'click'});
});



/* Split.js - v1.6.0
Copyright (c) 2020 Nathan Cahill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Split=t()}(this,(function(){"use strict";var e="undefined"!=typeof window?window:null,t=null===e,n=t?void 0:e.document,i=function(){return!1},r=t?"calc":["","-webkit-","-moz-","-o-"].filter((function(e){var t=n.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length})).shift()+"calc",s=function(e){return"string"==typeof e||e instanceof String},o=function(e){if(s(e)){var t=n.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},a=function(e,t,n){var i=e[t];return void 0!==i?i:n},u=function(e,t,n,i){if(t){if("end"===i)return 0;if("center"===i)return e/2}else if(n){if("start"===i)return 0;if("center"===i)return e/2}return e},l=function(e,t){var i=n.createElement("div");return i.className="gutter gutter-"+t,i},c=function(e,t,n){var i={};return s(t)?i[e]=t:i[e]=r+"("+t+"% - "+n+"px)",i},h=function(e,t){var n;return(n={})[e]=t+"px",n};return function(r,s){if(void 0===s&&(s={}),t)return{};var d,f,v,m,g,p,y=r;Array.from&&(y=Array.from(y));var z=o(y[0]).parentNode,b=getComputedStyle?getComputedStyle(z):null,E=b?b.flexDirection:null,S=a(s,"sizes")||y.map((function(){return 100/y.length})),L=a(s,"minSize",100),_=Array.isArray(L)?L:y.map((function(){return L})),w=a(s,"expandToMin",!1),k=a(s,"gutterSize",10),x=a(s,"gutterAlign","center"),C=a(s,"snapOffset",30),M=a(s,"dragInterval",1),U=a(s,"direction","horizontal"),O=a(s,"cursor","horizontal"===U?"col-resize":"row-resize"),D=a(s,"gutter",l),A=a(s,"elementStyle",c),B=a(s,"gutterStyle",h);function j(e,t,n,i){var r=A(d,t,n,i);Object.keys(r).forEach((function(t){e.style[t]=r[t]}))}function F(){return p.map((function(e){return e.size}))}function R(e){return"touches"in e?e.touches[0][f]:e[f]}function T(e){var t=p[this.a],n=p[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,j(t.element,t.size,this._b,t.i),j(n.element,n.size,this._c,n.i)}function N(e){var t,n=p[this.a],r=p[this.b];this.dragging&&(t=R(e)-this.start+(this._b-this.dragOffset),M>1&&(t=Math.round(t/M)*M),t<=n.minSize+C+this._b?t=n.minSize+this._b:t>=this.size-(r.minSize+C+this._c)&&(t=this.size-(r.minSize+this._c)),T.call(this,t),a(s,"onDrag",i)())}function q(){var e=p[this.a].element,t=p[this.b].element,n=e.getBoundingClientRect(),i=t.getBoundingClientRect();this.size=n[d]+i[d]+this._b+this._c,this.start=n[v],this.end=n[m]}function H(e){var t=function(e){if(!getComputedStyle)return null;var t=getComputedStyle(e);if(!t)return null;var n=e[g];return 0===n?null:n-="horizontal"===U?parseFloat(t.paddingLeft)+parseFloat(t.paddingRight):parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)}(z);if(null===t)return e;if(_.reduce((function(e,t){return e+t}),0)>t)return e;var n=0,i=[],r=e.map((function(r,s){var o=t*r/100,a=u(k,0===s,s===e.length-1,x),l=_[s]+a;return o<l?(n+=l-o,i.push(0),l):(i.push(o-l),o)}));return 0===n?e:r.map((function(e,r){var s=e;if(n>0&&i[r]-n>0){var o=Math.min(n,i[r]-n);n-=o,s=e-o}return s/t*100}))}function I(){var t=p[this.a].element,r=p[this.b].element;this.dragging&&a(s,"onDragEnd",i)(F()),this.dragging=!1,e.removeEventListener("mouseup",this.stop),e.removeEventListener("touchend",this.stop),e.removeEventListener("touchcancel",this.stop),e.removeEventListener("mousemove",this.move),e.removeEventListener("touchmove",this.move),this.stop=null,this.move=null,t.removeEventListener("selectstart",i),t.removeEventListener("dragstart",i),r.removeEventListener("selectstart",i),r.removeEventListener("dragstart",i),t.style.userSelect="",t.style.webkitUserSelect="",t.style.MozUserSelect="",t.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",this.gutter.style.cursor="",this.parent.style.cursor="",n.body.style.cursor=""}function W(t){if(!("button"in t)||0===t.button){var r=p[this.a].element,o=p[this.b].element;this.dragging||a(s,"onDragStart",i)(F()),t.preventDefault(),this.dragging=!0,this.move=N.bind(this),this.stop=I.bind(this),e.addEventListener("mouseup",this.stop),e.addEventListener("touchend",this.stop),e.addEventListener("touchcancel",this.stop),e.addEventListener("mousemove",this.move),e.addEventListener("touchmove",this.move),r.addEventListener("selectstart",i),r.addEventListener("dragstart",i),o.addEventListener("selectstart",i),o.addEventListener("dragstart",i),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",this.gutter.style.cursor=O,this.parent.style.cursor=O,n.body.style.cursor=O,q.call(this),this.dragOffset=R(t)-this.end}}"horizontal"===U?(d="width",f="clientX",v="left",m="right",g="clientWidth"):"vertical"===U&&(d="height",f="clientY",v="top",m="bottom",g="clientHeight"),S=H(S);var X=[];function Y(e){var t=e.i===X.length,n=t?X[e.i-1]:X[e.i];q.call(n);var i=t?n.size-e.minSize-n._c:e.minSize+n._b;T.call(n,i)}return(p=y.map((function(e,t){var n,i={element:o(e),size:S[t],minSize:_[t],i:t};if(t>0&&((n={a:t-1,b:t,dragging:!1,direction:U,parent:z})._b=u(k,t-1==0,!1,x),n._c=u(k,!1,t===y.length-1,x),"row-reverse"===E||"column-reverse"===E)){var r=n.a;n.a=n.b,n.b=r}if(t>0){var s=D(t,U,i.element);!function(e,t,n){var i=B(d,t,n);Object.keys(i).forEach((function(t){e.style[t]=i[t]}))}(s,k,t),n._a=W.bind(n),s.addEventListener("mousedown",n._a),s.addEventListener("touchstart",n._a),z.insertBefore(s,i.element),n.gutter=s}return j(i.element,i.size,u(k,0===t,t===y.length-1,x),t),t>0&&X.push(n),i}))).forEach((function(e){var t=e.element.getBoundingClientRect()[d];t<e.minSize&&(w?Y(e):e.minSize=t)})),{setSizes:function(e){var t=H(e);t.forEach((function(e,n){if(n>0){var i=X[n-1],r=p[i.a],s=p[i.b];r.size=t[n-1],s.size=e,j(r.element,r.size,i._b,r.i),j(s.element,s.size,i._c,s.i)}}))},getSizes:F,collapse:function(e){Y(p[e])},destroy:function(e,t){X.forEach((function(n){if(!0!==t?n.parent.removeChild(n.gutter):(n.gutter.removeEventListener("mousedown",n._a),n.gutter.removeEventListener("touchstart",n._a)),!0!==e){var i=A(d,n.a.size,n._b);Object.keys(i).forEach((function(e){p[n.a].element.style[e]="",p[n.b].element.style[e]=""}))}}))},parent:z,pairs:X}}}));
