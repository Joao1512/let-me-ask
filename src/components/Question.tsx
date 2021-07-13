import '../styles/question.scss'
import {ReactNode} from 'react'

type QuestionProps = {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    children?: ReactNode,
}

export default function Question({content, author, children}: QuestionProps) {
    return (
        <>
            <div className='question-content'>
                <div>{content}</div>
                    <div className="question-info">
                        <div className="user-info">
                            <img className='user-avatar' src={author.avatar} alt="" />
                            <span className='userName'>{author.name}</span>
                        </div>
                        <div className="likes-info">
                            {children}
                        </div>
                    </div>
            </div>
        </>
        )
}