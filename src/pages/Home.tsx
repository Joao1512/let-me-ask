import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import illustrationImg from '../assets/images/illustration.svg'

import { FormEvent, useContext } from 'react'
import { UserContext } from '../contexts/AuthContext'

import '../styles/auth.scss'
import { useState } from 'react'
import { database } from '../service/firebase'
import toast, { Toaster } from 'react-hot-toast';

export function Home() {

    const {user, signInWithGoogle} = useContext(UserContext)
    const [room, setRoom] = useState('')
    const history = useHistory()
    
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (room.trim() === '') {
            return;
        }
        const roomRef = await database.ref(`rooms/${room}`).get()

        if (!roomRef.exists()) {
            toast.error('Sala inexistente')
            return;
        }
        history.push(`/rooms/${room}`)
    }


    return (
        <div id='page-auth'>
            <Toaster/>
            <aside>
                <img src={illustrationImg} alt=""/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="" />
                    <button className='google' onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o google 
                    </button>
                    <div className='separator'>
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom} >
                        <input type="text " placeholder='Digite o código da sala' onChange={event => setRoom(event.target.value)} />
                        <Button>Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}