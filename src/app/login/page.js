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
    <div className="flex items-center justify-center min-h-screen">
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
        className="w-full max-w-xl h-auto bg-white max-[700px]:p-[50px] max-[500px]:p-[30px] py-[70px] px-[50px] rounded-2xl shadow-lg"
      >
        <h2 className="text-[32px] font-semibold text-center mb-4">
          Đăng nhập
        </h2>
        <p className="text-center text-gray-600 mb-[40px] text-[18px]">
          Vui lòng nhập email và mật khẩu để tiếp tục
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
          {({ errors, touched }) => (
            <Form>
              <div className="mb-[30px]">
                <label
                  className="block text-gray-700 text-[18px] font-medium mb-[15px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full h-[56px] p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-green-400'
                  }`}
                  id="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-[30px]">
                <label
                  className="block text-gray-700 text-[18px] font-medium mb-[15px]"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`w-full h-[56px] p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-green-400'
                  }`}
                  id="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full h-[56px] bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng Nhập
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}