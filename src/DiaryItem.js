import React, { useState } from 'react';
import { useRef } from 'react';

const DiaryItem = ({onEdit, onRemove, author, content, nowDate, emotion, id}) => {
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();
    
    const handleRemove = () => {
        if(window.confirm(`${id+1}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    };

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };

    const handleEdit = () => {

        if(localContent.length < 5) {
            localContent.current.focus();
            return;
        }
        if(window.confirm(`${id+1}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();    
        }

    };

    return (
        <div className="p-20 mb-10 bg-gray-100">        
            <div className="pb-10 mb-10 border-gray-500 border-b-1">
                <p>작성자 : {author} | 감정점수 : {emotion}</p>
                <p className="text-gray-500">{nowDate}</p>
            </div>
            <div className="font-bold">
                <p>
                    {isEdit ? 
                    <>
                    <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}
                    className="p-10 mb-20 outline-gray-300 h-150 outline-1 outline w-500 focus:outline-yellow-500" />
                    </> 
                    : 
                    <>
                    {content}
                    </>
                    }
                </p>
                {isEdit ? 
                <>
                <button className="p-5 mt-25 w-100 outline outline-1 rounded-5 hover:bg-yellow-300 hover:text-white" 
                        onClick={handleQuitEdit}>수정취소 
                </button> 
                <button className="p-5 ml-5 mt-25 w-100 outline outline-1 rounded-5 hover:bg-yellow-300 hover:text-white"
                        onClick={handleEdit}>수정완료
                </button>
                </> 
                : 
                <>
                <button className="p-5 mt-25 w-100 outline outline-1 rounded-5 hover:bg-yellow-300 hover:text-white" 
                        onClick={handleRemove}>삭제하기 
                </button> 
                <button className="p-5 ml-5 mt-25 w-100 outline outline-1 rounded-5 hover:bg-yellow-300 hover:text-white"
                        onClick={toggleIsEdit}>수정하기
                </button>
                </>
                }
                
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);   