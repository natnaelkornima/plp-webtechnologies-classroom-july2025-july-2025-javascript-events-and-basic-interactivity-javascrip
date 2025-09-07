document.addEventListener('DOMContentLoaded', () => {

        // --- Part 1: JavaScript Event Handling ---
        const messageBtn = document.getElementById('messageBtn');
        const hiddenMessage = document.getElementById('hiddenMessage');
        const hoverBox = document.getElementById('hoverBox');
        const keyInput = document.getElementById('keyInput');
        const keyMessage = document.getElementById('keyMessage');
        const liveInput = document.getElementById('liveInput');
        const charCount = document.getElementById('charCount');

        messageBtn.addEventListener('click', () => {
            hiddenMessage.classList.toggle('hidden');
            messageBtn.textContent = hiddenMessage.classList.contains('hidden') ? 'Show Message' : 'Hide Message';
        });

        hoverBox.addEventListener('mouseover', () => {
            hoverBox.classList.add('hovered');
            hoverBox.textContent = 'You hovered me!';
        });

        hoverBox.addEventListener('mouseout', () => {
            hoverBox.classList.remove('hovered');
            hoverBox.textContent = 'Hover over me!';
        });

        // Keyup Event: Listens for key releases.
        keyInput.addEventListener('keyup', (event) => {
            // The 'event' object contains details about the event, like which key was pressed.
            if (event.key === 'Enter') {
                keyMessage.classList.remove('hidden');
                // Use setTimeout to hide the message again after 2 seconds for a better UX.
                setTimeout(() => {
                    keyMessage.classList.add('hidden');
                }, 2000);
            }
        });

        // Input Event: Fires every time the value of the input changes.
        liveInput.addEventListener('input', () => {
            const currentLength = liveInput.value.length;
            charCount.textContent = currentLength;
        });

        // --- Part 2: Building Interactive Elements ---
        const darkModeToggle = document.getElementById('darkModeToggle');
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        const htmlElement = document.documentElement;

        if (localStorage.getItem('theme') === 'dark') {
            htmlElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }

        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
        });

        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                question.classList.toggle('open');
                answer.classList.toggle('open');
            });
        });

        // --- Part 3: Form Validation with JavaScript ---
        const form = document.getElementById('contactForm');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const formMessage = document.getElementById('form-message');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            clearErrors();
            formMessage.className = 'hidden';
            let isValid = true;

            if (usernameInput.value.trim() === '') {
                showError(usernameInput, 'Username is required.');
                isValid = false;
            } else if (usernameInput.value.trim().length < 3) {
                showError(usernameInput, 'Username must be at least 3 characters.');
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            if (passwordInput.value.trim() === '') {
                showError(passwordInput, 'Password is required.');
                isValid = false;
            } else if (passwordInput.value.trim().length < 8) {
                showError(passwordInput, 'Password must be at least 8 characters.');
                isValid = false;
            }

            if (isValid) {
                formMessage.textContent = '✅ Registration successful! Thank you.';
                formMessage.className = 'success';
                form.reset();
            } else {
                formMessage.textContent = '❌ Please correct the errors below.';
                formMessage.className = 'error';
            }
        });

        function showError(input, message) {
            const errorField = input.nextElementSibling;
            errorField.textContent = message;
            input.classList.add('error');
        }

        function clearErrors() {
            document.querySelectorAll('.error-text').forEach(field => field.textContent = '');
            document.querySelectorAll('input.error').forEach(input => input.classList.remove('error'));
        }
        
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    });