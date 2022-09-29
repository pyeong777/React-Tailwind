const DiaryItem = ({onDelete, author, content, created_date, emotion, id}) => {
    return (
        <div className="p-20 mb-10 bg-gray-100">
            <div className="pb-10 mb-10 border-gray-500 border-b-1">
                <p>작성자 : {author} | 감정점수 : {emotion}</p>
                <p className="text-gray-500">{created_date}</p>
            </div>
            <div className="font-bold">
                <p>{content}</p>
                <button className="p-5 mt-25 w-100 outline outline-1 rounded-5 hover:bg-yellow-300 hover:text-white" 
                        onClick={() => {
                        if(window.confirm(`${id+1}번째 일기를 정말 삭제하시겠습니까?`)) {
                            onDelete(id);
                        }
                    }}>삭제하기
                </button>
            </div>
        </div>
    )
}

export default DiaryItem;   