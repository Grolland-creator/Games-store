import { FC } from 'react';
import cl from './AdminPanel.module.scss';
import CreateNewGame from './CreateNewGame/CreateNewGame';
import DeleteGame from './DeleteGame/DeleteGame';
import GiveRoleAdmin from './GiveRoleAdmin/GiveRoleAdmin';

const AdminPanel: FC = () => {

   return (
      <div className={cl.container}>
         <h1 className={cl.title}>Admin panel</h1>
         <CreateNewGame/>
         <DeleteGame/>
         <GiveRoleAdmin/>
         <GiveRoleAdmin give/>
      </div>
   )
}

export default AdminPanel;