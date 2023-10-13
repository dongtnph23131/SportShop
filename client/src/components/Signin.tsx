import React from 'react'

const Signin = () => {
  return (
    <div className='body'>
      <div className="login-box">
        <div className="login-header">
            <h4>Welcome to Sportshop</h4>
            <p>We are happy to have you back!</p>
            <h4>SIGNIN</h4>
        </div>
        <div className="input-box">
            <input type="text" className="input-field" placeholder='Email or phone' id="email" required />
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder='Password' id="password"  required />
        </div>
        <div className="forgot">
            
            <section>
                <a href="#" className="forgot-link">Forgot password?</a>
            </section>
        </div>
        <div className="input-box">
            <input type="submit" className="input-submit" />
        </div>
        <div className="middle-text">
            <hr />
            <p className="or-text">Or</p>
        </div>
        <div className="social-sign-in">
            <button className="input-google">
            <i className="fab fa-google"></i>

                 <p>Sign In with Google</p>
            </button>
            <button className="input-twitter">
            <i className="fab fa-twitter"></i>

            </button>
        </div>
        <div className="sign-up">
            <p>Don't have account <a href="#">Sign up</a></p>
        </div>
    </div>
    </div>
  )
}

export default Signin
