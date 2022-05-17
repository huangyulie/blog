import React, { useState } from 'react';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import axios from 'axios';
import screenful from 'screenfull';

export default function Md(props) {

    const onUploadImg = async (files, callback) => {
        const res = await Promise.all(
            files.map((file) => {
                return new Promise((rev, rej) => {
                    const form = new FormData();
                    form.append('img', file);
                    axios.post('/img/upload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                        .then((res) => { ; rev(res) })
                        .catch((error) => rej(error));
                });
            })
        );
        callback(res.map((item) => item.data.data.url));
    }
    const [text, setText] = useState(props.md?props.md:'hello md-editor-rt!');
    props.modelValue(text);
    // console.log(text);
    // console.log(Editor);
    return <Editor screenfull={screenful} modelValue={text} onChange={setText} onUploadImg={onUploadImg} onHtmlChanged={props.onHtmlChanged} />;
}