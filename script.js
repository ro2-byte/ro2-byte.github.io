// Simple client-side form handler with basic validation
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('status');
  const themeToggle = document.getElementById('theme-toggle');

  // Theme: initialize from localStorage or system preference
  function applyTheme(dark){
    if(dark){
      document.documentElement.classList.add('dark');
      themeToggle.setAttribute('aria-pressed','true');
      themeToggle.textContent = '☀️ Light';
      themeToggle.setAttribute('aria-label','Enable light mode');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.setAttribute('aria-pressed','false');
      themeToggle.textContent = '🌙 Dark';
      themeToggle.setAttribute('aria-label','Enable dark mode');
    }
  }

  const saved = localStorage.getItem('theme');
  if(saved === 'dark') applyTheme(true);
  else if(saved === 'light') applyTheme(false);
  else applyTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  themeToggle.addEventListener('click', function(){
    const isDark = document.documentElement.classList.toggle('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.textContent = '';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };

    // required fields: name, email, message
    if(!data.name || !data.email || !data.message){
      status.textContent = 'Please fill in name, email and message.';
      status.style.color = 'red';
      return;
    }

    // naive email check
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)){
      status.textContent = 'Please enter a valid email address.';
      status.style.color = 'red';
      return;
    }

    // optional phone validation: allow digits, spaces, +, -, parentheses; require 7+ digits
    if(data.phone){
      const digitsOnly = data.phone.replace(/[^0-9]/g, '');
      if(digitsOnly.length < 7){
        status.textContent = 'Please enter a valid phone number (at least 7 digits) or leave it blank.';
        status.style.color = 'red';
        return;
      }
    }

    // Simulate successful submit
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send';
      status.textContent = 'Message sent — thanks! (demo)';
      status.style.color = 'green';
      form.reset();
    }, 700);
  });
});