import {Router} from 'express'
export const router = Router();
import { authenticateToken } from '../middlewares/authenticateToken';
import {getUsers,getUser,createUser,deleteUser,putUser, getBanned} from '../controllers/users'
import {ROLES_LIST} from '../authorization/roles'
import {verifyRoles} from '../middlewares/verifyRoles'
import { handlePaginate } from '../middlewares/paginate';

router.get('/getTest', getUsers)
router.get('/',authenticateToken,verifyRoles(ROLES_LIST.Admin), handlePaginate, getUsers)
router.get('/banned',authenticateToken,verifyRoles(ROLES_LIST.Admin), handlePaginate, getBanned)


router.get('/:id',authenticateToken, getUser)
router.post('/', createUser)
router.delete('/:id', authenticateToken, verifyRoles(ROLES_LIST.Admin), deleteUser)
router.put("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), putUser)
