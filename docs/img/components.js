const components = {}

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

components.nav = `
<nav class="main-nav">
  <div class="user-profile">
    <div class="user-email">
      <span id="user-email"></span>
    </div>
    <button id="sign-out-btn" class="btn-icon">
      <i class="fas fa-sign-out-alt"></i>
    </button>
  </div>
</nav>
`

components.chat = `
<section class="chat-container">
  <div class="aside-left">
    <div id="list-conversations" class="list-conversation">
    </div>
    <form id= "form-add-conversation" class="form-add-conversation">
      <div class="input-wrapper">
        <input id="form-add-conversation-title-input" type="text" name="title" placeholder="Conversation">
        <div id="title-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input id ="form-add-conversation-friend-email-input" type="text" name="friendEmail" placeholder="Your friend email">
        <div id="friend-email-error" class= "message-error"></div> 
      </div>
      <button id= "form-add-conversation-submit-btn" class="btn-icon" type="submit">
        <i class="fas fa-plus"></i>
      </button>
    </form>
  </div>

  <div class="current-conversation">
    <div id="list-messages" class="list-messages">
    </div>
    <form id= "form-chat" class="form-chat">
      <div class="input-wrapper">
        <input id="form-chat-input" type="text" name="message" placeholder="Enter your message">
      </div>
      <button id="form-chat-submit-btn" type="submit">Send</button>
    </form>
  </div>
  <!-- right -->
</section>
`

components.loading = `
<div class="loading-container">
  <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading" />
</div>
`

