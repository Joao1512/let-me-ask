import copyImg from '../assets/images/copy.svg';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
} 

export default function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast.success('Código copiado')
  }

  return (
    <>
    <div><Toaster></Toaster></div>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div className="img">
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala {props.code}</span>
      </button>
    </>
  )
}