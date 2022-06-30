import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearComment, getComments, postCreateComments } from "../../redux/actions/actions-Create";
import { AppDispatch, State } from "../../redux/store/store";
import { useCreateCommentMutation } from "../../slices/app/postComment";
import { useDatesModal } from "../CreateEvent/CreateEventModal/useDatesModal";
import DatesModal from "../CreateEvent/CreateEventModal/DatesModal"
import { selectCurrentUser } from "../../slices/authentication/authSlice";
import styleComments from "./Comments.module.css"
import { MdAccountCircle } from "react-icons/md"
const Comments = () => {
    const allComments = useSelector((state: State) => state.global.allComments);
    const { id }: any = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch()
    const [backendComments, setBackendComment] = useState<any>({
        text: ""
    })

    const currentUser:any=useSelector(selectCurrentUser)

    const [isOpen, openModal, closeModal] = useDatesModal(false);

    const [createComment] = useCreateCommentMutation();

    const [text, setText] = useState("")

    useEffect(() => {

        dispatch(getComments(id));
        return () => {
            dispatch(clearComment())
        }
    }, [dispatch, id])

    // const onInputChange = (e:any)=>{
    //     e.preventDefault();
    //     setBackendComment({
    //         ...backendComments,
    //         [e.target.name]:e.target.value,
    //     });
    // }
    const addComment = (text: any) => {
        dispatch(postCreateComments(text))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (text) await createComment({ text: text, id: id })
        console.log("nuevio", text)
        setText("")
        dispatch(getComments(id))
    }

    const isTextAreaDisable = text.length === 0 || text.length>100;

    return (
        <div className={styleComments.container}>
            <br />
            {allComments && <h2>Comentarios</h2>}
            {allComments? allComments?.map((el: any) => {
                return (
                    <div>
                        
                        <p className={styleComments.p}><MdAccountCircle className={styleComments.icon}/>{el.user.name}</p>
                        <p >{el.text}</p>
                    </div>
                )
            }):<h2>No hay comentarios todavía</h2>}
            <div className={styleComments.container_btn1}>
                {currentUser &&
                <button className={styleComments.btn_1} onClick={() => openModal()}>
                    Deja tu Comentario
                </button>
                }
                <DatesModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                >
                    {currentUser && 
                     <form onSubmit={handleSubmit} >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ resize: "none" }}
                            className={styleComments.textarea}
                        />
                        <br></br>
                        <button className={styleComments.btn_2} disabled={isTextAreaDisable} type="submit" onClick={()=>closeModal()}>Enviar Comentario</button>
                        <br />
                    </form>}
                        <button className={styleComments.btn_2} onClick={()=>closeModal()}>Salir</button>
                  
                </DatesModal>
            </div>
        </div>

    );
}
export default Comments;