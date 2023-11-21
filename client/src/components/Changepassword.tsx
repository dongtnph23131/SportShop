const ChangePassword = () => {
  return (
    <div className="card login-form">
      <div className="card-body">
        <h3 className="card-title text-center">Change password</h3>

        <div className="card-text">
          <form>
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Holy guacamole!</strong> You should check in on some of
              those fields below.
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Your new password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="newPassword"
              />
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="repeatPassword"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block submit-btn"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
