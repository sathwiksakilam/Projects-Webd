import React, { useState } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types'; // Correct import
// import 'path-browserify';


const ImageUpload = (props) => {
    const [fileState, setFileState] = useState(null);
    const acceptedTypes = ['image/png', 'image/jpeg'];
    var mime = require('mime-types')
    const onFileAdded = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileState(file);
        }
    };
   

    const submit = () => {
        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            props.uploadImage(fileState, mime.lookup(fileState.name));
            props.onClose();
            setFileState(null);
        }
    };

    return (
        <Modal basic open={props.open} onClose={props.onClose} >
            <Modal.Header> Select an image</Modal.Header>
            <Modal.Content>
                <Input type="file" name="file" fluid onChange={onFileAdded} label="File Type (png, jpeg)" />
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={submit}>
                    <Icon name='checkmark' />Add
                </Button>
                <Button color="red" onClick={props.onClose}>
                    <Icon name='remove' />Cancel
                </Button>
            </Modal.Actions>
        </Modal >
    );
};

export default ImageUpload;
