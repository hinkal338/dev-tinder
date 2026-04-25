Dev Tinder APIs 

## authRouter
- POST - /signup
- POST - /login
- POST - /logout


## profileRouter
- GET - /profile/view
- PATCH - /profile/update (updates info like )
- PATCH - /profile/password


## connectionRouter
- POST - /request/send/:status/:userId
- POST - /request/review/:status/:userId


## userRouter
- GET - /user/requests
- GET - /users/connections 
- GET - /users/feed

Status - interested/ ignored/ accepted/ rejected