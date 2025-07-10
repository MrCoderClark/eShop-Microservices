'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import GoogleButton from '../../../shared/components/google-button';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios, { Axios, AxiosError } from 'axios';

type FormData = {
  email: string;
  password: string;
};

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login-user`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      setServerError(null);
      router.push('/');
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        'Invalid credentials!';
      setServerError(errorMessage);
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full py-10 min-h-[95vh] bg-[#f1f1f1]">
      <h1 className="text-4xl font-Poppins font-semibold text-black text-center">
        Login
      </h1>
      <p className="text-center text-lg font-medium py-3 text-[#000000099]">
        Home . Login
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
          <h3 className="text-3xl font-semibold text-center mb-2">
            Login to Eshop
          </h3>
          <p className="text-center text-gray-500 mb-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
          <GoogleButton />
          <div className="flex items-center my-5 text-gray-400 text-sm">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-3-2">Or Sign in with Email</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center my-4">
              <label className="block text-gray-700 mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
            </div>
            <button
              disabled={loginMutation.isPending}
              type="submit"
              className="w-full text-lh cursor-pointer bg-black text-white py-2 rounded-lg"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>

            {serverError && <p className="text-red-500">{serverError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
