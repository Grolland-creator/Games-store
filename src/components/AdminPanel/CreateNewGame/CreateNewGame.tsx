import { FC, useState, useCallback } from 'react';
import cl from './CreateNewGame.module.scss';
import { Button, Checkbox, Form, Input, InputNumber, Upload, UploadProps, message } from 'antd';
import { rules } from '../../../utils/rules';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import GameService from '../../../api/GameService';
import { IGame } from '../../../models/IGame';
import { beforeUpload, dummyRequest, getBase64 } from '../../../utils/uploadFunctions';


const plainOptions = ['pc', 'playstation', 'xbox', 'iPhone', 'android'];
const defaultCheckedList = ['pc'];


const CreateNewGame: FC = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
   const [indeterminate, setIndeterminate] = useState(true);
   const [loading, setLoading] = useState<boolean>(false);
   const [imgUrl, setImgUrl] = useState<string>('');
   const [messageApi, contextHolder] = message.useMessage();
   const [pictureError, setPictureError] = useState<string>('')
   const [listError, setListError] = useState<string>('')
   const [checkAll, setCheckAll] = useState(false);
   const [form] = Form.useForm();


   const successMessage = useCallback(() => {
      messageApi.open({
         type: 'success',
         content: `You have successfully added the game`,
      });
   }, [messageApi]);
   const errorMessage = useCallback((e: any) => {
      messageApi.open({
         type: 'error',
         content: `An error occurred when adding a game: ${e}`,
      });
   }, [messageApi]);


   const handleChange: UploadProps['onChange'] = useCallback((info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
         setLoading(true);
         return;
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         getBase64(info.file.originFileObj as RcFile, (url) => {
            setLoading(false);
            setImgUrl(url);
         });
      }
   }, []);


   const checkingName = useCallback(async (name: string) => {
      try {
         const games = await GameService.getGames(1000)
         const arr1 = games.data.filter((game: IGame) => game.name === name)
         if (arr1.length) {
            return true
         } else {
            return false
         }
      } catch (e) {
         errorMessage(e)
         return false
      }
   }, [errorMessage])


   const submit = useCallback(async (values: any) => {
      setIsLoading(true)
      if (!imgUrl) {
         setPictureError('Please select the image from the computer')
         setIsLoading(false)
      } else if (!checkedList.length) {
         setListError('Please choose one option')
         setIsLoading(false)
      } else if (await checkingName(values.name)) {
         setIsLoading(false)
         errorMessage('There is already such a name of the game, the name of the game should be unique.')
      } else {
         const arr = { ...values, image: imgUrl, comments: [] }
         try {
            await GameService.addGame(arr)
            setIsLoading(false)
            successMessage()
            form.resetFields()
            setImgUrl('')
         } catch (e) {
            errorMessage(e)
            setIsLoading(false)
         }
      }
   }, [checkedList.length, checkingName, errorMessage, successMessage, form, imgUrl,])

   const onChange = useCallback((list: CheckboxValueType[]) => {
      setCheckedList(list);
      setIndeterminate(!!list.length && list.length < plainOptions.length);
      setCheckAll(list.length === plainOptions.length);
   }, []);

   const onCheckAllChange = useCallback((e: CheckboxChangeEvent) => {
      setCheckedList(e.target.checked ? plainOptions : []);
      setIndeterminate(false);
      setCheckAll(e.target.checked);
   }, []);

   return (
      <div className={cl.container}>
         {contextHolder}
         <h2 className={cl.title}>Create a new game</h2>
         <Form
            form={form}
            onFinish={submit}
         >
            <Form.Item
               label='Имя игры'
               name="name"
               rules={[
                  rules.required("Please enter the name of the game!"),
                  rules.max(50, 'The name of the game cannot be more than 50 characters')
               ]}
            >
               <Input className={cl.inputName} />
            </Form.Item>
            <Form.Item
               label='The price of the game'
               name="price"
               rules={[rules.required("Please enter the price of the game!")]}
               initialValue={0}
            >
               <InputNumber
                  className={cl.inputPrice}
                  min={0}
                  max={1000}
                  step={0.01}
                  addonAfter="$"
                  keyboard
                  type='number'
               />
            </Form.Item>
            <Form.Item
               label='Age limit'
               name="ageLimit"
               rules={[rules.required("Please enter the age limit")]}
               initialValue={1}
            >
               <InputNumber
                  className={cl.inputAgeLimit}
                  min={0}
                  max={99}
                  step={1}
                  addonAfter="+"
                  keyboard
                  type='number'
               />
            </Form.Item>
            <Form.Item
               label='Game rating'
               name="rating"
               rules={[rules.required("Please enter games on a 5 -point scale")]}
               initialValue={1}
            >
               <InputNumber
                  className={cl.inputRating}
                  min={1}
                  max={5}
                  step={1}
                  keyboard
                  type='number'
               />
            </Form.Item>
            <Form.Item
               label='Genre of the game'
               name="genre"
               rules={[
                  rules.required("Please introduce the genre of games"),
                  rules.max(30, 'The name of the game cannot be more than 30 characters')
               ]}
            >
               <Input className={cl.inputGenre} />
            </Form.Item>
            <Form.Item
               label='Supported platforms'
               name="platform"
            >
               <div>
                  <Checkbox
                     className={cl.checkAll}
                     indeterminate={indeterminate}
                     onChange={onCheckAllChange}
                     checked={checkAll}
                  >
                     Check all
                  </Checkbox>
                  <Checkbox.Group
                     options={plainOptions}
                     value={checkedList}
                     onChange={onChange}
                  />
               </div>
            </Form.Item>
            {listError &&
               <div style={{ color: 'red' }}>{listError}</div>
            }
            <div className={cl.upload}>
               <div className={cl.upload__text}>
                  <span style={{ color: "red" }}>*</span>
                  Add a picture for the game, preferably expansion 3: 4 :
               </div>
               {imgUrl &&
                  <div className={cl.containerImage}><img className={cl.image} src={imgUrl} alt="" /></div>
               }
               <Upload
                  name="avatar"
                  listType="picture-card"
                  className={cl.pictureUploader}
                  showUploadList={false}
                  customRequest={dummyRequest}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
               >
                  <div className={cl.uploadBlock}>
                     <div className={cl.loadingAvatar}>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                     </div>
                  </div>
               </Upload>
            </div>
            {pictureError &&
               <div style={{ color: 'red' }}>{pictureError}</div>
            }
            <Form.Item
               label='Description of the game'
               name="description"
               rules={[
                  rules.required("Please enter the description of the game!"),
                  rules.max(500, 'The description of the game cannot be more than 500 characters')
               ]}
            >
               <TextArea rows={3} />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={isLoading} >
                  Create a game
               </Button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default CreateNewGame;