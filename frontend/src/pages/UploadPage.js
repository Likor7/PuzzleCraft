import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { truncateString } from '../utils/index';

function UploadPage() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [pieces, setPieces] = useState(16);
    const [fileName, setFileName] = useState('');


    const [validPiecesValues, setValidPiecesValues] = useState();
    useEffect(() => {
        const generateValidPiecesValues = () => {
            const values = [];
            for (let widthPiece = 1; widthPiece <= width; widthPiece++) {
                if (width % widthPiece === 0) {
                    for (let heightPiece = 1; heightPiece <= height; heightPiece++) {
                        if (height % heightPiece === 0) {
                            const totalPieces = (width / widthPiece) * (height / heightPiece);
                            if (totalPieces >= 16 && totalPieces <= 150 && !values.includes(totalPieces)) {
                                values.push(totalPieces);
                            }
                        }
                    }
                }
            }
            return values.sort((a, b) => a - b);
        };

        setValidPiecesValues(generateValidPiecesValues());
    }, [width, height]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setFileName(file.name);

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                setWidth(img.width);
                setHeight(img.height);

                URL.revokeObjectURL(img.src);
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image && width && height && pieces) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('width', width);
            formData.append('height', height);
            formData.append('pieces', pieces);

            try {
                const response = await fetch('http://localhost:8080/api/images/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const result = await response.json();

                        sessionStorage.clear();
                        sessionStorage.setItem('originalImageUrl', result.originalImageUrl);
                        sessionStorage.setItem('puzzlePieceUrls', JSON.stringify(result.puzzlePieceUrls));
                        sessionStorage.setItem('piecesHorizontal', result.piecesHorizontal);
                        sessionStorage.setItem('piecesVertical', result.piecesVertical);
                        sessionStorage.setItem('imageHeight', height);
                        sessionStorage.setItem('imageWidth', width);
                        navigate('/puzzle');
                        window.location.reload();
                    } else {
                        console.error('Response is not JSON format');
                    }

                } else {
                    console.error('Server error:', response.statusText);
                }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        } else {
            console.error('Please make sure all fields are filled out correctly.');
        }
    };

    return (
        <div className="upload-page-background">
            <div className="upload-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="custom-upload">
                        <input type="file" id="file" className="form-input" accept=".jpg,.jpeg,.png,.bmp" onChange={handleImageChange} />

                        <label htmlFor="file" className="custom-upload-label">
                            {fileName
                                ? <div className="file-info">
                                    <p>File selected: {truncateString(fileName, 30)}</p>
                                    <small>Click here to change the file</small>
                                </div>
                                : <div className="upload-instructions">
                                    <p>Click box to upload</p>
                                    <small>.jpg .png .bmp</small>
                                </div>
                            }
                        </label>
                    </div>
                    {image && (
                        <>
                            <div className="form-wh">
                                <label>Width</label>
                                <input type="text" className="form-input" value={width} onChange={(e) => setWidth(e.target.value)} readOnly={true} />
                            </div>
                            <div className="form-wh">
                                <label>Height</label>
                                <input type="text" className="form-input" value={height} onChange={(e) => setHeight(e.target.value)} readOnly={true} />
                            </div>
                            <div className="form-wh">
                                <label>Number of Pieces</label>
                                <input type="range" className="input-range"
                                    min="0"
                                    max={validPiecesValues.length - 1}
                                    value={validPiecesValues.indexOf(pieces)}
                                    onChange={(e) => setPieces(validPiecesValues[e.target.value])} />
                                <span>{pieces}</span>
                            </div>
                        </>
                    )}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default UploadPage;
