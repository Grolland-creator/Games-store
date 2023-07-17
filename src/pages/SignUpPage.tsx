import { FC } from 'react';
import { Card, Row } from "antd";
import LoginForm from "../components/LoginForm/LoginForm";
import LoginWrapper from '../components/Wrappers/LoginWrapper/LoginWrapper';

const SignUp: FC = () => {
   return (
      <LoginWrapper>
         <Row justify="center" align="middle" className="h100">
            <Card>
               <LoginForm method ='signUp' />
            </Card>
         </Row>
      </LoginWrapper>
   );
};

export default SignUp;
