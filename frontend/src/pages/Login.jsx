import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Submitting login form...');
    
    const result = await login(credentials);
    
    console.log('📊 Login result:', result);
    
    if (result.success) {
      console.log('✅ Login successful, navigating to dashboard...');
      navigate('/dashboard', { replace: true });
    } else {
      console.log('❌ Login failed:', result.message);
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div id="global-loader" style={{ display: loading ? 'block' : 'none' }}>
        <div className="whirly-loader"></div>
      </div>

      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper login-new">
            <div className="container">
              <div className="login-content user-login">
                <div className="login-logo">
                  <img src="/assets/img/logo.svg" alt="DIOS Logo" />
                  <a href="/" className="login-logo logo-white">
                    <img src="/assets/img/logo-white.svg" alt="DIOS Logo" />
                  </a>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="login-userset">
                    <div className="login-userheading">
                      <h3>Masuk</h3>
                      <h4>Akses ke panel Difan Integrated Operational System</h4>
                    </div>

                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                        <button type="button" className="btn-close" onClick={() => setError('')}></button>
                      </div>
                    )}

                    <div className="form-login">
                      <label className="form-label">Email</label>
                      <div className="form-addons">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={credentials.email}
                          onChange={handleChange}
                          placeholder="Masukkan alamat email"
                          required
                          autoFocus
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>

                    <div className="form-login">
                      <label className="form-label">Password</label>
                      <div className="pass-group">
                        <input
                          type="password"
                          name="password"
                          className="pass-input form-control"
                          value={credentials.password}
                          onChange={handleChange}
                          placeholder="Masukkan password"
                          required
                        />
                        <span className="fas toggle-password fa-eye-slash"></span>
                      </div>
                    </div>

                    <div className="form-login authentication-check">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="custom-control custom-checkbox justify-content-start">
                            <div className="custom-control custom-checkbox">
                              <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                <input
                                  type="checkbox"
                                  checked={rememberMe}
                                  onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="checkmarks"></span>Ingat saya
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-end">
                            <a className="forgot-link" href="#">Lupa Password?</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-login">
                      <button type="submit" className="btn btn-login" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Memproses...
                          </>
                        ) : (
                          'Masuk'
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="signinform text-center">
                  <h4>Belum punya akun? <a href="#" className="hover-a">Hubungi IT</a></h4>
                </div>

                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright &copy; 2026 DIOS. All rights reserved</p>
                </div>
              </div>

              <div className="my-4 d-flex justify-content-center align-items-center">
                <div className="login-img">
                  <img src="/assets/img/authentication/login-user.png" alt="Login" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
