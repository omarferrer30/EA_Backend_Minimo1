import express from 'express';
import controller from '../controllers/Report';

const router = express.Router();

router.post('/createreport',  controller.createReport);
router.get('/readreport/:reportId', controller.readReport);
router.get('/readall', controller.readAll);
router.put('/updatereport/:reportId',  controller.updateReport);
router.delete('/deletereport/:reportId', controller.deleteReport);

export = router;