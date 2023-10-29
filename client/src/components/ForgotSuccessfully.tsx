import React from 'react'

const ForgotSuccessfully = () => {
  return (
    <div>
       <div className='body'>
            <form>
                <div className="login-box forgot-s">
                    <div className="login-header">
                        <h4>NHẬP MẬT KHẨU MỚI </h4>
                    </div>
                    <div className="input-box">
                        <input type="text" className="input-field" placeholder='Nhập mật khẩu ' id="email" />
                    </div>
                  

                    <div className="input-box">
                        <input type="text" className="input-field" placeholder='Xác nhận mật khẩu' id="email" />
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

export default ForgotSuccessfully
