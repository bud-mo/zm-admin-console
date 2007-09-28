/*
 * ***** BEGIN LICENSE BLOCK *****
 * 
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2004, 2005, 2006, 2007 Zimbra, Inc.
 * 
 * The contents of this file are subject to the Yahoo! Public License
 * Version 1.0 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * 
 * ***** END LICENSE BLOCK *****
 */

/**
* @constructor
* @class ZaDomainListView
* @param parent
* @author Roland Schemers
* @author Greg Solovyev
**/

ZaDomainListView = function(parent) {

//	var className = "ZaDomainListView";
	var className = null;
	var posStyle = DwtControl.ABSOLUTE_STYLE;
	
	var headerList = this._getHeaderList();
	
	ZaListView.call(this, parent, className, posStyle, headerList);

	this._appCtxt = this.shell.getData(ZaAppCtxt.LABEL);
	
	//this.setScrollStyle(DwtControl.SCROLL);
	//this.addControlListener(new AjxListener(this, ZaDomainListView.prototype._controlListener));
}

ZaDomainListView.prototype = new ZaListView;
ZaDomainListView.prototype.constructor = ZaDomainListView;

ZaDomainListView.prototype.toString = 
function() {
	return "ZaDomainListView";
}

ZaDomainListView.prototype.getTitle = 
function () {
	return ZaMsg.Domain_view_title;
}

ZaDomainListView.prototype.getTabIcon =
function () {
	return "Domain" ;
}

/**
* Renders a single item as a DIV element.
*/
ZaDomainListView.prototype._createItemHtml =
function(domain, now, isDragProxy) {
	var html = new Array(50);
	var	div = document.createElement("div");
	div[DwtListView._STYLE_CLASS] = "Row";
	div[DwtListView._SELECTED_STYLE_CLASS] = div[DwtListView._STYLE_CLASS] + "-" + DwtCssStyle.SELECTED;
	div.className = div[DwtListView._STYLE_CLASS];
	this.associateItemWithElement(domain, div, DwtListView.TYPE_LIST_ITEM);
	
	var idx = 0;
	html[idx++] = "<table width='100%' cellspacing='2' cellpadding='0'>";
	html[idx++] = "<tr>";
	var cnt = this._headerList.length;
	for(var i = 0; i < cnt; i++) {
		var id = this._headerList[i]._id;
		if(id.indexOf(ZaDomain.A_domainName)==0) {
			// name
			html[idx++] = "<td align='left' width=" + this._headerList[i]._width + "><nobr>";
			html[idx++] = AjxStringUtil.htmlEncode(domain.name);
			html[idx++] = "</nobr></td>";
		} else if(id.indexOf(ZaDomain.A_description)==0) {
			// description		
			html[idx++] = "<td align='left' width=" + this._headerList[i]._width + "><nobr>";
			html[idx++] = AjxStringUtil.htmlEncode(domain.attrs[ZaDomain.A_description]);
			html[idx++] = "</nobr></td>";
		} else if(id.indexOf(ZaDomain.A_zimbraDomainStatus)==0) {
			// description		
			html[idx++] = "<td align='left' width=" + this._headerList[i]._width + "><nobr>";
			html[idx++] = ZaDomain._domainStatus(domain.attrs[ZaDomain.A_zimbraDomainStatus]);
			html[idx++] = "</nobr></td>";
		}
	}
	html[idx++] = "</tr></table>";
	div.innerHTML = html.join("");
	return div;
}

ZaDomainListView.prototype._getHeaderList =
function() {

	var headerList = new Array();
	var sortable = 1;
	//idPrefix, label, iconInfo, width, sortable, sortField, resizeable, visible
	headerList[0] = new ZaListHeaderItem(ZaDomain.A_domainName , ZaMsg.DLV_Name_col, null, 250, sortable++, ZaDomain.A_domainName, true, true);
	//headerList[0].initialize(ZaMsg.CLV_Name_col, null, "245", true, ZaDomain.A_domainName);

	headerList[1] = new ZaListHeaderItem(ZaDomain.A_zimbraDomainStatus , ZaMsg.DLV_Status_col, null, 250, sortable++, ZaDomain.A_zimbraDomainStatus, true, true);
	
	headerList[2] = new ZaListHeaderItem(ZaDomain.A_description, ZaMsg.DLV_Description_col, null, null, null, null, true, true);
	//headerList[1].initialize(ZaMsg.CLV_Description_col, null, "245", false, ZaDomain.A_description);
	
	return headerList;
}


