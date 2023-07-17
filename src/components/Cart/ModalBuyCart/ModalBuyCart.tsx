import { FC, useState } from 'react';
import cl from './ModalBuyCart.module.scss';
import { Checkbox, Form, Input, Modal } from 'antd';
import { rules } from '../../../utils/rules';
import { useActions, useAppSelector } from '../../../hooks/redux';
import { MessageInstance } from 'antd/es/message/interface';

interface PropsModalBuyCart {
   messageApi: MessageInstance;
   totalPrice: number;
}

const ModalBuyCart: FC<PropsModalBuyCart> = ({ messageApi, totalPrice }) => {
   const { user } = useAppSelector(state => state.auth)
   const { DeleteAllFromCart } = useActions()
   const [isModalShow, setIsModalShow] = useState(false)
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [password, setPassword] = useState('')
   const [errorPassword, setErrorPassword] = useState('')
   const [deleteAfterModal, setDeleteAfterModal] = useState<boolean>(true)

   const modalOnOk = () => {
      setConfirmLoading(true);
      if (password !== user.password) {
         setTimeout(() => {
            setConfirmLoading(false);
            setErrorPassword('Inappropriate password from the account')
         }, 1000);
      } else {
         setTimeout(() => {
            setIsModalShow(false);
            setConfirmLoading(false);
            deleteAfterModal && DeleteAllFromCart()
            successMessage()
         }, 2000);
      }
   }

   const successMessage = () => {
      messageApi.open({
         type: 'success',
         content: `You have successfully purchased all the games from the cart for ${totalPrice} $`,
      });
   };

   return (
      <>
         <button
            onClick={() => setIsModalShow(true)}
            className={cl.buyCart}
         >
            Buy items in the cart
         </button>
         <Modal
            title={`Buy all games from the cart`}
            centered
            open={isModalShow}
            cancelText="Cancel"
            okText="Confirm the purchase"
            confirmLoading={confirmLoading}
            onOk={() => modalOnOk()}
            onCancel={() => setIsModalShow(false)}
         >
            <div className={cl.modal__price}>The price for payment: {totalPrice} $</div>
            <Checkbox
               onChange={(e) => setDeleteAfterModal(e.target.checked)}
               defaultChecked
            >
               Delete objects from the cart after purchase
            </Checkbox>
            <div className={cl.sendPassword}>
               To confirm your account, you need to enter a password from your account:
            </div>
            <Form>
               <Form.Item
                  label=""
                  name="password"
                  rules={[
                     rules.required("Please enter the password"),
                     rules.max(20, 'The password cannot be more than 20 characters'),
                     rules.min(8, 'The password cannot be less than 8 characters')
                  ]}
               >
                  <Input.Password
                     placeholder='enter password'
                     value={password}
                     onChange={e => {
                        setPassword(e.target.value)
                        setErrorPassword('')
                     }}
                     type={"password"}
                  />
               </Form.Item>
            </Form>
            {errorPassword &&
               <div className={cl.errorPassword}>{errorPassword}</div>
            }
         </Modal>
      </>
   )
}

export default ModalBuyCart;