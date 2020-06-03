import { Router } from 'express';
import * as friendController from '../controllers/friend';
import { loggedOut, loggedIn } from '../controllers/account';
import passport from 'passport';
export const router: Router = Router();

//Routes
router.get('/friendlist', loggedOut, friendController.GetFriendslist);

router.get('/add-friend', loggedOut, friendController.GetAddFriend);
router.post('/add-friend', loggedOut, friendController.PostAddFriend);

router.post('/accept-friend', loggedOut, friendController.PostAcceptFriend);
router.post('/reject-friend', loggedOut, friendController.PostRejectFriend);