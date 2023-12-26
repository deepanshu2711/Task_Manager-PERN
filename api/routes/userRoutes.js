import  express  from "express";
import { home } from "../controller/userController.js";
import { verifyUser } from "../utils/Verify.js";
import { Alltasks } from "../controller/userController.js";
import { addTask , deleletask} from "../controller/userController.js";


const router = express.Router();

router.post('/home', home);
router.post('/tasks',Alltasks)
router.post('/addtasks',addTask)
router.delete('/deletetask' ,deleletask)

export default router;