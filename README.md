# Alumni Portal

The final project on production practice. The task was to develop a graduate portal with the possibility of registration and an admin panel.

- Live Site URL: [Vipuskniki587](https://vipuskniki587.ru/)

## Overview

### The challenge

**Users are able to:**

1. Register on the portal
    * If the phone number or e-mail is already in the database, then registration is rejected
    * To register, users must fill in the mandatory fields. Additionally, the user can upload their photo and crop it immediately so that it is displayed correctly in the gallery.
    * The form is locked until all the required fields are filled in
    * If some field is filled in incorrectly, an error window pops up
    * In the process of entering a place of study, a window with existing universities will pop up. If there is no suitable one in the database, the user can add their own
2. Find and filter the people you are interested in.
    * The search is available by full name, year of graduation, place of study and field of activity. Each field can be combined with a class letter search.
    *  The full name search also works by partial match.
    *  To search by place of study and field of activity, select the field of interest from the pop-up window
3. View the page of existing graduates in the database
    * Users can view only those graduates who have allowed publication on the site. All entered information is available except the phone number

**The administrator can:**

1. Confirm the correctness of the data.
    * After registering on the site, the administrator checks the validity of the data and, if necessary, corrects it. Up to this point, the registered user is displayed only in the admin panel
2. Browse and search for all existing graduates in the database, including those who have not allowed publication on the site. All the information entered is also available
3. Edit the data of any graduate
4. Remove any graduate from the database
5. Add, edit and delete educational institutions from the database

## My process

### Frontend
- [React](https://reactjs.org/) 
- [React Router](https://reactrouter.com/en/main)
- [Redux](https://redux.js.org/)
- [Redux Toolkit / RTK Query](https://redux-toolkit.js.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [React Image Crop](https://www.npmjs.com/package/react-image-crop)
- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Vite](https://vitejs.dev/)
- I also used linters (stylelint and ESLint) to improve the quality of the code.

### Backend
- [Node.js](https://nodejs.org/en) 
- [Express](https://expressjs.com/) 
- [Mongoose](https://mongoosejs.com/) 
- [MongoDB](https://www.mongodb.com/) 
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - to hash the administrator password
- [Multer](https://www.npmjs.com/package/multer) - for handling `multipart/form-data`
- [Sharp](https://sharp.pixelplumbing.com/) - to convert uploaded images to WEBP format
