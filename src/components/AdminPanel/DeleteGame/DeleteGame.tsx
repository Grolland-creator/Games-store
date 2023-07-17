import { FC, useState, useCallback } from 'react';
import cl from './DeleteGame.module.scss';
import { Button, Form, Input, message } from 'antd';
import { rules } from '../../../utils/rules';
import GameService from '../../../api/GameService';

const DeleteGame: FC = () => {
   const [form] = Form.useForm();
   const [messageApi, contextHolder] = message.useMessage();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [input, setInput] = useState<string>('');
   const [error, setError] = useState<string>('');


   const successMessage = useCallback(() => {
      messageApi.open({
         type: 'success',
         content: `You successfully deleted the game`,
      });
   }, [messageApi]);
   const errorMessage = useCallback((e: any) => {
      messageApi.open({
         type: 'error',
         content: `There was an error when deleting the game: ${e}`,
      });
   }, [messageApi]);


   const submit = useCallback(async (values: any) => {
      setIsLoading(true)
      try {
         const games = await GameService.getGames(1000)
         const needGame = games.data.find((item) => item.name === values.name)
         if (needGame) {
            await GameService.deleteGame(needGame.id)
            setIsLoading(false)
            successMessage()
            form.resetFields()
         } else {
            setError("This name of the game was not found")
            setIsLoading(false)
         }
      } catch (e) {
         errorMessage(e)
         setIsLoading(false)
      }
   }, [form, errorMessage, successMessage])


   const onChangeInput = useCallback(async (e: any) => {
      setInput(e.target.value)
      setError("")
   }, [])

   return (
      <div className={cl.container}>
         {contextHolder}
         <h2 className={cl.title}>Delete the game</h2>
         <Form
            form={form}
            onFinish={submit}>
            <Form.Item
               label='Enter the name of the game you want to delete'
               name="name"
               rules={[
                  rules.required("Please enter the name of the game!"),
                  rules.max(50, 'The name of the game cannot be more than 50 characters')
               ]}
            >
               <Input
                  value={input}
                  onChange={e => onChangeInput(e)}
                  className={cl.inputName}
               />
            </Form.Item>
            {error &&
               <div style={{ color: 'red' }}>{error}</div>
            }
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={isLoading} >
                 Delete the game (the action is irreversible)
               </Button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default DeleteGame;