import {Router} from 'express'
export const router = Router();
import {registerUser, loginUser, handleRefreshToken, logoutUser, getUserAuth, recoverPassword, changePassword} from '../controllers/auth'
import { authenticateToken } from '../middlewares/authenticateToken';

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/refresh-token', handleRefreshToken)
router.get('/user/logout', authenticateToken, logoutUser)
router.get('/user/get-auth', getUserAuth)
router.put('/user/recover-password', recoverPassword)
router.put('/user/change-password',authenticateToken, changePassword)


router.post('/organization/register', () => {})
router.post('/organization/login', () => {})

