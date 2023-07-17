import { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IGame } from '../../../models/IGame';
import GameService from '../../../api/GameService';
import CommentService from '../../../api/CommentService'
import { useFetching } from '../../../hooks/useFetching';
import cl from './ProductsItem.module.scss';
import Loader from '../../SmallCompanents/Loader/Loader';
import { useActions, useAppSelector } from '../../../hooks/redux';
import TextArea from 'antd/es/input/TextArea';
import { addToCart } from '../../../utils/addToCart';
import { message } from 'antd';
import ModalBuyGame from './ModalBuyGame/ModalBuyGame';

const ProductsItem: FC = () => {
   const { user } = useAppSelector(state => state.auth)
   const [messageApi, contextHolder] = message.useMessage();
   const { AddToCart, AddToCartIncrement } = useActions()
   const { cartItems } = useAppSelector(state => state.cart)
   const { id } = useParams()
   const [game, setGame] = useState<IGame>({} as IGame)
   const [commentValue, setCommentValue] = useState<string>('')
   const [commentError, setCommentError] = useState<string>('')
   const [deleteCommentError, setDeleteCommentError] = useState<string>('')

   const [fetchGame, GameLoading, GameError] = useFetching(async (id: number) => {
      const response = await GameService.getGameById(id);
      setGame({ ...response.data })
   })
   const [setComment, CommentLoading, CommentError] = useFetching(async (comment: string) => {
      await CommentService.setComment(Math.random(), Number(id), user.username, comment, game.comments);
   })


   const AddComment = (aftor: string, comment: string, id: number) => {
      setGame((prev: IGame) => ({ ...prev, comments: [...prev.comments, { aftor, comment, id }] }))
   }


   const onClickDeleteComment = useCallback(async (idCom: number) => {
      const cloneComments = [...game.comments]
      const index = cloneComments.findIndex((com) => com.id === idCom)
      cloneComments.splice(index, 1)
      try {
         await CommentService.setComments(Number(id), cloneComments);
         setGame((prev: IGame) => ({ ...prev, comments: [...cloneComments] }))
      } catch (e) {
         setDeleteCommentError(`Произошла ошибка при удалении комментария: ${e}`)
      }
   }, [id, game.comments])
   const onClickAddComment = useCallback(async () => {
      if (commentValue) {
         await setComment(commentValue)
         AddComment(user.username, commentValue, Math.random())
         setCommentValue('')
         setCommentError('')
      } else {
         setCommentError('The review is empty, enter a review')
      }
   }, [user.username, setComment, commentValue])


   const onClickAddToCart = useCallback((e: any) => {
      if (cartItems.filter((item) => { console.log(item); return item.name === game.name }).length) {
         addToCart(e.currentTarget, Number(id), AddToCartIncrement, cl, game.name)
      } else {
         addToCart(e.currentTarget, Number(id), AddToCart, cl, game.name, game.price, game.image)
      }
   }, [game.image, game.name, game.price, cartItems, AddToCart, AddToCartIncrement, id])


   useEffect(() => {
      fetchGame(id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])


   return (
      <div className={cl.container}>
         {contextHolder}
         {GameLoading &&
            <div className={cl.loader}>
               <span>
                  <Loader />
               </span>
            </div>
         }
         {GameError &&
            <div style={{ color: 'red', fontSize: '20px' }}>
               An error occurred when receiving data about the game: {GameError}
            </div>
         }
         {!GameLoading && !GameError &&
            <>
               <div className={cl.info}>
                  <div data-pid={id} className={cl.imageContainer}>
                     <img src={game.image} className={`${cl.image} ${cl.itemProduct__img}`} alt={game.name} />
                     <h1 className={cl.name}>{game.name}</h1>
                     <div className={cl.price}>{game.price} $</div>
                     <div className={cl.buttons}>
                        <ModalBuyGame game={game} user={user} messageApi={messageApi} />
                        <button
                           onClick={(e) => onClickAddToCart(e)}
                           className={`${cl.button} ${cl.buttonCart} `}
                        >
                           Add to cart
                        </button>
                     </div>
                  </div>
                  <div className={cl.otherContainer}>
                     <div className={cl.otherContainer_1}>
                        <div className={[cl.rating, cl.item].join(' ')}>Rating:
                           <div className={cl.ratingResult}>
                              <span className={cl.active}></span>
                              <span className={game.rating >= 2 ? cl.active : ''}></span>
                              <span className={game.rating >= 3 ? cl.active : ''}></span>
                              <span className={game.rating >= 4 ? cl.active : ''}></span>
                              <span className={game.rating === 5 ? cl.active : ''}></span>
                           </div>
                        </div>
                        <div className={[cl.ageLimit, cl.item].join(' ')}>Age limit: {game.ageLimit}+</div>
                        <div className={[cl.genre, cl.item].join(' ')}>Genre: {game.genre}</div>
                        <div className={[cl.platform, cl.item].join(' ')}>Platforms: {game?.platform?.pc && 'pc'} {game?.platform?.playstation && 'playstation'} {game?.platform?.xbox && 'xbox'}</div>
                     </div>
                     <div className={cl.description}><span>Description:</span> {game.description}</div>
                  </div>
               </div>
               <div className={cl.comments}>
                  <h2 className={cl.comments__title}>Reviews</h2>
                  <div className={cl.comments__blockInput}>
                     <TextArea
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        className={cl.comments__input}
                        rows={3}
                        placeholder='Enter a review'>
                     </TextArea>
                     <button
                        onClick={() => onClickAddComment()}
                        className={cl.comments__addButton}
                     >
                        Add a review
                     </button>
                  </div>
                  {commentError &&
                     <div style={{ color: 'red' }}>{commentError}</div>
                  }
                  {CommentLoading &&
                     <Loader />
                  }
                  {CommentError &&
                     <div style={{ color: 'red' }}>
                        An error occurred when adding a commentary: {CommentError}
                     </div>
                  }
                  <div className={cl.comments__body}>
                     {game.comments &&
                        game.comments.map((com) =>
                           <div className={cl.comments__item} key={Math.random()}>
                              <div className={cl.comments__cont}>
                                 <div className={cl.comments__item__aftor}>{com.aftor}</div>
                                 <div className={cl.comments__item__comment}>{com.comment}</div>
                              </div>
                              {(user.isAdmin || com.aftor === user.username) &&
                                 <div>
                                    <button
                                       onClick={() => onClickDeleteComment(com.id)}
                                       className={cl.comments__item__button}
                                    >
                                       Delete
                                    </button>
                                    <div style={{ color: "red" }}>{deleteCommentError}</div>
                                 </div>
                              }
                           </div>
                        )
                     }
                  </div>
               </div>
            </>}
      </div>
   )
}

export default ProductsItem;