import DiaryItem from './DiaryItem';

const DiaryList = ( {onEdit, onRemove, diaryList} ) => {
    return (
        <div className="p-10 mt-20">
            <h2 className='font-bold text-center text-20'>diary list</h2>
            <h3 className='my-10 font-bold'>{diaryList.length}개의 일기가 있습니다.</h3>
            <div>
                {diaryList.map((item) => (
                    <DiaryItem key={item.id} {...item} onEdit={onEdit} onRemove={onRemove}/>
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps= {
    diaryList: [],
}

export default DiaryList;