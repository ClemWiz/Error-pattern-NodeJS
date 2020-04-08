import Router from 'express-promise-router';
import { doSomethingWithUser, userDoSomething, updateUser } from './ctrl';

const router = Router();

router.route('/user/:id')
    .get(doSomethingWithUser)
    .put(updateUser)
router.get('/user/:id/do/:doable', userDoSomething);

export default router;