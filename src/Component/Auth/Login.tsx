import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { saveUser } from "../../Utils/Storage";
import "./auth.css";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const user = {
        id: "123",
        name: "Demo User",
        token: "fake_token",
        email: data.email,
      };

      saveUser(user);
      navigate("/products");
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      setError("password", {
        type: "manual",
        message: " ",
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
