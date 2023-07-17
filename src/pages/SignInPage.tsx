import { FC } from 'react';
import { Card, Row } from "antd";
import LoginForm from "../components/LoginForm/LoginForm";
import LoginWrapper from '../components/Wrappers/LoginWrapper/LoginWrapper';

const SignIn: FC = () => {
   return (
      <LoginWrapper>
         <Row justify="center" align="middle" className="h100">
            <Card>
               <LoginForm method ='signIn' />
            </Card>
         </Row>
      </LoginWrapper>
   );
};

export default SignIn;
