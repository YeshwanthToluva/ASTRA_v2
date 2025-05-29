const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle between sign-in and sign-up
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Handle Registration
document.querySelector('.signUpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[placeholder="Name"]').value;
    const email = e.target.querySelector('input[placeholder="Email"]').value;
    const password = e.target.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = e.target.querySelector('input[placeholder="Confirm-Password"]').value;
    console.log(name,password,email,confirmPassword);
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.status == 201) {
            alert('User registered successfully, Please Login');
            container.classList.remove("active");
        } else {
            alert(data.message || 'Error registering user');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user');
    }
});

// Handle Login
document.querySelector('.signInForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[placeholder="Email"]').value;
    const password = e.target.querySelector('input[placeholder="Password"]').value;

    try {
        const res = await fetch('http://localhost:3000/ulogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.status === 200) {
            alert('Login successful!');
            window.location.href = data.redirectUrl || '/landing';
        } else {
            alert(data.error || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        alert('Invalid credentials');
    }

    //********************************************************************** */

        // After successful login, store the token
        const loginUser = async (data) => {
            const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });
        
            const resData = await response.json();
            console.log(resData);
            if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', resData.token);
        
            // Redirect to landing page or protected route
            window.location.href = resData.redirectUrl || '/landing';
            } else {
            alert(resData.message);
            }
        };
  

    //********************************************************************** */

});