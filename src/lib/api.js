/**
 * Created by Administrator on 2017/6/29 0029.
 */
// let base = 'http://211.159.183.169:8080';

//let base = 'http://www.icmes-print.com';
let base = '';

//登录
export const requestLogin = base+'/jsmm-print/doLogin';

//修改密码
export const changePwd = base+'/jsmm-print/system/userInfo/changePwd';

//任务
export const getCompleteRate =  base+'/jsmm-print/mes/monitor/taskKanBan/completeRate'; //任务完成率

export const getTaskProductProgressInfo =  base+'/jsmm-print/mes/monitor/taskKanBan/getTaskProductProgressInfo'; //任务表格数据

/*export const getTaskAnalysisList =  base+'/jsmm-print/sceneMonitor/qualityCheck/getAnalysisList'; //任务表格跳转详情页面*/

//任务详情
export const getPaiChengTable = base+'/jsmm-print/paiChengTable'; //获取排程表

export const getDeviceListById = base+'/jsmm-print/sceneMonitor/deviceInfo/getAll';  /*根据工序id查询设备*/

//质量

export const getGoodRate =  base+'/jsmm-print/mes/monitor/qualityKanBan/goodRate'; //质量总体状况

export const getTaskQualityCheckInfo =  base+'/jsmm-print/mes/monitor/qualityKanBan/getTaskQualityCheckItemInfo'; //表格数据

export const getListByBarCode =  base+'/jsmm-print/mes/qualityTrack/getListByBarCode';//条码追踪 202qz-00111205222

export const getTaskAnalysisList =  base+'/jsmm-print/sceneMonitor/qualityCheck/getProcessQualityCheckList';
// http://www.jsmm-print.com/jsmm-print/sceneMonitor/qualityCheck/getTaskYieldInfo?taskId=jwd_bd7ebc190f5d7811e7bad21c1b0d5575aa
export const getTaskYieldInfo =  base+'/jsmm-print/sceneMonitor/qualityCheck/getTaskYieldInfo';


//库存
// export const getStockKB = base+'/jsmm-print/storage/inventory/materielInfo/stockKB'; /*获取库存数据*/
export const getStockKB = base+'/jsmm-print/sceneMonitor/MountingsManage/list'; /*获取库存数据*/

export const getMaterielInfoAll = base+'/jsmm-print/sceneMonitor/MountingsManage/getAll'; /*获取所有物料信息*/

export const getWareHouseInfoAll = base+'/jsmm-print/storage/warehouse/wareHouse/getAll';  /*获取所有仓库信息*/

export const getMaterielTrace = base+'/jsmm-print/storage/inventory/materielTrace/materielTraceByBarcode';//物料追溯

/*条件：仓库（wareHouse.id）, 库区(stockArea.id)
物料materiel.id*/
/*export const getStockKB = base+'/jsmm-print/storage/inventory/materielStatics/Applist'; /!*获取库存数据*!/*/

//报表》》流转看板
export const getSchedualUnCompleteTask = base+'/jsmm-print/mes/taskInfo/getSchedualUnCompleteTask'; //获取已排程未完成的任务

export const getFlowKanBanInfo =  base+'/jsmm-print/mes/monitor/flowKanBan/getFlowKanBanInfo';


//设备
export const getDeviceRunningRate =  base+'/jsmm-print/sceneMonitor/deviceInfo/getDeviceRunningRate';//设备开机率

export const deviceInfoList =  base+'/jsmm-print/sceneMonitor/deviceInfo/deviceInfoList';//设备信息查询页面列表接口

export const editDeviceInfo =  base+'/jsmm-print/sceneMonitor/deviceCheckInfo/edit';//设备巡检
//消息
// http://192.168.188.130/jsmm-print/system/message/com/getUserMessageTotal?userId=jwd_bd11cff90d527711e79bcc1c1b0d5575aa
export const getUserMessageTotal =  base+'/jsmm-print/system/message/com/getUserMessageTotal';

//发送消息
export const sendMessgae =  base+'/jsmm-print/system/message/send/appSendMessgae';

//http://localhost/jsmm-print/system/message/com/getUserMessageDetail?userId=jwd_bd11cff90d527711e79bcc1c1b0d5575aa&messageCategoryName=设备消息
export const getUserMessageDetail =  base+'/jsmm-print/system/message/com/getUserMessageDetail';//消息详情
/*http://www.jsmm-print.com/jsmm-print/system/message/receive/edit
    data:{"id":"jwd_bdf2fcb1cb622811e7848e1c1b0d5575aa","status":1}*/
export const editUserMessageStatus =  base+'/jsmm-print/system/message/receive/edit';//改变状态（未读》已读）


//人员
export const getTaskUserInfoAll =  base+'/jsmm-print/system/userInfo/getAll';

//设备维护
export const editDeviceOverhaul = base+'/jsmm-print/sceneMonitor/deviceOverhaul/maintenanceEdit';

//报表
//生产报表
export const getAppReportProductInfo = base+'/jsmm-print/mes/report/reportProductionStatistics/getAppReportProductInfo';

//质量报表
export const getAppReportQualityInfo = base+'/jsmm-print/mes/report/reportQualityStatistics/getAppReportQualityInfo';

//设备报表
export const getAppReportDeviceInfo = base+'/jsmm-print/smm/report/reportDeviceStatistics/getAppReportDeviceInfo';

//库存报表
export const getReportStock = base+'/jsmm-print/storage/report/reportWareHourseStatistics/getReportStock';

//不良品原因
export const badQualityList = base+'/jsmm-print/system/badCategory/getAll';

export const editBadQuality = base+'/jsmm-print/sceneMonitor/qualityCheck/edit';

export const getDeviceInfo = base+'/jsmm-print/sceneMonitor/deviceInfo/getAll';//机台号

//维保工单
export const getMaintenanceSet = base+'/jsmm-print/sceneMonitor/maintenanceSet/list';

export const getDeviceMaintenance = base+'/jsmm-print/sceneMonitor/deviceMaintenance/list';//设备维保

//维保登记
export const editMaintenanceSet = base+'/jsmm-print/sceneMonitor/deviceMaintenance/edit';

//新增不良品原因
export const addBadCategory = base+'/jsmm-print/system/badCategory/edit';



