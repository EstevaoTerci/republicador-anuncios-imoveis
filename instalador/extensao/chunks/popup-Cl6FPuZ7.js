import "./_virtual_wxt-html-plugins-CvbLecxM.js";
import { A as onMounted, M as openBlock, P as renderList, U as withCtx, W as withDirectives, _ as createStaticVNode, at as unref, c as withModifiers, ct as toDisplayString, d as computed, et as ref, f as createBaseVNode, h as createElementBlock, j as onUnmounted, l as Fragment, m as createCommentVNode, n as createApp, o as vShow, ot as normalizeClass, p as createBlock, t as Transition, v as createTextVNode, x as defineComponent, y as createVNode } from "./runtime-dom.esm-bundler-D0J2iYbf.js";
import { n as init_asyncToGenerator, t as _asyncToGenerator } from "./asyncToGenerator-W-5kRIk9.js";
import { t as _objectSpread2 } from "./objectSpread2-C_srcgD-.js";
import { n as NativeMessageType } from "./dist-DwEL_LJB.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-Bzyu2s-i.js";
import { t as BACKGROUND_MESSAGE_TYPES } from "./message-types-C0QQP5PH.js";
import { a as getCacheStats, i as clearModelCache, o as getModelInfo, r as cleanupModelCache, t as PREDEFINED_MODELS } from "./semantic-similarity-engine-C7Mx2wuo.js";
import { t as LINKS } from "./constants-BrHJ3XIU.js";
/* empty css                    */
import { n as preloadAgentTheme, r as useAgentTheme } from "./useAgentTheme-CrHOVB3L.js";
//#region utils/i18n.ts
init_asyncToGenerator();
/**
* Chrome Extension i18n utility
* Provides safe access to chrome.i18n.getMessage with fallbacks
*/
var fallbackMessages = {
	extensionName: "chrome-mcp-server",
	extensionDescription: "Exposes browser capabilities with your own chrome",
	nativeServerConfigLabel: "Native Server Configuration",
	semanticEngineLabel: "Semantic Engine",
	embeddingModelLabel: "Embedding Model",
	indexDataManagementLabel: "Index Data Management",
	modelCacheManagementLabel: "Model Cache Management",
	statusLabel: "Status",
	runningStatusLabel: "Running Status",
	connectionStatusLabel: "Connection Status",
	lastUpdatedLabel: "Last Updated:",
	connectButton: "Connect",
	disconnectButton: "Disconnect",
	connectingStatus: "Connecting...",
	connectedStatus: "Connected",
	disconnectedStatus: "Disconnected",
	detectingStatus: "Detecting...",
	serviceRunningStatus: "Service Running (Port: {0})",
	serviceNotConnectedStatus: "Service Not Connected",
	connectedServiceNotStartedStatus: "Connected, Service Not Started",
	mcpServerConfigLabel: "MCP Server Configuration",
	connectionPortLabel: "Connection Port",
	refreshStatusButton: "Refresh Status",
	copyConfigButton: "Copy Configuration",
	retryButton: "Retry",
	cancelButton: "Cancel",
	confirmButton: "Confirm",
	saveButton: "Save",
	closeButton: "Close",
	resetButton: "Reset",
	initializingStatus: "Initializing...",
	processingStatus: "Processing...",
	loadingStatus: "Loading...",
	clearingStatus: "Clearing...",
	cleaningStatus: "Cleaning...",
	downloadingStatus: "Downloading...",
	semanticEngineReadyStatus: "Semantic Engine Ready",
	semanticEngineInitializingStatus: "Semantic Engine Initializing...",
	semanticEngineInitFailedStatus: "Semantic Engine Initialization Failed",
	semanticEngineNotInitStatus: "Semantic Engine Not Initialized",
	initSemanticEngineButton: "Initialize Semantic Engine",
	reinitializeButton: "Reinitialize",
	downloadingModelStatus: "Downloading Model... {0}%",
	switchingModelStatus: "Switching Model...",
	modelLoadedStatus: "Model Loaded",
	modelFailedStatus: "Model Failed to Load",
	lightweightModelDescription: "Lightweight Multilingual Model",
	betterThanSmallDescription: "Slightly larger than e5-small, but better performance",
	multilingualModelDescription: "Multilingual Semantic Model",
	fastPerformance: "Fast",
	balancedPerformance: "Balanced",
	accuratePerformance: "Accurate",
	networkErrorMessage: "Network connection error, please check network and retry",
	modelCorruptedErrorMessage: "Model file corrupted or incomplete, please retry download",
	unknownErrorMessage: "Unknown error, please check if your network can access HuggingFace",
	permissionDeniedErrorMessage: "Permission denied",
	timeoutErrorMessage: "Operation timed out",
	indexedPagesLabel: "Indexed Pages",
	indexSizeLabel: "Index Size",
	activeTabsLabel: "Active Tabs",
	vectorDocumentsLabel: "Vector Documents",
	cacheSizeLabel: "Cache Size",
	cacheEntriesLabel: "Cache Entries",
	clearAllDataButton: "Clear All Data",
	clearAllCacheButton: "Clear All Cache",
	cleanExpiredCacheButton: "Clean Expired Cache",
	exportDataButton: "Export Data",
	importDataButton: "Import Data",
	confirmClearDataTitle: "Confirm Clear Data",
	settingsTitle: "Settings",
	aboutTitle: "About",
	helpTitle: "Help",
	clearDataWarningMessage: "This operation will clear all indexed webpage content and vector data, including:",
	clearDataList1: "All webpage text content index",
	clearDataList2: "Vector embedding data",
	clearDataList3: "Search history and cache",
	clearDataIrreversibleWarning: "This operation is irreversible! After clearing, you need to browse webpages again to rebuild the index.",
	confirmClearButton: "Confirm Clear",
	cacheDetailsLabel: "Cache Details",
	noCacheDataMessage: "No cache data",
	loadingCacheInfoStatus: "Loading cache information...",
	processingCacheStatus: "Processing cache...",
	expiredLabel: "Expired",
	bookmarksBarLabel: "Bookmarks Bar",
	newTabLabel: "New Tab",
	currentPageLabel: "Current Page",
	menuLabel: "Menu",
	navigationLabel: "Navigation",
	mainContentLabel: "Main Content",
	languageSelectorLabel: "Language",
	themeLabel: "Theme",
	lightTheme: "Light",
	darkTheme: "Dark",
	autoTheme: "Auto",
	advancedSettingsLabel: "Advanced Settings",
	debugModeLabel: "Debug Mode",
	verboseLoggingLabel: "Verbose Logging",
	successNotification: "Operation completed successfully",
	warningNotification: "Warning: Please review before proceeding",
	infoNotification: "Information",
	configCopiedNotification: "Configuration copied to clipboard",
	dataClearedNotification: "Data cleared successfully",
	bytesUnit: "bytes",
	kilobytesUnit: "KB",
	megabytesUnit: "MB",
	gigabytesUnit: "GB",
	itemsUnit: "items",
	pagesUnit: "pages",
	nativeServerConfig: "Native Server Configuration",
	runningStatus: "Running Status",
	refreshStatus: "Refresh Status",
	lastUpdated: "Last Updated:",
	mcpServerConfig: "MCP Server Configuration",
	connectionPort: "Connection Port",
	connecting: "Connecting...",
	disconnect: "Disconnect",
	connect: "Connect",
	semanticEngine: "Semantic Engine",
	embeddingModel: "Embedding Model",
	retry: "Retry",
	indexDataManagement: "Index Data Management",
	clearing: "Clearing...",
	clearAllData: "Clear All Data",
	copyConfig: "Copy Configuration",
	serviceRunning: "Service Running (Port: {0})",
	connectedServiceNotStarted: "Connected, Service Not Started",
	serviceNotConnected: "Service Not Connected",
	detecting: "Detecting...",
	lightweightModel: "Lightweight Multilingual Model",
	betterThanSmall: "Slightly larger than e5-small, but better performance",
	multilingualModel: "Multilingual Semantic Model",
	fast: "Fast",
	balanced: "Balanced",
	accurate: "Accurate",
	semanticEngineReady: "Semantic Engine Ready",
	semanticEngineInitializing: "Semantic Engine Initializing...",
	semanticEngineInitFailed: "Semantic Engine Initialization Failed",
	semanticEngineNotInit: "Semantic Engine Not Initialized",
	downloadingModel: "Downloading Model... {0}%",
	switchingModel: "Switching Model...",
	networkError: "Network connection error, please check network and retry",
	modelCorrupted: "Model file corrupted or incomplete, please retry download",
	unknownError: "Unknown error, please check if your network can access HuggingFace",
	reinitialize: "Reinitialize",
	initializing: "Initializing...",
	initSemanticEngine: "Initialize Semantic Engine",
	indexedPages: "Indexed Pages",
	indexSize: "Index Size",
	activeTabs: "Active Tabs",
	vectorDocuments: "Vector Documents",
	confirmClearData: "Confirm Clear Data",
	clearDataWarning: "This operation will clear all indexed webpage content and vector data, including:",
	clearDataIrreversible: "This operation is irreversible! After clearing, you need to browse webpages again to rebuild the index.",
	confirmClear: "Confirm Clear",
	cancel: "Cancel",
	confirm: "Confirm",
	processing: "Processing...",
	modelCacheManagement: "Model Cache Management",
	cacheSize: "Cache Size",
	cacheEntries: "Cache Entries",
	cacheDetails: "Cache Details",
	noCacheData: "No cache data",
	loadingCacheInfo: "Loading cache information...",
	processingCache: "Processing cache...",
	cleaning: "Cleaning...",
	cleanExpiredCache: "Clean Expired Cache",
	clearAllCache: "Clear All Cache",
	expired: "Expired",
	bookmarksBar: "Bookmarks Bar"
};
/**
* Safe i18n message getter with fallback support
* @param key Message key
* @param substitutions Optional substitution values
* @returns Localized message or fallback
*/
function getMessage(key, substitutions) {
	try {
		if (typeof chrome !== "undefined" && chrome.i18n && chrome.i18n.getMessage) {
			const message = chrome.i18n.getMessage(key, substitutions);
			if (message) return message;
		}
	} catch (error) {
		console.warn(`Failed to get i18n message for key "${key}":`, error);
	}
	let fallback = fallbackMessages[key] || key;
	if (substitutions && substitutions.length > 0) substitutions.forEach((value, index) => {
		fallback = fallback.replace(`{${index}}`, value);
	});
	return fallback;
}
//#endregion
//#region entrypoints/popup/components/ConfirmDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "dialog-content" };
var _hoisted_2$4 = { class: "dialog-header" };
var _hoisted_3$4 = { class: "dialog-icon" };
var _hoisted_4$4 = { class: "dialog-title" };
var _hoisted_5$3 = { class: "dialog-body" };
var _hoisted_6$3 = { class: "dialog-message" };
var _hoisted_7$3 = {
	key: 0,
	class: "dialog-list"
};
var _hoisted_8$3 = {
	key: 1,
	class: "dialog-warning"
};
var _hoisted_9$3 = { class: "dialog-actions" };
var _hoisted_10$3 = ["disabled"];
//#endregion
//#region entrypoints/popup/components/ConfirmDialog.vue
var ConfirmDialog_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "ConfirmDialog",
	props: {
		visible: { type: Boolean },
		title: {},
		message: {},
		items: {},
		warning: {},
		icon: { default: "⚠️" },
		confirmText: { default: getMessage("confirmButton") },
		cancelText: { default: getMessage("cancelButton") },
		confirmingText: { default: getMessage("processingStatus") },
		isConfirming: {
			type: Boolean,
			default: false
		}
	},
	emits: ["confirm", "cancel"],
	setup(__props) {
		return (_ctx, _cache) => {
			return __props.visible ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "confirmation-dialog",
				onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.$emit("cancel"), ["self"]))
			}, [createBaseVNode("div", _hoisted_1$5, [
				createBaseVNode("div", _hoisted_2$4, [createBaseVNode("span", _hoisted_3$4, toDisplayString(__props.icon), 1), createBaseVNode("h3", _hoisted_4$4, toDisplayString(__props.title), 1)]),
				createBaseVNode("div", _hoisted_5$3, [
					createBaseVNode("p", _hoisted_6$3, toDisplayString(__props.message), 1),
					__props.items && __props.items.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_7$3, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
						return openBlock(), createElementBlock("li", { key: item }, toDisplayString(item), 1);
					}), 128))])) : createCommentVNode("", true),
					__props.warning ? (openBlock(), createElementBlock("div", _hoisted_8$3, [createBaseVNode("strong", null, toDisplayString(__props.warning), 1)])) : createCommentVNode("", true)
				]),
				createBaseVNode("div", _hoisted_9$3, [createBaseVNode("button", {
					class: "dialog-button cancel-button",
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
				}, toDisplayString(__props.cancelText), 1), createBaseVNode("button", {
					class: "dialog-button confirm-button",
					disabled: __props.isConfirming,
					onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("confirm"))
				}, toDisplayString(__props.isConfirming ? __props.confirmingText : __props.confirmText), 9, _hoisted_10$3)])
			])])) : createCommentVNode("", true);
		};
	}
}), [["__scopeId", "data-v-ec7ccd99"]]);
//#endregion
//#region entrypoints/popup/components/ProgressIndicator.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = {
	key: 0,
	class: "progress-section"
};
var _hoisted_2$3 = { class: "progress-indicator" };
var _hoisted_3$3 = {
	key: 0,
	class: "spinner"
};
var _hoisted_4$3 = { class: "progress-text" };
//#endregion
//#region entrypoints/popup/components/ProgressIndicator.vue
var ProgressIndicator_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "ProgressIndicator",
	props: {
		visible: {
			type: Boolean,
			default: true
		},
		text: {},
		showSpinner: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return __props.visible ? (openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$3, [__props.showSpinner ? (openBlock(), createElementBlock("div", _hoisted_3$3)) : createCommentVNode("", true), createBaseVNode("span", _hoisted_4$3, toDisplayString(__props.text), 1)])])) : createCommentVNode("", true);
		};
	}
}), [["__scopeId", "data-v-64b16095"]]);
//#endregion
//#region entrypoints/popup/components/icons/DocumentIcon.vue
var DocumentIcon_default = /* @__PURE__ */ defineComponent({
	__name: "DocumentIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/DatabaseIcon.vue
var DatabaseIcon_default = /* @__PURE__ */ defineComponent({
	__name: "DatabaseIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/BoltIcon.vue
var BoltIcon_default = /* @__PURE__ */ defineComponent({
	__name: "BoltIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "1.5",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/TrashIcon.vue
var TrashIcon_default = /* @__PURE__ */ defineComponent({
	__name: "TrashIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "1.5",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/CheckIcon.vue
var CheckIcon_default = /* @__PURE__ */ defineComponent({
	__name: "CheckIcon",
	props: { className: { default: "icon-small" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 20 20",
				fill: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"fill-rule": "evenodd",
				d: "M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z",
				"clip-rule": "evenodd"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/TabIcon.vue
var TabIcon_default = /* @__PURE__ */ defineComponent({
	__name: "TabIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/VectorIcon.vue
var VectorIcon_default = /* @__PURE__ */ defineComponent({
	__name: "VectorIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M9 4.5a4.5 4.5 0 0 1 6 0M9 4.5V3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3v1.5M9 4.5a4.5 4.5 0 0 0-4.5 4.5v7.5A1.5 1.5 0 0 0 6 18h12a1.5 1.5 0 0 0 1.5-1.5V9a4.5 4.5 0 0 0-4.5-4.5M12 12l2.25 2.25M12 12l-2.25-2.25M12 12v6"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/RecordIcon.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["fill"];
//#endregion
//#region entrypoints/popup/components/icons/RecordIcon.vue
var RecordIcon_default = /* @__PURE__ */ defineComponent({
	__name: "RecordIcon",
	props: {
		className: { default: "icon-default" },
		recording: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				class: normalizeClass(__props.className)
			}, [createBaseVNode("circle", {
				cx: "12",
				cy: "12",
				r: "8",
				fill: __props.recording ? "#ef4444" : "currentColor"
			}, null, 8, _hoisted_1$3)], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/StopIcon.vue
var StopIcon_default = /* @__PURE__ */ defineComponent({
	__name: "StopIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("rect", {
				x: "6",
				y: "6",
				width: "12",
				height: "12",
				rx: "1",
				fill: "currentColor"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/WorkflowIcon.vue
var WorkflowIcon_default = /* @__PURE__ */ defineComponent({
	__name: "WorkflowIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "1.5",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/RefreshIcon.vue
var RefreshIcon_default = /* @__PURE__ */ defineComponent({
	__name: "RefreshIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/EditIcon.vue
var EditIcon_default = /* @__PURE__ */ defineComponent({
	__name: "EditIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/icons/MarkerIcon.vue
var MarkerIcon_default = /* @__PURE__ */ defineComponent({
	__name: "MarkerIcon",
	props: { className: { default: "icon-default" } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"stroke-width": "2",
				stroke: "currentColor",
				class: normalizeClass(__props.className)
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
			}, null, -1), createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M6 6h.008v.008H6V6z"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region entrypoints/popup/components/ModelCacheManagement.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "model-cache-section" };
var _hoisted_2$2 = { class: "section-title" };
var _hoisted_3$2 = { class: "stats-grid" };
var _hoisted_4$2 = { class: "stats-card" };
var _hoisted_5$2 = { class: "stats-header" };
var _hoisted_6$2 = { class: "stats-label" };
var _hoisted_7$2 = { class: "stats-icon orange" };
var _hoisted_8$2 = { class: "stats-value" };
var _hoisted_9$2 = { class: "stats-card" };
var _hoisted_10$2 = { class: "stats-header" };
var _hoisted_11$2 = { class: "stats-label" };
var _hoisted_12$2 = { class: "stats-icon purple" };
var _hoisted_13$2 = { class: "stats-value" };
var _hoisted_14$2 = {
	key: 0,
	class: "cache-details"
};
var _hoisted_15$2 = { class: "cache-details-title" };
var _hoisted_16$2 = { class: "cache-entries" };
var _hoisted_17$2 = { class: "entry-info" };
var _hoisted_18$2 = { class: "entry-url" };
var _hoisted_19$2 = { class: "entry-details" };
var _hoisted_20$2 = { class: "entry-size" };
var _hoisted_21$2 = { class: "entry-age" };
var _hoisted_22$2 = {
	key: 0,
	class: "entry-expired"
};
var _hoisted_23$2 = {
	key: 1,
	class: "no-cache"
};
var _hoisted_24$2 = {
	key: 2,
	class: "loading-cache"
};
var _hoisted_25$2 = { class: "cache-actions" };
var _hoisted_26$2 = ["disabled"];
var _hoisted_27$2 = { class: "stats-icon" };
var _hoisted_28$2 = ["disabled"];
var _hoisted_29$1 = { class: "stats-icon" };
//#endregion
//#region entrypoints/popup/components/ModelCacheManagement.vue
var ModelCacheManagement_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "ModelCacheManagement",
	props: {
		cacheStats: {},
		isManagingCache: { type: Boolean }
	},
	emits: ["cleanup-cache", "clear-all-cache"],
	setup(__props) {
		const getModelNameFromUrl = (url) => {
			const match = url.match(/huggingface\.co\/([^/]+\/[^/]+)/);
			if (match) return match[1];
			return url.split("/").pop() || url;
		};
		return (_ctx, _cache) => {
			var _props$cacheStats, _props$cacheStats2;
			return openBlock(), createElementBlock("div", _hoisted_1$2, [
				createBaseVNode("h2", _hoisted_2$2, toDisplayString(unref(getMessage)("modelCacheManagementLabel")), 1),
				createBaseVNode("div", _hoisted_3$2, [createBaseVNode("div", _hoisted_4$2, [createBaseVNode("div", _hoisted_5$2, [createBaseVNode("p", _hoisted_6$2, toDisplayString(unref(getMessage)("cacheSizeLabel")), 1), createBaseVNode("span", _hoisted_7$2, [createVNode(unref(DatabaseIcon_default))])]), createBaseVNode("p", _hoisted_8$2, toDisplayString(((_props$cacheStats = __props.cacheStats) === null || _props$cacheStats === void 0 ? void 0 : _props$cacheStats.totalSizeMB) || 0) + " MB", 1)]), createBaseVNode("div", _hoisted_9$2, [createBaseVNode("div", _hoisted_10$2, [createBaseVNode("p", _hoisted_11$2, toDisplayString(unref(getMessage)("cacheEntriesLabel")), 1), createBaseVNode("span", _hoisted_12$2, [createVNode(unref(VectorIcon_default))])]), createBaseVNode("p", _hoisted_13$2, toDisplayString(((_props$cacheStats2 = __props.cacheStats) === null || _props$cacheStats2 === void 0 ? void 0 : _props$cacheStats2.entryCount) || 0), 1)])]),
				__props.cacheStats && __props.cacheStats.entries.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14$2, [createBaseVNode("h3", _hoisted_15$2, toDisplayString(unref(getMessage)("cacheDetailsLabel")), 1), createBaseVNode("div", _hoisted_16$2, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.cacheStats.entries, (entry) => {
					return openBlock(), createElementBlock("div", {
						key: entry.url,
						class: "cache-entry"
					}, [createBaseVNode("div", _hoisted_17$2, [createBaseVNode("div", _hoisted_18$2, toDisplayString(getModelNameFromUrl(entry.url)), 1), createBaseVNode("div", _hoisted_19$2, [
						createBaseVNode("span", _hoisted_20$2, toDisplayString(entry.sizeMB) + " MB", 1),
						createBaseVNode("span", _hoisted_21$2, toDisplayString(entry.age), 1),
						entry.expired ? (openBlock(), createElementBlock("span", _hoisted_22$2, toDisplayString(unref(getMessage)("expiredLabel")), 1)) : createCommentVNode("", true)
					])])]);
				}), 128))])])) : __props.cacheStats && __props.cacheStats.entries.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23$2, [createBaseVNode("p", null, toDisplayString(unref(getMessage)("noCacheDataMessage")), 1)])) : !__props.cacheStats ? (openBlock(), createElementBlock("div", _hoisted_24$2, [createBaseVNode("p", null, toDisplayString(unref(getMessage)("loadingCacheInfoStatus")), 1)])) : createCommentVNode("", true),
				__props.isManagingCache ? (openBlock(), createBlock(ProgressIndicator_default, {
					key: 3,
					visible: __props.isManagingCache,
					text: __props.isManagingCache ? unref(getMessage)("processingCacheStatus") : "",
					showSpinner: true
				}, null, 8, ["visible", "text"])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_25$2, [createBaseVNode("div", {
					class: "secondary-button",
					disabled: __props.isManagingCache,
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cleanup-cache"))
				}, [createBaseVNode("span", _hoisted_27$2, [createVNode(unref(DatabaseIcon_default))]), createBaseVNode("span", null, toDisplayString(__props.isManagingCache ? unref(getMessage)("cleaningStatus") : unref(getMessage)("cleanExpiredCacheButton")), 1)], 8, _hoisted_26$2), createBaseVNode("div", {
					class: "danger-button",
					disabled: __props.isManagingCache,
					onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("clear-all-cache"))
				}, [createBaseVNode("span", _hoisted_29$1, [createVNode(unref(TrashIcon_default))]), createBaseVNode("span", null, toDisplayString(__props.isManagingCache ? unref(getMessage)("clearingStatus") : unref(getMessage)("clearAllCacheButton")), 1)], 8, _hoisted_28$2)])
			]);
		};
	}
}), [["__scopeId", "data-v-7ccb152f"]]);
//#endregion
//#region entrypoints/popup/components/LocalModelPage.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "local-model-page" };
var _hoisted_2$1 = { class: "page-header" };
var _hoisted_3$1 = { class: "page-content" };
var _hoisted_4$1 = { class: "section" };
var _hoisted_5$1 = { class: "section-title" };
var _hoisted_6$1 = { class: "semantic-engine-card" };
var _hoisted_7$1 = { class: "semantic-engine-status" };
var _hoisted_8$1 = { class: "status-info" };
var _hoisted_9$1 = { class: "status-text" };
var _hoisted_10$1 = {
	key: 0,
	class: "status-timestamp"
};
var _hoisted_11$1 = ["disabled"];
var _hoisted_12$1 = { class: "section" };
var _hoisted_13$1 = { class: "section-title" };
var _hoisted_14$1 = {
	key: 1,
	class: "error-card"
};
var _hoisted_15$1 = { class: "error-content" };
var _hoisted_16$1 = { class: "error-details" };
var _hoisted_17$1 = { class: "error-title" };
var _hoisted_18$1 = { class: "error-message" };
var _hoisted_19$1 = { class: "error-suggestion" };
var _hoisted_20$1 = ["disabled"];
var _hoisted_21$1 = { class: "model-list" };
var _hoisted_22$1 = ["onClick"];
var _hoisted_23$1 = { class: "model-header" };
var _hoisted_24$1 = { class: "model-info" };
var _hoisted_25$1 = { class: "model-description" };
var _hoisted_26$1 = {
	key: 0,
	class: "check-icon"
};
var _hoisted_27$1 = { class: "model-tags" };
var _hoisted_28$1 = { class: "model-tag performance" };
var _hoisted_29 = { class: "model-tag size" };
var _hoisted_30 = { class: "model-tag dimension" };
var _hoisted_31 = { class: "section" };
var _hoisted_32 = { class: "section-title" };
var _hoisted_33 = { class: "stats-grid" };
var _hoisted_34 = { class: "stats-card" };
var _hoisted_35 = { class: "stats-header" };
var _hoisted_36 = { class: "stats-label" };
var _hoisted_37 = { class: "stats-icon violet" };
var _hoisted_38 = { class: "stats-value" };
var _hoisted_39 = { class: "stats-card" };
var _hoisted_40 = { class: "stats-header" };
var _hoisted_41 = { class: "stats-label" };
var _hoisted_42 = { class: "stats-icon teal" };
var _hoisted_43 = { class: "stats-value" };
var _hoisted_44 = { class: "stats-card" };
var _hoisted_45 = { class: "stats-header" };
var _hoisted_46 = { class: "stats-label" };
var _hoisted_47 = { class: "stats-icon blue" };
var _hoisted_48 = { class: "stats-value" };
var _hoisted_49 = { class: "stats-card" };
var _hoisted_50 = { class: "stats-header" };
var _hoisted_51 = { class: "stats-label" };
var _hoisted_52 = { class: "stats-icon green" };
var _hoisted_53 = { class: "stats-value" };
var _hoisted_54 = ["disabled"];
//#endregion
//#region entrypoints/popup/components/LocalModelPage.vue
var LocalModelPage_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "LocalModelPage",
	props: {
		semanticEngineStatus: {},
		isSemanticEngineInitializing: { type: Boolean },
		semanticEngineInitProgress: {},
		semanticEngineLastUpdated: {},
		availableModels: {},
		currentModel: {},
		isModelSwitching: { type: Boolean },
		isModelDownloading: { type: Boolean },
		modelDownloadProgress: {},
		modelInitializationStatus: {},
		modelErrorMessage: {},
		modelErrorType: {},
		storageStats: {},
		isClearingData: { type: Boolean },
		clearDataProgress: {},
		cacheStats: {},
		isManagingCache: { type: Boolean }
	},
	emits: [
		"back",
		"initializeSemanticEngine",
		"switchModel",
		"retryModelInitialization",
		"showClearConfirmation",
		"cleanupCache",
		"clearAllCache"
	],
	setup(__props) {
		const props = __props;
		const getSemanticEngineStatusClass = () => {
			switch (props.semanticEngineStatus) {
				case "ready": return "bg-emerald-500";
				case "initializing": return "bg-yellow-500";
				case "error": return "bg-red-500";
				default: return "bg-gray-500";
			}
		};
		const getSemanticEngineStatusText = () => {
			switch (props.semanticEngineStatus) {
				case "ready": return getMessage("semanticEngineReadyStatus");
				case "initializing": return getMessage("semanticEngineInitializingStatus");
				case "error": return getMessage("semanticEngineInitFailedStatus");
				default: return getMessage("semanticEngineNotInitStatus");
			}
		};
		const getSemanticEngineButtonText = () => {
			switch (props.semanticEngineStatus) {
				case "ready": return getMessage("reinitializeButton");
				case "initializing": return getMessage("initializingStatus");
				case "error": return getMessage("reinitializeButton");
				default: return getMessage("initSemanticEngineButton");
			}
		};
		const progressText = computed(() => {
			if (props.isModelDownloading) return getMessage("downloadingModelStatus", [props.modelDownloadProgress.toString()]);
			else if (props.isModelSwitching) return getMessage("switchingModelStatus");
			return "";
		});
		const errorTypeText = computed(() => {
			switch (props.modelErrorType) {
				case "network": return getMessage("networkErrorMessage");
				case "file": return getMessage("modelCorruptedErrorMessage");
				default: return getMessage("unknownErrorMessage");
			}
		});
		const getModelDescription = (model) => {
			switch (model.preset) {
				case "multilingual-e5-small": return getMessage("lightweightModelDescription");
				case "multilingual-e5-base": return getMessage("betterThanSmallDescription");
				default: return getMessage("multilingualModelDescription");
			}
		};
		const getPerformanceText = (performance) => {
			switch (performance) {
				case "fast": return getMessage("fastPerformance");
				case "balanced": return getMessage("balancedPerformance");
				case "accurate": return getMessage("accuratePerformance");
				default: return performance;
			}
		};
		const formatIndexSize = () => {
			var _props$storageStats;
			if (!((_props$storageStats = props.storageStats) === null || _props$storageStats === void 0 ? void 0 : _props$storageStats.indexSize)) return "0 MB";
			return `${Math.round(props.storageStats.indexSize / (1024 * 1024))} MB`;
		};
		return (_ctx, _cache) => {
			var _props$storageStats2, _props$storageStats3, _props$storageStats4;
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("button", {
				class: "back-button",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back")),
				title: "Voltar首页"
			}, [..._cache[6] || (_cache[6] = [createBaseVNode("svg", {
				viewBox: "0 0 24 24",
				width: "20",
				height: "20",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2"
			}, [createBaseVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M15 19l-7-7 7-7"
			})], -1), createBaseVNode("span", null, "Voltar", -1)])]), _cache[7] || (_cache[7] = createBaseVNode("h2", { class: "page-title" }, "Modelo local", -1))]), createBaseVNode("div", _hoisted_3$1, [
				createBaseVNode("div", _hoisted_4$1, [createBaseVNode("h3", _hoisted_5$1, toDisplayString(unref(getMessage)("semanticEngineLabel")), 1), createBaseVNode("div", _hoisted_6$1, [
					createBaseVNode("div", _hoisted_7$1, [createBaseVNode("div", _hoisted_8$1, [createBaseVNode("span", { class: normalizeClass(["status-dot", getSemanticEngineStatusClass()]) }, null, 2), createBaseVNode("span", _hoisted_9$1, toDisplayString(getSemanticEngineStatusText()), 1)]), __props.semanticEngineLastUpdated ? (openBlock(), createElementBlock("div", _hoisted_10$1, toDisplayString(unref(getMessage)("lastUpdatedLabel")) + " " + toDisplayString(new Date(__props.semanticEngineLastUpdated).toLocaleTimeString()), 1)) : createCommentVNode("", true)]),
					__props.isSemanticEngineInitializing ? (openBlock(), createBlock(ProgressIndicator_default, {
						key: 0,
						visible: __props.isSemanticEngineInitializing,
						text: __props.semanticEngineInitProgress,
						showSpinner: true
					}, null, 8, ["visible", "text"])) : createCommentVNode("", true),
					createBaseVNode("button", {
						class: "primary-action-button",
						disabled: __props.isSemanticEngineInitializing,
						onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("initializeSemanticEngine"))
					}, [createVNode(unref(BoltIcon_default)), createBaseVNode("span", null, toDisplayString(getSemanticEngineButtonText()), 1)], 8, _hoisted_11$1)
				])]),
				createBaseVNode("div", _hoisted_12$1, [
					createBaseVNode("h3", _hoisted_13$1, toDisplayString(unref(getMessage)("embeddingModelLabel")), 1),
					__props.isModelSwitching || __props.isModelDownloading ? (openBlock(), createBlock(ProgressIndicator_default, {
						key: 0,
						visible: __props.isModelSwitching || __props.isModelDownloading,
						text: progressText.value,
						showSpinner: true
					}, null, 8, ["visible", "text"])) : createCommentVNode("", true),
					__props.modelInitializationStatus === "error" ? (openBlock(), createElementBlock("div", _hoisted_14$1, [createBaseVNode("div", _hoisted_15$1, [_cache[8] || (_cache[8] = createBaseVNode("div", { class: "error-icon" }, "⚠️", -1)), createBaseVNode("div", _hoisted_16$1, [
						createBaseVNode("p", _hoisted_17$1, toDisplayString(unref(getMessage)("semanticEngineInitFailedStatus")), 1),
						createBaseVNode("p", _hoisted_18$1, toDisplayString(__props.modelErrorMessage || unref(getMessage)("semanticEngineInitFailedStatus")), 1),
						createBaseVNode("p", _hoisted_19$1, toDisplayString(errorTypeText.value), 1)
					])]), createBaseVNode("button", {
						class: "retry-button",
						onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("retryModelInitialization")),
						disabled: __props.isModelSwitching || __props.isModelDownloading
					}, [_cache[9] || (_cache[9] = createBaseVNode("span", null, "🔄", -1)), createBaseVNode("span", null, toDisplayString(unref(getMessage)("retryButton")), 1)], 8, _hoisted_20$1)])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_21$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.availableModels, (model) => {
						return openBlock(), createElementBlock("div", {
							key: model.preset,
							class: normalizeClass(["model-card", {
								selected: __props.currentModel === model.preset,
								disabled: __props.isModelSwitching || __props.isModelDownloading
							}]),
							onClick: ($event) => !__props.isModelSwitching && !__props.isModelDownloading && _ctx.$emit("switchModel", model.preset)
						}, [createBaseVNode("div", _hoisted_23$1, [createBaseVNode("div", _hoisted_24$1, [createBaseVNode("p", { class: normalizeClass(["model-name", { "selected-text": __props.currentModel === model.preset }]) }, toDisplayString(model.preset), 3), createBaseVNode("p", _hoisted_25$1, toDisplayString(getModelDescription(model)), 1)]), __props.currentModel === model.preset ? (openBlock(), createElementBlock("div", _hoisted_26$1, [createVNode(unref(CheckIcon_default), { class: "text-white" })])) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_27$1, [
							createBaseVNode("span", _hoisted_28$1, toDisplayString(getPerformanceText(model.performance)), 1),
							createBaseVNode("span", _hoisted_29, toDisplayString(model.size), 1),
							createBaseVNode("span", _hoisted_30, toDisplayString(model.dimension) + "D", 1)
						])], 10, _hoisted_22$1);
					}), 128))])
				]),
				createBaseVNode("div", _hoisted_31, [
					createBaseVNode("h3", _hoisted_32, toDisplayString(unref(getMessage)("indexDataManagementLabel")), 1),
					createBaseVNode("div", _hoisted_33, [
						createBaseVNode("div", _hoisted_34, [createBaseVNode("div", _hoisted_35, [createBaseVNode("p", _hoisted_36, toDisplayString(unref(getMessage)("indexedPagesLabel")), 1), createBaseVNode("span", _hoisted_37, [createVNode(unref(DocumentIcon_default))])]), createBaseVNode("p", _hoisted_38, toDisplayString(((_props$storageStats2 = __props.storageStats) === null || _props$storageStats2 === void 0 ? void 0 : _props$storageStats2.indexedPages) || 0), 1)]),
						createBaseVNode("div", _hoisted_39, [createBaseVNode("div", _hoisted_40, [createBaseVNode("p", _hoisted_41, toDisplayString(unref(getMessage)("indexSizeLabel")), 1), createBaseVNode("span", _hoisted_42, [createVNode(unref(DatabaseIcon_default))])]), createBaseVNode("p", _hoisted_43, toDisplayString(formatIndexSize()), 1)]),
						createBaseVNode("div", _hoisted_44, [createBaseVNode("div", _hoisted_45, [createBaseVNode("p", _hoisted_46, toDisplayString(unref(getMessage)("activeTabsLabel")), 1), createBaseVNode("span", _hoisted_47, [createVNode(unref(TabIcon_default))])]), createBaseVNode("p", _hoisted_48, toDisplayString(((_props$storageStats3 = __props.storageStats) === null || _props$storageStats3 === void 0 ? void 0 : _props$storageStats3.totalTabs) || 0), 1)]),
						createBaseVNode("div", _hoisted_49, [createBaseVNode("div", _hoisted_50, [createBaseVNode("p", _hoisted_51, toDisplayString(unref(getMessage)("vectorDocumentsLabel")), 1), createBaseVNode("span", _hoisted_52, [createVNode(unref(VectorIcon_default))])]), createBaseVNode("p", _hoisted_53, toDisplayString(((_props$storageStats4 = __props.storageStats) === null || _props$storageStats4 === void 0 ? void 0 : _props$storageStats4.totalDocuments) || 0), 1)])
					]),
					__props.isClearingData && __props.clearDataProgress ? (openBlock(), createBlock(ProgressIndicator_default, {
						key: 0,
						visible: __props.isClearingData,
						text: __props.clearDataProgress,
						showSpinner: true
					}, null, 8, ["visible", "text"])) : createCommentVNode("", true),
					createBaseVNode("button", {
						class: "danger-action-button",
						disabled: __props.isClearingData,
						onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("showClearConfirmation"))
					}, [createVNode(unref(TrashIcon_default)), createBaseVNode("span", null, toDisplayString(__props.isClearingData ? unref(getMessage)("clearingStatus") : unref(getMessage)("clearAllDataButton")), 1)], 8, _hoisted_54)
				]),
				createVNode(ModelCacheManagement_default, {
					"cache-stats": __props.cacheStats,
					"is-managing-cache": __props.isManagingCache,
					onCleanupCache: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("cleanupCache")),
					onClearAllCache: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("clearAllCache"))
				}, null, 8, ["cache-stats", "is-managing-cache"])
			])]);
		};
	}
}), [["__scopeId", "data-v-836de859"]]);
//#endregion
//#region entrypoints/popup/App.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-agent-theme"];
var _hoisted_2 = { class: "home-view" };
var _hoisted_3 = { class: "content" };
var _hoisted_4 = { class: "section" };
var _hoisted_5 = { class: "section-title" };
var _hoisted_6 = { class: "config-card" };
var _hoisted_7 = { class: "status-section" };
var _hoisted_8 = { class: "status-header" };
var _hoisted_9 = { class: "status-label" };
var _hoisted_10 = ["title"];
var _hoisted_11 = { class: "status-info" };
var _hoisted_12 = { class: "status-text" };
var _hoisted_13 = {
	key: 0,
	class: "status-timestamp"
};
var _hoisted_14 = {
	key: 0,
	class: "mcp-config-section"
};
var _hoisted_15 = { class: "mcp-config-header" };
var _hoisted_16 = { class: "mcp-config-label" };
var _hoisted_17 = { class: "mcp-config-content" };
var _hoisted_18 = { class: "mcp-config-json" };
var _hoisted_19 = { class: "port-section" };
var _hoisted_20 = {
	for: "port",
	class: "port-label"
};
var _hoisted_21 = ["value"];
var _hoisted_22 = ["disabled"];
var _hoisted_23 = { class: "section" };
var _hoisted_24 = { class: "rr-icon-buttons" };
var _hoisted_25 = { class: "section" };
var _hoisted_26 = { class: "entry-card" };
var _hoisted_27 = { class: "entry-icon workflow" };
var _hoisted_28 = {
	key: 0,
	class: "coming-soon-toast"
};
//#endregion
//#region entrypoints/popup/App.vue
var App_default = /* @__PURE__ */ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "App",
	setup(__props) {
		const { theme: agentTheme, initTheme } = useAgentTheme();
		const currentView = ref("home");
		const comingSoonToast = ref({
			show: false,
			feature: ""
		});
		function showComingSoonToast(feature) {
			comingSoonToast.value = {
				show: true,
				feature
			};
			setTimeout(() => {
				comingSoonToast.value = {
					show: false,
					feature: ""
				};
			}, 2e3);
		}
		ref(false);
		const rrFlows = ref([]);
		const rrOnlyBound = ref(false);
		const rrSearch = ref("");
		const currentTabUrl = ref("");
		computed(() => {
			const base = rrOnlyBound.value ? rrFlows.value.filter(isFlowBoundToCurrent) : rrFlows.value;
			const q = rrSearch.value.trim().toLowerCase();
			if (!q) return base;
			return base.filter((f) => {
				var _f$meta, _f$meta2;
				const name = String(f.name || "").toLowerCase();
				const domain = String((f === null || f === void 0 || (_f$meta = f.meta) === null || _f$meta === void 0 ? void 0 : _f$meta.domain) || "").toLowerCase();
				const tags = ((f === null || f === void 0 || (_f$meta2 = f.meta) === null || _f$meta2 === void 0 ? void 0 : _f$meta2.tags) || []).join(",").toLowerCase();
				return name.includes(q) || domain.includes(q) || tags.includes(q);
			});
		});
		const loadFlows = function() {
			var _ref = _asyncToGenerator(function* () {
				try {
					const res = yield chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.RR_LIST_FLOWS });
					if (res && res.success) rrFlows.value = res.flows || [];
				} catch (e) {}
			});
			return function loadFlows() {
				return _ref.apply(this, arguments);
			};
		}();
		function isFlowBoundToCurrent(flow) {
			try {
				var _flow$meta;
				const bindings = (flow === null || flow === void 0 || (_flow$meta = flow.meta) === null || _flow$meta === void 0 ? void 0 : _flow$meta.bindings) || [];
				if (!bindings.length) return false;
				if (!currentTabUrl.value) return true;
				const url = new URL(currentTabUrl.value);
				return bindings.some((b) => {
					if (b.type === "domain") return url.hostname.includes(b.value);
					if (b.type === "path") return url.pathname.startsWith(b.value);
					if (b.type === "url") return (url.href || "").startsWith(b.value);
					return false;
				});
			} catch (_unused) {
				return false;
			}
		}
		const startRecording = function() {
			var _ref2 = _asyncToGenerator(function* () {
				showComingSoonToast("Gravar e reproduzir");
			});
			return function startRecording() {
				return _ref2.apply(this, arguments);
			};
		}();
		const stopRecording = function() {
			var _ref3 = _asyncToGenerator(function* () {
				showComingSoonToast("Gravar e reproduzir");
			});
			return function stopRecording() {
				return _ref3.apply(this, arguments);
			};
		}();
		(function() {
			var _ref4 = _asyncToGenerator(function* (flowId) {
				try {
					let flow = null;
					try {
						const getRes = yield chrome.runtime.sendMessage({
							type: BACKGROUND_MESSAGE_TYPES.RR_GET_FLOW,
							flowId
						});
						if (getRes && getRes.success) flow = getRes.flow;
					} catch (_unused2) {}
					const runOptions = flow && flow.meta && flow.meta.runOptions || {};
					const res = yield chrome.runtime.sendMessage({
						type: BACKGROUND_MESSAGE_TYPES.RR_RUN_FLOW,
						flowId,
						options: _objectSpread2(_objectSpread2(_objectSpread2({}, runOptions), {}), {}, { returnLogs: true })
					});
					if (!(res && res.success)) {
						console.warn("Falha na reprodução");
						return;
					}
					try {
						const result = res.result;
						if (result && result.success === false) {
							const failed = (result.logs || []).find((l) => l.status === "failed");
							if (failed && failed.stepId) {
								if (flow) openBuilderWindow(flow.id, String(failed.stepId));
							}
						} else if (result && result.success === true) {
							const fb = (result.logs || []).find((l) => l.fallbackUsed && l.fallbackTo);
							if (fb && flow) openBuilderWindow(flow.id, String(fb.stepId || ""));
						}
					} catch (_unused3) {}
				} catch (e) {
					console.error("Falha na reprodução:", e);
				}
			});
			return function runFlow(_x) {
				return _ref4.apply(this, arguments);
			};
		})();
		const nativeConnectionStatus = ref("unknown");
		const isConnecting = ref(false);
		const nativeServerPort = ref(12306);
		const serverStatus = ref({
			isRunning: false,
			lastUpdated: Date.now()
		});
		const showMcpConfig = computed(() => {
			return nativeConnectionStatus.value === "connected" && serverStatus.value.isRunning;
		});
		const copyButtonText = ref(getMessage("copyConfigButton"));
		const mcpConfigJson = computed(() => {
			const config = { mcpServers: { "streamable-mcp-server": {
				type: "streamable-http",
				url: `http://127.0.0.1:${serverStatus.value.port || nativeServerPort.value}/mcp`
			} } };
			return JSON.stringify(config, null, 2);
		});
		const currentModel = ref(null);
		const isModelSwitching = ref(false);
		const modelSwitchProgress = ref("");
		const modelDownloadProgress = ref(0);
		const isModelDownloading = ref(false);
		const modelInitializationStatus = ref("idle");
		const modelErrorMessage = ref("");
		const modelErrorType = ref("");
		const selectedVersion = ref("quantized");
		const storageStats = ref(null);
		const isRefreshingStats = ref(false);
		const isClearingData = ref(false);
		const showClearConfirmation = ref(false);
		const clearDataProgress = ref("");
		const semanticEngineStatus = ref("idle");
		const isSemanticEngineInitializing = ref(false);
		const semanticEngineInitProgress = ref("");
		const semanticEngineLastUpdated = ref(null);
		const isManagingCache = ref(false);
		const cacheStats = ref(null);
		const availableModels = computed(() => {
			return Object.entries(PREDEFINED_MODELS).map(([key, value]) => _objectSpread2({ preset: key }, value));
		});
		const getStatusClass = () => {
			if (nativeConnectionStatus.value === "connected") if (serverStatus.value.isRunning) return "bg-emerald-500";
			else return "bg-yellow-500";
			else if (nativeConnectionStatus.value === "disconnected") return "bg-red-500";
			else return "bg-gray-500";
		};
		function openSidepanelAndClose(_x2) {
			return _openSidepanelAndClose.apply(this, arguments);
		}
		function _openSidepanelAndClose() {
			_openSidepanelAndClose = _asyncToGenerator(function* (tab) {
				try {
					var _chrome$sidePanel;
					const current = yield chrome.windows.getCurrent();
					if ((_chrome$sidePanel = chrome.sidePanel) === null || _chrome$sidePanel === void 0 ? void 0 : _chrome$sidePanel.setOptions) yield chrome.sidePanel.setOptions({
						path: `sidepanel.html?tab=${tab}`,
						enabled: true
					});
					if (chrome.sidePanel && chrome.sidePanel.open) yield chrome.sidePanel.open({ windowId: current.id });
					window.close();
				} catch (e) {
					console.warn(`Failed to open sidepanel (${tab}):`, e);
				}
			});
			return _openSidepanelAndClose.apply(this, arguments);
		}
		function openWorkflowSidepanel() {
			showComingSoonToast("Gerenciar fluxos de trabalho");
		}
		function openElementMarkerSidepanel() {
			openSidepanelAndClose("element-markers");
		}
		function openAgentSidepanel() {
			openSidepanelAndClose("agent-chat");
		}
		function toggleWebEditor() {
			return _toggleWebEditor.apply(this, arguments);
		}
		function _toggleWebEditor() {
			_toggleWebEditor = _asyncToGenerator(function* () {
				try {
					yield chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.WEB_EDITOR_TOGGLE });
				} catch (error) {
					console.warn("切换网页EditarModoFalhou:", error);
				}
			});
			return _toggleWebEditor.apply(this, arguments);
		}
		function toggleElementMarker() {
			return _toggleElementMarker.apply(this, arguments);
		}
		function _toggleElementMarker() {
			_toggleElementMarker = _asyncToGenerator(function* () {
				try {
					const [tab] = yield chrome.tabs.query({
						active: true,
						currentWindow: true
					});
					if (!(tab === null || tab === void 0 ? void 0 : tab.id)) {
						console.warn("Nenhum法获取当前tab");
						return;
					}
					yield chrome.runtime.sendMessage({
						type: BACKGROUND_MESSAGE_TYPES.ELEMENT_MARKER_START,
						tabId: tab.id
					});
				} catch (error) {
					console.warn("开启元素标注Falhou:", error);
				}
			});
			return _toggleElementMarker.apply(this, arguments);
		}
		function openWelcomePage() {
			return _openWelcomePage.apply(this, arguments);
		}
		function _openWelcomePage() {
			_openWelcomePage = _asyncToGenerator(function* () {
				try {
					yield chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
				} catch (_unused4) {}
			});
			return _openWelcomePage.apply(this, arguments);
		}
		function openTroubleshooting() {
			return _openTroubleshooting.apply(this, arguments);
		}
		function _openTroubleshooting() {
			_openTroubleshooting = _asyncToGenerator(function* () {
				try {
					yield chrome.tabs.create({ url: LINKS.TROUBLESHOOTING });
				} catch (_unused5) {}
			});
			return _openTroubleshooting.apply(this, arguments);
		}
		function openBuilderWindow(flowId, focusNodeId) {
			const url = new URL(chrome.runtime.getURL("builder.html"));
			if (flowId) url.searchParams.set("flowId", flowId);
			if (focusNodeId) url.searchParams.set("focus", focusNodeId);
			chrome.windows.create({
				url: url.toString(),
				type: "popup",
				width: 1280,
				height: 800
			});
		}
		const getStatusText = () => {
			if (nativeConnectionStatus.value === "connected") if (serverStatus.value.isRunning) return getMessage("serviceRunningStatus", [(serverStatus.value.port || "Unknown").toString()]);
			else return getMessage("connectedServiceNotStartedStatus");
			else if (nativeConnectionStatus.value === "disconnected") return getMessage("serviceNotConnectedStatus");
			else return getMessage("detectingStatus");
		};
		const loadCacheStats = function() {
			var _ref5 = _asyncToGenerator(function* () {
				try {
					cacheStats.value = yield getCacheStats();
				} catch (error) {
					console.error("Failed to get cache stats:", error);
					cacheStats.value = null;
				}
			});
			return function loadCacheStats() {
				return _ref5.apply(this, arguments);
			};
		}();
		const cleanupCache = function() {
			var _ref6 = _asyncToGenerator(function* () {
				if (isManagingCache.value) return;
				isManagingCache.value = true;
				try {
					yield cleanupModelCache();
					yield loadCacheStats();
				} catch (error) {
					console.error("Failed to cleanup cache:", error);
				} finally {
					isManagingCache.value = false;
				}
			});
			return function cleanupCache() {
				return _ref6.apply(this, arguments);
			};
		}();
		const clearAllCache = function() {
			var _ref7 = _asyncToGenerator(function* () {
				if (isManagingCache.value) return;
				isManagingCache.value = true;
				try {
					yield clearModelCache();
					yield loadCacheStats();
				} catch (error) {
					console.error("Failed to clear cache:", error);
				} finally {
					isManagingCache.value = false;
				}
			});
			return function clearAllCache() {
				return _ref7.apply(this, arguments);
			};
		}();
		const saveSemanticEngineState = function() {
			var _ref8 = _asyncToGenerator(function* () {
				try {
					const semanticEngineState = {
						status: semanticEngineStatus.value,
						lastUpdated: semanticEngineLastUpdated.value
					};
					yield chrome.storage.local.set({ semanticEngineState });
				} catch (error) {
					console.error("Salvar语义引擎EstadoFalhou:", error);
				}
			});
			return function saveSemanticEngineState() {
				return _ref8.apply(this, arguments);
			};
		}();
		const initializeSemanticEngine = function() {
			var _ref9 = _asyncToGenerator(function* () {
				if (isSemanticEngineInitializing.value) return;
				const isReinitialization = semanticEngineStatus.value === "ready";
				console.log(`🚀 User triggered semantic engine ${isReinitialization ? "reinitialization" : "initialization"}`);
				isSemanticEngineInitializing.value = true;
				semanticEngineStatus.value = "initializing";
				semanticEngineInitProgress.value = isReinitialization ? getMessage("semanticEngineInitializingStatus") : getMessage("semanticEngineInitializingStatus");
				semanticEngineLastUpdated.value = Date.now();
				yield saveSemanticEngineState();
				try {
					chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.INITIALIZE_SEMANTIC_ENGINE }).catch((error) => {
						console.error("❌ Error sending semantic engine initialization request:", error);
					});
					startSemanticEngineStatusPolling();
					semanticEngineInitProgress.value = isReinitialization ? getMessage("processingStatus") : getMessage("processingStatus");
				} catch (error) {
					console.error("❌ Failed to send initialization request:", error);
					semanticEngineStatus.value = "error";
					semanticEngineInitProgress.value = `Failed to send initialization request: ${(error === null || error === void 0 ? void 0 : error.message) || "Unknown error"}`;
					yield saveSemanticEngineState();
					setTimeout(() => {
						semanticEngineInitProgress.value = "";
					}, 5e3);
					isSemanticEngineInitializing.value = false;
					semanticEngineLastUpdated.value = Date.now();
					yield saveSemanticEngineState();
				}
			});
			return function initializeSemanticEngine() {
				return _ref9.apply(this, arguments);
			};
		}();
		const checkSemanticEngineStatus = function() {
			var _ref10 = _asyncToGenerator(function* () {
				try {
					const response = yield chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.GET_MODEL_STATUS });
					if (response && response.success && response.status) {
						const status = response.status;
						if (status.initializationStatus === "ready") {
							semanticEngineStatus.value = "ready";
							semanticEngineLastUpdated.value = Date.now();
							isSemanticEngineInitializing.value = false;
							semanticEngineInitProgress.value = getMessage("semanticEngineReadyStatus");
							yield saveSemanticEngineState();
							stopSemanticEngineStatusPolling();
							setTimeout(() => {
								semanticEngineInitProgress.value = "";
							}, 2e3);
						} else if (status.initializationStatus === "downloading" || status.initializationStatus === "initializing") {
							semanticEngineStatus.value = "initializing";
							isSemanticEngineInitializing.value = true;
							semanticEngineInitProgress.value = getMessage("semanticEngineInitializingStatus");
							semanticEngineLastUpdated.value = Date.now();
							yield saveSemanticEngineState();
						} else if (status.initializationStatus === "error") {
							semanticEngineStatus.value = "error";
							semanticEngineLastUpdated.value = Date.now();
							isSemanticEngineInitializing.value = false;
							semanticEngineInitProgress.value = getMessage("semanticEngineInitFailedStatus");
							yield saveSemanticEngineState();
							stopSemanticEngineStatusPolling();
							setTimeout(() => {
								semanticEngineInitProgress.value = "";
							}, 5e3);
						} else {
							semanticEngineStatus.value = "idle";
							isSemanticEngineInitializing.value = false;
							yield saveSemanticEngineState();
						}
					} else {
						semanticEngineStatus.value = "idle";
						isSemanticEngineInitializing.value = false;
						yield saveSemanticEngineState();
					}
				} catch (error) {
					console.error("Popup: Failed to check semantic engine status:", error);
					semanticEngineStatus.value = "idle";
					isSemanticEngineInitializing.value = false;
					yield saveSemanticEngineState();
				}
			});
			return function checkSemanticEngineStatus() {
				return _ref10.apply(this, arguments);
			};
		}();
		const retryModelInitialization = function() {
			var _ref11 = _asyncToGenerator(function* () {
				if (!currentModel.value) return;
				console.log("🔄 Retrying model initialization...");
				modelErrorMessage.value = "";
				modelErrorType.value = "";
				modelInitializationStatus.value = "downloading";
				modelDownloadProgress.value = 0;
				isModelDownloading.value = true;
				yield switchModel(currentModel.value);
			});
			return function retryModelInitialization() {
				return _ref11.apply(this, arguments);
			};
		}();
		const updatePort = function() {
			var _ref12 = _asyncToGenerator(function* (event) {
				const target = event.target;
				const newPort = Number(target.value);
				nativeServerPort.value = newPort;
				yield savePortPreference(newPort);
			});
			return function updatePort(_x3) {
				return _ref12.apply(this, arguments);
			};
		}();
		const checkNativeConnection = function() {
			var _ref13 = _asyncToGenerator(function* () {
				try {
					const response = yield chrome.runtime.sendMessage({ type: "ping_native" });
					nativeConnectionStatus.value = (response === null || response === void 0 ? void 0 : response.connected) ? "connected" : "disconnected";
				} catch (error) {
					console.error("检测 Native ConectarEstadoFalhou:", error);
					nativeConnectionStatus.value = "disconnected";
				}
			});
			return function checkNativeConnection() {
				return _ref13.apply(this, arguments);
			};
		}();
		const checkServerStatus = function() {
			var _ref14 = _asyncToGenerator(function* () {
				try {
					const response = yield chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.GET_SERVER_STATUS });
					if ((response === null || response === void 0 ? void 0 : response.success) && response.serverStatus) serverStatus.value = response.serverStatus;
					if ((response === null || response === void 0 ? void 0 : response.connected) !== void 0) nativeConnectionStatus.value = response.connected ? "connected" : "disconnected";
				} catch (error) {
					console.error("检测Serviço器EstadoFalhou:", error);
				}
			});
			return function checkServerStatus() {
				return _ref14.apply(this, arguments);
			};
		}();
		const refreshServerStatus = function() {
			var _ref15 = _asyncToGenerator(function* () {
				try {
					const response = yield chrome.runtime.sendMessage({ type: BACKGROUND_MESSAGE_TYPES.REFRESH_SERVER_STATUS });
					if ((response === null || response === void 0 ? void 0 : response.success) && response.serverStatus) serverStatus.value = response.serverStatus;
					if ((response === null || response === void 0 ? void 0 : response.connected) !== void 0) nativeConnectionStatus.value = response.connected ? "connected" : "disconnected";
				} catch (error) {
					console.error("AtualizarServiço器EstadoFalhou:", error);
				}
			});
			return function refreshServerStatus() {
				return _ref15.apply(this, arguments);
			};
		}();
		const copyMcpConfig = function() {
			var _ref16 = _asyncToGenerator(function* () {
				try {
					yield navigator.clipboard.writeText(mcpConfigJson.value);
					copyButtonText.value = "✅" + getMessage("configCopiedNotification");
					setTimeout(() => {
						copyButtonText.value = getMessage("copyConfigButton");
					}, 2e3);
				} catch (error) {
					console.error("Copiar configuraçãoFalhou:", error);
					copyButtonText.value = "❌" + getMessage("networkErrorMessage");
					setTimeout(() => {
						copyButtonText.value = getMessage("copyConfigButton");
					}, 2e3);
				}
			});
			return function copyMcpConfig() {
				return _ref16.apply(this, arguments);
			};
		}();
		const testNativeConnection = function() {
			var _ref17 = _asyncToGenerator(function* () {
				if (isConnecting.value) return;
				isConnecting.value = true;
				try {
					if (nativeConnectionStatus.value === "connected") {
						yield chrome.runtime.sendMessage({ type: "disconnect_native" });
						nativeConnectionStatus.value = "disconnected";
					} else {
						console.log(`尝试Conectar到Porta: ${nativeServerPort.value}`);
						const response = yield chrome.runtime.sendMessage({
							type: "connectNative",
							port: nativeServerPort.value
						});
						if (response && response.success) {
							nativeConnectionStatus.value = "connected";
							console.log("ConectarSucesso:", response);
							yield savePortPreference(nativeServerPort.value);
						} else {
							nativeConnectionStatus.value = "disconnected";
							console.error("ConectarFalhou:", response);
						}
					}
				} catch (error) {
					console.error("测试ConectarFalhou:", error);
					nativeConnectionStatus.value = "disconnected";
				} finally {
					isConnecting.value = false;
				}
			});
			return function testNativeConnection() {
				return _ref17.apply(this, arguments);
			};
		}();
		const loadModelPreference = function() {
			var _ref18 = _asyncToGenerator(function* () {
				try {
					const result = yield chrome.storage.local.get([
						"selectedModel",
						"selectedVersion",
						"modelState",
						"semanticEngineState"
					]);
					if (result.selectedModel) {
						const storedModel = result.selectedModel;
						console.log("📋 Stored model from storage:", storedModel);
						if (PREDEFINED_MODELS[storedModel]) {
							currentModel.value = storedModel;
							console.log(`✅ Loaded valid model: ${currentModel.value}`);
						} else {
							console.warn(`⚠️ Stored model "${storedModel}" not found in PREDEFINED_MODELS, using default`);
							currentModel.value = "multilingual-e5-small";
							yield saveModelPreference(currentModel.value);
						}
					} else {
						console.log("⚠️ No model found in storage, using default");
						currentModel.value = "multilingual-e5-small";
						yield saveModelPreference(currentModel.value);
					}
					selectedVersion.value = "quantized";
					console.log("✅ Using quantized version (fixed)");
					yield saveVersionPreference("quantized");
					if (result.modelState) {
						const modelState = result.modelState;
						if (modelState.status === "ready") {
							modelInitializationStatus.value = "ready";
							modelDownloadProgress.value = modelState.downloadProgress || 100;
							isModelDownloading.value = false;
						} else {
							modelInitializationStatus.value = "idle";
							modelDownloadProgress.value = 0;
							isModelDownloading.value = false;
							yield saveModelState();
						}
					} else {
						modelInitializationStatus.value = "idle";
						modelDownloadProgress.value = 0;
						isModelDownloading.value = false;
					}
					if (result.semanticEngineState) {
						const semanticState = result.semanticEngineState;
						if (semanticState.status === "ready") {
							semanticEngineStatus.value = "ready";
							semanticEngineLastUpdated.value = semanticState.lastUpdated || Date.now();
						} else if (semanticState.status === "error") {
							semanticEngineStatus.value = "error";
							semanticEngineLastUpdated.value = semanticState.lastUpdated || Date.now();
						} else semanticEngineStatus.value = "idle";
					} else semanticEngineStatus.value = "idle";
				} catch (error) {
					console.error("❌ 加载模型偏好Falhou:", error);
				}
			});
			return function loadModelPreference() {
				return _ref18.apply(this, arguments);
			};
		}();
		const saveModelPreference = function() {
			var _ref19 = _asyncToGenerator(function* (model) {
				try {
					yield chrome.storage.local.set({ selectedModel: model });
				} catch (error) {
					console.error("Salvar模型偏好Falhou:", error);
				}
			});
			return function saveModelPreference(_x4) {
				return _ref19.apply(this, arguments);
			};
		}();
		const saveVersionPreference = function() {
			var _ref20 = _asyncToGenerator(function* (version) {
				try {
					yield chrome.storage.local.set({ selectedVersion: version });
				} catch (error) {
					console.error("Salvar版本偏好Falhou:", error);
				}
			});
			return function saveVersionPreference(_x5) {
				return _ref20.apply(this, arguments);
			};
		}();
		const savePortPreference = function() {
			var _ref21 = _asyncToGenerator(function* (port) {
				try {
					yield chrome.storage.local.set({ nativeServerPort: port });
					console.log(`Porta偏好已Salvar: ${port}`);
				} catch (error) {
					console.error("SalvarPorta偏好Falhou:", error);
				}
			});
			return function savePortPreference(_x6) {
				return _ref21.apply(this, arguments);
			};
		}();
		const loadPortPreference = function() {
			var _ref22 = _asyncToGenerator(function* () {
				try {
					const result = yield chrome.storage.local.get(["nativeServerPort"]);
					if (result.nativeServerPort) {
						nativeServerPort.value = result.nativeServerPort;
						console.log(`Porta偏好已加载: ${result.nativeServerPort}`);
					}
				} catch (error) {
					console.error("加载Porta偏好Falhou:", error);
				}
			});
			return function loadPortPreference() {
				return _ref22.apply(this, arguments);
			};
		}();
		const saveModelState = function() {
			var _ref23 = _asyncToGenerator(function* () {
				try {
					const modelState = {
						status: modelInitializationStatus.value,
						downloadProgress: modelDownloadProgress.value,
						isDownloading: isModelDownloading.value,
						lastUpdated: Date.now()
					};
					yield chrome.storage.local.set({ modelState });
				} catch (error) {
					console.error("Salvar模型EstadoFalhou:", error);
				}
			});
			return function saveModelState() {
				return _ref23.apply(this, arguments);
			};
		}();
		let statusMonitoringInterval = null;
		let semanticEngineStatusPollingInterval = null;
		const startModelStatusMonitoring = () => {
			if (statusMonitoringInterval) clearInterval(statusMonitoringInterval);
			statusMonitoringInterval = setInterval(_asyncToGenerator(function* () {
				try {
					const response = yield chrome.runtime.sendMessage({ type: "get_model_status" });
					if (response && response.success) {
						const status = response.status;
						modelInitializationStatus.value = status.initializationStatus || "idle";
						modelDownloadProgress.value = status.downloadProgress || 0;
						isModelDownloading.value = status.isDownloading || false;
						if (status.initializationStatus === "error") {
							modelErrorMessage.value = status.errorMessage || getMessage("modelFailedStatus");
							modelErrorType.value = status.errorType || "unknown";
						} else {
							modelErrorMessage.value = "";
							modelErrorType.value = "";
						}
						yield saveModelState();
						if (status.initializationStatus === "ready" || status.initializationStatus === "error") stopModelStatusMonitoring();
					}
				} catch (error) {
					console.error("获取模型EstadoFalhou:", error);
				}
			}), 1e3);
		};
		const stopModelStatusMonitoring = () => {
			if (statusMonitoringInterval) {
				clearInterval(statusMonitoringInterval);
				statusMonitoringInterval = null;
			}
		};
		const startSemanticEngineStatusPolling = () => {
			if (semanticEngineStatusPollingInterval) clearInterval(semanticEngineStatusPollingInterval);
			semanticEngineStatusPollingInterval = setInterval(_asyncToGenerator(function* () {
				try {
					yield checkSemanticEngineStatus();
				} catch (error) {
					console.error("Semantic engine status polling failed:", error);
				}
			}), 2e3);
		};
		const stopSemanticEngineStatusPolling = () => {
			if (semanticEngineStatusPollingInterval) {
				clearInterval(semanticEngineStatusPollingInterval);
				semanticEngineStatusPollingInterval = null;
			}
		};
		const refreshStorageStats = function() {
			var _ref24 = _asyncToGenerator(function* () {
				if (isRefreshingStats.value) return;
				isRefreshingStats.value = true;
				try {
					console.log("🔄 Refreshing storage statistics...");
					const response = yield chrome.runtime.sendMessage({ type: "get_storage_stats" });
					if (response && response.success) {
						storageStats.value = {
							indexedPages: response.stats.indexedPages || 0,
							totalDocuments: response.stats.totalDocuments || 0,
							totalTabs: response.stats.totalTabs || 0,
							indexSize: response.stats.indexSize || 0,
							isInitialized: response.stats.isInitialized || false
						};
						console.log("✅ Storage stats refreshed:", storageStats.value);
					} else {
						console.error("❌ Failed to get storage stats:", response === null || response === void 0 ? void 0 : response.error);
						storageStats.value = {
							indexedPages: 0,
							totalDocuments: 0,
							totalTabs: 0,
							indexSize: 0,
							isInitialized: false
						};
					}
				} catch (error) {
					console.error("❌ Error refreshing storage stats:", error);
					storageStats.value = {
						indexedPages: 0,
						totalDocuments: 0,
						totalTabs: 0,
						indexSize: 0,
						isInitialized: false
					};
				} finally {
					isRefreshingStats.value = false;
				}
			});
			return function refreshStorageStats() {
				return _ref24.apply(this, arguments);
			};
		}();
		const hideClearDataConfirmation = () => {
			showClearConfirmation.value = false;
		};
		const confirmClearAllData = function() {
			var _ref25 = _asyncToGenerator(function* () {
				if (isClearingData.value) return;
				isClearingData.value = true;
				clearDataProgress.value = getMessage("clearingStatus");
				try {
					console.log("🗑️ Starting to clear all data...");
					const response = yield chrome.runtime.sendMessage({ type: "clear_all_data" });
					if (response && response.success) {
						clearDataProgress.value = getMessage("dataClearedNotification");
						console.log("✅ All data cleared successfully");
						yield refreshStorageStats();
						setTimeout(() => {
							clearDataProgress.value = "";
							hideClearDataConfirmation();
						}, 2e3);
					} else throw new Error((response === null || response === void 0 ? void 0 : response.error) || "Failed to clear data");
				} catch (error) {
					console.error("❌ Failed to clear all data:", error);
					clearDataProgress.value = `Failed to clear data: ${(error === null || error === void 0 ? void 0 : error.message) || "Unknown error"}`;
					setTimeout(() => {
						clearDataProgress.value = "";
					}, 5e3);
				} finally {
					isClearingData.value = false;
				}
			});
			return function confirmClearAllData() {
				return _ref25.apply(this, arguments);
			};
		}();
		const switchModel = function() {
			var _ref26 = _asyncToGenerator(function* (newModel) {
				console.log(`🔄 switchModel called with newModel: ${newModel}`);
				if (isModelSwitching.value) {
					console.log("⏸️ Model switch already in progress, skipping");
					return;
				}
				const isSameModel = newModel === currentModel.value;
				const currentModelInfo = currentModel.value ? getModelInfo(currentModel.value) : getModelInfo("multilingual-e5-small");
				const newModelInfo = getModelInfo(newModel);
				const isDifferentDimension = currentModelInfo.dimension !== newModelInfo.dimension;
				console.log(`📊 Switch analysis:`);
				console.log(`   - Same model: ${isSameModel} (${currentModel.value} -> ${newModel})`);
				console.log(`   - Current dimension: ${currentModelInfo.dimension}, New dimension: ${newModelInfo.dimension}`);
				console.log(`   - Different dimension: ${isDifferentDimension}`);
				if (isSameModel && !isDifferentDimension) {
					console.log("✅ Same model and dimension - no need to switch");
					return;
				}
				const switchReasons = [];
				if (!isSameModel) switchReasons.push("different model");
				if (isDifferentDimension) switchReasons.push("different dimension");
				console.log(`🚀 Switching model due to: ${switchReasons.join(", ")}`);
				console.log(`📋 Model: ${currentModel.value} (${currentModelInfo.dimension}D) -> ${newModel} (${newModelInfo.dimension}D)`);
				isModelSwitching.value = true;
				modelSwitchProgress.value = getMessage("switchingModelStatus");
				modelInitializationStatus.value = "downloading";
				modelDownloadProgress.value = 0;
				isModelDownloading.value = true;
				try {
					yield saveModelPreference(newModel);
					yield saveVersionPreference("quantized");
					yield saveModelState();
					modelSwitchProgress.value = getMessage("semanticEngineInitializingStatus");
					startModelStatusMonitoring();
					const response = yield chrome.runtime.sendMessage({
						type: "switch_semantic_model",
						modelPreset: newModel,
						modelVersion: "quantized",
						modelDimension: newModelInfo.dimension,
						previousDimension: currentModelInfo.dimension
					});
					if (response && response.success) {
						currentModel.value = newModel;
						modelSwitchProgress.value = getMessage("successNotification");
						console.log("模型切换Sucesso:", newModel, "version: quantized", "dimension:", newModelInfo.dimension);
						modelInitializationStatus.value = "ready";
						isModelDownloading.value = false;
						yield saveModelState();
						setTimeout(() => {
							modelSwitchProgress.value = "";
						}, 2e3);
					} else throw new Error((response === null || response === void 0 ? void 0 : response.error) || "Model switch failed");
				} catch (error) {
					console.error("模型切换Falhou:", error);
					modelSwitchProgress.value = `Model switch failed: ${(error === null || error === void 0 ? void 0 : error.message) || "Unknown error"}`;
					modelInitializationStatus.value = "error";
					isModelDownloading.value = false;
					const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Erro desconhecido";
					if (errorMessage.includes("network") || errorMessage.includes("fetch") || errorMessage.includes("timeout")) {
						modelErrorType.value = "network";
						modelErrorMessage.value = getMessage("networkErrorMessage");
					} else if (errorMessage.includes("corrupt") || errorMessage.includes("invalid") || errorMessage.includes("format")) {
						modelErrorType.value = "file";
						modelErrorMessage.value = getMessage("modelCorruptedErrorMessage");
					} else {
						modelErrorType.value = "unknown";
						modelErrorMessage.value = errorMessage;
					}
					yield saveModelState();
					setTimeout(() => {
						modelSwitchProgress.value = "";
					}, 8e3);
				} finally {
					isModelSwitching.value = false;
				}
			});
			return function switchModel(_x7) {
				return _ref26.apply(this, arguments);
			};
		}();
		const setupServerStatusListener = () => {
			const onMessage = (message) => {
				if (message.type === BACKGROUND_MESSAGE_TYPES.SERVER_STATUS_CHANGED && message.payload) {
					serverStatus.value = message.payload;
					console.log("Server status updated:", message.payload);
				}
				if (message.type === BACKGROUND_MESSAGE_TYPES.RR_FLOWS_CHANGED) loadFlows();
			};
			chrome.runtime.onMessage.addListener(onMessage);
			window.__rr_popup_onMessage = onMessage;
		};
		onMounted(_asyncToGenerator(function* () {
			yield initTheme();
			yield loadPortPreference();
			yield loadModelPreference();
			yield checkNativeConnection();
			yield checkServerStatus();
			yield refreshStorageStats();
			yield loadCacheStats();
			yield loadFlows();
			try {
				const [tab] = yield chrome.tabs.query({
					active: true,
					currentWindow: true
				});
				currentTabUrl.value = (tab === null || tab === void 0 ? void 0 : tab.url) || "";
			} catch (_unused6) {}
			yield checkSemanticEngineStatus();
			setupServerStatusListener();
			try {
				const onChanged = (changes, area) => {
					try {
						if (area !== "local") return;
						if (Object.prototype.hasOwnProperty.call(changes || {}, "rr_flows")) loadFlows();
					} catch (_unused7) {}
				};
				chrome.storage.onChanged.addListener(onChanged);
				window.__rr_popup_onChanged = onChanged;
			} catch (_unused8) {}
		}));
		onUnmounted(() => {
			stopModelStatusMonitoring();
			stopSemanticEngineStatusPolling();
			try {
				var _chrome;
				const msgFn = window.__rr_popup_onMessage;
				if (msgFn && ((_chrome = chrome) === null || _chrome === void 0 || (_chrome = _chrome.runtime) === null || _chrome === void 0 || (_chrome = _chrome.onMessage) === null || _chrome === void 0 ? void 0 : _chrome.removeListener)) chrome.runtime.onMessage.removeListener(msgFn);
			} catch (_unused9) {}
			try {
				var _chrome2;
				const fn = window.__rr_popup_onChanged;
				if (fn && ((_chrome2 = chrome) === null || _chrome2 === void 0 || (_chrome2 = _chrome2.storage) === null || _chrome2 === void 0 || (_chrome2 = _chrome2.onChanged) === null || _chrome2 === void 0 ? void 0 : _chrome2.removeListener)) chrome.storage.onChanged.removeListener(fn);
			} catch (_unused10) {}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "popup-container agent-theme",
				"data-agent-theme": unref(agentTheme)
			}, [
				withDirectives(createBaseVNode("div", _hoisted_2, [
					_cache[12] || (_cache[12] = createBaseVNode("div", { class: "header" }, [createBaseVNode("div", { class: "header-content" }, [createBaseVNode("h1", { class: "header-title" }, "Chrome MCP Server")])], -1)),
					createBaseVNode("div", _hoisted_3, [
						createBaseVNode("div", _hoisted_4, [createBaseVNode("h2", _hoisted_5, toDisplayString(unref(getMessage)("nativeServerConfigLabel")), 1), createBaseVNode("div", _hoisted_6, [
							createBaseVNode("div", _hoisted_7, [
								createBaseVNode("div", _hoisted_8, [createBaseVNode("p", _hoisted_9, toDisplayString(unref(getMessage)("runningStatusLabel")), 1), createBaseVNode("button", {
									class: "refresh-status-button",
									onClick: refreshServerStatus,
									title: unref(getMessage)("refreshStatusButton")
								}, [createVNode(unref(RefreshIcon_default), { className: "icon-small" })], 8, _hoisted_10)]),
								createBaseVNode("div", _hoisted_11, [createBaseVNode("span", { class: normalizeClass(["status-dot", getStatusClass()]) }, null, 2), createBaseVNode("span", _hoisted_12, toDisplayString(getStatusText()), 1)]),
								serverStatus.value.lastUpdated ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(unref(getMessage)("lastUpdatedLabel")) + " " + toDisplayString(new Date(serverStatus.value.lastUpdated).toLocaleTimeString()), 1)) : createCommentVNode("", true)
							]),
							showMcpConfig.value ? (openBlock(), createElementBlock("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [createBaseVNode("p", _hoisted_16, toDisplayString(unref(getMessage)("mcpServerConfigLabel")), 1), createBaseVNode("button", {
								class: "copy-config-button",
								onClick: copyMcpConfig
							}, toDisplayString(copyButtonText.value), 1)]), createBaseVNode("div", _hoisted_17, [createBaseVNode("pre", _hoisted_18, toDisplayString(mcpConfigJson.value), 1)])])) : createCommentVNode("", true),
							createBaseVNode("div", _hoisted_19, [createBaseVNode("label", _hoisted_20, toDisplayString(unref(getMessage)("connectionPortLabel")), 1), createBaseVNode("input", {
								type: "text",
								id: "port",
								value: nativeServerPort.value,
								onInput: updatePort,
								class: "port-input"
							}, null, 40, _hoisted_21)]),
							createBaseVNode("button", {
								class: "connect-button",
								disabled: isConnecting.value,
								onClick: testNativeConnection
							}, [createVNode(unref(BoltIcon_default)), createBaseVNode("span", null, toDisplayString(isConnecting.value ? unref(getMessage)("connectingStatus") : nativeConnectionStatus.value === "connected" ? unref(getMessage)("disconnectButton") : unref(getMessage)("connectButton")), 1)], 8, _hoisted_22)
						])]),
						createBaseVNode("div", _hoisted_23, [_cache[3] || (_cache[3] = createBaseVNode("h2", { class: "section-title" }, "Ferramentas rápidas", -1)), createBaseVNode("div", _hoisted_24, [
							createBaseVNode("button", {
								class: "rr-icon-btn rr-icon-btn-record rr-icon-btn-coming-soon has-tooltip",
								onClick: startRecording,
								"data-tooltip": "Gravação em desenvolvimento"
							}, [createVNode(unref(RecordIcon_default), { recording: false })]),
							createBaseVNode("button", {
								class: "rr-icon-btn rr-icon-btn-stop rr-icon-btn-coming-soon has-tooltip",
								onClick: stopRecording,
								"data-tooltip": "Gravação em desenvolvimento"
							}, [createVNode(unref(StopIcon_default))]),
							createBaseVNode("button", {
								class: "rr-icon-btn rr-icon-btn-edit has-tooltip",
								onClick: toggleWebEditor,
								"data-tooltip": "开启页面EditarModo"
							}, [createVNode(unref(EditIcon_default))]),
							createBaseVNode("button", {
								class: "rr-icon-btn rr-icon-btn-marker has-tooltip",
								onClick: toggleElementMarker,
								"data-tooltip": "开启元素标注"
							}, [createVNode(unref(MarkerIcon_default))])
						])]),
						createBaseVNode("div", _hoisted_25, [_cache[8] || (_cache[8] = createBaseVNode("h2", { class: "section-title" }, "Acessos", -1)), createBaseVNode("div", _hoisted_26, [
							createBaseVNode("button", {
								class: "entry-item",
								onClick: openAgentSidepanel
							}, [..._cache[4] || (_cache[4] = [createStaticVNode("<div class=\"entry-icon agent\" data-v-671ae241><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z\" data-v-671ae241></path></svg></div><div class=\"entry-content\" data-v-671ae241><span class=\"entry-title\" data-v-671ae241>Assistente inteligente</span><span class=\"entry-desc\" data-v-671ae241>AI Agent — diálogos e tarefas</span></div><svg class=\"entry-arrow\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\" data-v-671ae241></path></svg>", 3)])]),
							createBaseVNode("button", {
								class: "entry-item entry-item-coming-soon",
								onClick: openWorkflowSidepanel
							}, [createBaseVNode("div", _hoisted_27, [createVNode(unref(WorkflowIcon_default))]), _cache[5] || (_cache[5] = createStaticVNode("<div class=\"entry-content\" data-v-671ae241><span class=\"entry-title\" data-v-671ae241> Gerenciar fluxos de trabalho <span class=\"coming-soon-badge\" data-v-671ae241>Coming Soon</span></span><span class=\"entry-desc\" data-v-671ae241>Gravar e reproduzir fluxos automatizados</span></div><svg class=\"entry-arrow\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\" data-v-671ae241></path></svg>", 2))]),
							createBaseVNode("button", {
								class: "entry-item",
								onClick: openElementMarkerSidepanel
							}, [..._cache[6] || (_cache[6] = [createStaticVNode("<div class=\"entry-icon marker\" data-v-671ae241><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z\" data-v-671ae241></path></svg></div><div class=\"entry-content\" data-v-671ae241><span class=\"entry-title\" data-v-671ae241>Gerenciar marcação de elementos</span><span class=\"entry-desc\" data-v-671ae241>Gerenciar marcações da página</span></div><svg class=\"entry-arrow\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\" data-v-671ae241></path></svg>", 3)])]),
							createBaseVNode("button", {
								class: "entry-item",
								onClick: _cache[0] || (_cache[0] = ($event) => currentView.value = "local-model")
							}, [..._cache[7] || (_cache[7] = [createStaticVNode("<div class=\"entry-icon model\" data-v-671ae241><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" data-v-671ae241></path></svg></div><div class=\"entry-content\" data-v-671ae241><span class=\"entry-title\" data-v-671ae241>Modelo local</span><span class=\"entry-desc\" data-v-671ae241>Mecanismo semântico e modelos</span></div><svg class=\"entry-arrow\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-671ae241><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5l7 7-7 7\" data-v-671ae241></path></svg>", 3)])])
						])])
					]),
					createBaseVNode("div", { class: "footer" }, [createBaseVNode("div", { class: "footer-links" }, [createBaseVNode("button", {
						class: "footer-link",
						onClick: openWelcomePage,
						title: "View installation guide"
					}, [..._cache[9] || (_cache[9] = [createBaseVNode("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createBaseVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					})], -1), createTextVNode(" Guide ", -1)])]), createBaseVNode("button", {
						class: "footer-link",
						onClick: openTroubleshooting,
						title: "Troubleshooting"
					}, [..._cache[10] || (_cache[10] = [createBaseVNode("svg", {
						class: "w-4 h-4",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24"
					}, [createBaseVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					})], -1), createTextVNode(" Docs ", -1)])])]), _cache[11] || (_cache[11] = createBaseVNode("p", { class: "footer-text" }, "chrome mcp server for ai", -1))])
				], 512), [[vShow, currentView.value === "home"]]),
				withDirectives(createVNode(LocalModelPage_default, {
					"semantic-engine-status": semanticEngineStatus.value,
					"is-semantic-engine-initializing": isSemanticEngineInitializing.value,
					"semantic-engine-init-progress": semanticEngineInitProgress.value,
					"semantic-engine-last-updated": semanticEngineLastUpdated.value,
					"available-models": availableModels.value,
					"current-model": currentModel.value,
					"is-model-switching": isModelSwitching.value,
					"is-model-downloading": isModelDownloading.value,
					"model-download-progress": modelDownloadProgress.value,
					"model-initialization-status": modelInitializationStatus.value,
					"model-error-message": modelErrorMessage.value,
					"model-error-type": modelErrorType.value,
					"storage-stats": storageStats.value,
					"is-clearing-data": isClearingData.value,
					"clear-data-progress": clearDataProgress.value,
					"cache-stats": cacheStats.value,
					"is-managing-cache": isManagingCache.value,
					onBack: _cache[1] || (_cache[1] = ($event) => currentView.value = "home"),
					onInitializeSemanticEngine: initializeSemanticEngine,
					onSwitchModel: switchModel,
					onRetryModelInitialization: retryModelInitialization,
					onShowClearConfirmation: _cache[2] || (_cache[2] = ($event) => showClearConfirmation.value = true),
					onCleanupCache: cleanupCache,
					onClearAllCache: clearAllCache
				}, null, 8, [
					"semantic-engine-status",
					"is-semantic-engine-initializing",
					"semantic-engine-init-progress",
					"semantic-engine-last-updated",
					"available-models",
					"current-model",
					"is-model-switching",
					"is-model-downloading",
					"model-download-progress",
					"model-initialization-status",
					"model-error-message",
					"model-error-type",
					"storage-stats",
					"is-clearing-data",
					"clear-data-progress",
					"cache-stats",
					"is-managing-cache"
				]), [[vShow, currentView.value === "local-model"]]),
				createVNode(ConfirmDialog_default, {
					visible: showClearConfirmation.value,
					title: unref(getMessage)("confirmClearDataTitle"),
					message: unref(getMessage)("clearDataWarningMessage"),
					items: [
						unref(getMessage)("clearDataList1"),
						unref(getMessage)("clearDataList2"),
						unref(getMessage)("clearDataList3")
					],
					warning: unref(getMessage)("clearDataIrreversibleWarning"),
					icon: "⚠️",
					"confirm-text": unref(getMessage)("confirmClearButton"),
					"cancel-text": unref(getMessage)("cancelButton"),
					"confirming-text": unref(getMessage)("clearingStatus"),
					"is-confirming": isClearingData.value,
					onConfirm: confirmClearAllData,
					onCancel: hideClearDataConfirmation
				}, null, 8, [
					"visible",
					"title",
					"message",
					"items",
					"warning",
					"confirm-text",
					"cancel-text",
					"confirming-text",
					"is-confirming"
				]),
				createVNode(Transition, { name: "toast" }, {
					default: withCtx(() => [comingSoonToast.value.show ? (openBlock(), createElementBlock("div", _hoisted_28, [_cache[13] || (_cache[13] = createBaseVNode("svg", {
						class: "toast-icon",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createBaseVNode("circle", {
						cx: "12",
						cy: "12",
						r: "10"
					}), createBaseVNode("path", {
						d: "M12 6v6l4 2",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					})], -1)), createBaseVNode("span", null, toDisplayString(comingSoonToast.value.feature) + " 功能开发中，敬请期待", 1)])) : createCommentVNode("", true)]),
					_: 1
				})
			], 8, _hoisted_1);
		};
	}
}), [["__scopeId", "data-v-671ae241"]]);
//#endregion
//#region entrypoints/popup/main.ts
preloadAgentTheme().then(() => {
	chrome.runtime.sendMessage({ type: NativeMessageType.ENSURE_NATIVE }).catch(() => {});
	createApp(App_default).mount("#app");
});
//#endregion
