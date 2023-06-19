import express from "express";
import { Login, updateRequest, getRequests, submitSelfAppraisel, submitAparForm, checkAPAR } from '../controllers/users.js';

const router = express.Router();

router.post('/Login', Login)
router.post('/updateRequest', updateRequest);
router.post('/submitSelfAppraisel', submitSelfAppraisel);
router.get('/getRequests', getRequests);
router.post('/submitAparForm', submitAparForm);
router.get('/checkAPAr', checkAPAR);
// router.post('/getUsers', getUsers);

export default router;