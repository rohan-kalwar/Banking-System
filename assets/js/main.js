/*=============== SHOW/HIDE PASSWORD - LOGIN ===============*/
/* 
   This function toggles the visibility of the login password field.
   When the user clicks the eye icon, the password input switches between 
   'password' and 'text' type, and the eye icon toggles between visible/hidden.
*/
const passwordAccess = (loginPass, loginEye) => {
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye);
 
   iconEye.addEventListener('click', () => {
     // Toggle the input type between 'password' and 'text'
     input.type = input.type === 'password' ? 'text' : 'password';
 
     // Toggle the icon class between "eye open" and "eye off"
     iconEye.classList.toggle('ri-eye-fill');
     iconEye.classList.toggle('ri-eye-off-fill');
   });
 };
 
 // Call the function for the login form
 passwordAccess('password', 'loginPassword');
 
 
 /*=============== SHOW/HIDE PASSWORD - REGISTER ===============*/
 /*
    Similar to login password toggle, this handles the visibility toggle 
    for both 'create password' and 'confirm password' fields in registration form.
 */
 const passwordRegister = (loginPass, loginEye) => {
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye);
 
   iconEye.addEventListener('click', () => {
     // Toggle visibility
     input.type = input.type === 'password' ? 'text' : 'password';
 
     // Toggle icon state
     iconEye.classList.toggle('ri-eye-fill');
     iconEye.classList.toggle('ri-eye-off-fill');
   });
 };
 
 // Call the function for register password and confirm password fields
 passwordRegister('passwordCreate', 'loginPasswordCreate');
 passwordRegister('passwordConfirm', 'loginPasswordConfirm');
 
 
 /*=============== TOGGLE BETWEEN LOGIN AND REGISTER FORMS ===============*/
 /*
    This section manages switching between the login form and the registration form.
    It works by toggling a CSS class on a container that hides/shows the relevant section.
 */
 const loginAcessRegister = document.getElementById('loginAccessRegister'),  // Wrapper for both forms
       buttonRegister = document.getElementById('loginButtonRegister'),     // Button to go to register form
       buttonAccess = document.getElementById('loginButtonAccess');         // Button to go back to login form
 
 // Show register form and hide login
 buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active');
 });
 
 // Show login form and hide register
 buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active');
 });
 
 
 /*=============== FORM SUBMISSION WITH FLASK INTEGRATION ===============*/
 /*
    These functions replace regular HTML form submissions with JavaScript `fetch` calls
    to a Flask backend API route such as `/login` or `/register`.
    Flask must return JSON response in format: { success: true/false, message: "" }
 
    On successful login or registration, user is redirected to /dashboard.
 */
 
 
 // ----- LOGIN FORM FETCH INTEGRATION -----
 document.getElementById('loginForm').addEventListener('submit', async (e) => {
   e.preventDefault(); // Prevent default form submission
 
   const formData = new FormData(e.target); // Get form data
 
   try {
     const response = await fetch('/login', {
       method: 'POST',
       body: formData
     });
 
     const result = await response.json(); // Expect JSON from Flask backend
 
     if (result.success) {
       // ✅ Redirect to dashboard page on successful login
       window.location.href = '/dashboard';
     } else {
       // ❌ Show error message from Flask backend
       alert(result.message || 'Invalid credentials. Please try again.');
     }
   } catch (err) {
     console.error('Login Error:', err);
     alert('Something went wrong during login. Please try again.');
   }
 });
 
 
 // ----- REGISTER FORM FETCH INTEGRATION -----
 document.getElementById('registerForm').addEventListener('submit', async (e) => {
   e.preventDefault(); // Stop default behavior
 
   const formData = new FormData(e.target);
 
   try {
     const response = await fetch('/register', {
       method: 'POST',
       body: formData
     });
 
     const result = await response.json(); // Expect JSON from Flask backend
 
     if (result.success) {
       // ✅ Redirect to dashboard page after successful registration
       window.location.href = '/dashboard.html';
     } else {
       // ❌ Show specific error returned from Flask
       alert(result.message || 'Registration failed. Please check your input.');
     }
   } catch (err) {
     console.error('Registration Error:', err);
     alert('Something went wrong during registration. Please try again.');
   }
 });
 