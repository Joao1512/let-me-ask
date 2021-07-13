import '../styles/auth.scss'
import { Link, useHistory } from 'react-router-dom'
import Button from '../components/Button'
import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../service/firebase'

export function NewRoom() {
    const {user} = useAuth()
     
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {    
        event.preventDefault()
        if (newRoom.trim() === '') {
            return;
        }
        
        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="" />
                    <img className='avatar' src={user?.avatar} alt="" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} >  
                        <input type="text " placeholder='Nome da sala' onChange={(event) => setNewRoom(event.target.value)} value={newRoom} />
                        <Button>Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? 
                    <Link to='/'>Clique aqui</Link>    
                    </p>
                </div>
            </main>
        </div>
    )
}