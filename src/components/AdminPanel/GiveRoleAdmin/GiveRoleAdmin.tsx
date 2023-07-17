import { FC, useState, useCallback } from 'react';
import cl from './GiveRoleAdmin.module.scss';
import { Button, Form, Input, message } from 'antd';
import { rules } from '../../../utils/rules';
import UserService from '../../../api/UserService';

interface PropsGiveRoleAdmin {
   give?: boolean;
}

const GiveRoleAdmin: FC<PropsGiveRoleAdmin> = ({ give = false }) => {
   const [form] = Form.useForm();
   const [messageApi, contextHolder] = message.useMessage();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [input, setInput] = useState<string>('');
   const [error, setError] = useState<string>('');


   const successMessage = useCallback((name: string) => {
      messageApi.open({
         type: 'success',
         content: `You are successful ${give
            ? 'issued the role of admin to the user'
            : 'they took the role of the admin from the user'
            } ${name}`,
      });
   }, [give, messageApi]);

   const errorMessage = useCallback((e: any) => {
      messageApi.open({
         type: 'error',
         content: `There was an error at ${give
            ? 'issuing the admin to the user'
            : 'taking the admin from the user'
            }: ${e}`,
      });
   }, [give, messageApi]);


   const submit = useCallback(async (values: any) => {
      setIsLoading(true)
      try {
         const response = await UserService.getUsers()
         const user = response.data.find((item) => item.id === values.username)
         if (user) {
            await UserService.setIsAdmin(give, values.username)
            successMessage(values.username)
            form.resetFields()
            setIsLoading(false)
         } else {
            setError('This user was not found')
            setIsLoading(false)
         }
      } catch (e) {
         errorMessage(e)
         setIsLoading(false)
      }
   }, [errorMessage, successMessage, form, give])


   const onChangeInput = async (e: any) => {
      setInput(e.target.value)
      setError("")
   }

   return (
      <div className={cl.container}>
         {contextHolder}
         <h2 className={cl.title}>{give ? 'Issue' : 'Take'} the role of the admin</h2>
         <Form
            form={form}
            onFinish={submit}>
            <Form.Item
               label={give
                  ? 'Enter the name of the crawler to whom you want to give out the role of the admin'
                  : 'Enter the name of the crawler from whom you want to take the role of the admin'
               }
               name="username"
               rules={[
                  rules.required("Please enter the user name!"),
                  rules.max(30, 'The user name cannot be more than 30 characters')
               ]}
            >
               <Input
                  value={input}
                  onChange={e => onChangeInput(e)}
                  className={cl.inputName}
               />
            </Form.Item>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={isLoading} >
                  {give ? 'Issue' : 'Take'} The role of the admin
               </Button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default GiveRoleAdmin;