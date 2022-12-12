import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { ErrorMessage } from "@hookform/error-message";

function App() {
  const schema = yup.object().shape({
    name: yup.string().required().min(6),
    email: yup.string().required().email(),
    age: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .required()
      .positive()
      .integer()
      .min(18),
    password: yup.string().required().min(6).max(20),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords doesnot match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Successfully submitted !!!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name..." {...register("name")} />
      <p>{errors.name?.message}</p>

      {/* {errors.name?.type === "min" && (
        <p>Name should be at least 6 characters long</p>
      )}
      {errors.name?.type === "required" && <p>Name is required</p>} */}
      <input type="text" placeholder="email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="number" placeholder="age..." {...register("age")} />
      <p>{errors.age?.message}</p>
      <input type="text" placeholder="password..." {...register("password")} />
      <p>{errors.password?.message}</p>
      <input
        type="text"
        placeholder="confirm password..."
        {...register("confirmpassword")}
      />
      <p>{errors.confirmpassword?.message}</p>

      <input type="submit" />
    </form>
  );
}

export default App;
