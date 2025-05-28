// src/Component/Auth/Signup.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css"

const signupSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser") || "{}"
    );

    if (storedUser.email === data.email) {
      setError("email", {
        message: "Email is already registered",
        type: "manual",
      });
      return;
    }

    try {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ email: data.email, password: data.password })
      );
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch {
      setError("email", {
        message: "Signup failed. Please try again.",
        type: "manual",
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && <p className="auth-error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="auth-error">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="auth-error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
