import {ChangeEvent, useEffect, useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent} from 'collections-mui'
import {MainBlockModal, ButtonBlockModal, InputFile} from 'common'


type ModalEditCardPropsType = {
    previousQuestion: string
    previousAnswer: string
    previousQuestionImg: string
    previousAnswerImg: string
    questionType: string
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    editItem: (question: string, answer: string, questionImg: string, answerImg: string) => void
}


export const ModalEditCard = (props: ModalEditCardPropsType) => {
    const [question, setQuestion] = useState(props.previousQuestion)
    const [questionImg, setQuestionImg] = useState(props.previousQuestionImg)
    const [answerImg, setAnswerImg] = useState(props.previousAnswerImg)
    const [answer, setAnswer] = useState(props.previousAnswer)
    const [questionType, setQuestionType] = useState('')

    useEffect(() => {
        setQuestion(question)
        setAnswer(answer)
        setQuestionImg(questionImg)
        setAnswerImg(answerImg)
        props. previousQuestionImg ? setQuestionType('Image') : setQuestionType('Text')
    }, [question, answer, questionImg, answerImg])

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const onChangeQuestionTypeHandler = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value)
    }

    const editCardHandler = () => {
        props.editItem(question, answer, questionImg, answerImg)
        props.toggleOpenMode(false)
    }

    const questionFileChangeHandler = (questionImg: string) => {
        setQuestionImg(questionImg)
    }

    const answerFileChangeHandler = (answerImg: string) => {
        setAnswerImg(answerImg)
    }

    const addQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const addAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <div>
            <MainBlockModal
                title={props.title}
                open={props.open}
                toggleOpenMode={props.toggleOpenMode}
                onCloseModal={onCloseModalHandler}
            >
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>Choose a question format</InputLabel>
                    <Select
                        autoFocus
                        label='Choose a question format'
                        value={questionType}
                        onChange={onChangeQuestionTypeHandler}
                    >
                        <MenuItem value='Text'>Text</MenuItem>
                        <MenuItem value='Image'>Image</MenuItem>
                    </Select>
                </FormControl>
                {questionType === 'Text'
                    ? <div>
                        <TextField
                            value={question}
                            onChange={addQuestionHandler}
                            autoFocus
                            label='Question'
                            variant='standard'
                            sx={{width: '100%'}}
                        />
                        <TextField
                            value={answer}
                            onChange={addAnswerHandler}
                            autoFocus
                            label='Answer'
                            variant='standard'
                            sx={{width: '100%'}}
                        />
                    </div>
                    :
                    <div>
                        <InputFile
                            img={questionImg}
                            saveImg={questionFileChangeHandler}
                            title={'Upload question image'}
                            name={'questionImage'}
                        />
                        <InputFile
                            img={answerImg}
                            saveImg={answerFileChangeHandler}
                            title={'Upload answer image'}
                            name={'answerImage'}
                        />
                    </div>
                }
                <ButtonBlockModal
                    onCloseModalHandler={onCloseModalHandler}
                    actionModalHandler={editCardHandler}
                    buttonTitleModal={'Edit'}
                />
            </MainBlockModal>
        </div>
    )
}
