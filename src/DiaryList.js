import DiaryItem from './DiaryItem';

const DiaryList = ( {onDelete, diaryList} ) => {
    return (
        <div className="p-10 mt-20 border-gray-500 border-1">
            <h2 className='font-bold text-center text-20'>diary list</h2>
            <h3 className='my-10 font-bold'>{diaryList.length}개의 일기가 있습니다.</h3>
            <div>
                {diaryList.map((item) => (
                    <DiaryItem key={item.id} {...item} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps= {
    diaryList: [],
}

export default DiaryList;