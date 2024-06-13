import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post('/refresh', authenticate, ctrlWrapper(refreshUserSessionController));

export default router;
