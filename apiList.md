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
- POST - /request/review/:status/:requestId


## userRouter
- GET - /user/requests
- GET - /user/connections 
- GET - /user/feed

Status - interested/ ignored/ accepted/ rejected