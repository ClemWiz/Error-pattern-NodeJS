import Router from 'express-promise-router';
import { doSomethingWithUser, userDoSomething } from './ctrl';

const router = Router();

router.get('/user/:id', doSomethingWithUser);
router.get('/user/:id/do/:doable', userDoSomething);

export default router;