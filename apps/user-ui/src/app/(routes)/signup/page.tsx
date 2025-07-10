'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import GoogleButton from '../../../shared/components/google-button';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setserverError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full py-10 min-h-[95vh] bg-[#f1f1f1]">
      <h1 className="text-4xl font-Poppins font-semibold text-black text-center">
        Signup
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#000000099]">
        Home . Signup
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-3xl font-semibold text-center mb-2">
            Signup to Eshop
          </h3>
          <p className="text-center text-gray-500 mb-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <GoogleButton />
          <div className="flex items-center my-5 text-gray-400 text-sm">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-3-2">Or Sign in with Email</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Jane Doe"
              className="w-full p-2 border border-gray-300 outline-0 rounded-[5px] mb-1"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {String(errors.name.message)}
              </p>
            )}
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="jdoe@example.com"
              className="w-full p-2 border border-gray-300 outline-0 rounded-[5px] mb-1"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {String(errors.email.message)}
              </p>
            )}
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="**********"
                className="w-full p-2 border border-gray-300 outline-0 rounded-[5px] mb-1"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-lh cursor-pointer bg-black text-white py-2 rounded-lg"
            >
              Signup
            </button>

            {serverError && <p className="text-red-500">{serverError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
