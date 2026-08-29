// import { useState } from "react";
// import { Container, Form, Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// const Login = () => {

//       const navigate = useNavigate();

//       const [form,setForm] = useState({
//             email: "",
//            password: "",
//       })

//       const loginHandler = async(e)=>{
//         e.preventDefault()
//        try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       form
//     );

//     localStorage.setItem("token", response.data.token);
//     console.log(localStorage.getItem("token"))

//    toast.success("login successfully!");

//     navigate("/Projects");


//   } catch (error) {
//     console.log(error);
//    toast.error("Failed to login!");
//   }
// };


//   return (
//                           //  login
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ width: "25rem" }} className="p-4 shadow">
//         <h2 className="text-center mb-4">Login</h2>
                                
// {/* email */}
//         <Form onSubmit={loginHandler}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//           <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               value= {form.email}
//               onChange={(e)=>setForm({...form,email:e.target.value})}
//             />

//           </Form.Group>
// {/* password */}
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter your password"
//               value={form.password}
//                onChange={(e) =>
//               setForm({...form, password: e.target.value })
//     }
//             />
//           </Form.Group>

//           {/* login button */}
// <Button
//   type="submit"
//   variant="primary"
//   className="w-100"
// >
//   Login
// </Button>

// {/* signup link */}
// <p className="text-center mt-3">
//   Don't have an account?{" "}
//   <span
//     style={{ color: "blue", cursor: "pointer" }}
//     onClick={() => navigate("/signup")}
//   >
//     Sign Up
//   </span>
// </p>
          
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;










import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Login Handler
  const loginHandler = async (e) => {
    e.preventDefault();

    // Stop if validation fails
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      console.log("Login Response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user information
      if (response.data.username) {
        localStorage.setItem(
          "username",
          response.data.username
        );
      }

      localStorage.setItem("email", form.email);

      console.log(
        "Token:",
        localStorage.getItem("token")
      );

      toast.success("Login successful!");

      // Go to Projects page
      navigate("/Projects");
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error?.response?.data?.message ||
        "Invalid email or password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
      <Card
        className="p-4 shadow border-0 rounded-4"
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">
            Welcome Back
          </h2>

          <p className="text-muted mb-0">
            Login to continue to your account
          </p>
        </div>

        <Form onSubmit={loginHandler} noValidate>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Email address
            </Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange("email")}
              isInvalid={!!errors.email}
              disabled={loading}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              Password
            </Form.Label>

            <InputGroup hasValidation>
              <Form.Control
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange("password")}
                isInvalid={!!errors.password}
                disabled={loading}
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100 py-2 d-flex justify-content-center align-items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <Spinner
                animation="border"
                size="sm"
              />
            )}

            {loading
              ? "Logging in..."
              : "Login"}
          </Button>

          {/* Signup Link */}
          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}

            <span
              className="text-primary fw-semibold"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate("/signup")
              }
            >
              Sign Up
            </span>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;