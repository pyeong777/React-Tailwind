const DiaryItem = ({author, content, created_date, emotion, id}) => {
    return (
        <div className="p-20 mb-10 bg-gray-100">
            <div className="pb-10 mb-10 border-gray-500 border-b-1">
                <p>작성자 : {author} | 감정점수 : {emotion}</p>
                <p className="text-gray-500">{created_date}</p>
            </div>
            <div className="font-bold my-30">
                <p>{content}</p>
            </div>
        </div>
    )
}

export default DiaryItem;   