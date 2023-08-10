import { Avatar, Button, message } from 'antd';
import { FC, useState, useCallback } from 'react';
import cl from './Profile.module.scss';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useActions, useAppSelector } from '../../hooks/redux';
import UserService from '../../api/UserService';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { beforeUpload, dummyRequest, getBase64 } from '../../utils/uploadFunctions';
import TextArea from 'antd/es/input/TextArea';


const Profile: FC = () => {
   const { user } = useAppSelector(state => state.auth);
   const [updateDescription, setUpdateDescription] = useState<boolean>(false)
   const [description, setDescription] = useState<string | undefined>(user.description)
   const [descriptionError, setDescriptionError] = useState<string>('')
   const [avatarError, setAvatarError] = useState<string>('')
   const { setDescription: setReduxDescription, setAvatar: setReduxAvatar, logout } = useActions()
   const [loading, setLoading] = useState<boolean>(false);
   const [updatePage, setUpdatePage] = useState<string>(''); // State to just update the page if necessary
   const navigate = useNavigate()

   const setDescriptionFunc = useCallback(async () => {
      try {
         await UserService.setDescription(description, user.username)
         setReduxDescription(description || '')
         setUpdateDescription(false)
      } catch (e) {
         setDescriptionError('There was an error when the description changes')
      }
   }, [description, user.username, setReduxDescription])

   const setAvatarFunc = useCallback(async (avatar: string) => {
      try {
         await UserService.setAvatar(avatar, user.username)
         setReduxAvatar(avatar || '')
      } catch (e) {
         setAvatarError('An error occurred when avatar changes')
      }
   }, [setReduxAvatar, user.username])


   const handleChange: UploadProps['onChange'] = useCallback((info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
         setLoading(true);
         return;
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         getBase64(info.file.originFileObj as RcFile, (url) => {
            setLoading(false);
            setUpdatePage('');
            setAvatarFunc(url)
         });
      }
   }, [setAvatarFunc]);

   const uploadButton = (
      <div className={cl.uploadBlock}>
         <div className={cl.loadingAvatar}>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
         </div>
         <div className={cl.upload}>Change the avatar</div>
      </div>
   );

   return (
      <div className={cl.wrapper}>
         <div className={cl.container}>
            <div className={`${cl.row} saveAvatar ${cl.row1}`}>
               <Avatar size={300} src={user.avatar || './assets/img/defaultAvatar.jpg'} />
               <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  customRequest={dummyRequest}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
               >
                  {uploadButton}
               </Upload>
               {avatarError && <div style={{ color: 'red' }}>{avatarError}</div>}
            </div>
            <div className={cl.row + ' ' + cl.row2}>
               <div className={cl.item}>Username: {user.username}</div>
               <div className={cl.item}>Email: {user.email}</div>
               {user.isAdmin &&
                  <div className={cl.admin}>Administrator</div>
               }
               <div className={cl.description}>
                  Description: <span>{!updateDescription && (user.description || 'not available')}</span>
               </div>
               {descriptionError &&
                  <div style={{ color: 'red' }}>{descriptionError}</div>
               }
               {!updateDescription ?
                  <Button
                     className={cl.update}
                     onClick={() => setUpdateDescription(true)}
                  >
                     {user.description ? 'change' : 'add'} description
                  </Button>
                  :
                  <div className={cl.blockInput}>
                     <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={user.description ? '' : 'Enter the description'}
                        rows={4}
                        cols={50}
                        className={cl.input}
                     />
                     <div className={cl.blockButton}>
                        <Button onClick={() => setDescriptionFunc()}>Confirm</Button>
                        <Button type='dashed' onClick={() => setUpdateDescription(false)}>Cancel</Button>
                     </div>
                  </div>}
               {user.isAdmin &&
                  <Link to='/admin-page' >
                     <Button className={cl.linkAdmin}>Go to the administrator page</Button>
                  </Link>
               }
               <Button
                  type='primary'
                  onClick={() => {
                     logout()
                     navigate('/signIn')
                  }}
                  className={cl.logOut}
               >
                  Log out
               </Button>
            </div>
         </div>
      </div>
   )
}

export default Profile;