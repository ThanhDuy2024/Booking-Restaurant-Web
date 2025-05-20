'use client';

import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '@/redux/slices/authSlice';
import { PacmanLoader } from 'react-spinners';
import Spinner from '@/components/common/loading/Spinner';
import { useState } from 'react';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import '@/styles/variable.css';
import AppButton from '@/components/common/AppButton';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must have at least 8 characters')
    .required('Required'),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isSpinning, setIsSpinning] = useState(false);


  const handleSubmit = async ({ email, password }) => {
    if (!email || !password) {
      showToast('Vui lòng nhập đầy đủ email và mật khẩu!', { type: 'warning' });
      return;
    }
    dispatch(loginRequest({ email, password }));
  };

  return (
    <>

      <div className="flex items-center justify-center min-h-screen px-16 bg-cyan-50">
        <div className={`flex bg-background shadow-2xl rounded-3xl h-auto`}>
          <img className={`w-4/6 rounded-l-3xl`} src="/images/login_img.png" alt="" />
          {loading && <Spinner type="PacmanLoader" color="#000000" size={60} delay={2000} />}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-2/6 h-full py-28 px-4"
          >
            <h2 className="flex gap-4 mb-2 ml-2">
              <img className={`w-10 h-10`} src="/images/login_img.png" alt="" />
              <span className={`font-title font-semibold text-title `}>DARION</span>
            </h2>
            <p className="text-sub_title font-sub_title mb-4 ml-2">
              Vui lòng đăng nhập để tiếp tục
            </p>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignInSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-6">
                    <label
                      className="block text-text font-text mb-2 ml-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`w-3/4 p-2 border-b-2 bg-gray-200 rounded-lg focus:outline-none ${
                        errors.email && touched.email
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                      id="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-mini_text"
                    />
                  </div>
                  <div className="mb-12 ">
                    <label
                      className="block text-text font-text mb-2 ml-2"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`w-3/4 p-2 border-b-2 bg-gray-200 rounded-lg focus:outline-none ${
                        errors.password && touched.password
                          ? 'border-red-500'
                          : 'border-green-500'
                      }`}
                      id="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-mini_text"
                    />
                  </div>
                  <AppButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                  >
                    Đăng nhập
                  </AppButton>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </div>
    </>
  );
}
