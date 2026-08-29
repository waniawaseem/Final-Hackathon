// import { useState } from "react";
// import { Container, Form, Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// // import { GlobalContext } from '../context/context.jsx';

// const Signup = () => {

//   const navigate = useNavigate();


//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
// const signupHandler =async (e)=>{
//   e.preventDefault();
// try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/signup",
//       form
//     );
//     localStorage.setItem("token",response.data.token)

//     console.log(response.data);
//    toast.success("Signup successfully!");

//         navigate("/login");

//   } catch (error) {
//     toast.error("Failed to Signup!");
//     console.log(error);
//   }

//   console.log(form)
// }

//   return (



//                         // SIGNUP

//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ width: "25rem" }} className="p-4 shadow">
//         <h2 className="text-center mb-4">Signup</h2>
//         <Form onSubmit={signupHandler}>



//           {/* user name */}
//           <Form.Group className="mb-3">
//             <Form.Label>User Name</Form.Label>

//             <Form.Control
//               type="text"
//               placeholder="Enter your name"
//               value={form.username}
//               onChange={(e) =>
//                 setForm({ ...form, username: e.target.value })
//               }
//             />
//           </Form.Group>


//           {/* Email */}
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//   <Form.Label>Email address</Form.Label>

//   <Form.Control
//     type="email"
//     placeholder="Enter email"
//     value={form.email}
//     onChange={(e) =>
//       setForm({ ...form, email: e.target.value })
//     }
//   />

//   <Form.Text className=" text-success" >
//     We'll never share your email with anyone else.
//   </Form.Text>
// </Form.Group>

//           {/* password */}

// <Form.Group className="mb-3">
//   <Form.Label>Password</Form.Label>

//   <Form.Control
//     type="password"
//     placeholder="Enter Password"
//     value={form.password}
//     onChange={(e) =>
//       setForm({ ...form, password: e.target.value })
//     }
//   />
// </Form.Group>

//         {/* confirm password */}

// <Form.Group className="mb-3">
//   <Form.Label>Confirm Password</Form.Label>

//   <Form.Control
//     type="password"
//     placeholder="Confirm Password"
//     value={form.confirmPassword}
//     onChange={(e) =>
//       setForm({ ...form, confirmPassword: e.target.value })
//     }
//   />
// </Form.Group>

//           {/* signup button */}

//          <Button
//   type="submit"
//   variant="primary"
//   className="w-100"
// >
//   Signup
// </Button>
//           {/* login link */}

//           <p className="text-center mt-3">
//             Already have an account?{" "}
//             <span
//               style={{ color: "blue", cursor: "pointer" }}
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </span>
//           </p>

//         </Form>
//       </Card>
//     </Container>
//   )
// }

// export default Signup




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
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    // Username
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Signup Handler
  const signupHandler = async (e) => {
    e.preventDefault();

    // Stop if validation fails
    if (!validate()) return;

    setLoading(true);

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...payload } = form;

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        payload
      );

      // Save authentication data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", form.username);
      localStorage.setItem("email", form.email);

      toast.success("Account created successfully!");

      // Go directly to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to sign up. Please try again.";

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
            Create Account
          </h2>

          <p className="text-muted mb-0">
            Join us in just a few seconds
          </p>
        </div>

        <Form onSubmit={signupHandler} noValidate>

          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Username
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange("username")}
              isInvalid={!!errors.username}
              disabled={loading}
            />

            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

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

            {!errors.email && (
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Password
            </Form.Label>

            <InputGroup hasValidation>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange("password")}
                isInvalid={!!errors.password}
                disabled={loading}
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowPassword((prev) => !prev)
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

          {/* Confirm Password */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              Confirm Password
            </Form.Label>

            <InputGroup hasValidation>
              <Form.Control
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
                disabled={loading}
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>

              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Signup Button */}
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

            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          {/* Login Link */}
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}

            <span
              className="text-primary fw-semibold"
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;