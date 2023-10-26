import React from 'react'

const ForgotToken = () => {
  return (
    <div>
        <div className='body'>
            <form>
                <div className="login-box forgot-s">
                    <div className="login-header">
                        <h4>NHẬP MÃ XÁC MINH</h4>
                    </div>
                    <div className="input-box input__forgotpassword">
                        <input type="text" className="input-field" placeholder='Nhập mã xác minh' id="email" />
                        <input type="text" className="input-field" placeholder='Nhập mật khẩu mới' id="password" />
                        <input type="text" className="input-field" placeholder='Xác nhận mật khẩu mới' id="confirmPassword" />

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
            </form>
        </div>
    </div>
  )
}

export default ForgotToken
