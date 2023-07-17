import { FC, useState } from 'react';
import cl from './ModalBuyGame.module.scss';
import { Form, Input, Modal } from 'antd';
import { rules } from '../../../../utils/rules';
import { IGame } from '../../../../models/IGame';
import { IUser } from '../../../../models/IUser';
import { MessageInstance } from 'antd/es/message/interface';

interface PropsModalBuyGame {
   game: IGame;
   user: IUser;
   messageApi: MessageInstance;
}

const ModalBuyGame: FC<PropsModalBuyGame> = ({ game, user, messageApi }) => {
   const [gameCount, setGameCount] = useState<number>(1)
   const [password, setPassword] = useState('')
   const [errorPassword, setErrorPassword] = useState('')
   const [isModalShow, setIsModalShow] = useState(false)
   const [confirmLoading, setConfirmLoading] = useState(false);

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
            successMessage()
         }, 2000);
      }
   }

   const successMessage = () => {
      messageApi.open({
         type: 'success',
         content: `You have successfully acquired ${gameCount} games ${game.name} for ${(Math.round(game.price * gameCount * 100) / 100)} $`,
      });
   };

   return (

      <>
         <button onClick={() => setIsModalShow(true)} className={cl.button}>Buy</button>
         <Modal
            title={`Купить ${game.name}`}
            centered
            open={isModalShow}
            cancelText="Cancel"
            okText="Confirm the purchase"
            confirmLoading={confirmLoading}
            onOk={() => modalOnOk()}
            onCancel={() => setIsModalShow(false)}
         >
            <div className={cl.form}>
               <img src={game.image} className={`${cl.form__image} ${cl.itemProduct__img}`} alt={game.name} />
               <div className={cl.form__spans}>
                  <h3 className={cl.form__name}>{game.name}</h3>
                  <div className={cl.form__price}>{game.price} $</div>
                  <div className={cl.count}>
                     <div className={cl.count__span}>Quantity:</div>
                     {gameCount > 1 &&
                        <button
                           onClick={() => setGameCount(prev => prev - 1)}
                           className={cl.decrementCount}
                        >
                           -
                        </button>
                     }
                     <div className={cl.gameCount}>{gameCount}</div>
                     <button
                        onClick={() => setGameCount(prev => prev + 1)}
                        className={cl.incrementCount}
                     >
                        +
                     </button>
                  </div>
                  <div className={cl.general__count}>
                     Total price for payment: {(Math.round(game.price * gameCount * 100) / 100)} $
                  </div>
               </div>
            </div>
            <div className={cl.sendPassword}>
               To confirm your account, you need to enter a password from your account:
            </div>
            <Form>
               <Form.Item
                  label=""
                  name="password"
                  rules={[rules.required("Please enter the password"), rules.max(20, 'The password cannot be more than 20 characters'), rules.min(8, 'The password cannot be less than 8 characters')]}
               >
                  <Input.Password
                     placeholder='Enter password'
                     value={password}
                     onChange={e => {
                        setPassword(e.target.value)
                        setErrorPassword('')
                     }}
                     type={"password"}
                  />
               </Form.Item>
            </Form>
            {errorPassword && <div className={cl.errorPassword}>{errorPassword}</div>}
         </Modal>
      </>
   )
}

export default ModalBuyGame;