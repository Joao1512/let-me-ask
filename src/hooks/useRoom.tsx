import { useEffect, useState } from "react"
import { database } from "../service/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
    likesCount: number,
    likeId: string | undefined,

}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
    likes: Record<string, {authorId: string}>,
    hasLiked: boolean

}>

export default function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')
    const [roomCreatorId, setRoomCreatorId] = useState('')
    const {user} = useAuth()

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        
        roomRef.on('value', room => {
            const dataBaseRoom = room.val()
            const fireBaseQuestions: FirebaseQuestions = dataBaseRoom.questions  ?? {}
            const roomCreator: string = dataBaseRoom.authorId ?? ''
            const parsedQuestions = Object.entries(fireBaseQuestions).map(([key, value]) => {
               return {
                id: key,
                content: value.content,
                author: value.author,
                isHighLighted: value.isHighLighted,
                isAnswered: value.isAnswered,
                likesCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
               } 
            })
            setTitle(dataBaseRoom.title)
            setRoomCreatorId(roomCreator)
            setQuestions(parsedQuestions)
        })
        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id])
    return {questions, title, roomCreatorId}
}