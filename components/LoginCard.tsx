"use client";
import { Mail } from "lucide-react";

import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
  })
  .required();
type Inputs = {
  email: string;
};

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSubmitEmail(data);
  };

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle errors
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEmail = async ({ email }: Inputs) => {
    setIsSubmitting(true);

    let responseData: any = {};

    const response: Response = await fetch(
      `https://scrubandshine.onrender.com/api/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    // Parse the response
    try {
      responseData = await response.json();
      if (response.ok) {
        setIsEmailSent(true); // Email sent, hide the form
      } else {
        setErrorMessage(responseData?.error || "Failed to send email.");
      }
    } catch (jsonError) {
      console.error("Failed to parse JSON during room creation:", jsonError);
      throw new Error("Failed to create room due to invalid response format.");
    }
  };
  return (
    <Card className="w-[300px] sm:w-[400px] lg:w-[450px]">
      {isEmailSent ? ( // If email is sent, show success message
        <CardHeader className="space-y-2 text-center text-primary-100 hover:text-primary-200 duration-200 transition-all cursor-default">
          <CardTitle className="text-2xl">Magic Link Sent!</CardTitle>
          <CardDescription className="text-slate-700 ">
            A login link has been sent to your email. Please check your inbox.
          </CardDescription>
        </CardHeader>
      ) : (
        // Otherwise, show the form
        <>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2 ">
                <Label htmlFor="email" className=" ml-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ferhat@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600 bg-red-300 rounded inline-block text-sm px-2  py-1  ">
                    Email is required !
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary-300 hover:bg-primary-200 text-white flex justify-center items-center"
                type="submit"
                disabled={isSubmitting || isEmailSent}
              >
                {isSubmitting && !isEmailSent ? (
                  <span className="loading-dots">Signing in </span>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" /> Sign In with Email
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </>
      )}
    </Card>
  );
}
