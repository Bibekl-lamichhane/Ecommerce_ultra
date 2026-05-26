"use client";
import React from "react";
import { Candal } from "next/font/google";
import Image from "next/image";
import { Alert, Button} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import XIcon from "@mui/icons-material/X";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
 

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const candal = Candal({
  weight: "400",
  subsets: ["latin"],
});

function validatePhonenumber(value) {
  let error;
  if (String(value).length !== 10) {
    console.log(value);
    error = "Invalid phone number";
  }
  return error;
}


const page = () => {
const router=useRouter()



const handelSubmit = async (values, { setSubmitting }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.status === 200) {
      router.push('/sign-in')
     toast.success(data.msg)
    }
    else if (response.status === 401 ){
       toast.error(data.msg);
    }
    else if (response.status === 409 ){
       toast(data.msg,{icon:'❗'})
    }
    else if (response.status === 500){
       toast(data.msg,{icon:'🌐'})
    }

  } catch (error) {
    console.error("Error during signup from frontend:", error);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="md:flex  flex items-center h-screen bg-white">
      <div className="hidden md:block m-">
        <Image
          src="/signupimg.jpg"
          loading="eager"
          alt="signup page image"
          width={700}
          height={400}
          className="opacity-80 w-auto h-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto  ">
        <div
          className={`${candal.className} text-3xl md:text-4xl font-bold mb-4 py-10  `}
        >
          <h1>New to TrendyCart</h1>
          <h1>Sign Up!</h1>
        </div>

        <Formik
          initialValues={{
            phonenumber: "",
            password: "",
            email: "",
            username:'',
            role:''
          }}
          validationSchema={SignupSchema}
          onSubmit={handelSubmit}
        >
          {({ errors, touched }) => (
            <Form action="#" method="post" className="flex flex-col gap-6 w-90 text-black">
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
             
              <Field
                name="phonenumber"
                type="text"
                placeholder="Phone Number"
                validate={validatePhonenumber}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.phonenumber && touched.phonenumber ? (
                <div className="text-red-500 text-sm">{errors.phonenumber}</div>
              ) : null}

              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 text-sm">{errors.email}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <div className="w-full flex justify-center items-center gap-8">
                <label>
              <Field type="radio" name="role" value="user" />
              User
            </label>
            <label>
              <Field type="radio" name="role" value="shop" />
              Shop
            </label>
              </div>
              <button
                type="submit"
                className="bg-orange-400 text-slate-50 py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <div className="text-orange-400 font-extralight flex flex-col justify-center items-center ">
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="my-4">Or login with</div>
              <Button
                fullWidth
                startIcon={<GoogleIcon />}
                variant="outlined"
                color="warning"
              >
                Google
              </Button>
              <Button
                fullWidth
                startIcon={<XIcon />}
                variant="outlined"
                color="warning"
              >
                X
              </Button>
              <Button
                fullWidth
                startIcon={<AppleIcon />}
                variant="outlined"
                color="warning"
              >
                Apple
              </Button>
            </div>
            <div className="my-2">
              Already have an account?{" "}
              <a href="/sign-in" className=" hover:underline mx-6">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
