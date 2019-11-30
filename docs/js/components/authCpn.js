components.register = `
<section class="register-container">
<form id="register-form" class="register-form">
    <div class="form-header">
    <h3 id="form-header-h3">MindX chat</h3>
    </div>
    <div class="form-content">
    <div class="name-wrapper">
        <div class="input-wrapper">
        <input type="text" name="firstname" placeholder="First name">
        <div id="firstname-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
        <input type="text" name="lastname" placeholder="Last name">
        <div id="lastname-error" class="message-error"></div>
        </div>
    </div>
    <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="confirmPassword" placeholder="Confirm password">
        <div id="confirm-password-error" class="message-error"></div>
    </div>
    <div id="register-error" class="message-error"></div>
    <div id="register-success" class="message-success"></div>
    </div>
    <div class="form-footer">
    <a id="register-link" href="#">Already have an account? Login</a>
    <button id="register-submit-btn" type="submit">Register</button>
    </div>
</form>
</section>
`

components.logIn = `
<section class="log-in-container">
<form id="log-in-form" class="log-in-form">
    <div class="form-header">
    <h3 id="form-header-h3">MindX chat</h3>
    </div>
    <div class="form-content">
    <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
    </div>
    <div id="log-in-error" class="message-error"></div>
    </div>
    <div class="form-footer">
    <a id="log-in-link" href="#">Not yet have an account? Register</a>
    <button id="log-in-submit-btn" type="submit">Log in</button>
    </div>
</form>
</section>
`