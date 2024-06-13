import { Router } from 'express';
import {
    createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkUserId } from '../middlewares/checkUserId.js';

const router = Router();

router.use(authenticate);
router.use('/:contactId', checkUserId);

router.get('/', checkUserId, ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
