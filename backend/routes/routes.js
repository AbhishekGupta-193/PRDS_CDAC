import express from "express";
import { Login, updateRequest, getRequests, submitSelfAppraisel, submitAparForm , submitEvalutaionForm} from '../controllers/Controllers.js';

const router = express.Router();

router.post('/Login', Login)
router.post('/updateRequest', updateRequest);
router.post('/submitSelfAppraisel', submitSelfAppraisel);
router.post('/submitEvalutaionForm', submitEvalutaionForm);
router.get('/getRequests', getRequests);
router.post('/submitAparForm', submitAparForm);

export default router;