import { Form, Link} from "react-router-dom";

export default function Login() {
  // use react routers Form component? and learn actions and stuff
  // use the Auth api of supabase
  return (
    <Form>
      <input type="text" placeholder="email"/>
      <input type="password" placeholder="password" />
      <div>
        <p>Don&apos;t have an account yet?</p>
        <Link to="/signup">Create an account</Link>
      </div>
    </Form>
  );
}