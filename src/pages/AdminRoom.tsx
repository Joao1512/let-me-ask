import logoImg from '../assets/images/logo.svg'
import Button  from '../components/Button'
import RoomCode  from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import '../styles/room.scss'
import toast, { Toaster } from 'react-hot-toast';
import useRoom from '../hooks/useRoom'
import Question from '../components/Question'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../service/firebase'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import emptyQuestions from '../assets/images/empty-questions.svg'

type RoomParams = {
    id: string
}
export function AdminRoom() {
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions, roomCreatorId } = useRoom(roomId)
    const { user } = useAuth()
    const history = useHistory()

    async function handleDeleteQuestion(questionId: string) {
        if (user?.id) {
            if (roomCreatorId === user?.id) {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
                toast.success('Pergunta removida')
            }
            else {
                toast.error('Você não tem permissão neste recurso')
            }
        }
        else {
            toast.error('Faça Login')
        }
    }

    async function handleRemoveRoom(roomId: string) {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/rooms/new')
    }

    function displayQuestions() {
        return (
            questions.map(question => {                    
                return (
                    <div className="question-list">
                        <Question key={question.id} content={question.content} author={question.author} >
                            <button onClick={() => handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="" />
                            </button>
                        </Question>
                    </div>
                )
            })
        )
    }

    function displayEmptyQuestions() {
        return (
            <div className='empty-questions'>
                <img src={emptyQuestions} alt="" />
                <p>Nenhuma pergunta por aqui ainda...</p>
            </div>
        )
    }

    return(
        <div id='page-room'>
            <div><Toaster/></div>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={params.id} ></RoomCode>
                        <Button onClick={() => handleRemoveRoom(roomId)} isOutlined >Encerrar Sala </Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala - {title}</h1> 
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                
                </div>
                {questions.length > 0 && displayQuestions()}
                {questions.length <= 0 && displayEmptyQuestions()}
            </main>
        </div>
    )
}