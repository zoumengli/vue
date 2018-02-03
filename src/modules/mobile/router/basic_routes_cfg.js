const Index = require('../views/Index');
const Home = require('../views/Home');
const ErrorTip = require('../views/ErrorTip');

const task = require('../views/task/Index');
const personal = require('../views/personal/Index');
const device = require('../views/device/Index');
const stock = require('../views/stock/Index');
const report = require('../views/report/Index');
const quality = require('../views/quality/Index');
const scene = require('../views/scene/Index');

const maintenance = require('../views/maintenance/Index');//维保
const workOrder = require('../views/maintenance/WorkOrder');
const query = require('../views/maintenance/MaintenanceQuery');
const registration = require('../views/maintenance/MaintenanceRegistration');
const review = require('../views/maintenance/Review');
const manually = require('../views/maintenance/Manually');
const weiBaoHistory = require('../views/maintenance/WeiBaoHistory');

const message = require('../views/personal/Message');
const messageList = require('../views/personal/MessageList');
const editPwd = require('../views/personal/EditPwd');
const sendMsg = require('../views/personal/SendMsg');

const taskDetail = require('../views/task/Detail');
const taskTrace = require('../views/task/Trace');
const taskFlowBoard = require('../views/report/FlowBoard');

const qualityReview = require('../views/quality/Review');
const stockReview = require('../views/stock/Review');
const TracingMaterial = require('../views/stock/TracingMaterial');
const qualityInputQrcode = require('../views/quality/InputQrcode');
const qualityReviewList = require('../views/quality/ReviewList');
const stockReviewList = require('../views/stock/ReviewList');

const deviceSite = require('../views/device/Site');
const deviceScan = require('../views/device/Scan');
const deviceReview = require('../views/device/Review');
const deviceInputQrcode = require('../views/device/InputQrcode');
const deviceInspection  = require('../views/device/Inspection');
const deviceMaintain  = require('../views/device/Maintain');

const production = require('../views/report/Production');
const qualityReport = require('../views/report/Quality');
const deviceReport = require('../views/report/Device');
const stockReport = require('../views/report/Stock');

const router = [
        { path: '/mobile', name:'mobile', component: Index,
            children: [
                { path: 'task',name:'task',component: task},
                { path: 'device',name:'device',component: device},
                { path: 'stock',name:'stock',component: stock},
                { path: 'deviceInspection',name:'deviceInspection',component: deviceInspection},
                { path: 'report',name:'report',component: report},
                { path: 'quality',name:'quality',component: quality},
                { path: 'scene',name:'scene',component: scene},
                { path: 'personal',name:'personal',component: personal},
                { path: 'deviceMaintain',name:'deviceMaintain',component: deviceMaintain},
                { path: 'message',name:'message',component: message},
                { path: 'maintenance',name:'maintenance',component: maintenance},

                // { path: 'message',name:'message',component: message},
                { path: 'taskDetail',name:'taskDetail',component: taskDetail},
                { path: 'taskTrace/:id',name:'taskTrace',component: taskTrace},

                { path: 'qualityReview',name:'qualityReview',component: qualityReview},
                { path: 'stockReview',name:'stockReview',component: stockReview},
                { path: 'qualityReviewList',name:'qualityReviewList',component: qualityReviewList},
                { path: 'stockReviewList',name:'stockReviewList',component: stockReviewList},
                /*{ path: 'qualityInputQrcode',name:'qualityInputQrcode',component: qualityInputQrcode},*/

                { path: 'deviceSite',name:'deviceSite',component: deviceSite},
                { path: 'deviceScan',name:'deviceScan',component: deviceScan},
                { path: 'deviceInputQrcode',name:'deviceInputQrcode',component: deviceInputQrcode},
                { path: 'deviceReview',name:'deviceReview',component: deviceReview},


                { path: '*',name:'error',component: ErrorTip, meta: { scrollToTop: true }}
            ]
        },
        { path: '/qualityInputQrcode',name:'qualityInputQrcode',component: qualityInputQrcode},

        { path: '/TracingMaterial',name:'TracingMaterial',component: TracingMaterial},
        { path: '/manually',name:'manually',component: manually},
        { path: '/production',name:'production',component: production},
        { path: '/qualityReport',name:'qualityReport',component: qualityReport},
        { path: '/deviceReport',name:'deviceReport',component: deviceReport},
        { path: '/stockReport',name:'stockReport',component: stockReport},
        { path: '/taskFlowBoard',name:'taskFlowBoard',component: taskFlowBoard},
        { path: '/messageList/:type',name:'messageList',component: messageList},
        { path: '/sendMsg',name:'sendMsg',component: sendMsg},
        { path: '/editPwd',name:'editPwd',component: editPwd},

        { path: '/workOrder',name:'workOrder',component: workOrder},
        { path: '/query',name:'query',component: query},
        { path: '/registration',name:'registration',component: registration},
        { path: '/review',name:'review',component: review},
        { path: '/weiBaoHistory',name:'weiBaoHistory',component: weiBaoHistory},
    ];
export default router; 