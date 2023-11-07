import { FC, useState } from 'react';
import { Button, Checkbox, Form, Input } from "antd";
import { rules } from "../../utils/rules";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cl from './LoginForm.module.scss';

interface LoginFormProps {
   method: 'signIn' | 'signUp';
}

const LoginForm: FC<LoginFormProps> = ({ method }) => {
   const navigate = useNavigate()
   const { signUpError, signInError, isLoading } = useAppSelector(state => state.auth);
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [email, setEmail] = useState('')
   const { login, registration } = useActions()

   const submit = (values: any) => {
      if (method === 'signUp') {
         registration(username, password, email, values.remember, navigate)
      } else {
         login(username, password, values.remember, navigate)
      }
   }


   return (
      <Form
         onFinish={submit}
      >
         {method === 'signUp' && signUpError ?
            <div style={{ color: 'red' }}>
               {signUpError}
            </div>
            : method === 'signIn' && signInError ?
               <div style={{ color: 'red' }}>
                  {signInError}
                  <Link className={cl.linkSignUp} to='/signUp'>sing up</Link>
               </div>
               : ''
         }
         {method === 'signIn' ?
            <Form.Item
               label='User name or email'
               name="usernameOrEmail"
               rules={[
                  rules.required("Please enter the user name or email!"),
                  rules.max(256, 'User name and email cannot be more than 256 characters')
               ]}
            >
               <Input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
               />
            </Form.Item>
            :
            <Form.Item
               label='Username'
               name="username"
               rules={[
                  rules.required("Please enter the user's name!"),
                  rules.max(30, 'The user name cannot be more than 30 characters')
               ]}
            >
               <Input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
               />
            </Form.Item>
         }
         {method === 'signUp' && <Form.Item
            name="email"
            label="E-mail"
            rules={[
               rules.required("Please enter email"),
               { type: 'email', message: 'The introduced value is not email' },
               rules.max(256, 'Email cannot be more than 256 characters')
            ]}
         >
            <Input
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
         </Form.Item>}
         <Form.Item
            label="Password"
            name="password"
            rules={[
               rules.required("Please enter the password"),
               rules.max(20, 'The password cannot be more than 20 characters'),
               rules.min(8, 'The password cannot be less than 8 characters')
            ]}
         >
            <Input.Password
               value={password}
               onChange={e => setPassword(e.target.value)}
               type={"password"}
            />
         </Form.Item>
         <Form.Item name="remember" valuePropName="checked" >
            <Checkbox>Remember me</Checkbox>
         </Form.Item>
         <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               {method === 'signIn' ? 'Sign in' : 'Sign up'}
            </Button>
         </Form.Item>
         {/* <div className={cl.longTime}>*The download may take a long time because the server shuts down after a long period of inactivity.</div> */}
      </Form>
   );
};

export default LoginForm;
