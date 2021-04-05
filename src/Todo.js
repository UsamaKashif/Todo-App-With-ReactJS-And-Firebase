import { Button, Input, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core'
import {DeleteForeverRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { db } from './firebase'


const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2p solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        left: "50%",
        top: "20%",
        transform: "translateX(-50%)"
    }
}))

const Todo = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const updateTodo = () => {
        db.collection("todos").doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setInput("")
        setOpen(false)
    }


    return (
        <>
            <List>
                <ListItem>
                    <ListItemText primary={props.todo.todo}/>
                    <Button>
                        <DeleteForeverRounded onClick={event => db.collection("todos").doc(props.todo.id).delete()} />
                    </Button>
                    <Button color="secondary" variant="contained" onClick={e => setOpen(true)}>Edit</Button>
                </ListItem>

            </List>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
                
            >
                <div className={classes.paper}>
                    <Input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)}/>
                    <Button color="primary" variant="contained" onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
        </>
    )
}


export default Todo