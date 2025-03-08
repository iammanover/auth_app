# To run the application use following command

npm run dev

# Folder Structure

1. components folder which has error component.
2. Context API folder which has all the logics for user login and logout.
3. I have also used custom hook just to show the concept.
4. There are pages folder which has Public and Private components.
5. Routes folder have three files among them main route file is Route.tsx, other tow are private and public routes which will work based on user authentication.
6. Styles folder which has defualt style files which is applicable in whole application.
7. utils folder which has common functions, enums for auth and regEx, interFace for form inputs and AuthProvider Interface and at last providers which has the logic for keep routes safe for authentication users only.

# Concept used in this application

- React functional components.
- Context API for data sharing.
- Custom Hooks.
- React router.
- Enum and Interface as I am using TypeScript.
- Extra hooks that I used is useState, useEffect and useNavigate,

# Port Details

- Frontend port :- http://localhost:5173
- Backend port :- http://localhost:3000 (
  For auth login api :- http://localhost:3000/api/auth/login,
  For auth registration api :- http://localhost:3000/api/auth/register
  )

# I have try to put comments for better understanding
