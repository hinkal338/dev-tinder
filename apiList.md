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
- POST - /request/send/:userId
- POST - /request/ignore/:userId
- POST - /request/accept/:requestId
- POST - /request/reject/:requestId

## userRouter
- GET - /user/requests
- GET - /users/connections 
- GET - /users/feed