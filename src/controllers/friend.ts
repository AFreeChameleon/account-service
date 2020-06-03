import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import passport from 'passport';

export const GetFriendslist = (req: Request, res: Response) => {
  const username: any = (req.user as any).username;
  User.findOne({
    username: username
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    console.log(data);
    return res.render('friend/friendlist', {
      friends: (data as any).friendList,
      pendingRequests: (data as any).friendRequests
    });
  })
}

export const GetAddFriend = (req: Request, res: Response) => {
  return res.render('friend/addfriend');
}

export const PostAddFriend = (req: Request, res: Response) => {
  const friendUsername = req.body.username
  User.findOne({
    username: friendUsername
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      })
    }
    if ((req.user as any).username === friendUsername) {
      return res.status(200).json({
        message: 'You cannot add yourself'
      })
    } else if ((data as any).friendList.indexOf((req.user as any).username) !== -1) {
      console.log((data as any).friendList.indexOf((req.user as any).username))
      return res.status(200).json({
        message: 'You already have this user as a friend'
      })
    } else {
      (data as any).friendRequests.push((req.user as any).username)
      data?.save();
      return res.status(200).json({
        message: 'If a user exists with that name, we have sent them a friend request'
      })
    }
  })
}

export const PostAcceptFriend = (req: Request, res: Response) => {
  const friendUsername = req.body.username;
  const username = (req.user as any).username;
  User.findOne({
    username: (req.user as any).username,
  }, (err, data) => {
    if (err) {
      console.log(err.message)
      return res.status(500).json({
        message: 'Database error'
      })
    };
    
    (data as any).friendRequests.pop((data as any).friendRequests.indexOf(friendUsername));
    (data as any).friendList.push(friendUsername);

    // Saving into the user's friend list
    User.findOne({
      username: friendUsername
    }, (err, data) => {
      if (err) {
        console.log(err.message)
        return res.status(500).json({
          message: 'Database error'
        })
      };
      (data as any).friendList.push(username)
      data?.save()
    })

    // Saving into the recipient's friend list
    data?.save();
    return res.status(200).json({
      message: 'Friend accepted'
    })
  })
}

export const PostRejectFriend = (req: Request, res: Response) => {
  const friendUsername = req.body.username;
  User.findOne({
    username: (req.user as any).username
  }, (err, data) => {
    if (err) {
      console.log(err.message)
      return res.status(500).json({
        message: 'Database error'
      })
    }
    (data as any).friendRequests.pop((data as any).friendRequests.indexOf(friendUsername));
    data?.save();
    return res.status(200).json({
      message: 'Friend rejected'
    })
  })
}