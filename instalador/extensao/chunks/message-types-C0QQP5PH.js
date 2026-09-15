//#region common/message-types.ts
var MessageTarget = /* @__PURE__ */ function(MessageTarget) {
	MessageTarget["Offscreen"] = "offscreen";
	MessageTarget["ContentScript"] = "content_script";
	MessageTarget["Background"] = "background";
	return MessageTarget;
}({});
var BACKGROUND_MESSAGE_TYPES = {
	SWITCH_SEMANTIC_MODEL: "switch_semantic_model",
	GET_MODEL_STATUS: "get_model_status",
	UPDATE_MODEL_STATUS: "update_model_status",
	GET_STORAGE_STATS: "get_storage_stats",
	CLEAR_ALL_DATA: "clear_all_data",
	GET_SERVER_STATUS: "get_server_status",
	REFRESH_SERVER_STATUS: "refresh_server_status",
	SERVER_STATUS_CHANGED: "server_status_changed",
	INITIALIZE_SEMANTIC_ENGINE: "initialize_semantic_engine",
	RR_START_RECORDING: "rr_start_recording",
	RR_STOP_RECORDING: "rr_stop_recording",
	RR_PAUSE_RECORDING: "rr_pause_recording",
	RR_RESUME_RECORDING: "rr_resume_recording",
	RR_GET_RECORDING_STATUS: "rr_get_recording_status",
	RR_LIST_FLOWS: "rr_list_flows",
	RR_FLOWS_CHANGED: "rr_flows_changed",
	RR_GET_FLOW: "rr_get_flow",
	RR_DELETE_FLOW: "rr_delete_flow",
	RR_PUBLISH_FLOW: "rr_publish_flow",
	RR_UNPUBLISH_FLOW: "rr_unpublish_flow",
	RR_RUN_FLOW: "rr_run_flow",
	RR_SAVE_FLOW: "rr_save_flow",
	RR_EXPORT_FLOW: "rr_export_flow",
	RR_EXPORT_ALL: "rr_export_all",
	RR_IMPORT_FLOW: "rr_import_flow",
	RR_LIST_RUNS: "rr_list_runs",
	RR_LIST_TRIGGERS: "rr_list_triggers",
	RR_SAVE_TRIGGER: "rr_save_trigger",
	RR_DELETE_TRIGGER: "rr_delete_trigger",
	RR_REFRESH_TRIGGERS: "rr_refresh_triggers",
	RR_SCHEDULE_FLOW: "rr_schedule_flow",
	RR_UNSCHEDULE_FLOW: "rr_unschedule_flow",
	RR_LIST_SCHEDULES: "rr_list_schedules",
	ELEMENT_MARKER_LIST_ALL: "element_marker_list_all",
	ELEMENT_MARKER_LIST_FOR_URL: "element_marker_list_for_url",
	ELEMENT_MARKER_SAVE: "element_marker_save",
	ELEMENT_MARKER_UPDATE: "element_marker_update",
	ELEMENT_MARKER_DELETE: "element_marker_delete",
	ELEMENT_MARKER_VALIDATE: "element_marker_validate",
	ELEMENT_MARKER_START: "element_marker_start_from_popup",
	ELEMENT_PICKER_UI_EVENT: "element_picker_ui_event",
	ELEMENT_PICKER_FRAME_EVENT: "element_picker_frame_event",
	WEB_EDITOR_TOGGLE: "web_editor_toggle",
	WEB_EDITOR_APPLY: "web_editor_apply",
	WEB_EDITOR_STATUS_QUERY: "web_editor_status_query",
	WEB_EDITOR_APPLY_BATCH: "web_editor_apply_batch",
	WEB_EDITOR_TX_CHANGED: "web_editor_tx_changed",
	WEB_EDITOR_HIGHLIGHT_ELEMENT: "web_editor_highlight_element",
	WEB_EDITOR_REVERT_ELEMENT: "web_editor_revert_element",
	WEB_EDITOR_SELECTION_CHANGED: "web_editor_selection_changed",
	WEB_EDITOR_CLEAR_SELECTION: "web_editor_clear_selection",
	WEB_EDITOR_CANCEL_EXECUTION: "web_editor_cancel_execution",
	WEB_EDITOR_PROPS_REGISTER_EARLY_INJECTION: "web_editor_props_register_early_injection",
	WEB_EDITOR_OPEN_SOURCE: "web_editor_open_source",
	QUICK_PANEL_SEND_TO_AI: "quick_panel_send_to_ai",
	QUICK_PANEL_CANCEL_AI: "quick_panel_cancel_ai",
	QUICK_PANEL_TABS_QUERY: "quick_panel_tabs_query",
	QUICK_PANEL_TAB_ACTIVATE: "quick_panel_tab_activate",
	QUICK_PANEL_TAB_CLOSE: "quick_panel_tab_close"
};
var OFFSCREEN_MESSAGE_TYPES = {
	SIMILARITY_ENGINE_INIT: "similarityEngineInit",
	SIMILARITY_ENGINE_COMPUTE: "similarityEngineCompute",
	SIMILARITY_ENGINE_BATCH_COMPUTE: "similarityEngineBatchCompute",
	SIMILARITY_ENGINE_STATUS: "similarityEngineStatus",
	GIF_ADD_FRAME: "gifAddFrame",
	GIF_FINISH: "gifFinish",
	GIF_RESET: "gifReset"
};
var SendMessageType = /* @__PURE__ */ function(SendMessageType) {
	SendMessageType["ScreenshotPreparePageForCapture"] = "preparePageForCapture";
	SendMessageType["ScreenshotGetPageDetails"] = "getPageDetails";
	SendMessageType["ScreenshotGetElementDetails"] = "getElementDetails";
	SendMessageType["ScreenshotScrollPage"] = "scrollPage";
	SendMessageType["ScreenshotResetPageAfterCapture"] = "resetPageAfterCapture";
	SendMessageType["WebFetcherGetHtmlContent"] = "getHtmlContent";
	SendMessageType["WebFetcherGetTextContent"] = "getTextContent";
	SendMessageType["ClickElement"] = "clickElement";
	SendMessageType["FillElement"] = "fillElement";
	SendMessageType["GetInteractiveElements"] = "getInteractiveElements";
	SendMessageType["NetworkSendRequest"] = "sendPureNetworkRequest";
	SendMessageType["SimulateKeyboard"] = "simulateKeyboard";
	SendMessageType["SimilarityEngineInit"] = "similarityEngineInit";
	SendMessageType["SimilarityEngineComputeBatch"] = "similarityEngineComputeBatch";
	return SendMessageType;
}({});
//#endregion
export { SendMessageType as i, MessageTarget as n, OFFSCREEN_MESSAGE_TYPES as r, BACKGROUND_MESSAGE_TYPES as t };
