/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useAuthApi } from '../hooks/use-auth-api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { routes } from '../configs/routes.path';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuthApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { mutate: authLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login Successful:', data);
      toast.info('Logged in successfully!');
      navigate(routes.dashboard.root);
    },
    onError: () => {
      toast.error('Please Check your Input');
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setError('');
    authLogin({ email, password });
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <label>Email</label>
                      <div className="mb-3">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          aria-label="Email"
                          aria-describedby="email-addon"
                        />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                          aria-label="Password"
                          aria-describedby="password-addon"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?
                      <a
                        href="javascript:;"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                      backgroundImage:
                        "url('../assets/img/curved-images/curved6.jpg')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Login;
